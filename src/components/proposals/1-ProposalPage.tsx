"use client";

import { useEffect, useState } from "react";
import ProposalSection from "./1-ProposalAiGenerated";
import CtaProposal from "./ctaProposal";
import CreateProposalCta from "./TestCreateProposal";
import { DraftPlate } from "./DraftPlate";

export default function ProposalPage({ proposal, dbUser }) {
  const [firstLoad, setFirstLoad] = useState<any>(true);
  const [localProposal, setLocalProposal] = useState<any>(null);
  const [sections, setSections] = useState<any>({});

  /* ---------------- KEY MAP ---------------- */
  const keyMap: Record<string, string> = {
    "Executive Summary": "executive_summary",
    "Problem & Context": "problem_context",
    "Solution Overview": "solution_overview",
    "Acceptance & Completion Criteria": "acceptance_completion_criteria",
    "Objectives & Success Criteria": "objectives",
    "Scope of Work": "scope_of_work",
    Deliverables: "deliverables",
    "Assumptions & Dependencies": "assumptions_dependencies",
    "Client Responsibilities": "client_responsibilities",
    "Team & Communication": "team_communication",
    "Technology & Architecture": "technology_architecture",
    "Change Management Process": "change_management",
    "Pricing & Commercial Terms": "pricing_commercial_terms",
    "Risk & Responsibility Boundaries": "risk_responsibility_boundaries",
    "Next Steps": "next_steps",
    Signatures: "signatures",
  };

  /* ---------------- INIT LOCAL ---------------- */
  useEffect(() => {
    if (proposal) {
      setLocalProposal(proposal);
    }
  }, [proposal]);

  /* ---------------- BUILD SECTIONS FROM LOCAL ---------------- */
  useEffect(() => {
    if (localProposal && firstLoad) {
      setSections({
        "Cover Page": {
          "Client Name": localProposal?.client_name,
          "Provider Name": localProposal?.provider_name,
          "Proposal Title": localProposal?.proposal_title,
          Date: localProposal?.proposal_date,
          "Proposal Valid Until": localProposal?.valid_until,
        },

        "Executive Summary": localProposal?.executive_summary,
        "Problem & Context": localProposal?.problem_context,
        "Solution Overview": localProposal?.solution_overview,
        "Acceptance & Completion Criteria":
          localProposal?.acceptance_completion_criteria,

        "Objectives & Success Criteria": localProposal?.objectives,
        "Scope of Work": localProposal?.scope_of_work,
        Deliverables: localProposal?.deliverables,
        "Assumptions & Dependencies": localProposal?.assumptions_dependencies,
        "Client Responsibilities": localProposal?.client_responsibilities,

        "Timeline & Milestones": {
          "Total Duration": localProposal?.total_duration,
          Milestones: localProposal?.timeline_milestones,
        },

        "Team & Communication": localProposal?.team_communication,
        "Technology & Architecture": localProposal?.technology_architecture,
        "Change Management Process": localProposal?.change_management,
        "Pricing & Commercial Terms": localProposal?.pricing_commercial_terms,
        "Risk & Responsibility Boundaries":
          localProposal?.risk_responsibility_boundaries,
        "Next Steps": localProposal?.next_steps,
        Signatures: localProposal?.signatures,
      });
      setFirstLoad(false);
    }
  }, [localProposal]);

  const handleUpdate = (sectionKey: string, value: any) => {
    console.log("Updated:", sectionKey, value);
    setSections((prev: any) => ({
      ...prev,
      [sectionKey]: value,
    }));

    const dbKey = keyMap[sectionKey];
    if (!dbKey) return;

    setLocalProposal((prev: any) => ({
      ...prev,
      [dbKey]: value,
    }));
  };

  const setStage = (stage: string) => {
    setLocalProposal((prev: any) => ({
      ...prev,
      stage,
    }));
  };

  if (!localProposal) return null;

  return (
    <div className="flex flex-col items-center mt-32">


      {dbUser?.role === "admin" && (
        <DraftPlate proposal={localProposal} setStage={setStage} />
      )}

      {Object.entries(sections).map(([sectionKey, sectionData]) => (
        <ProposalSection
          key={sectionKey}
          title={sectionKey}
          data={sectionData}
          dbUser={dbUser}
          setProposal={(val) => handleUpdate(sectionKey, val)}
        />
      ))}

      <CtaProposal
        proposalId={proposal.passcode}
        signature_url={proposal.signature_url}
      />

      {dbUser?.role === "admin" && (
        <CreateProposalCta
          submissionId={proposal.passcode}
          dbUser={dbUser}
          sections={sections}
          localProposal={localProposal}
        />
      )}

    </div>
  );
}
