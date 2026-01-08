import { useEffect, useState } from "react";
import { FeaturesCollection } from "../forms/features-collection";
import type { ProposalIslandProps } from "../utils/interfaces";
import CtaProposal from "./ctaProposal";
import DedicatedTeam from "./DedicatedTeam";
import Deliverables from "./Deliverables";
import ExecutiveSummary from "./ExecutiveSummary";
import PlanTimeline from "./PlanTimeline";
import ProjectScope from "./ProjectScope";
import ProposalHeader from "./proposalHeader";
import { ProposalLoadingMessage } from "./ProposalLoadingMessage";
import TechStackArchitecture from "./TechStackArchitecture";
import { AnimatePresence, motion } from "framer-motion";
import TestCreateProposal from "./TestCreateProposal";
import { useApp } from "../../lib/AppProvider";
import { DraftPlate } from "./DraftPlate";
import {
  InvalidPasscode,
  MissingPasscode,
  ProposalInProgress,
} from "./MissingPasscode";

type PageMode = "features" | "loading" | "view" | "draft";
type Proposal = {
  id: string;
  passcode: string;
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
};
type ProposalUpdate = Partial<Proposal>;

const slideVariants = {
  initial: {
    opacity: 0,
    x: 80,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: -80,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};
const ProposalIsland: React.FC<ProposalIslandProps> = ({
  mode,
  submissionId,
}) => {
  if ((mode === "features" || mode === "draft") && !submissionId) {
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
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateProposal = async (updates: ProposalUpdate) => {
    if (!proposal || !submissionId) return;

    // optimistic UI update
    setProposal((prev) =>
      prev
        ? {
            ...prev,
            ...updates,
          }
        : prev
    );
  };

  const updateProposalProp =
    <K extends keyof Proposal>(prop: K) =>
    async (value: Proposal[K]) => {
      await updateProposal({
        [prop]: value,
      } as Pick<Proposal, K>);
    };

  useEffect(() => {
    if (!submissionId) return;

    const fetchProposal = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/proposals/get-by-passcode?passcode=${submissionId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch proposal");
        }

        const { data } = await res.json();
        setProposal(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load proposal");
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [submissionId]);

  if (loading) return <div>Loading proposal…</div>;

  return (
    <AnimatePresence mode="wait">
      {pageMode === "features" && submissionId && (
        <motion.div
          key="features"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <FeaturesCollection
            submissionId={submissionId}
            pageMode={pageMode}
            setPageMode={setPageMode}
          />
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

      {pageMode === "draft" && (
        <motion.div
          key="view"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {proposal?.stage !== "for-review" && dbUser?.role !== "admin" ? (
            <div className="min-h-[90vh] pt-20">
              <ProposalInProgress />
            </div>
          ) : (
            <>
              <ProposalHeader />
              <main className="min-h-screen flex flex-col items-center justify-start px-4 py-6 bg-background text-secondary">
                {dbUser && dbUser.role === "admin" && (
                  <DraftPlate proposal={proposal} setProposal={setProposal} />
                )}
                <ExecutiveSummary
                  summary_items={proposal?.summary_items}
                  setProposal={updateProposalProp("summary_items")}
                />
                <ProjectScope
                  initialScopes={proposal?.scopes}
                  intialSections={proposal?.sections}
                  updateScopes={updateProposalProp("scopes")}
                  updateSections={updateProposalProp("sections")}
                />

                <Deliverables
                  initialDeliverables={proposal?.deliverables}
                  setProposal={updateProposalProp("deliverables")}
                />

                <PlanTimeline
                  initialDependencies={proposal?.dependencies}
                  initialMilestones={proposal?.milestones}
                  initialTotalDuration={proposal?.total_duration}
                  setDependenciesState={updateProposalProp("dependencies")}
                  setMilestonesState={updateProposalProp("milestones")}
                  setTotalDurationState={updateProposalProp("total_duration")}
                />

                <DedicatedTeam
                  initialTeam={proposal?.team}
                  setProposal={updateProposalProp("team")}
                />

                <TechStackArchitecture
                  initialStack={proposal?.stack_section}
                  initialWhyThisStack={proposal?.why_this_stack}
                  setStack={updateProposalProp("stack_section")}
                  setWhyThisStackState={updateProposalProp("why_this_stack")}
                />

                <CtaProposal />
                {dbUser && dbUser.role === "admin" && (
                  <TestCreateProposal
                    submissionId={submissionId}
                    proposal={proposal}
                  />
                )}
              </main>
            </>
          )}
        </motion.div>
      )}

      {pageMode === "draft" && error === "Unable to load proposal" && (
        <motion.div
          key="view"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <InvalidPasscode />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProposalIsland;

{
  /* <LoginRequire /> */
}
