import type { APIRoute } from "astro";

const CAL_BASE = "https://api.cal.com/v1";

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
        { status: 400 }
      );
    }

    const USERNAME = "kabir-malkani-glnivq";

    /* --------------------------------------------
     * Fetch availability from Cal.com
     * -------------------------------------------- */
    const url =
      `${CAL_BASE}/availability?` +
      new URLSearchParams({
        apiKey: import.meta.env.CAL_KEY,
        username: USERNAME,
        eventTypeSlug: eventSlug,
        dateFrom: start,
        dateTo: end,
      }).toString();

    const res = await fetch(url);
    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();

    /* --------------------------------------------
     * Convert dateRanges to 15-min slots
     * -------------------------------------------- */
    const days: Record<
      string,
      { start: string; end: string; available: boolean }[]
    > = {};

    data.dateRanges.forEach((range: any) => {
      const rangeStart = new Date(range.start);
      const rangeEnd = new Date(range.end);

      let slotStart = new Date(rangeStart);

      while (slotStart < rangeEnd) {
        const slotEnd = new Date(slotStart.getTime() + 15 * 60 * 1000);
        if (slotEnd > rangeEnd) break;

        const dayKey = slotStart.toISOString().split("T")[0];
        days[dayKey] ??= [];
        days[dayKey].push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          available: true,
        });

        slotStart = slotEnd;
      }
    });

    return new Response(
      JSON.stringify({
        eventSlug,
        timezone: data.timeZone,
        days,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("🔥 Cal availability error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
