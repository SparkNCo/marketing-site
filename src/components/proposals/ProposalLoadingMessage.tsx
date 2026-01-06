"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useApp } from "../../lib/AppProvider";

type ProposalLoadingMessageProps = Readonly<{
  pageMode: string;
  setPageMode: Dispatch<SetStateAction<string>>;
}>;

export function ProposalLoadingMessage({
  pageMode,
  setPageMode,
}: ProposalLoadingMessageProps) {
  const [isReady, setIsReady] = useState(false);
  const { user } = useApp();

  const onViewProposal = () => {
    setPageMode("view");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-fade-in space-y-8 text-center font-body  min-h-[90vh] mt-28">
      {/* Titles */}
      <div className="space-y-3 text-card">
        <h2 className="text-4xl font-bold font-title">
          {isReady
            ? "Your proposal is ready to be seen"
            : "Please wait a moment"}
        </h2>

        <p className="text-xl text-card max-w-md mx-auto font-title">
          {isReady
            ? "Everything is ready. You can review it now."
            : "We're putting together a proposal"}
        </p>
      </div>

      {/* Action */}
      {isReady && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onViewProposal}
            disabled={!user}
            className="
    px-8 py-3 rounded-lg bg-primary text-secondary font-semibold text-lg
    transition
    hover:bg-primary/90
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:bg-primary
  "
          >
            View Proposal
          </button>
        </div>
      )}
    </div>
  );
}

