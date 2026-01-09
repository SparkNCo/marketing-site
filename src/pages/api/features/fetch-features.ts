import type { APIRoute } from "astro";
import { supabase } from "../submissions/server";

export const GET: APIRoute = async ({ url }) => {
  try {
    const submission_id = url.searchParams.get("submission_id");

    if (!submission_id) {
      return new Response(
        JSON.stringify({ error: "submission_id is required" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("requirements")
      .select("*")
      .eq("submission_id", submission_id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[fetch-features] Supabase error:", error);
      throw error;
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[fetch-features] Error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch features" }), {
      status: 500,
    });
  }
};
