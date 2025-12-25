import type { APIRoute } from "astro";
import { randomUUID } from "node:crypto";
import { supabase } from "./server";

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
        budget_min: body.budget.min,
        budget_max: body.budget.max,
        description: body.productIdea,
        formatted_date: formattedDate.toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

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

export const GET: APIRoute = async () => {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*") // get all columns
      .order("formatted_date", { ascending: true }); 

    if (error) throw error;

    return new Response(JSON.stringify(data || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[astro] Error fetching submissions:", err);

    return new Response(
      JSON.stringify({ error: "Failed to fetch submissions" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
