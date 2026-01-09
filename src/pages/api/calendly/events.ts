import type { APIRoute } from "astro";

const CAL_BASE = "https://api.cal.com/v1";

export const GET: APIRoute = async () => {
  try {
    const USERNAME = import.meta.env.CAL_USERNAME;
    // 👆 put your cal.com username in env

    if (!USERNAME) {
      return new Response(JSON.stringify({ error: "Missing CAL_USERNAME" }), {
        status: 500,
      });
    }

    const url =
      `${CAL_BASE}/event-types?` +
      new URLSearchParams({
        apiKey: import.meta.env.CAL_KEY,
        username: USERNAME,
      }).toString();

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data = await res.json();
    console.log("data", data);

    // Only expose what frontend needs
    const events = (data.event_types || [])
      .filter((event: any) => !event.hidden)
      .map((event: any) => ({
        id: event.id,
        slug: event.slug,
        title: event.title,
        length: event.length,
        scheduling_url: event.link, // 👈 cal.com booking link
      }));

    return new Response(JSON.stringify({ events }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("🔥 /api/calendly/events error:", err.message);
    return new Response(
      JSON.stringify({ error: "Failed to load event types" }),
      { status: 500 }
    );
  }
};
