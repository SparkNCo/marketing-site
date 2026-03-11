"use client";

import { useEffect, useState, useRef } from "react";
import CtaProposal from "./ctaProposal";
import { DraftPlate } from "./DraftPlate";
import ProposalSection from "./proposalSection/ProposalSection";

export default function ProposalPage({ proposal, dbUser }) {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [localProposal, setLocalProposal] = useState<any>(proposal);
  const [sections, setSections] = useState<any>(() =>
    buildSectionsFromProposal(proposal),
  );

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /* ---------------- KEY MAP ---------------- */

  const keyMap: Record<string, string> = {
    "Executive Summary": "summary",
    "Problem & Context": "problem_and_context",
    "Solution Overview": "solution_overview",
    "Objectives & Success Criteria": "objectives_and_success_criteria",
    Deliverables: "deliverables",
    "Assumptions & Dependencies": "assumptions_and_dependencies",
    "Timeline & Milestones": "timeline_milestones",
    "Team & Communication": "team_and_communication",
    "Technology & Architecture": "technology_and_architecture",
    "Change Management Process": "change_management_process",
    "Pricing & Commercial Terms": "pricing_and_commercial",
    "Risk & Responsibility Boundaries": "risk_and_responsabilities",
    "Next Steps": "next_steps",
    Disclaimer: "disclaimer",
    AssuranceAndQuality: "assurance_and_quality",
    HistoryAndCaseStudies: "history_and_case_studies",
  };

  /* ---------------- BUILD SECTIONS ---------------- */

  function buildSectionsFromProposal(p: any) {
    if (!p) return {};

    return {
      "Cover Page": {
        "Client Name": p.client_name,
        "Provider Name": p.provider_name,
        "Proposal Title": p.proposal_title,
        Date: p.proposal_date,
        "Proposal Valid Until": p.valid_until,
      },

      "Executive Summary": p.summary,
      "Problem & Context": p.problem_and_context,
      "Solution Overview": p.solution_overview,
      "Objectives & Success Criteria": p.objectives_and_success_criteria,
      Deliverables: p.deliverables,
      "Assumptions & Dependencies": p.assumptions_and_dependencies,
      "Timeline & Milestones": p.timeline_milestones,
      "Team & Communication": p.team_and_communication,
      "Technology & Architecture": p.technology_and_architecture,
      "Change Management Process": p.change_management_process,
      "Pricing & Commercial Terms": p.pricing_and_commercial,
      "Risk & Responsibility Boundaries": p.risk_and_responsabilities,
      "Next Steps": p.next_steps,
      Disclaimer: p.disclaimer,
      AssuranceAndQuality: p.assurance_and_quality,
      HistoryAndCaseStudies: p.history_and_case_studies,
    };
  }

  /* ---------------- BUILD DB UPDATES ---------------- */

  const buildSectionUpdates = (sections: any) => ({
    lead: localProposal?.lead,
    client_name: sections?.["Cover Page"]?.["Client Name"],
    provider_name: sections?.["Cover Page"]?.["Provider Name"],
    proposal_title: sections?.["Cover Page"]?.["Proposal Title"],
    proposal_date: sections?.["Cover Page"]?.Date,
    valid_until: sections?.["Cover Page"]?.["Proposal Valid Until"],
    summary: sections?.["Executive Summary"],
    problem_and_context: sections?.["Problem & Context"],
    solution_overview: sections?.["Solution Overview"],
    objectives_and_success_criteria:
      sections?.["Objectives & Success Criteria"],
    deliverables: sections?.Deliverables,
    assumptions_and_dependencies: sections?.["Assumptions & Dependencies"],
    timeline_milestones: sections?.["Timeline & Milestones"],
    team_and_communication: sections?.["Team & Communication"],
    technology_and_architecture: sections?.["Technology & Architecture"],
    change_management_process: sections?.["Change Management Process"],
    pricing_and_commercial: sections?.["Pricing & Commercial Terms"],
    risk_and_responsabilities: sections?.["Risk & Responsibility Boundaries"],
    next_steps: sections?.["Next Steps"],
    signatures: sections?.Signatures,
  });

  /* ---------------- UPDATE SECTION ---------------- */

  const handleUpdate = async (sectionKey: string, value: any) => {
    const updatedSections = { ...sections, [sectionKey]: value };
    setSections(updatedSections);

    const dbKey = keyMap[sectionKey];

    const updatedProposal = {
      ...localProposal,
      [dbKey]: value,
    };

    setLocalProposal(updatedProposal);

    const updates = {
      ...buildSectionUpdates(updatedSections),
      stage: updatedProposal?.stage,
      signature_url: updatedProposal?.signature_url,
      signed_at: updatedProposal?.signed_at,
    };

    try {
      await fetch(`${import.meta.env.PUBLIC_ENDPOINT}/proposals`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode: proposal.passcode,
          updates,
        }),
      });
    } catch (err) {
      console.error("Failed to update proposal", err);
    }
  };

  /* ---------------- SCROLL ---------------- */

  const scrollToSection = (key: string) => {
    const el = sectionRefs.current[key];
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 140;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setOpenSections((prev) => (prev.includes(key) ? prev : [...prev, key]));
  };

  const setStage = (stage: string) => {
    setLocalProposal((prev: any) => ({ ...prev, stage }));
  };

  if (!localProposal) return null;

  return (
    <div className="flex mt-32 w-full">
      {/* Table of contents */}

      <div className="w-80 pr-6 hidden lg:block text-foreground">
        <div className="sticky top-32 space-y-4 text-sm">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-primary">☰</span>
            <span>Table of Contents</span>
          </div>

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

      <div className="flex-1 bg-foreground">
        {Object.entries(sections).map(([sectionKey, sectionData]) => (
          <div
            key={sectionKey}
            ref={(el) => (sectionRefs.current[sectionKey] = el)}
            className="scroll-mt-40"
          >
            <ProposalSection
              title={sectionKey}
              data={sectionData}
              dbUser={dbUser}
              openSections={openSections}
              setOpenSections={setOpenSections}
              setProposal={(val) => handleUpdate(sectionKey, val)}
            />
          </div>
        ))}

        <CtaProposal
          proposalId={proposal.passcode}
          signature_url={proposal.signature_url}
        />

        {dbUser?.role === "admin" && (
          <DraftPlate proposal={localProposal} setStage={setStage} />
        )}
      </div>
    </div>
  );
}
