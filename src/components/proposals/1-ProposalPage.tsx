"use client";

import { useEffect, useState } from "react";
import CtaProposal from "./ctaProposal";
import CreateProposalCta from "./TestCreateProposal";
import { DraftPlate } from "./DraftPlate";
import ProposalSection from "./proposalSection/ProposalSection";
import { useRef } from "react";

export default function ProposalPage({ proposal, dbUser }) {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [firstLoad, setFirstLoad] = useState<any>(true);
  const [localProposal, setLocalProposal] = useState<any>(null);
  const [sections, setSections] = useState<any>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>(
    {},
  ); /* ---------------- KEY MAP ---------------- */
  const keyMap: Record<string, string> = {
    "Executive Summary": "summary",
    "Problem & Context": "problem_and_context",
    "Solution Overview": "solution_overview",

    "Objectives & Success Criteria": "objectives_and_success_criteria",

    Deliverables: "deliverables",

    "Assumptions & Dependencies": "assumptions_and_dependencies",

    "Timeline & Milestones": "timeline_and_milestones",

    "Team & Communication": "team_and_communication",

    "Technology & Architecture": "tecnologhy_and_architecture",

    "Change Management Process": "change_management_process",

    "Pricing & Commercial Terms": "pricing_and_commercial",

    "Risk & Responsibility Boundaries": "risk_and_responsabilities",

    "Next Steps": "next_steps",

    Disclaimer: "disclaimer",

    AssuranceAndQuality: "assurance_and_quality",

    HistoryAndCaseStudies: "history_and_case_studies",
  };

  /* ---------------- INIT LOCAL ---------------- */
  useEffect(() => {
    console.log(proposal);

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

        "Executive Summary": localProposal?.summary,

        "Problem & Context": localProposal?.problem_and_context,

        "Solution Overview": localProposal?.solution_overview,

        "Objectives & Success Criteria":
          localProposal?.objectives_and_success_criteria,

        Deliverables: localProposal?.deliverables,

        "Assumptions & Dependencies":
          localProposal?.assumptions_and_dependencies,

        "Timeline & Milestones": localProposal?.timeline_and_milestones,

        "Team & Communication": localProposal?.team_and_communication,

        "Technology & Architecture": localProposal?.technology_and_architecture,

        "Change Management Process": localProposal?.change_management_process,

        "Pricing & Commercial Terms": localProposal?.pricing_and_commercial,

        "Risk & Responsibility Boundaries":
          localProposal?.risk_and_responsabilities,

        "Next Steps": localProposal?.next_steps,

        Disclaimer: localProposal?.disclaimer,

        AssuranceAndQuality: localProposal?.assurance_and_quality,

        HistoryAndCaseStudies: localProposal?.history_and_case_studies,
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

    setOpenSections((prev) => {
      if (prev.includes(key)) return prev;
      return [...prev, key];
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
      <div className="w-80 pr-6 hidden lg:block text-foreground">
        <div className="sticky top-32 space-y-4 text-sm">
          <div className="flex items-center gap-2 font-semibold text-foreground">
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
      <div className="flex-1  bg-foreground">
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
          <CreateProposalCta
            submissionId={proposal.passcode}
            dbUser={dbUser}
            sections={sections}
            localProposal={localProposal}
          />
        )}
        {dbUser?.role === "admin" && (
          <DraftPlate proposal={localProposal} setStage={setStage} />
        )}
      </div>
    </div>
  );
}
