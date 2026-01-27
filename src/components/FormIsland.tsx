import React, { useState, lazy } from "react";
import type { FormIslandProps } from "./utils/interfaces";

/* ───────────────── Types ───────────────── */

export type FormStep = "initial" | "features";

/* ───────────────── Lazy steps ───────────────── */
const StepOne = lazy(() => import("./DealForm"));
const FeaturesForm = lazy(() => import("./DiscoveryForm"));

/* ───────────────── Component ───────────────── */

const FormIsland: React.FC<FormIslandProps> = ({ initialStep }) => {
  const [step, setStep] = useState<FormStep>(initialStep);

  return (
    <div className="bg-secondary  ">{step === "initial" && <StepOne />}</div>
  );
};

export default FormIsland;
