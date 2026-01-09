import type { APIRoute } from "astro";
import { supabase } from "../submissions/server";

export const GET: APIRoute = async ({ url }) => {
  try {
    const passcode = url.searchParams.get("passcode");

    if (!passcode) {
      return new Response(
        JSON.stringify({ error: "Missing passcode parameter" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("proposals")
      .select("*")
      .eq("passcode", passcode)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    console.error(err);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
