"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function CreateProposalCta({ submissionId, proposal }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProposal = async () => {
    console.log("request", proposal);
    const res = await fetch("/api/proposals/update-prop", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passcode: submissionId,
        updates: proposal,
      }),
    });
    console.log("response", res);
  };

  const createBlankProposal = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/proposals/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summaryItems: [],
          scopes: [],
          deliverables: [],
          dependencies: [],
          mileStones: [],
          initialTotalInvestment: null,
          costBreakdown: [],
          paymentMilestones: [],
          assumptions: [],
          team: [],
          stackSection: [],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create proposal");
      }

      const { data } = await res.json();

      // OPTIONAL: redirect to proposal editor
      // window.location.href = `/proposals/${data.id}`;

      console.log("Proposal created:", data);
    } catch (err) {
      console.error(err);
      setError("Could not create proposal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-16 w-[80vw] mx-auto">
      <Card className="p-8 bg-background border-primary border-2 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          TEST COMPONENT to Create or Save a Proposal
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            disabled={loading}
            onClick={createBlankProposal}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating…
              </>
            ) : (
              "Create Blank Proposal on supabase"
            )}
          </Button>
        </div>

        {/* TO SAVE BUTTON */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            disabled={loading}
            onClick={updateProposal}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating…
              </>
            ) : (
              "Save Proposal"
            )}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </Card>
    </section>
  );
}
