"use client";

import { Mail } from "lucide-react";

export function SuccessMessage() {
  return (
    <div className="rounded-xl animate-fade-in bg-foreground text-center space-y-10 py-6">
      {/* Check Icon */}
      <img
        src="/checkIcon.png"
        alt="Success"
        className="mx-auto mt-6 w-24 h-24 object-contain"
      />

      {/* Text */}
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-title">You're all set!</h2>
        <p className="text-3xl mx-6">
          We've received your information and confirmed your discovery call.
        </p>
      </div>

      {/* Email Info */}
      <div className="flex justify-center">
        <div className="flex items-center gap-3">
          <Mail className="w-12 h-12 text-primary" />
          <p className="text-2xl text-title">
            We’ll send you an email with next steps
          </p>
        </div>
      </div>
    </div>
  );
}
