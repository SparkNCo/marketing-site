import React, { lazy } from "react";
import type { FormIslandProps } from "./utils/interfaces";
import PostsSection from "./landing/PostsSection";
import SquaresPostLayout from "./posts/SquaresPostLayout";
import { HeroSectionSquaresConfig } from "./SquareConfig";

/* Lazy sections */
const HeroSection = lazy(() => import("./landing/HeroSection"));
const FeaturesSection = lazy(() => import("./landing/FeaturesSection"));
const ProcessSection = lazy(() => import("./landing/ProcessSection"));
const CaseStudiesSection = lazy(() => import("./landing/CaseStudies"));
const FastTrackSection = lazy(() => import("./landing/FastTrackSection"));

const LandingIsland: React.FC<FormIslandProps> = ({ setMode }) => {
  return (
    <div className="bg-background">
      <SquaresPostLayout squares={HeroSectionSquaresConfig} indexLayout={"0"} indexComponent={"1"} >
        <HeroSection setMode={setMode} />
      </SquaresPostLayout>
      <FeaturesSection />
      <PostsSection />
      <FastTrackSection />
      <ProcessSection />
      <CaseStudiesSection />
    </div>
  );
};

export default LandingIsland;
