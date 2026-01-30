import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import type { ProposalIslandProps } from "../utils/interfaces";
import { useApp } from "../../lib/AppProvider";

import CtaProposal from "./ctaProposal";
import DedicatedTeam from "./DedicatedTeam";
import Deliverables from "./Deliverables";
import ExecutiveSummary from "./ExecutiveSummary";
import PlanTimeline from "./PlanTimeline";
import ProjectScope from "./ProjectScope";
import ProposalHeader from "./proposalHeader";
import { ProposalLoadingMessage } from "./ProposalLoadingMessage";
import TechStackArchitecture from "./TechStackArchitecture";
import TestCreateProposal from "./TestCreateProposal";
import { DraftPlate } from "./DraftPlate";
import {
  InvalidPasscode,
  LoadingProposal,
  MissingPasscode,
  ProposalInProgress,
} from "./MissingPasscode";
import DiscoveryForm from "../DiscoveryForm";
import Footer from "../Footer";

type DiscoveryFormState = {
  lead_id: string;
  requirementOverview: string;
  timelineRange: [number, number];
  budgetRange: [number, number];
  currentState: string;
};

type PageMode = "features" | "loading" | "view" | "draft";

export type Proposal = {
  id: string;
  passcode: string;
  stage?: string;
  lead_id?: string;
  lead?: any;
  summary_items: any[];
  scopes: any[];
  sections: any[];
  deliverables: any[];
  dependencies: any[];
  milestones: any[];
  cost_breakdown: any[];
  payment_milestones: any[];
  assumptions: any[];
  team: any[];
  stack_section: any[];
  initial_total_investment: {
    amount: number;
    note?: string;
  };
  why_this_stack: string;
  total_duration: string;
  signature_url: string;
  signed_at: string;
};

type ProposalUpdate = Partial<Proposal>;

const slideVariants = {
  initial: { opacity: 0, x: 80 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -80,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

async function fetchProposal(passcode: string) {
  const res = await fetch(
    `http://127.0.0.1:54321/functions/v1/proposals/?passcode=${passcode}`,
  );

  if (!res.ok) {
    throw new Error("Unable to load proposal");
  }

  const { data } = await res.json();
  return data as Proposal;
}

const ProposalIsland: React.FC<ProposalIslandProps> = ({ mode, passcode }) => {
  if ((mode === "features" || mode === "draft") && !passcode) {
    return <MissingPasscode />;
  }

  const { dbUser } = useApp();
  const queryClient = useQueryClient();

  const initialMode: PageMode =
    mode === "features" ||
    mode === "draft" ||
    mode === "loading" ||
    mode === "view"
      ? mode
      : "view";

  const [pageMode, setPageMode] = useState<PageMode>(initialMode);

  const {
    data: proposal,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["proposal", passcode],
    queryFn: () => fetchProposal(passcode!),
    enabled: !!passcode,
    /* onSuccess: (data) => {
      setDiscoveryState({
        lead_id: data?.lead?.id ?? "",
        requirementOverview: data?.lead?.description ?? "",
        timelineRange: [
          data?.lead?.estimateTime_min ?? 1,
          data?.lead?.estimateTime_max ?? 6,
        ],
        budgetRange: [
          data?.lead?.budget_min ?? 5000,
          data?.lead?.budget_max ?? 50000,
        ],
        currentState: "",
      });
    }, */
  });

  const updateProposal = async (updates: ProposalUpdate) => {
    queryClient.setQueryData<Proposal>(["proposal", passcode], (prev) =>
      prev ? { ...prev, ...updates } : prev,
    );
  };

  const updateProposalProp =
    <K extends keyof Proposal>(prop: K) =>
    async (value: Proposal[K]) => {
      await updateProposal({ [prop]: value } as Pick<Proposal, K>);
    };

  if (isLoading) return <LoadingProposal />;

  <div
    className="min-h-[90vh] pt-20 text-foreground"
    onClick={() =>
      console.log({
        proposal,
      })
    }
  >
    VER
  </div>;

  return (
    <AnimatePresence mode="wait">
      {pageMode === "features" && passcode && (
        <motion.div
          key="features"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {proposal.lead_id && (
            <DiscoveryForm
              proposal={proposal}
              passcode={passcode}
              pageMode={pageMode}
              setPageMode={setPageMode}
              leadId={proposal.lead_id}
            />
          )}
        </motion.div>
      )}

      {pageMode === "loading" && (
        <motion.div
          key="loading"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ProposalLoadingMessage setPageMode={setPageMode} />
        </motion.div>
      )}

      {pageMode === "draft" && proposal && (
        <motion.div
          key="draft"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {proposal.stage === "draft" && dbUser?.role !== "admin" ? (
            <div className="min-h-[90vh] pt-20">
              <ProposalInProgress />
            </div>
          ) : (
            <>
              <ProposalHeader />
              <main className="min-h-screen flex flex-col items-center px-4 py-6 bg-background text-secondary">
                {dbUser?.role === "admin" && (
                  <DraftPlate
                    proposal={proposal}
                    setProposal={updateProposal}
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
          )}
        </motion.div>
      )}

      {(pageMode === "draft" || pageMode === "features") && isError && (
        <motion.div
          key="error"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-[90vh]"
        >
          <InvalidPasscode />
        </motion.div>
      )}

      <Footer mode={"mode"} />
    </AnimatePresence>
  );
};

export default ProposalIsland;
