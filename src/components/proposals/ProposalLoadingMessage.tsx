"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { CheckCircle } from "lucide-react";
import { useApp } from "../../lib/AppProvider";

export function ProposalLoadingMessage({
  pageMode,
  setPageMode,
}: {
  pageMode: string;
  setPageMode: Dispatch<SetStateAction<string>>;
}) {
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
    <div className="animate-fade-in space-y-8 text-center font-body">
      {/* Icon / Loader */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          {!isReady ? (
            <LoadingDots />
          ) : (
            <CheckCircle className="w-12 h-12 text-primary" />
          )}
        </div>
      </div>

      {/* Titles */}
      <div className="space-y-3 text-card">
        <h2 className="text-4xl font-bold font-title">
          {!isReady
            ? "Please wait a moment"
            : "Your proposal is ready to be seen"}
        </h2>

        <p className="text-xl text-card max-w-md mx-auto font-title">
          {!isReady
            ? "We're putting together a proposal"
            : "Everything is ready. You can review it now."}
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

/* -------------------------------- */
/* Loading dots component            */
/* -------------------------------- */

function LoadingDots() {
  return (
    <div className="flex items-center gap-2">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />

      <style jsx>{`
        .dot {
          width: 24px;
          height: 24px;
          background-color: #f25c54;
          border-radius: 9999px;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .dot:nth-child(1) {
          animation-delay: -0.32s;
        }
        .dot:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
