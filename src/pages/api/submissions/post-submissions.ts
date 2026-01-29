import type { APIRoute } from "astro";
import { randomUUID } from "node:crypto";
import { sendWelcomeMail } from "../emails/emails";
import { createProposal } from "../proposals/create";
import { prisma } from "../../../lib/prisma/client";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body.selectedTime?.start || !body.selectedTime?.end) {
      return new Response(
        JSON.stringify({ error: "Missing selectedTime.start or end" }),
        { status: 400 },
      );
    }

    const startDate = new Date(body.selectedTime.start);

    /* -------------------------------------------------
     * 1. Create booking on Cal.com
     * ------------------------------------------------- */

    const bookingPayload = {
      eventTypeId: 4270041,
      start: body.selectedTime.start,
      attendee: {
        name: body.name,
        email: body.email,
        timeZone: "America/Toronto",
        language: "en",
      },
      metadata: {},
    };

    /* const bookingRes = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.CAL_KEY}`,
        "cal-api-version": "2024-08-13",
      },
      body: JSON.stringify(bookingPayload),
    });

    const bookingData = await bookingRes.json();
     const schedulingUrl =
      bookingData?.data?.meetingUrl ?? body.scheduling_url;  */
    const schedulingUrl =
      "https://cal.com/kabir-malkani-glnivq/15min";

    const leadId = randomUUID();

    const lead = await prisma.leads.create({
      data: {
        lead_id: leadId,
        first_name: body.name,
        email: body.email,
        company: body.companyName,
        industry: body.industry,
        budget_min: body.monthlybudget?.min,
        budget_max: body.monthlybudget?.max,
        estimateTime_min: body.estimateTimeline?.min,
        estimateTime_max: body.estimateTimeline?.max,
        description: body.productIdea,
        formatted_date: startDate,
        scheduling_url: schedulingUrl,
        booking_status: "confirmed",
        email_sent: false,
      },
    });

    console.log("lead", lead);

    const proposalData = await createProposal({
      lead_id: lead?.lead_id,
      creator_email: lead.email,
    });

    try {
      await sendWelcomeMail({
        email: body.email,
        name: body.name,
        leadId: lead.lead_id,
        schedulingUrl,
        proposalLink: `http://localhost:4321/proposal?mode=features&passcode=${proposalData.passcode}`,
      });

      await prisma.lead.update({
        where: { lead_id: lead.lead_id },
        data: {
          email_sent: true,
          email_sent_at: new Date(),
        },
      });
    } catch (emailErr) {
      console.error("Failed to send welcome email:", emailErr);
    }

    /* -------------------------------------------------
     * 5. Response
     * ------------------------------------------------- */

    return new Response(
      JSON.stringify({
        id: lead?.lead_id,
        scheduling_url: schedulingUrl,
      }),
      { status: 200 },
    );
  } catch (err: any) {
    console.error("[astro] Error creating submission:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
