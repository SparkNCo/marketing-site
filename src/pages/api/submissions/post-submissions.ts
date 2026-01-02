import type { APIRoute } from "astro";
import { randomUUID } from "node:crypto";
import { supabase } from "./server";
import { sendWelcomeMail } from "../emails/emails";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log("Received submission:", body);

    const formattedDate = new Date(`${body.selectedDate} ${body.selectedTime}`);

    const { data, error } = await supabase
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
        formatted_date: formattedDate.toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    sendWelcomeMail({
      email: body.email,
      name: body.name,
      leadId: data.id,
    }).catch((err) => {
      console.error("Failed to send welcome email:", err);
    });

    return new Response(JSON.stringify({ id: data.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[astro] Error creating submission:", error);

    return new Response(
      JSON.stringify({ error: "Failed to create submission" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
