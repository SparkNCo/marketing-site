"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";

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
      assumptions_dependencies:
        sections?.["Assumptions & Dependencies"],
      client_responsibilities:
        sections?.["Client Responsibilities"],

      total_duration:
        sections?.["Timeline & Milestones"]?.["Total Duration"],
      timeline_milestones:
        sections?.["Timeline & Milestones"]?.Milestones,

      team_communication: sections?.["Team & Communication"],
      technology_architecture:
        sections?.["Technology & Architecture"],
      change_management:
        sections?.["Change Management Process"],
      pricing_commercial_terms:
        sections?.["Pricing & Commercial Terms"],
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

      const res = await fetch(
        "http://127.0.0.1:54321/functions/v1/proposals",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passcode: submissionId,
            updates,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to save proposal");
      }

      return res.json();
    },
  });

  return (
    <section className="mb-16 w-[80vw] mx-auto">
      <Card className="p-8 bg-background border-primary border-2 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Save Proposal Changes
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            className="flex items-center gap-2 text-background font-semibold"
          >
            {mutation.isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving…
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        {mutation.isError && (
          <p className="mt-4 text-sm text-red-500">
            {(mutation.error as Error).message ||
              "Could not save proposal. Please try again."}
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
