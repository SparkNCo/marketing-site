import ProposalSection from "./1-ProposalAiGenerated";
import { proposalMockData } from "./1-proposalMockData";


export default function ProposalPage({ dbUser }) {
  const handleUpdate = (sectionKey: string, value: any) => {
    console.log("Updated:", sectionKey, value);
  };

  return (
    <div className="flex flex-col items-center mt-32">
      {Object.entries(proposalMockData).map(
        ([sectionKey, sectionData]) => (
          <ProposalSection
            key={sectionKey}
            title={sectionKey}
            data={sectionData}
            dbUser={dbUser}
            setProposal={(val) =>
              handleUpdate(sectionKey, val)
            }
          />
        )
      )}
    </div>
  );
}
