import React, { useState } from "react";
import type { HeroSectionProps } from "../utils/interfaces";
import BuildScaleToggle from "./components/BuildScaleComponent";
import { ChevronRight } from "lucide-react";

/* ───────────────── Component ───────────────── */

const HeroSection: React.FC<HeroSectionProps> = ({ setMode }) => {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    console.log("email", email);
  };
  return (
    <main
      className="
    flex flex-row items-start justify-center 

  z-80 mx-20"
    >
      <div className="absolute top-0 left-0 w-full h-[128px] bg-foreground  "></div>
      <section
        data-header="light"
        className="
    container relative px-12 pt-10 mt-[128px]
    bg-transparent w-1/2 
    min-h-[807.5px]  b
  "
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-background mb-6 leading-tight">
            Software that&apos;s up to speed
          </h1>
          <p className="text-3xl mb-4 max-w-2xl text-background leading-snug">
            Build <span className="font-bold">[unbreakable]</span> software with
            <span className="font-bold text-primary"> AI supercharged </span>
            efficiency.
          </p>
          {/* Technology Icons */}
          <div className="flex items-center gap-8 mb-12">
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
          {/* ───── Get Started Block ───── */}
          <div className="mb-8 w-[450px]  ">
            <h2 className="text-background font-bold mb-3 text-xl">
              Get started with Build
            </h2>
            <div className="flex items-center bg-foreground rounded-lg  shadow-md w-full ">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 outline-none text-background  "
              />
              <button
                onClick={handleSubmit}
                className="px-4 h-full flex items-center justify-center text-background bg-foreground "
              >
                <ChevronRight className="w-7 h-7 text-background bg-foreground border-2 border-background rounded-md" />
              </button>
            </div>
          </div>
          {/* ──────────────────────────── */}
          <BuildScaleToggle setMode={setMode} />
        </div>
      </section>

      <section className=" relative  w-1/2   "></section>
    </main>
  );
};

export default HeroSection;
