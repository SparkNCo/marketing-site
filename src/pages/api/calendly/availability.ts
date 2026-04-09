import type { APIRoute } from "astro";

const CAL_BASE = "https://api.cal.com/v2";

export const GET: APIRoute = async ({ request }) => {
  try {
    const { searchParams } = new URL(request.url);

    const eventSlug = searchParams.get("eventSlug");
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    if (!eventSlug || !start || !end) {
      return new Response(
        JSON.stringify({
          error: "Missing eventSlug, start or end",
        }),
        { status: 400 },
      );
    }

    const url =
      `${CAL_BASE}/slots?` +
      new URLSearchParams({
        start,
        end,
        eventTypeSlug: eventSlug,
        username: import.meta.env.CAL_USERNAME,
      }).toString();

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.CAL_KEY}`,
        "cal-api-version": "2024-09-04",
      },
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const json = await res.json();
    const rawSlots: Record<string, { start: string }[]> = json.data ?? {};

    const days: Record<
      string,
      { start: string; end: string; available: boolean }[]
    > = {};

    for (const [day, slots] of Object.entries(rawSlots)) {
      days[day] = slots.map((slot) => {
        const startTime = new Date(slot.start);
        const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

        return {
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          available: true,
        };
      });
    }

    return new Response(
      JSON.stringify({
        eventSlug,
        timezone: "America/Toronto",
        days,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err: any) {
    console.error("Cal availability error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
