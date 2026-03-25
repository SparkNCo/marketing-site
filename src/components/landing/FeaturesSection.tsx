"use client";

import { useState } from "react";
import FeaturesOptions from "./components/FeaturesOptions";
import SquaresPostLayout from "../posts/SquaresPostLayout";
import { SquaresConfigMVP } from "./components/SquaresConfigMVP";
import { PrincipleBox } from "./components/PrincipleBox";

const LeftBox = ({ title, summary, onClick }) => {
  return (
    <div
      onClick={() => onClick()}
      className="p-2 sm:p-4 flex-1 flex flex-col justify-between bg-foreground text-background min-h-[140px] md:min-h-[160px] cursor-pointer "
    >
      <div className="">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-3 sm:gap-4">
            <img
              src={"/Frame.png"}
              alt="spark/co"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain cursor-pointer"
            />
            <h3 className="text-heading2 font-bold">{title}</h3>
          </div>
        </div>

        <p className="leading-relaxed mt-4 text-body  ">{summary}</p>
      </div>
    </div>
  );
};

function FeaturesSection({ setSelectedFeatures }) {
  const [mode, setMode] = useState<"supercharged" | "control" | "mvp">("mvp");
  const modes = ["supercharged", "control", "mvp"] as const;
  const content = {
    supercharged: {
      title: "AI Supercharged",
      summary: "The perfect balance of human creativity, and AI efficiency",
    },
    control: {
      title: "Business Control",
      summary:
        "Transparency and clarity that leads to better business decisions",
    },
    mvp: {
      title: "MVP to Enterprise",
      summary:
        "Guidance and support from “just an idea” to thousands of users.",
    },
  };

  const featuresConfig = {
    mvp: [
      "Battle tested systems that are ready to scale",
      "Flexible Partnership Models",
      "Consulting on go-to-market and growth strategy",
    ],
    supercharged: [
      "Battle tested systems that are ready to scale",
      "Flexible Partnership Models",
      "Consulting on go-to-market and growth strategy",
    ],
    control: [
      "Battle tested systems that are ready to scale",
      "Flexible Partnership Models",
      "Consulting on go-to-market and growth strategy",
    ],
  };

  return (
    <div className="mx-auto w-full max-w-[850px]  lg:max-w-[1530px] px-4 sm:px-4 md:px-8 lg:px-12 relative mb-4 mt-40 ">
      {" "}
      <h1 className=" text-largeBody md:text-heading1  text-center  font-bold tracking-tight text-foreground my-10 leading-tight mt-28 lg:mt-4">
        Development Principles
      </h1>
      {/* MOBILE LAYOUT */}
      <div className="flex flex-col gap-4 lg:hidden max-w-[850px]   ">
        {modes.map((item) => (
          <PrincipleBox
            key={item}
            modeKey={item}
            activeMode={mode}
            setMode={setMode}
            title={content[item].title}
            summary={content[item].summary}
            features={featuresConfig[item]}
            setSelectedFeatures={setSelectedFeatures}
          />
        ))}
      </div>
      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:flex flex-row gap-6 items-stretch w-full max-w-[850px] mx-auto ">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6 md:w-1/2 max-w-[275px]  ">
          {modes
            .filter((m) => m !== mode)
            .map((item) => (
              <LeftBox
                key={item}
                title={content[item].title}
                summary={content[item].summary}
                onClick={() => {
                  setMode(item);
                  setSelectedFeatures?.([content[item].title]);
                }}
              />
            ))}
        </div>
        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/2 flex relative min-h-[400px] w-full  ">
          <SquaresPostLayout squares={SquaresConfigMVP}>
            <FeaturesOptions
              mode={mode}
              title={content[mode].title}
              subtitle={content[mode].summary}
              featuresConfig={featuresConfig}
            />
          </SquaresPostLayout>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
