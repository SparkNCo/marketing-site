import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  console.log("im here 1", `${import.meta.env.CALENDLY_KEY}`);

  const res = await fetch("https://api.calendly.com/scheduled_events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.CALENDLY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  console.log("response ", data);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
