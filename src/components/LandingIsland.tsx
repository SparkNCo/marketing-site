import React, { lazy } from "react";
import type { FormIslandProps } from "./utils/interfaces";
import PostsSection from "./landing/PostsSection";
import SquaresPostLayout from "./posts/SquaresPostLayout";
import {
  FastTrackSquaresConfig,
  FooterLeftRightSquares,
  HeroSectionSquaresConfig,
} from "./SquareConfig";
import FooterSqareSection from "./landing/FooterSqareSection";
import Footer from "./Footer";
import SquaresPostLayoutEdges from "./posts/SquaresPostLayoutEdges";

/* Lazy sections */
const HeroSection = lazy(() => import("./landing/HeroSection"));
const FeaturesSection = lazy(() => import("./landing/FeaturesSection"));
const ProcessSection = lazy(() => import("./landing/ProcessSection"));
const CaseStudiesSection = lazy(() => import("./landing/CaseStudies"));
const FastTrackSection = lazy(() => import("./landing/FastTrackSection"));

const LandingIsland: React.FC<FormIslandProps> = ({ setMode }) => {
  return (
    <div className="bg-background">
      <SquaresPostLayout
        squares={HeroSectionSquaresConfig}
        indexLayout={"0"}
        indexComponent={"1"}
      >
        <HeroSection setMode={setMode} />
      </SquaresPostLayout>
      <FeaturesSection />
      <PostsSection />
      {/* WORKING HERE */}
      <div className="relative w-full overflow-hidden">
        <div
          className="relative"
          style={{
            width: "1850px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <SquaresPostLayoutEdges
            squares={FastTrackSquaresConfig}
            indexLayout={0}
            indexComponent={1}
          >
            <FastTrackSection />
          </SquaresPostLayoutEdges>
        </div>
      </div>
      {/* UP TILL HERE */}
      <ProcessSection />
      <CaseStudiesSection />
      <SquaresPostLayoutEdges
        squares={FooterLeftRightSquares}
        indexLayout={"0"}
        indexComponent={"1"}
      >
        <FooterSqareSection />
      </SquaresPostLayoutEdges>{" "}
      {/*       <SquaresPostLayout
        squares={FooterSectionSquaresConfig}
        indexLayout={"0"}
        indexComponent={"1"}
      >
        <FooterSqareSection />
      </SquaresPostLayout>{" "} */}
      <Footer />
    </div>
  );
};

export default LandingIsland;
