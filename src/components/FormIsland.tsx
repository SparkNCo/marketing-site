import React, { useState, lazy } from "react";
import type { FormIslandProps } from "./utils/interfaces";

/* ───────────────── Types ───────────────── */

export type FormStep = "initial" | "features";

/* ───────────────── Lazy steps ───────────────── */
const StepOne = lazy(() => import("./DealForm"));

/* ───────────────── Component ───────────────── */

const FormIsland: React.FC<FormIslandProps> = () => {
  return (
    <div className="bg-secondary">{<StepOne />}</div>
  );
};

export default FormIsland;
