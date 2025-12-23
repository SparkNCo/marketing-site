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

const ProposalIsland: React.FC<ProposalIslandProps> = ({
  mode,
  submissionId,
}) => {
  if (mode === "features" && !submissionId) {
    return <div>Missing submissionId</div>;
  }

  return (
    <div>
      {mode == "features" && <FeaturesCollection submissionId={"hola"} />}
      {mode== "loading" && <ProposalLoadingMessage />}
      {mode == "view" && (
        <div>
          <ProposalHeader />
          <main className="min-h-screen flex flex-col items-center justify-start sm:justify-center px-4 py-6 sm:p-4 bg-background text-secondary  ">
            <ExecutiveSummary />
            <ProjectScope />
            <Deliverables />
            <PlanTimeline />
            <PricingStructure />
            <DedicatedTeam />
            <TechStackArchitecture />
            <CtaProposal />
          </main>
        </div>
      )}
    </div>
  );
};
export default ProposalIsland;
