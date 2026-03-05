import React, { lazy, useEffect, useState } from "react";
import type { FormIslandProps } from "./utils/interfaces";
import PostsSection from "./landing/PostsSection";
import SquaresPostLayout from "./posts/SquaresPostLayout";
import {
  FastTrackSquaresConfig,
  FooterLeftRightSquaresMobile,
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const fastTrackSquares = isMobile
    ? FastTrackSquaresConfig
    : FastTrackSquaresConfig;

  return (
    <div className="bg-background">
      <SquaresPostLayoutEdges
        squares={HeroSectionSquaresConfig}
        indexLayout={"0"}
        indexComponent={"1"}
      >
        <HeroSection setMode={setMode} />
      </SquaresPostLayoutEdges>

      <FeaturesSection />
      <PostsSection />

      <div className="relative w-full overflow-hidden border-4">
        <div
          className="relative"
          style={{
            width: "2550px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <SquaresPostLayoutEdges
            squares={fastTrackSquares}
            indexLayout={0}
            indexComponent={1}
          >
            <FastTrackSection />
          </SquaresPostLayoutEdges>
        </div>
      </div>

      <ProcessSection />
      <CaseStudiesSection isMobile={isMobile} />

      <SquaresPostLayoutEdges
        squares={
          isMobile ? FooterLeftRightSquaresMobile : FooterLeftRightSquares
        }
        indexLayout={"0"}
        indexComponent={"1"}
      >
        <FooterSqareSection />
      </SquaresPostLayoutEdges>

      <Footer />
    </div>
  );
};

export default LandingIsland;
