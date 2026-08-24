import type { APIRoute } from "astro";
import { supabaseFunctionsUrl } from "../../../lib/supabaseFunctionsUrl";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const res = await fetch(supabaseFunctionsUrl("architect-send-report"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: import.meta.env.PUBLIC_SUPABASE_KEY,
        Authorization: `Bearer ${import.meta.env.PUBLIC_SUPABASE_KEY}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[architect/send-report] error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong sending your report." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
