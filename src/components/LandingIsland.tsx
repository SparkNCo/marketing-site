import React, { lazy } from "react";
import type { FormIslandProps } from "./utils/interfaces";

/* ───────────────── Types ───────────────── */

/* ───────────────── Lazy steps ───────────────── */
const HeroSection = lazy(() => import("./landing/HeroSection"));
const FeaturesSection = lazy(() => import("./landing/FeaturesSection"));

/* ───────────────── Component ───────────────── */

const LandingIsland: React.FC<FormIslandProps> = ({ initialStep }) => {
  return (
    <div className="bg-backgrounsd">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default LandingIsland;
