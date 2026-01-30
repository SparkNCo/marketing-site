"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";

type Props = {
  submissionId: string;
  proposal: any;
  dbUser?: any;
};

export default function CreateProposalCta({
  submissionId,
  proposal,
  dbUser,
}: Props) {
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        "http://127.0.0.1:54321/functions/v1/proposals",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passcode: submissionId,
            updates: proposal,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to save proposal");
      }

      return res.json();
    },
  });

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
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            className="flex items-center gap-2 text-background font-semibold"
          >
            {mutation.isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving…
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        {mutation.isError && (
          <p className="mt-4 text-sm text-red-500">
            {(mutation.error as Error).message ||
              "Could not save proposal. Please try again."}
          </p>
        )}

        {mutation.isSuccess && (
          <p className="mt-4 text-sm text-green-500">
            Proposal saved successfully
          </p>
        )}
      </Card>
    </section>
  );
}
