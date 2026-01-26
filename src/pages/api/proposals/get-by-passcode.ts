import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma/client";

export const GET: APIRoute = async ({ url }) => {
  try {
    const passcode = url.searchParams.get("passcode");

    if (!passcode) {
      return new Response(
        JSON.stringify({ error: "Missing passcode parameter" }),
        { status: 400 },
      );
    }
    const proposal = await prisma.proposals.findFirst({
      where: { passcode },
      select: {
        proposal_id: true,
        lead_id: true,
        creator_email: true,
        passcode: true,
        stage: true,
        total_duration: true,
        why_this_stack: true,
        created_at: true,
        updated_at: true,
        signed_at: true,
        scopes: true,
        deliverables: true,
        dependencies: true,
        payment_milestones: true,
        cost_breakdown: true,
        assumptions: true,
        team: true,
        stack_section: true,
        summary_items: true,
        milestones: true,
        sections: true,
        initial_total_investment: true,
      },
    });

    if (!proposal) {
      return new Response(JSON.stringify({ error: "Proposal not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ data: proposal }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[GET /proposals] Prisma error:", err);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
