import type { APIRoute } from "astro";
import { supabaseFunctionsUrl } from "../../../lib/supabaseFunctionsUrl";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const res = await fetch(supabaseFunctionsUrl("architect-prefill"), {
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
    console.error("[architect/prefill] error:", err);
    return new Response(
      JSON.stringify({
        error: "Could not analyze that idea. You can fill the form manually.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
