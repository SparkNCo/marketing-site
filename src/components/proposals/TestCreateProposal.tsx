"use client";

import { Card } from "../ui/card";
import { useMutation } from "@tanstack/react-query";
import { Menu, Save } from "lucide-react";
import ProposalButton from "../ui/ProposalButton";

type Props = {
  submissionId: string;
  sections: any;
  localProposal: any;
};

export default function CreateProposalCta({
  submissionId,
  sections,
  localProposal,
}: Props) {
  const buildSectionUpdates = () => {
    return {
      client_name: sections?.["Cover Page"]?.["Client Name"],
      provider_name: sections?.["Cover Page"]?.["Provider Name"],
      proposal_title: sections?.["Cover Page"]?.["Proposal Title"],
      proposal_date: sections?.["Cover Page"]?.Date,
      valid_until: sections?.["Cover Page"]?.["Proposal Valid Until"],

      executive_summary: sections?.["Executive Summary"],
      problem_context: sections?.["Problem & Context"],
      solution_overview: sections?.["Solution Overview"],
      acceptance_completion_criteria:
        sections?.["Acceptance & Completion Criteria"],

      objectives: sections?.["Objectives & Success Criteria"],
      scope_of_work: sections?.["Scope of Work"],
      deliverables: sections?.Deliverables,
      assumptions_dependencies: sections?.["Assumptions & Dependencies"],
      client_responsibilities: sections?.["Client Responsibilities"],

      total_duration: sections?.["Timeline & Milestones"]?.["Total Duration"],
      timeline_milestones: sections?.["Timeline & Milestones"]?.Milestones,

      team_communication: sections?.["Team & Communication"],
      technology_architecture: sections?.["Technology & Architecture"],
      change_management: sections?.["Change Management Process"],
      pricing_commercial_terms: sections?.["Pricing & Commercial Terms"],
      risk_responsibility_boundaries:
        sections?.["Risk & Responsibility Boundaries"],
      next_steps: sections?.["Next Steps"],
      signatures: sections?.Signatures,
    };
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const sectionUpdates = buildSectionUpdates();

      const updates = {
        ...sectionUpdates,
        stage: localProposal?.stage,
        signature_url: localProposal?.signature_url,
        signed_at: localProposal?.signed_at,
      };

      const res = await fetch(`${import.meta.env.PUBLIC_ENDPOINT}/proposals`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passcode: submissionId,
          updates,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save proposal");
      }

      return res.json();
    },
  });

  return (
    <section className="mb-16 w-[80vw] mx-auto">
      <Card className="p-8 bg-background text-foreground border-none">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Menu className="w-5 h-5" />
          <h2 className="text-2xl font-bold">Build</h2>
        </div>

        {/* Description */}
        <p className="mb-6 max-w-2xl">
          Save your latest proposal edits before sharing it with the client or
          proceeding to the next step.
        </p>

        {/* Button */}
        <div className="flex w-full">
          <ProposalButton
            icon={
              mutation.isPending ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Save className="w-5 h-5" />
              )
            }
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            variant="primary"
          >
            {mutation.isPending ? "Saving…" : "Save Changes"}
          </ProposalButton>
        </div>

        {mutation.isError && (
          <p className="mt-4 text-sm text-red-500">
            {(mutation.error as Error).message ||
              "Could not save proposal. Please try again."
            }
          </p>
        )}

        {mutation.isSuccess && (
          <p className="mt-4 text-sm text-green-500">
            Proposal saved successfully
          </p>
        )}
      </Card>
    </section>
  );
}