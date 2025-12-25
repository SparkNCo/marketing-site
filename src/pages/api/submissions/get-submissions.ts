// src/pages/api/submissions/get-submissions.ts
import type { APIRoute } from "astro";
import { supabase } from "./server";

export const GET: APIRoute = async () => {
  console.log("hola");
  try {
    const { data, error } = await supabase.from("leads").select("*");

    if (error) {
      console.error("Error fetching submissions:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch submissions" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
};
