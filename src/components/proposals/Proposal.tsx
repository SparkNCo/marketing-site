import { useState } from "react";
import { FeaturesCollection } from "../forms/features-collection";
import type { ProposalIslandProps } from "../utils/interfaces";
import CtaProposal from "./ctaProposal";
import DedicatedTeam from "./DedicatedTeam";
import Deliverables from "./Deliverables";
import ExecutiveSummary from "./ExecutiveSummary";
import PlanTimeline from "./PlanTimeline";
import PricingStructure from "./PricingStructure";
import ProjectScope from "./ProjectScope";
import ProposalHeader from "./proposalHeader";
import { ProposalLoadingMessage } from "./ProposalLoadingMessage";
import TechStackArchitecture from "./TechStackArchitecture";
import { AnimatePresence, motion } from "framer-motion";

type PageMode = "features" | "loading" | "view";

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
  if (mode === "features" && !submissionId) {
    return <div>Missing submissionId</div>;
  }

  type PageMode = "features" | "loading" | "view";

  const initialMode: PageMode =
    mode === "features" || mode === "loading" || mode === "view"
      ? mode
      : "view";

  const [pageMode, setPageMode] = useState<PageMode>(initialMode);

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

      {pageMode === "view" && (
        <motion.div
          key="view"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <>
            <ProposalHeader />
            <main className="min-h-screen flex flex-col items-center justify-start px-4 py-6 bg-background text-secondary">
              <ExecutiveSummary />
              <ProjectScope />
              <Deliverables />
              <PlanTimeline />
              <PricingStructure />
              <DedicatedTeam />
              <TechStackArchitecture />
              <CtaProposal />
            </main>
          </>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProposalIsland;
