import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma/client";

export const GET: APIRoute = async ({ url }) => {
  try {
    const submission_id = url.searchParams.get("submission_id");

    if (!submission_id) {
      return new Response(
        JSON.stringify({ error: "submission_id is required" }),
        {
          status: 400,
        },
      );
    }

    const requirements = await prisma.requirements.findMany({
      where: {
        submission_id: submission_id,
      },
      orderBy: {
        created_at: "asc",
      },
      select: {
        id: true,
        proposal_id: true,
        submission_id: true,
        feature_name: true,
        description: true,
        purpose: true,
        integration_text: true,
        tech_constraints: true,
        created_at: true,
      },
    });

    return new Response(JSON.stringify(requirements), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[fetch-features] Prisma error:", err);

    return new Response(JSON.stringify({ error: "Failed to fetch features" }), {
      status: 500,
    });
  }
};
