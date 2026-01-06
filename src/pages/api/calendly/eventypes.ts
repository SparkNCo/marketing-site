import type { APIRoute } from "astro";

const CAL_BASE = "https://api.cal.com/v1";
const CAL_USERNAME = "kabir-malkani-glnivq"; // replace with your username

export const GET: APIRoute = async () => {
  try {
    const url =
      `${CAL_BASE}/event-types?` +
      new URLSearchParams({
        apiKey: import.meta.env.CAL_KEY,
        username: CAL_USERNAME,
      }).toString();

    const res = await fetch(url);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to fetch event types: ${errText}`);
    }

    const data = await res.json();

    // Map to a simple format for frontend
    const events = data.event_types.map((event: any) => ({
      id: event.id,
      slug: event.slug,
      title: event.title,
      length: event.length,
      scheduling_url: event.link, // booking link
    }));

    console.log(events);

    return new Response(JSON.stringify({ events }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("🔥 Cal.com event types error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
