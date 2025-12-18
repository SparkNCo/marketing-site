import React, { useState, lazy } from "react";
import type { FormIslandProps } from "./utils/interfaces";

/* ───────────────── Types ───────────────── */

export type FormStep = "initial" | "features";

/* ───────────────── Lazy steps ───────────────── */
const StepOne = lazy(() => import("./DealForm"));
const FeaturesForm = lazy(() => import("./FeaturesForm"));

/* ───────────────── Component ───────────────── */

const FormIsland: React.FC<FormIslandProps> = ({ initialStep }) => {
  const [step, setStep] = useState<FormStep>(initialStep);

  return (
    <div>
      {step === "initial" && <StepOne />}
      {step === "features" && (
        <FeaturesForm onSubmit={() => setStep("initial")} />
      )}
    </div>
  );
};

export default FormIsland;
