"use client";

import { useState, useEffect } from "react";

export const DraftPlate = ({ proposal, setStage }) => {
  const [localStage, setLocalStage] = useState(proposal?.stage);
  useEffect(() => {
    setLocalStage(proposal?.stage);
  }, [proposal?.stage]);

  const isDraft = localStage === "draft";

  const toggleStage = () => {
    const newStage = isDraft ? "for-review" : "draft";
    setLocalStage(newStage);
    setStage(newStage);
  };

  return (
    <div className="w-full h-[4rem] bg-primary text-background font-semibold text-lg flex items-center justify-between px-4 mb-10 text-[16px]">
      <div className="py-2">
        {isDraft ? "Proposal in progress" : "Ready for review"}
      </div>

      <div className="flex items-center gap-4">
        {/* LEFT LABEL */}
        <span className="text-sm opacity-80">Draft</span>

        {/* TOGGLE */}
        <button
          onClick={toggleStage}
          className="
            relative inline-flex h-6 w-11 items-center
            rounded-full transition bg-background
          "
        >
          <span
            className={`
              inline-block h-5 w-5 transform
              rounded-full bg-primary transition
              ${isDraft ? "translate-x-1" : "translate-x-5"}
            `}
          />
        </button>

        {/* RIGHT LABEL */}
        <span className="text-sm opacity-80">For Review</span>
      </div>
    </div>
  );
};
