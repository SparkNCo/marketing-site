"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import PrimaryButton from "../primary-button";
import { useApp } from "../../../lib/AppProvider";
import { supabaseFunctionsUrl } from "../../../lib/supabaseFunctionsUrl";
import { trackMetaPixel } from "../../../lib/metaPixel";

interface EmailCaptureProps {
  onValidSubmit?: (email: string) => void;
  label?: string;
  containerClassName?: string;
  inputWrapperClassName?: string;
  buttonClassName?: string;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({
  onValidSubmit,
  label,
  containerClassName = "",
  inputWrapperClassName = "",
  buttonClassName = "",
}) => {
  const { leadEmail, setLeadEmail } = useApp();

  const [email, setEmail] = useState(leadEmail || "");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const submitMutation = useMutation({
    mutationFn: async (email: string) => {
      const lead_id = crypto.randomUUID();

      const res = await fetch(supabaseFunctionsUrl("lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          lead_id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      return res.json();
    },
    onError: (err) => {
      console.error(err);
      // Optional: you can show a toast instead of blocking UX
    },
  });

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    const cleanEmail = email.trim();

    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setError("");

    // ✅ Save globally
    setLeadEmail(cleanEmail);

    // ✅ 🚀 IMMEDIATE navigation / UI change
    onValidSubmit?.(cleanEmail);

    trackMetaPixel("Lead");
    // ✅ Fire request in background (don't block UX)
    submitMutation.mutate(cleanEmail);
  };

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      {label && (
        <h2 className="text-background font-bold mb-3 text-body lg:text-heading2 ">
          {label}
        </h2>
      )}

      <div
        className={`
          flex items-center bg-foreground shadow-md
          ${shake ? "animate-shake" : ""}
          ${error ? "border border-red-500" : ""}
          ${inputWrapperClassName}
        `}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="flex-1 px-4 py-3 outline-none text-background text-body "
        />
      </div>

      <p
        className={`
          text-red-500 text-smalltext mt-2 min-h-[20px]
          transition-opacity duration-200
          ${error ? "opacity-100" : "opacity-0"}
        `}
      >
        {error}
      </p>

      <PrimaryButton
        onClick={handleSubmit}
        disabled={submitMutation.isPending || !email.trim()}
        className={`mt-4 ${buttonClassName}`}
      >
        {submitMutation.isPending ? "Sending..." : "Let’s Go"}
      </PrimaryButton>
    </div>
  );
};

export default EmailCapture;
