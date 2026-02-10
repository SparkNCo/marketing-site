import React, { lazy } from "react";
import type { FormIslandProps } from "./utils/interfaces";
import PostsSection from "./landing/PostsSection";

/* Lazy sections */
const HeroSection = lazy(() => import("./landing/HeroSection"));
const FeaturesSection = lazy(() => import("./landing/FeaturesSection"));
const ProcessSection = lazy(() => import("./landing/ProcessSection"));
const CaseStudiesSection = lazy(() => import("./landing/CaseStudies"));

const LandingIsland: React.FC<FormIslandProps> = ({ setMode }) => {
  return (
    <div className="bg-background">
      <HeroSection setMode={setMode} />
      <FeaturesSection />
      <PostsSection />
      <ProcessSection />
      <CaseStudiesSection />
    </div>
  );
};

export default LandingIsland;
