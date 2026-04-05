import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import type { ProposalIslandProps } from "../utils/interfaces";
import { useApp } from "../../lib/AppProvider";
import { supabaseFunctionsUrl } from "../../lib/supabaseFunctionsUrl";
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

/** Proposal is ready for client review — not still filling discovery. */
const PROPOSAL_READY_STAGES = new Set(["for-review", "accepted"]);

function isDiscoveryEditingStage(stage?: string | null) {
  if (stage == null || stage === "") return true;
  return !PROPOSAL_READY_STAGES.has(stage);
}

/** Clients stay on discovery for any non-ready stage; admins only use discovery when stage is still `justCreated`, then see ProposalPage for all later stages. */
function showDiscoveryForm(
  stage: string | null | undefined,
  role: string | undefined,
) {
  if (!isDiscoveryEditingStage(stage)) return false;
  return role !== "admin" || stage === "justCreated";
}

export type Proposal = {
  proposal_id: string;
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
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    x: -80,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as const },
  },
};

async function fetchProposal(passcode: string) {
  const res = await fetch(
    `${supabaseFunctionsUrl("proposals")}?passcode=${encodeURIComponent(passcode)}`,
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.error || "Unable to load proposal");
  }

  return json.data as Proposal;
}

const ProposalIsland: React.FC<ProposalIslandProps> = ({ mode, passcode }) => {
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

  if ((mode === "features" || mode === "draft") && !passcode) {
    return <MissingPasscode />;
  }

  if (isLoading) return <LoadingProposal />;

  if (isError) {
    const errMsg = error?.message;

    if (errMsg === "Proposal not found") {
      return (
        <div className="min-h-[90vh]">
          <InvalidPasscode />
          <Footer mode="bottom" />
        </div>
      );
    }

    return (
      <div className="flex min-h-[90vh] flex-col items-center justify-center gap-3 px-4">
        <p className="text-center text-body text-red-500" role="alert">
          Something went wrong
        </p>
        {import.meta.env.DEV && (
          <p className="max-w-md text-center font-mono text-smalltext text-foreground/70">
            {errMsg}
          </p>
        )}
        <Footer mode="bottom" />
      </div>
    );
  }

  if (!proposal) {
    return <LoadingProposal />;
  }

  return (
    <AnimatePresence mode="wait">
      {/* Features Form */}
      {pageMode !== "waiting" &&
        showDiscoveryForm(proposal.stage, dbUser?.role) &&
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
              />
            )}
          </motion.div>
        )}
      {/* Wont be showing anymore */}
      {pageMode === "waiting" && dbUser?.role !== "admin" && (
        <motion.div
          key="loading"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex min-h-[85vh] flex-col"
        >
          <div className="flex flex-1 flex-col justify-center">
            <ProposalInProgress />
          </div>
          <Footer mode="bottom" />
        </motion.div>
      )}
      {/* Proposal Page  */}
      {dbUser?.role === "admin" && proposal.stage !== "justCreated" && (
        <div className="w-full">
          <ProposalPage
            proposal={proposal}
            dbUser={{
              userName: dbUser?.email,
              role: dbUser?.role,
            }}
          />
        </div>
      )}

      {(dbUser?.role === undefined || dbUser?.role !== "admin") &&
        pageMode !== "waiting" &&
        !isDiscoveryEditingStage(proposal.stage) && (
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
              </div>
            ) : (
              <div className="min-h-[90vh]">
                <ProposalInProgress />
                <Footer mode={"bottom"} />
              </div>
            )}
          </motion.div>
        )}
    </AnimatePresence>
  );
};

export default ProposalIsland;
