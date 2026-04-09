import type { APIRoute } from "astro";

const CAL_BASE = "https://api.cal.com/v2";
const CAL_USERNAME = "kabir-malkani-glnivq";

export const GET: APIRoute = async () => {
  try {
    const url =
      `${CAL_BASE}/event-types?` +
      new URLSearchParams({ username: CAL_USERNAME }).toString();

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.CAL_KEY}`,
        "cal-api-version": "2024-06-14",
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to fetch event types: ${errText}`);
    }

    const json = await res.json();

    const events = (json.data ?? []).map((event: any) => ({
      id: event.id,
      slug: event.slug,
      title: event.title,
      length: event.lengthInMinutes ?? event.length,
      scheduling_url: event.bookingLink ?? event.link,
    }));

    return new Response(JSON.stringify({ events }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Cal.com event types error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
