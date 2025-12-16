import { useState, lazy, Suspense } from "react";

/* ───────────────── Types ───────────────── */

export type FormStep = "first" | "second";

/* ───────────────── Lazy step ───────────────── */

const StepOne = lazy(() => import("./StepOne"));
const StepTwo = lazy(() => import("./StepTwo"));

/* ───────────────── Component ───────────────── */

export default function FormIsland() {
  const [step, setStep] = useState<FormStep>("first");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {step !== "second" && (
        <StepOne onSubmit={() => setStep("")} />
      )}

      {step === "second" && (
        <StepTwo onSubmit={() => setStep("first")} />
      )}
    </Suspense>
  );
}
