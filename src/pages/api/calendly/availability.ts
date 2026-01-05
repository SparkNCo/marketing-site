import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  console.log("🟢 /api/calendly/availability called");

  try {
    const { searchParams } = new URL(request.url);

    const start = searchParams.get("start");
    const end = searchParams.get("end");

    console.log("📅 Params:", { start, end });

    if (!start || !end) {
      console.error("❌ Missing start or end");
      return new Response(JSON.stringify({ error: "Missing start or end" }), {
        status: 400,
      });
    }

    /* -------------------------------------------------
     * 1. Get current user
     * ------------------------------------------------- */
    console.log("👤 Fetching Calendly user (/users/me)");

    const meRes = await fetch("https://api.calendly.com/users/me", {
      headers: {
        Authorization: `Bearer ${import.meta.env.CALENDLY_TOKEN}`,
        Accept: "application/json",
      },
    });

    console.log("👤 /users/me status:", meRes.status);

    if (!meRes.ok) {
      const text = await meRes.text();
      console.error("❌ /users/me failed:", text);
      throw new Error("Failed to fetch Calendly user");
    }

    const me = await meRes.json();
    const userUri = me.resource.uri;

    console.log("👤 User URI:", userUri);
    console.log("👤 Scheduling URL:", me.scheduling_url);

    /* -------------------------------------------------
     * 2. Get event types for user
     * ------------------------------------------------- */
    console.log("📋 Fetching event types");

    const eventTypesUrl =
      `https://api.calendly.com/event_types?user=` +
      encodeURIComponent(userUri);

    console.log("📋 Event types URL:", eventTypesUrl);

    const eventTypesRes = await fetch(eventTypesUrl, {
      headers: {
        Authorization: `Bearer ${import.meta.env.CALENDLY_TOKEN}`,
        Accept: "application/json",
      },
    });

    console.log("📋 Event types status:", eventTypesRes.status);

    if (!eventTypesRes.ok) {
      const text = await eventTypesRes.text();
      console.error("❌ Event types failed:", text);
      throw new Error("Failed to fetch event types");
    }

    const eventTypes = await eventTypesRes.json();

    console.log("📋 Event types found:", eventTypes.collection?.length);

    if (!eventTypes.collection?.length) {
      console.error("❌ No event types returned");
      return new Response(JSON.stringify({ error: "No event types found" }), {
        status: 404,
      });
    }

    /* -------------------------------------------------
     * 3. Pick first event type
     * ------------------------------------------------- */
    const eventType = eventTypes.collection[0];
    const eventTypeUri = eventType.uri;

    console.log("📌 Using event type:", {
      name: eventType.name,
      slug: eventType.slug,
      uri: eventTypeUri,
      duration: eventType.duration,
    });

    /* -------------------------------------------------
     * 4. Get available times
     * ------------------------------------------------- */

    const startDate = new Date(start);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    const availabilityUrl =
      "https://api.calendly.com/event_type_available_times?" +
      new URLSearchParams({
        event_type: eventTypeUri,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
      }).toString();

    console.log("⏱ Fetching availability:", availabilityUrl);

    const availabilityRes = await fetch(availabilityUrl, {
      headers: {
        Authorization: `Bearer ${import.meta.env.CALENDLY_TOKEN}`,
        Accept: "application/json",
      },
    });

    console.log("⏱ Availability status:", availabilityRes);

    if (!availabilityRes.ok) {
      const text = await availabilityRes.text();
      console.error("❌ Availability failed:", text);
      throw new Error("Failed to fetch availability");
    }

    const availability = await availabilityRes.json();

    console.log("✅ Available slots:", availability.collection?.length);

    /* -------------------------------------------------
     * 5. Return available slots
     * ------------------------------------------------- */
    return new Response(JSON.stringify(availability), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("🔥 API error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
