"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { SignatureModal } from "./SignatureModal";

export default function CtaProposal({
  proposalId,
  signature_url,
}: {
  proposalId: string;
  signature_url: string;
}) {
  const [open, setOpen] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const handleConfirmSignature = async (signatureBase64: string) => {
    try {
      setIsSigning(true);
      console.log("proposalId", proposalId);
      const res = await fetch("/api/proposals/uploadSignature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposalId,
          signatureBase64,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to sign proposal");
      }

      const data = await res.json();
      if (data.signatureUrl) {
        setIsSigned(true);
      }
    } catch (err) {
      console.error(err);
      alert("Could not save signature. Please try again.");
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <>
      <section className="mb-16 w-[80vw]">
        <Card className="p-8 bg-background border-primary border-2 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Transform Your Inventory Management?
          </h2>

          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's schedule a call to discuss next steps, answer any questions,
            and kick off this project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                if (!isSigned && !signature_url) {
                  setOpen(true);
                }
              }}
              disabled={isSigning}
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 disabled:opacity-50"
            >
              {isSigned || signature_url
                ? "Proposal Accepted"
                : "Accept Proposal"}
            </button>

            <button className="px-8 py-3 bg-background text-foreground border border-border font-semibold rounded-md hover:bg-muted">
              Schedule a Call
            </button>
          </div>
        </Card>
      </section>

      <SignatureModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmSignature}
      />
    </>
  );
}
