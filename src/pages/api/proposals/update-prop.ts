import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma/client";

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { passcode, updates } = body;

    if (!passcode || !updates || typeof updates !== "object") {
      return new Response(
        JSON.stringify({
          error: "passcode and updates object are required",
        }),
        { status: 400 }
      );
    }

    const updatedProposal = await prisma.proposals.updateMany({
      where: { passcode },
      data: {
        ...updates,
        updated_at: new Date(),
      },
    });

    if (updatedProposal.count === 0) {
      return new Response(
        JSON.stringify({ error: "Proposal not found" }),
        { status: 404 }
      );
    }

    // Fetch the updated record to return
    const proposal = await prisma.proposals.findFirst({
      where: { passcode },
    });

    return new Response(JSON.stringify({ data: proposal }), { status: 200 });
  } catch (err) {
    console.error("[PATCH /proposals] Prisma error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected server error" }),
      { status: 500 }
    );
  }
};
