import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import ProposalPage from "./1-ProposalPage";
import Footer from "../Footer";

type PageMode = "features" | "loading" | "view" | "draft" | "waiting";

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
    `${import.meta.env.PUBLIC_ENDPOINT}/proposals/?passcode=${passcode}`,
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.error || "Unable to load proposal");
  }

  return json.data as Proposal;
}

const ProposalIsland: React.FC<ProposalIslandProps> = ({ mode, passcode }) => {
  if ((mode === "features" || mode === "draft") && !passcode) {
    return <MissingPasscode />;
  }

  const { dbUser } = useApp();

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
  if (isLoading) return <LoadingProposal />;

  if (isError) {
    const errMsg = (error as Error)?.message;

    if (errMsg === "Proposal not found") {
      return (
        <div className="min-h-[90vh]">
          <InvalidPasscode />
          <Footer mode="bottom" />
        </div>
      );
    }

    // fallback error
    return (
      <div className="min-h-[90vh]">
        <p className="text-center text-sm text-red-500">Something went wrong</p>
        <div
          className="text-foreground"
          onClick={() => console.log({ errMsg })}
        >
          VER errMsg
        </div>

        <Footer mode="bottom" />
      </div>
    );
  }

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

      {pageMode === "waiting" && dbUser?.role !== "admin" && (
        <motion.div
          key="loading"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="min-h-[90vh] pt-20">
            <ProposalInProgress />
          </div>
          <Footer mode={"fixxed"} />
        </motion.div>
      )}
      {dbUser?.role === "admin" && proposal.stage !== "justCreated" && (
        <div>
          <ProposalPage
            proposal={proposal}
            dbUser={{
              userName: dbUser?.email,
              role: dbUser?.role,
            }}
          />
          <Footer mode={"fixxed"} />
        </div>
      )}

      {(dbUser?.role === undefined || dbUser?.role !== "admin") &&
        pageMode !== "waiting" &&
        proposal.stage !== "justCreated" && (
          <motion.div
            key="draft"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {proposal.stage === "for-review" ||
            proposal.stage === "accepted" ? (
              <div>
                <ProposalPage
                  proposal={proposal}
                  dbUser={{
                    userName: dbUser?.email,
                    role: dbUser?.role,
                  }}
                />
                <Footer mode={"bottom"} />
              </div>
            ) : (
              <div className="min-h-[90vh]">
                <ProposalInProgress />
                <Footer mode={"bottom"} />
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
          <div className="min-h-[90vh]">
            <InvalidPasscode />
            <Footer mode={"bottom"} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProposalIsland;
