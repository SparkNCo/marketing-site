"use client";

import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { X } from "lucide-react";

type SignatureModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (signature: string) => void;
};

export function SignatureModal({
  open,
  onClose,
  onConfirm,
}: SignatureModalProps) {
  const sigRef = useRef<SignatureCanvas | null>(null);


  if (!open) return null;

  const handleClear = () => {
    sigRef.current?.clear();
  };

  const handleConfirm = () => {
    if (!sigRef.current || sigRef.current.isEmpty()) return;

    const signatureData = sigRef.current.toDataURL("image/png");
    onConfirm(signatureData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-background rounded-xl p-6 w-full max-w-xl shadow-2xl space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-title">Sign the proposal</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Canvas */}
        <div className="border rounded-lg bg-foreground">
          <SignatureCanvas
            ref={sigRef}
            penColor="black"
            canvasProps={{
              className: "w-full h-48",
            }}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleClear}
            className="px-4 py-2 border rounded-md hover:bg-muted"
          >
            Clear
          </button>

          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90"
          >
            Confirm signature
          </button>
        </div>
      </div>
    </div>
  );
}
