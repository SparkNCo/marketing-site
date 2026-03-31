"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { SignatureModal } from "./SignatureModal";
import { CheckCircle, Phone } from "lucide-react";
import ProposalButton from "../ui/ProposalButton";

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

      const res = await fetch(`${import.meta.env.PUBLIC_ENDPOINT}/proposals`, {
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

  const onScheduleCall = () => {
    window.open(
      "https://cal.com/kabir-malkani-glnivq/consult",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="bg-foreground p-4 ">
      <section className="mb-16 ">
        <Card
          className="p-0 bg-background text-foreground border-none p-4 rounded-xl "
          rounded={false}
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Build</h2>
          </div>

          {/* Description */}
          <p className="mb-6 max-w-2xl">
            Launch your new business or product line with Spark & Co's fully
            managed software delivery system.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 w-full">
            <ProposalButton
              icon={<CheckCircle className="w-5 h-5" />}
              disabled={isSigning}
              onClick={() => {
                if (!isSigned && !signature_url) {
                  setOpen(true);
                }
              }}
              variant="primary"
            >
              {isSigned || signature_url
                ? "Proposal Accepted"
                : "Accept Proposal"}
            </ProposalButton>

            <ProposalButton
              icon={<Phone className="w-5 h-5" />}
              onClick={onScheduleCall}
              variant="secondary"
            >
              Request a Call
            </ProposalButton>
          </div>
        </Card>
      </section>

      <SignatureModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmSignature}
      />
    </div>
  );
}
