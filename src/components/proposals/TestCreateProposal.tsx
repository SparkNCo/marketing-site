"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function CreateProposalCta({ submissionId, proposal, dbUser }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProposal = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        // "/api/proposals/update-prop"
        "http://127.0.0.1:54321/functions/v1/proposals",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passcode: submissionId,
            updates: proposal,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to save proposal");
      }
    } catch (err) {
      console.error(err);
      setError("Could not save proposal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-16 w-[80vw] mx-auto">
      <Card className="p-8 bg-background border-primary border-2 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Save Proposal Changes
        </h2>

        {/* SAVE BUTTON */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            disabled={loading}
            onClick={updateProposal}
            className="flex items-center gap-2 text-background font-semibold"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving…
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </Card>
    </section>
  );
}
