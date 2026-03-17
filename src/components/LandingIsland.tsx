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
import SquaresGridLayout from "./layouts/GridLayout";
import { useResponsiveCellSize } from "./utils/useResponsiveCellSize";

/* Lazy sections */
const HeroSection = lazy(() => import("./landing/HeroSection"));
const FeaturesSection = lazy(() => import("./landing/FeaturesSection"));
const ProcessSection = lazy(() => import("./landing/ProcessSection"));
const CaseStudiesSection = lazy(() => import("./landing/CaseStudies"));
const FastTrackSection = lazy(() => import("./landing/FastTrackSection"));

const LandingIsland: React.FC<LandingIslandProps> = ({ mode, setMode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const cellSize = useResponsiveCellSize();

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="bg-transparent ">
      <SquaresGridLayout
        squares={HeroSectionSquaresConfig}
        background="#F7F4F0"
        width="100%"
        cellSize={cellSize}
        className="h-[650px] sm:h-[670px] md:h-[750px] lg:h-[auto] "
        indexLayout={0}
        indexComponent={1}
      >
        <HeroSection
          setMode={typeof setMode === "function" ? setMode : () => {}}
        />
      </SquaresGridLayout>

      <FeaturesSection />
      <PostsSection />

      <SquaresGridLayout
        squares={FastTrackSquaresConfig}
        background="#F7F4F0"
        width="100%"
        cellSize={cellSize}
        className="h-[650px] md:h-[1150px] lg:h-auto "
        indexLayout={0}
        indexComponent={1}
      >
        <FastTrackSection />
      </SquaresGridLayout>

      {/* <SquaresPostLayoutEdges
        squares={FastTrackSquaresConfig}
        indexLayout={0}
        indexComponent={1}
        isMobile={isMobile}
      >
        <FastTrackSection />
      </SquaresPostLayoutEdges> */}

      <ProcessSection isMobile={isMobile} />
      <CaseStudiesSection isMobile={isMobile} />

      {/*     <SquaresPostLayoutEdges
        squares={FooterLeftRightSquares}
        indexLayout={0}
        indexComponent={1}
        isMobile={isMobile}
      >
        <FooterSqareSection />
      </SquaresPostLayoutEdges> */}

      <SquaresGridLayout
        squares={FooterLeftRightSquares}
        background="#111111"
        width="100%"
        cellSize={cellSize}
        className="h-[350px] md:h-[350px] lg:h-auto "
        indexLayout={0}
        indexComponent={1}
      >
        <FooterSqareSection />
      </SquaresGridLayout>

      <Footer mode={mode} />
    </div>
  );
};

export default LandingIsland;
