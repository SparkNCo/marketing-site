"use client";

import { useState } from "react";
import FeaturesOptions from "./components/FeaturesOptions";
import SquaresPostLayout from "../posts/SquaresPostLayout";
import { SquaresConfigMVP } from "./components/SquaresConfigMVP";
import { PrincipleBox } from "./components/PrincipleBox";

const MODES = [
  "rapidIteration",
  "fullOrchestration",
  "builtToScale",
  "businessTransparency",
  "aiInfrastructure",
] as const;

type PrincipleMode = (typeof MODES)[number];

const principleContent: Record<
  PrincipleMode,
  { title: string; description: string; bullets: string[] }
> = {
  rapidIteration: {
    title: "Rapid Iteration",
    description:
      "Quickly turn ideas into working software through structured, repeatable development cycles.",
    bullets: [
      "Launch features in weeks, not months",
      "Continuous improvements based on real user feedback",
      "Speed without sacrificing long-term stability",
    ],
  },
  fullOrchestration: {
    title: "Full Orchestration",
    description:
      "All parts of development are connected, automated, and optimized into one seamless system.",
    bullets: [
      "Planning, development, and deployment fully aligned",
      "Fewer bottlenecks across tools and teams",
      "Consistent delivery through integrated workflows",
    ],
  },
  builtToScale: {
    title: "Built to Scale",
    description:
      "Software designed to grow with your business without costly rewrites or limitations.",
    bullets: [
      "Architecture supports increasing users and features",
      "Avoid rebuilds as your product gains traction",
      "Flexible systems adapt to changing business needs",
    ],
  },
  businessTransparency: {
    title: "Business Transparency",
    description:
      "Clear visibility into progress, risks, and performance—without needing constant check-ins.",
    bullets: [
      "Real-time insight into project status and metrics",
      "Early visibility into risks and delays",
      "Less oversight required, more confidence in delivery",
    ],
  },
  aiInfrastructure: {
    title: "AI as Infrastructure",
    description:
      "AI is embedded across development to accelerate delivery, improve quality, and reduce risk.",
    bullets: [
      "Faster development through AI-assisted workflows",
      "Improved reliability with intelligent testing and monitoring",
      "Continuous optimization across the entire development lifecycle",
    ],
  },
};

const featuresConfig: Record<PrincipleMode, string[]> = {
  rapidIteration: principleContent.rapidIteration.bullets,
  fullOrchestration: principleContent.fullOrchestration.bullets,
  builtToScale: principleContent.builtToScale.bullets,
  businessTransparency: principleContent.businessTransparency.bullets,
  aiInfrastructure: principleContent.aiInfrastructure.bullets,
};

type LeftBoxProps = {
  title: string;
  onClick: () => void;
};

const LeftBox = ({ title, onClick }: Readonly<LeftBoxProps>) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 sm:p-4 flex-1 flex flex-col justify-center bg-foreground text-background min-h-[72px] md:min-h-[80px] cursor-pointer text-left"
    >
      <div className="flex flex-row items-center gap-3 sm:gap-4">
        <img
          src={"/Frame.png"}
          alt="spark/co"
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain shrink-0"
        />
        <h3 className="text-heading2 font-bold">{title}</h3>
      </div>
    </button>
  );
};

type FeaturesSectionProps = {
  setSelectedFeatures?: (features: string[]) => void;
};

function FeaturesSection({
  setSelectedFeatures,
}: Readonly<FeaturesSectionProps>) {
  const [mode, setMode] = useState<PrincipleMode>("rapidIteration");

  return (
    <div className="mx-auto w-full max-w-[950px]  px-4 sm:px-4 md:px-8 lg:px-12 relative mb-4 lg:mt-40 ">
      {" "}
      <h1 className=" text-largeBody md:text-heading1 text-center tracking-tight text-foreground my-2 leading-tight mt-28 lg:mt-4">
        Operating Principles
      </h1>
      <h2 className=" text-body text-center tracking-tight text-foreground mb-10 leading-tight max-w-[850px] mx-auto">
        Good software starts with strong foundations. Ours are backed by
        industry standards, best practices, and experience in a wide range of
        organizations.
      </h2>
      {/* MOBILE LAYOUT */}
      <div className="flex flex-col gap-4 lg:hidden max-w-[850px]   ">
        {MODES.map((item) => (
          <PrincipleBox
            key={item}
            modeKey={item}
            activeMode={mode}
            setMode={setMode}
            title={principleContent[item].title}
            summary={principleContent[item].description}
            features={featuresConfig[item]}
            setSelectedFeatures={setSelectedFeatures}
          />
        ))}
      </div>
      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:flex flex-row gap-4 items-stretch w-full max-w-[850px] mx-auto ">
        {/* LEFT COLUMN — title only; full copy in the expanded panel */}
        <div className="flex flex-col min-w-[300px] gap-4 ">
          {MODES.filter((m) => m !== mode).map((item) => (
            <LeftBox
              key={item}
              title={principleContent[item].title}
              onClick={() => {
                setMode(item);
                setSelectedFeatures?.([principleContent[item].title]);
              }}
            />
          ))}
        </div>
        {/* RIGHT COLUMN */}
        <div className="flex relative min-h-[400px] ">
          <SquaresPostLayout squares={SquaresConfigMVP}>
            <FeaturesOptions
              mode={mode}
              title={principleContent[mode].title}
              subtitle={principleContent[mode].description}
              featuresConfig={featuresConfig}
            />
          </SquaresPostLayout>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
