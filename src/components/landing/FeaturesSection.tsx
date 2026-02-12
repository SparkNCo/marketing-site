"use client";

import { useRef, useState } from "react";
import FeaturesOptions from "./components/FeaturesOptions";
import SquaresPostLayout from "../posts/SquaresPostLayout";
import { SquaresConfigMVP } from "./components/SquaresConfigMVP";

const LeftBox = ({ title, summary, onClick }) => {
  return (
    <div className="p-6 flex-1 flex flex-col justify-between bg-foreground text-background h-[160px] rounded-tl-lg ">
      <div>
        <div className="flex flex-row justify-between ">
          <div className="flex flex-row items-center gap-4">
            <img
              src={"/Frame.png"}
              alt="spark/co"
              className="w-8 h-8 object-contain"
              onClick={() => onClick()}
            />{" "}
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
          </div>
        </div>

        <p className="leading-relaxed font-semibold w-3/4">{summary}</p>
      </div>
    </div>
  );
};

function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<"supercharged" | "control" | "mvp">("mvp");

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

  return (
    <div className="mx-auto w-[850px] relative container mb-6 overflow-hidden">
      <h1 className="w-fit mx-auto text-5xl font-bold tracking-tight text-foreground my-12 leading-tight">
        Development Principles
      </h1>

      <div className="flex flex-row gap-6 text-title items-stretch h-[400px]">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          <LeftBox
            title={content.supercharged.title}
            summary={content.supercharged.summary}
            onClick={() => setMode("supercharged")}
          />

          <LeftBox
            title={content.control.title}
            summary={content.control.summary}
            onClick={() => setMode("control")}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full flex relative">
          <div className="h-full w-full flex">
            <SquaresPostLayout squares={SquaresConfigMVP}>
              <FeaturesOptions
                mode={mode}
                title={content.mvp.title}
                subtitle={content.mvp.summary}
              />
            </SquaresPostLayout>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
