import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import type { ProposalIslandProps } from "../utils/interfaces";
import { useApp } from "../../lib/AppProvider";
import {
  InvalidPasscode,
  LoadingProposal,
  MissingPasscode,
  ProposalInProgress,
} from "./MissingPasscode";
import DiscoveryForm from "../DiscoveryForm";
import Footer from "../Footer";
import ProposalEditIsland from "./ProposalEditIsland";

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
  });

  const updateProposal = async (updates: ProposalUpdate) => {
    queryClient.setQueryData<Proposal>(["proposal", passcode], (prev) =>
      prev ? { ...prev, ...updates } : prev,
    );
  };

  const updateProposalProp =
    <K extends keyof Proposal>(prop: K) =>
    (value: Proposal[K]) => {
      updateProposal({ [prop]: value } as Pick<Proposal, K>);
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
      {pageMode !== "waiting" &&
        proposal.stage === "justCreated" &&
        passcode && (
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

      {pageMode === "waiting" && (
        <motion.div
          key="loading"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ProposalInProgress />
        </motion.div>
      )}

      {dbUser?.role === "admin" && (
        <ProposalEditIsland
          proposal={proposal}
          passcode={passcode}
          dbUser={dbUser}
          updateProposalProp={updateProposalProp}
        />
      )}

      {dbUser?.role !== "admin" && pageMode !== "waiting" && (
        <motion.div
          key="draft"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {proposal.stage === "for-review" ? (
            <ProposalEditIsland
              proposal={proposal}
              passcode={passcode}
              dbUser={dbUser}
              updateProposalProp={updateProposalProp}
            />
          ) : (
            <div className="min-h-[90vh] pt-20">
              <ProposalInProgress />
            </div>
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
