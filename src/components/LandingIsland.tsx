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

const LandingIsland: React.FC<LandingIslandProps> = ({
  mode,
  // setMode,
  goToFormSlide,
  goToFormFade,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const cellSize = useResponsiveCellSize();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "MVP to Enterprise",
  ]);

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
      <div className="relative top-0 left-0 w-full h-[120px] bg-foreground z-20" />
      <SquaresGridLayout
        squares={HeroSectionSquaresConfig}
        background="#111111"
        width="100%"
        cellSize={cellSize}
        className="h-[590px] md:h-[620px] lg:h-[auto] xl:h-[830px] "
        indexLayout={0}
        indexComponent={1}
      >
        {" "}
        {/* */}
        <HeroSection
          setMode={
            typeof goToFormSlide === "function" ? goToFormSlide : () => {}
          }
        />
      </SquaresGridLayout>
      <FeaturesSection setSelectedFeatures={setSelectedFeatures} />
      <PostsSection selectedFeatures={selectedFeatures} />

      <SquaresGridLayout
        squares={FastTrackSquaresConfig}
        background="#F7F4F0"
        width="100%"
        cellSize={cellSize}
        className="my-[15rem]"
        indexLayout={0}
        indexComponent={1}
      >
        <FastTrackSection
          setMode={typeof goToFormFade === "function" ? goToFormFade : () => {}}
        />
      </SquaresGridLayout>

      <ProcessSection isMobile={isMobile} />
      <CaseStudiesSection isMobile={isMobile} />

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
