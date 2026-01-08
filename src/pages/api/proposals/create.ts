import type { APIRoute } from "astro";
import { randomUUID, randomBytes } from "node:crypto";

import { supabase } from "../submissions/server";
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const { lead_id } = body;
    const passCodeCreated = randomBytes(3).toString("hex").toUpperCase();

    const { data, error } = await supabase
      .from("proposals")
      .insert({
        proposal_id: randomUUID(),
        passcode: passCodeCreated,
        stage: "draft",
        summary_items: DEFAULT_SUMMARY_ITEMS ?? [],
        sections: DEFAULT_SECTIONS ?? [],
        scopes: DEFAULT_SCOPES ?? [],
        deliverables: DEFAULT_DELIVERABLES ?? [],
        dependencies: DEFAULT_DEPENDECIES ?? [],
        milestones: DEFAULT_MILESTONES ?? [],
        initial_total_investment: DEFAULT_TOTAL_INVESTMENT ?? null,
        cost_breakdown: DEFAULT_COST_BREACKDOWN ?? [],
        payment_milestones: DEFAULT_PAYMENT_MILESTONES ?? [],
        assumptions: DEFAULT_ASSUMPTIONS ?? [],
        team: DEFAULT_TEAM ?? [],
        stack_section: DEFAULT_STACK ?? [],
        why_this_stack: DEFAULT_WHY_THIS_STACK,
        total_duration: "16 weeks",
        lead_id: lead_id,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ data }), { status: 201 });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }
};

export const createProposal = async ({
  lead_id,
  creator_email,
}: {
  lead_id: string;
  creator_email: string;
}) => {
  const passCodeCreated = randomBytes(3).toString("hex").toUpperCase();

  try {
    const { data, error } = await supabase
      .from("proposals")
      .insert({
        proposal_id: randomUUID(),
        passcode: passCodeCreated,
        stage: "draft",
        summary_items: DEFAULT_SUMMARY_ITEMS ?? [],
        sections: DEFAULT_SECTIONS ?? [],
        scopes: DEFAULT_SCOPES ?? [],
        deliverables: DEFAULT_DELIVERABLES ?? [],
        dependencies: DEFAULT_DEPENDECIES ?? [],
        milestones: DEFAULT_MILESTONES ?? [],
        initial_total_investment: DEFAULT_TOTAL_INVESTMENT ?? null,
        cost_breakdown: DEFAULT_COST_BREACKDOWN ?? [],
        payment_milestones: DEFAULT_PAYMENT_MILESTONES ?? [],
        assumptions: DEFAULT_ASSUMPTIONS ?? [],
        team: DEFAULT_TEAM ?? [],
        stack_section: DEFAULT_STACK ?? [],
        why_this_stack: DEFAULT_WHY_THIS_STACK,
        total_duration: "16 weeks",
        lead_id: lead_id,
        creator_email: creator_email,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return data;
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }
};
