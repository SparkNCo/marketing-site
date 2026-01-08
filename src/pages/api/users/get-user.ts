import type { APIRoute } from "astro";
import { supabase } from "../submissions/server";

export const GET: APIRoute = async ({ url }) => {
  try {
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Missing email parameter" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ user: data }), {
      status: 200,
    });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
