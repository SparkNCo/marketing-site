import React, { lazy } from "react";
import type { FormIslandProps } from "./utils/interfaces";

/* ───────────────── Types ───────────────── */

/* ───────────────── Lazy steps ───────────────── */
const HeroSection = lazy(() => import("./landing/HeroSection"));
const FeaturesSection = lazy(() => import("./landing/FeaturesSection"));
const ProcessSection = lazy(() => import("./landing/ProcessSection"));
const CaseStudiesSection = lazy(() => import("./landing/CaseStudies"));

/* ───────────────── Component ───────────────── */

const LandingIsland: React.FC<FormIslandProps> = ({ initialStep }) => {
  return (
    <div className="bg-backgrounsd">
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <CaseStudiesSection />
    </div>
  );
};

export default LandingIsland;
