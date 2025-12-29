import React, { useState, lazy } from "react";
import type { FormIslandProps } from "./utils/interfaces";

/* ───────────────── Types ───────────────── */

export type FormStep = "initial" | "features";

/* ───────────────── Lazy steps ───────────────── */
const HeroSection = lazy(() => import("./landing/HeroSection"));
/* ───────────────── Component ───────────────── */

const LandingIsland: React.FC<FormIslandProps> = ({ initialStep }) => {
  const [step, setStep] = useState<FormStep>(initialStep);

  return (
    <div className="bg-secondary  ">
      {step === "initial" && <HeroSection />}
    </div>
  );
};

export default LandingIsland;
