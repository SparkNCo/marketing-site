"use client";

import { useState, useEffect } from "react";

export const DraftPlate = ({ proposal, setStage }) => {
  // ✅ Local stage state
  const [localStage, setLocalStage] = useState(proposal?.stage);

  // ✅ Sync if parent proposal changes externally
  useEffect(() => {
    setLocalStage(proposal?.stage);
  }, [proposal?.stage]);

  const isDraft = localStage === "draft";

  const toggleStage = () => {
    const newStage = isDraft ? "for-review" : "draft";

    // 1️⃣ Update local UI immediately
    setLocalStage(newStage);

    // 2️⃣ Update parent state
    setStage(newStage);
  };

  return (
    <div className="w-full bg-primary text-background font-semibold text-lg flex items-center justify-between px-4">
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
