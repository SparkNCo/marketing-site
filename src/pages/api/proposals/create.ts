import { randomUUID, randomBytes } from "node:crypto";
import {
  DEFAULT_ASSUMPTIONS,
  DEFAULT_COST_BREACKDOWN,
  DEFAULT_DELIVERABLES,
  DEFAULT_DEPENDECIES,
  DEFAULT_MILESTONES,
  DEFAULT_PAYMENT_MILESTONES,
  DEFAULT_SCOPES,
  DEFAULT_SECTIONS,
  DEFAULT_STACK,
  DEFAULT_SUMMARY_ITEMS,
  DEFAULT_TEAM,
  DEFAULT_TOTAL_INVESTMENT,
  DEFAULT_WHY_THIS_STACK,
} from "./DefaultValues";
import { prisma } from "../../../lib/prisma/client";


export const createProposal = async ({
  lead_id,
  creator_email,
}: {
  lead_id: string;
  creator_email: string;
}) => {
  const passcode = randomBytes(3).toString("hex").toUpperCase();
  const proposalId = randomUUID();

  try {
    const proposal = await prisma.proposals.create({
      data: {
        proposal_id: proposalId,
        lead_id,
        creator_email,
        passcode,
        stage: "draft",
        total_duration: "16 weeks",
        why_this_stack: DEFAULT_WHY_THIS_STACK ?? "To be defined",
        scopes: DEFAULT_SCOPES,
        summary_items: DEFAULT_SUMMARY_ITEMS,
        sections: DEFAULT_SECTIONS,
        deliverables: DEFAULT_DELIVERABLES,
        dependencies: DEFAULT_DEPENDECIES,
        milestones: DEFAULT_MILESTONES,
        initial_total_investment: DEFAULT_TOTAL_INVESTMENT ?? null,
        cost_breakdown: DEFAULT_COST_BREACKDOWN,
        payment_milestones: DEFAULT_PAYMENT_MILESTONES,
        assumptions: DEFAULT_ASSUMPTIONS,
        team: DEFAULT_TEAM,
        stack_section: DEFAULT_STACK,
        // optional nullable field
        signature_url: null,
      },
    });

    return proposal;
  } catch (err) {
    console.error("[createProposal] Prisma error:", err);
    throw err;
  }
};