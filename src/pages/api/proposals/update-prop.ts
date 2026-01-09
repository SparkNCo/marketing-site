import type { APIRoute } from "astro";
import { supabase } from "../submissions/server";

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const { passcode, updates } = body;
    if (!passcode || !updates || typeof updates !== "object") {
      return new Response(
        JSON.stringify({
          error: "passcode and updates object are required",
        }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("proposals")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("passcode", passcode)
      .select()
      .single();

    if (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
    });
  }
};
