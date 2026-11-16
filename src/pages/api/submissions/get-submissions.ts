import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma/client";

export const GET: APIRoute = async () => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return new Response(JSON.stringify(leads), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching submissions:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch submissions" }),
      { status: 500 },
    );
  }
};
