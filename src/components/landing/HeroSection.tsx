import React from "react";
import type { HeroSectionProps } from "../utils/interfaces";
import BuildScaleToggle from "./components/BuildScaleComponent";

/* ───────────────── Component ───────────────── */

const HeroSection: React.FC<HeroSectionProps> = ({ setMode }) => {
  return (
    <main
      className="
    flex flex-row items-start justify-center
 bg-background "
    >
      <div className="absolute top-0 left-0 w-full h-[128px] bg-foreground"></div>
      <section
        data-header="light"
        className="container relative px-24 pt-10 mt-[128px] pb-20 bg-foreground w-1/2 h-[calc(100vh-256px)] min-h-[600px] min-w-[750px]"
      >
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-background mb-6 text-balance leading-tight">
            Hands-free Software Delivery
          </h1>
          <p
            className="text-4xl mb-12  max-w-2xl"
            style={{ color: "var(--background)" }}
          >
            Take the first step towards enterprise grade software, at next
            generation speeds
          </p>

          {/* Technology Icons */}
          <div className="flex items-center gap-8 mb-16">
            {/* AWS */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/awsIcon.png"
                alt="AWS"
                className="w-full h-full object-contain"
              />
            </div>

            {/* GCP */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/gcpIcon.png"
                alt="Google Cloud"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Azure */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/azureIcon.png"
                alt="Azure"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Supabase (sbase) */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/sbaseIcon.png"
                alt="Supabase"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <BuildScaleToggle setMode={setMode} />
        </div>

        <div className="absolute bottom-0 right-0 ">
          <div className="relative w-32 h-32 bg-background">
            <div className="relative w-32 h-32 bg-background">
              <div className="absolute -top-16 right-0 w-16 h-16 bg-orange-500 z-10" />
              <div className="absolute -top-16 right-16 w-16 h-16 bg-foreground" />
              <div className="absolute bottom-0 -left-16 w-16 h-16 bg-orange-500" />
            </div>
          </div>
        </div>
      </section>

      <section className=" relative  w-1/2   ">
        <div className="absolute top-0 left-0 pointer-events-none bg-foreground">
          <div className="relative w-32 h-32">
            <div className="absolute -bottom-16 left-0 w-16 h-16 bg-orange-500 z-10" />
            <div className="absolute top-0 -right-16 w-16 h-16 bg-orange-500" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
