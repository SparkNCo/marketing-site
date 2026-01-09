import type { APIRoute } from "astro";
import { randomUUID } from "node:crypto";
import { supabase } from "../submissions/server";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const { submission_id, features } = body;

    if (!Array.isArray(features)) {
      return new Response(
        JSON.stringify({ error: "features must be an array" }),
        { status: 400 }
      );
    }
    const rows = features.map((item: any) => ({
      proposal_id: randomUUID(),
      submission_id,
      integration_text: item.integrations,
      description: item.description,
      purpose: item.purpose,
      tech_contraints: item.tech_constraints,
      feature_name: item.title,
    }));

    const { data, error } = await supabase
      .from("requirements")
      .insert(rows)
      .select();

    if (error) throw error;

    console.log("data", data);

    return new Response(JSON.stringify({ inserted: data.length }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[astro] Error creating proposals:", error);

    return new Response(
      JSON.stringify({ error: "Failed to create proposals" }),
      { status: 500 }
    );
  }
};
