import type { APIRoute } from "astro";
import { supabase } from "../submissions/server";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { id, email, role } = body;

    if (!id || !email) {
      return new Response(
        JSON.stringify({ error: "Missing user id or email" }),
        { status: 400 }
      );
    }

    const { error } = await supabase.from("users").insert({
      id,
      email,
      role: role ?? "user",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }
};
