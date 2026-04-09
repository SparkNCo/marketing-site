import type { APIRoute } from "astro";

const CAL_BASE = "https://api.cal.com/v2";

export const GET: APIRoute = async () => {
  try {
    const USERNAME = import.meta.env.CAL_USERNAME;

    if (!USERNAME) {
      return new Response(JSON.stringify({ error: "Missing CAL_USERNAME" }), {
        status: 500,
      });
    }

    const url =
      `${CAL_BASE}/event-types?` +
      new URLSearchParams({ username: USERNAME }).toString();

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.CAL_KEY}`,
        "cal-api-version": "2024-06-14",
      },
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const json = await res.json();

    const events = (json.data ?? [])
      .filter((event: any) => !event.hidden)
      .map((event: any) => ({
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
    console.error("/api/calendly/events error:", err.message);
    return new Response(
      JSON.stringify({ error: "Failed to load event types" }),
      { status: 500 }
    );
  }
};
