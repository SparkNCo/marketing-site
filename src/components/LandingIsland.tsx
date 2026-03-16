import React, { lazy, useEffect, useState } from "react";
import type { LandingIslandProps } from "./utils/interfaces";
import PostsSection from "./landing/PostsSection";
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

const LandingIsland: React.FC<LandingIslandProps> = ({ mode, setMode }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="bg-background ">
      <SquaresPostLayoutEdges
        squares={HeroSectionSquaresConfig}
        indexLayout={0}
        indexComponent={1}
        isMobile={isMobile}
      >
        <HeroSection
          setMode={typeof setMode === "function" ? setMode : () => {}}
        />
      </SquaresPostLayoutEdges>

      <FeaturesSection />
      <PostsSection />

      {/*       <div className="relative w-full overflow-hidden">
        <div
          className="relative"
          style={{
            width: "2550px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        > */}
      <SquaresPostLayoutEdges
        squares={FastTrackSquaresConfig}
        indexLayout={0}
        indexComponent={1}
        isMobile={isMobile}
      >
        <FastTrackSection />
      </SquaresPostLayoutEdges>
      {/*   </div>
      </div> */}

      <ProcessSection isMobile={isMobile} />
      <CaseStudiesSection isMobile={isMobile} />

      <SquaresPostLayoutEdges
        squares={FooterLeftRightSquares}
        indexLayout={0}
        indexComponent={1}
        isMobile={isMobile}
      >
        <FooterSqareSection />
      </SquaresPostLayoutEdges>

      <Footer mode={mode} />
    </div>
  );
};

export default LandingIsland;
