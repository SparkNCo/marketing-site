"use client";

import { useEffect, useState } from "react";
import CtaProposal from "./ctaProposal";
import CreateProposalCta from "./TestCreateProposal";
import { DraftPlate } from "./DraftPlate";
import ProposalSection from "./proposalSection/ProposalSection";
import { useRef } from "react";

export default function ProposalPage({ proposal, dbUser }) {
  const [firstLoad, setFirstLoad] = useState<any>(true);
  const [localProposal, setLocalProposal] = useState<any>(null);
  const [sections, setSections] = useState<any>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>(
    {},
  ); /* ---------------- KEY MAP ---------------- */
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
  const scrollToSection = (key: string) => {
    const el = sectionRefs.current[key];
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 140;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };
  const setStage = (stage: string) => {
    setLocalProposal((prev: any) => ({
      ...prev,
      stage,
    }));
  };

  if (!localProposal) return null;
  return (
    <div className="flex mt-32 w-full ">
      {/* Sidebar */}

      <div className="w-80 pr-6 hidden lg:block text-foreground">
        <div className="sticky top-32 space-y-4 text-sm">
          {/* Title */}
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="text-primary">☰</span>
            <span>Table of Contents</span>
          </div>

          {/* Links */}
          <div className="space-y-2">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className="flex items-center gap-2 text-left w-full text-muted-foreground hover:text-primary"
              >
                <span className="text-primary">•</span>
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ">
        {dbUser?.role === "admin" && (
          <DraftPlate proposal={localProposal} setStage={setStage} />
        )}

        {Object.entries(sections).map(([sectionKey, sectionData]) => (
          <div
            key={sectionKey}
            ref={(el) => (sectionRefs.current[sectionKey] = el)}
            className="scroll-mt-40 "
          >
            <ProposalSection
              title={sectionKey}
              data={sectionData}
              dbUser={dbUser}
              setProposal={(val) => handleUpdate(sectionKey, val)}
            />
          </div>
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
    </div>
  );
}
