"use client";

import { useState, useRef } from "react";
import CtaProposal from "./ctaProposal";
import { DraftPlate } from "./DraftPlate";
import ProposalSection from "./proposalSection/ProposalSection";
import ProposalDrawer from "./ProposalDrawer";
import ProposalSidebar from "./ProposalSidebar";
import Footer from "../Footer";
import DiscoveryForm from "../DiscoveryForm";

export default function ProposalPage({
  proposal,
  dbUser,
}: {
  proposal: any;
  dbUser: any;
}) {
  const [showFeatures, setShowFeatures] = useState(false);
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
        "Prepared By": p.provider_name,
        Date: p.proposal_date,
        Client: p.client_name,
        "Valid Until": p.valid_until,
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

  const updateProposal = async (updatedSections: any, stage?: string) => {
    const updates = {
      ...buildSectionUpdates(updatedSections),
      stage: stage ?? localProposal?.stage,
      signature_url: localProposal?.signature_url,
      signed_at: localProposal?.signed_at,
      meetingDate: localProposal?.lead.formatted_date,
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

  const handleUpdate = async (sectionKey: string, value: any) => {
    const updatedSections = { ...sections, [sectionKey]: value };
    setSections(updatedSections);

    const dbKey = keyMap[sectionKey];

    const updatedProposal = {
      ...localProposal,
      [dbKey]: value,
    };

    setLocalProposal(updatedProposal);

    await updateProposal(updatedSections);
  };

  /* ---------------- SCROLL ---------------- */

  const scrollToSection = (key: string) => {
    const el = sectionRefs.current[key];
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 120;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setOpenSections((prev) => (prev.includes(key) ? prev : [...prev, key]));
  };

  const setStage = (stage: string) => {
    const updatedProposal = { ...localProposal, stage };
    setLocalProposal(updatedProposal);

    updateProposal(sections, stage);
  };

  if (!localProposal) return null;

  const isAdmin = dbUser?.role === "admin";

  const discoveryState = {
    description: proposal.lead?.description ?? "",
    estimateTime_min: Number(proposal.lead?.estimateTime_min ?? 0),
    estimateTime_max: Number(proposal.lead?.estimateTime_max ?? 0),
    budget_min: Number(proposal.lead?.budget_min ?? 0),
    budget_max: Number(proposal.lead?.budget_max ?? 0),
    formatted_date: "",
    currentState: proposal.lead?.discovery_state ?? "",
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body lg:flex-row ">
      {/* Sidebar — hidden when viewing features */}
      {!showFeatures && (
        <aside
          className="
            fixed top-0 left-0 hidden h-screen w-[min(20rem,32vw)] shrink-0 flex-col
            border-foreground/10 bg-secondary/25 lg:flex lg:border-r
          "
        >
          <ProposalSidebar sections={sections} onSelect={scrollToSection} />
        </aside>
      )}

      <div className="w-full min-w-0 flex-1 lg:min-h-0">
        {/* Mobile drawer — only for proposal view */}

        {!showFeatures && (
          <div className="lg:hidden">
            <ProposalDrawer
              sections={Object.keys(sections)}
              onSelect={scrollToSection}
            />
          </div>
        )}
        <div
          className="bg-background 
"
        >
          <div className="mx-auto w-full max-w-4xl px-4 pb-12 pt-2 lg:pt-6 ">
            {/* Toggle */}

            {showFeatures && proposal?.stage !== "for-review" ? (
              <div>
                {dbUser?.role === "admin" && (
                  <DraftPlate
                    value={showFeatures ? "features" : "proposal"}
                    onChange={(v) => setShowFeatures(v === "features")}
                    bgColor="bg-background"
                    textColor="text-foreground"
                    rounded="rounded-t-xl"
                    options={[
                      {
                        value: "proposal",
                        label: "Proposal",
                        statusText: "Viewing",
                      },
                      {
                        value: "features",
                        label: "Features",
                        statusText: "Viewing",
                      },
                    ]}
                  />
                )}
                <DiscoveryForm
                  proposal={localProposal}
                  passcode={proposal.passcode}
                  pageMode=""
                  setPageMode={() => {}}
                  readOnly={isAdmin}
                  features={proposal.features ?? []}
                  discoveryState={discoveryState}
                  formatted_date={localProposal?.lead.formatted_date}
                />
              </div>
            ) : (
              <>
                {dbUser?.role === "admin" && (
                  <DraftPlate
                    value={showFeatures ? "features" : "proposal"}
                    onChange={(v) => setShowFeatures(v === "features")}
                    bgColor="bg-background"
                    textColor="text-foreground"
                    rounded="rounded-t-xl"
                    options={[
                      {
                        value: "proposal",
                        label: "Proposal",
                        statusText: "Viewing ",
                      },
                      {
                        value: "features",
                        label: "Features",
                        statusText: "Viewing ",
                      },
                    ]}
                  />
                )}

                {Object.entries(sections).map(([sectionKey, sectionData]) => (
                  <div
                    key={sectionKey}
                    ref={(el) => {
                      sectionRefs.current[sectionKey] = el;
                    }}
                    className="scroll-mt-32"
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

                {dbUser?.role !== "admin" && (
                  <CtaProposal
                    proposalId={proposal.passcode}
                    signature_url={proposal.signature_url}
                  />
                )}

                <DraftPlate
                  value={localProposal.stage}
                  onChange={setStage}
                  bgColor="bg-primary"
                  rounded="rounded-b-xl"
                  options={[
                    {
                      value: "draft",
                      label: "Draft",
                      statusText: "Proposal in progress",
                    },
                    {
                      value: "for-review",
                      label: "For Review",
                      statusText: "Ready for review",
                    },
                  ]}
                />
              </>
            )}
          </div>
          <Footer mode="relative" />
        </div>
      </div>
    </div>
  );
}
