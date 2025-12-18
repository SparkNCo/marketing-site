import CtaProposal from "./ctaProposal";
import DedicatedTeam from "./DedicatedTeam";
import Deliverables from "./Deliverables";
import ExecutiveSummary from "./ExecutiveSummary";
import PlanTimeline from "./PlanTimeline";
import PricingStructure from "./PricingStructure";
import ProjectScope from "./ProjectScope";
import ProposalHeader from "./proposalHeader";
import TechStackArchitecture from "./TechStackArchitecture";

export default function ProposalPage() {
  return (
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
  );
}
