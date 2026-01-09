import type { APIRoute } from "astro";
import { randomUUID } from "node:crypto";
import { supabase } from "./server";
import { sendWelcomeMail } from "../emails/emails";
import { createProposal } from "../proposals/create";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body.selectedTime?.start || !body.selectedTime?.end) {
      return new Response(
        JSON.stringify({ error: "Missing selectedTime.start or end" }),
        { status: 400 }
      );
    }

    const startDate = new Date(body?.selectedTime.start);

    /* -------------------------------------------------
     * 1. Create booking on Cal.com
     * ------------------------------------------------- */

    const bookingPayload = {
      eventTypeId: 4270041,
      start: body?.selectedTime.start,
      attendee: {
        name: body?.name,
        email: body?.email,
        timeZone: "America/Toronto",
        language: "en",
      },
      metadata: {},
    };

    const bookingRes = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.CAL_KEY}`,
        "cal-api-version": "2024-08-13",
      },
      body: JSON.stringify(bookingPayload),
    });

    const bookingData = await bookingRes.json();

    const schedulingUrl = bookingData?.schedulingUrl || body.scheduling_url;

    /* -------------------------------------------------
     * 2. Save lead in Supabase
     * ------------------------------------------------- */
    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .insert({
        lead_id: randomUUID(),
        first_name: body.name,
        email: body.email,
        company: body.companyName,
        industry: body.industry,
        budget_min: body.monthlybudget.min,
        budget_max: body.monthlybudget.max,
        estimateTime_min: body.estimateTimeline.min,
        estimateTime_max: body.estimateTimeline.max,
        description: body.productIdea,
        formatted_date: startDate.toISOString(),
        scheduling_url: bookingData?.data?.meetingUrl,
        booking_status: "confirmed",
        email_sent: false,
      })
      .select()
      .single();

    if (leadError) throw leadError;

    const proposalData = await createProposal({
      lead_id: leadData.lead_id,
      creator_email: body.email,
    });

    /* -------------------------------------------------
     * 3. Send confirmation email
     * ------------------------------------------------- */

    try {
      await sendWelcomeMail({
        email: body.email,
        name: body.name,
        leadId: leadData.lead_id,
        schedulingUrl: bookingData?.data?.meetingUrl,
        proposalLink: `http://localhost:4321/proposal?mode=features&passcode=${proposalData.passcode}`,
      });

      await supabase
        .from("leads")
        .update({
          email_sent: true,
          email_sent_at: new Date().toISOString(),
        })
        .eq("lead_id", leadData?.lead_id);
    } catch (emailErr) {
      console.error("Failed to send welcome email:", emailErr);
    }

    /* -------------------------------------------------
     * 4. Response
     * ------------------------------------------------- */
    return new Response(
      JSON.stringify({
        id: leadData.id,
        scheduling_url: schedulingUrl,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[astro] Error creating submission:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
