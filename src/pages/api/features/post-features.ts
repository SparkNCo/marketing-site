import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma/client";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      proposal_id,
      submission_id,
      features,
      discovery_state,
      estimateTime_min,
      estimateTime_max,
      budget_min,
      budget_max,
      description,
      lead_id,
    } = body;

    if (!proposal_id) {
      return new Response(
        JSON.stringify({ error: "proposal_id is required" }),
        { status: 400 },
      );
    }

    if (!Array.isArray(features)) {
      return new Response(
        JSON.stringify({ error: "features must be an array" }),
        { status: 400 },
      );
    }

    const data = await prisma.requirements.createMany({
      data: features.map((item: any) => ({
        proposal_id,
        submission_id,
        feature_name: item.title ?? null,
        integration_text: item.integrations ?? null,
        description: item.description ?? null,
        purpose: item.purpose ?? null,
        tech_constraints: item.tech_constraints ?? null,
      })),
      skipDuplicates: true,
    });
    if (lead_id && discovery_state) {
      await prisma.leads.update({
        where: { lead_id },
        data: {
          discovery_state: discovery_state,
          estimateTime_min: estimateTime_min,
          estimateTime_max: estimateTime_max,
          budget_min: budget_min,
          budget_max: budget_max,
          description: description,
        },
      });
    }

    return new Response(JSON.stringify({ inserted: data.count }), {
      status: 200,
    });
  } catch (error) {
    console.error("[createRequirements] Prisma error:", error);

    return new Response(
      JSON.stringify({ error: "Failed to create requirements" }),
      { status: 500 },
    );
  }
};
