export const DraftPlate = ({ proposal, setProposal }) => {
  const isDraft = proposal?.stage === "draft";

  const toggleStage = () => {
    setProposal((prev) => ({
      ...prev,
      stage: prev.stage === "draft" ? "for-review" : "draft",
    }));
  };

  return (
    <div className="w-full bg-primary text-background font-semibold text-lg flex items-center justify-between px-4">
      <div className="py-2">
        {isDraft ? "Proposal in progress" : "Ready for review"}
      </div>

      <div className="flex items-center gap-4">
        {/* STAGE LABEL */}
        <span className="text-sm opacity-80">Draft</span>

        {/* TOGGLE */}
        <button
          onClick={toggleStage}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition
            ${isDraft ? "bg-background" : "bg-background"}
          `}
        >
          <span
            className={`
              inline-block h-5 w-5 transform rounded-full bg-primary transition
              ${isDraft ? "translate-x-1" : "translate-x-5"}
            `}
          />
        </button>

        {/* DEBUG */}
        <span className="text-sm opacity-80">For Review</span>
      </div>
    </div>
  );
};
