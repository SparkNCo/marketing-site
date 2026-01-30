"use client";

import ExecutiveSummary from "./ExecutiveSummary";
import ProjectScope from "./ProjectScope";
import Deliverables from "./Deliverables";
import PlanTimeline from "./PlanTimeline";
import DedicatedTeam from "./DedicatedTeam";
import TechStackArchitecture from "./TechStackArchitecture";
import CtaProposal from "./ctaProposal";
import TestCreateProposal from "./TestCreateProposal";
import { DraftPlate } from "./DraftPlate";
import ProposalHeader from "./proposalHeader";

export default function ProposalEditIsland({
  proposal,
  passcode,
  dbUser,
  updateProposalProp,
}) {
  return (
    <>
      <ProposalHeader />

      <main className="min-h-screen flex flex-col items-center px-4 py-6 bg-background text-secondary">
        {dbUser?.role === "admin" && (
          <DraftPlate
            proposal={proposal}
            setStage={updateProposalProp("stage")}
          />
        )}

        <ExecutiveSummary
          summary_items={proposal.summary_items}
          setProposal={updateProposalProp("summary_items")}
          dbUser={dbUser}
        />

        <ProjectScope
          initialScopes={proposal.scopes}
          intialSections={proposal.sections}
          updateScopes={updateProposalProp("scopes")}
          updateSections={updateProposalProp("sections")}
          dbUser={dbUser}
        />

        <Deliverables
          initialDeliverables={proposal.deliverables}
          setProposal={updateProposalProp("deliverables")}
          dbUser={dbUser}
        />

        <PlanTimeline
          initialDependencies={proposal.dependencies}
          initialMilestones={proposal.milestones}
          initialTotalDuration={proposal.total_duration}
          setDependenciesState={updateProposalProp("dependencies")}
          setMilestonesState={updateProposalProp("milestones")}
          setTotalDurationState={updateProposalProp("total_duration")}
          dbUser={dbUser}
        />

        <DedicatedTeam
          initialTeam={proposal.team}
          setProposal={updateProposalProp("team")}
          dbUser={dbUser}
        />

        <TechStackArchitecture
          initialStack={proposal.stack_section}
          initialWhyThisStack={proposal.why_this_stack}
          setStack={updateProposalProp("stack_section")}
          setWhyThisStackState={updateProposalProp("why_this_stack")}
          dbUser={dbUser}
        />

        <CtaProposal
          proposalId={passcode}
          signature_url={proposal.signature_url}
        />

        {dbUser?.role === "admin" && (
          <TestCreateProposal
            submissionId={passcode}
            proposal={proposal}
            dbUser={dbUser}
          />
        )}
      </main>
    </>
  );
}
