"use client";

import { useEffect, useRef, useState } from "react";
import { Settings, XCircle } from "lucide-react";

type LoadingWrapperProps = {
  children?: ReactNode;
  label?: string;
};

export const MissingPasscode = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const passcode = code.join("");

  useEffect(() => {
    if (passcode.length === 6 && !code.includes("")) {
      window.location.href = `http://localhost:4321/proposal?mode=features&passcode=${passcode}`;
    }
  }, [passcode, code]);

  const handleChange = (value: string, index: number) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="rounded-xl bg-foreground text-center space-y-8 py-8 px-10 max-w-lg w-full shadow-2xl">
        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-title">Passcode missing</h2>
          <p className="text-xl text-background">
            We need a passcode to display the proper proposal
          </p>
        </div>

        {/* Passcode inputs */}
        <div className="flex justify-center gap-4">
          {code.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={value}
              autoFocus={index === 0}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-2xl text-center font-semibold rounded-lg bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>

        {/* Hint */}
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit passcode provided in your email
        </p>
      </div>
    </div>
  );
};

export const InvalidPasscode = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="rounded-xl bg-foreground text-center space-y-8 py-8 px-10 max-w-lg w-full shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center">
          <XCircle className="w-20 h-20 text-red-500" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-title">Access denied</h2>
          <p className="text-xl text-background">
            We were not able to find a proposal with the supplied passcode
          </p>
        </div>

        {/* Hint */}
        <p className="text-sm text-muted-foreground">
          Please double-check the code or request a new access link
        </p>
      </div>
    </div>
  );
};

export const ProposalInProgress = () => {
  return (
    <div className="w-full flex items-center justify-center py-24 animate-fade-in ">
      <div className="  rounded-xl bg-foreground text-center space-y-8 py-10 px-10 max-w-lg w-full shadow-xl">
        {/* Animated gears */}
        <div className="flex justify-center items-center gap-4 ">
          <Settings className="w-20 h-20 text-primary animate-spin [animation-duration:5.5s]" />
          <Settings className="w-14 h-14 text-primary/70 animate-spin [animation-duration:7s]" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-title">
            Proposal in progress
          </h2>
          <p className="text-xl text-background">
            We are currently working on this proposal
          </p>
        </div>

        {/* Hint */}
        <p className="text-sm text-muted-foreground">
          Please check back soon — we’ll notify you once it’s ready
        </p>
      </div>
    </div>
  );
};

export const LoadingWrapper = ({
  children,
  label = "Loading",
}: LoadingWrapperProps) => {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-6">
        {/* Loader */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring (bigger, thinner) */}
          <div className="absolute w-24 h-24 rounded-full border-2 border-primary/30 border-t-primary animate-spin [animation-duration:3.5s]" />

          {/* Inner ring (smaller, thicker) */}
          <div className="w-14 h-14 rounded-full border-4 border-primary/40 border-t-primary animate-spin [animation-duration:1.8s]" />
        </div>

        {/* Optional text */}
        <div className="text-center space-y-1">
          <p className="text-lg font-semibold text-primary">{label}</p>
          {children && (
            <p className="text-sm text-muted-foreground">{children}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const LoadingProposal = () => {
  return (
    <div className="w-full flex items-center justify-center py-24 animate-fade-in min-h-[90vh] ">
      <div className="flex flex-col items-center gap-6 ">
        <div className="relative flex items-center justify-center ">
          {/* Outer ring (bigger, thinner) */}
          <div className="absolute w-24 h-24 rounded-full border-2 border-primary/80 border-t-primary border-background border-r-primary animate-spin [animation-duration:1.2s]" />

          {/* Inner ring (smaller, thicker) */}
          <div className="w-14 h-14 rounded-full border-4 border-primary/60 border-background border-t-primary border-r-primary animate-spin [animation-duration:1.6s]" />
        </div>

        {/* Text */}
        <div className="text-center space-y-1">
          <p className="text-xl font-semibold text-primary">
            Loading proposal…
          </p>
          <p className="text-sm text-foreground">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
};
