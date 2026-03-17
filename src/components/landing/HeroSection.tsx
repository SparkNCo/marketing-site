import React, { useState } from "react";
import type { HeroSectionProps } from "../utils/interfaces";

const HeroSection: React.FC<HeroSectionProps> = ({ setMode }) => {
  const [email, setEmail] = useState("");

  return (
    <main
      className="
      flex flex-col lg:flex-row overflow-hidden
      items-start justify-center
      z-80
      mx-6 lg:mx-20 mt-2
    "
    >
      <div className="absolute top-0 left-0 w-full h-[105px] bg-foreground "></div>

      {/* LEFT SIDE */}
      <section
        data-header="light"
        className="
        container relative 
        px-6 lg:px-12
        pt-10
        mt-[128px]
        bg-transparent
        w-full lg:w-1/2
        min-h-[535px]    lg:min-h-[807.5px]
      "
      >
        <div>
          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-background mb-6 leading-tight">
            Software that&apos;s up to speed
          </h1>
          <p className="text-2xl lg:text-3xl mb-6 max-w-2xl text-background leading-snug  w-[380px] md:w-[500px] lg:w-[1200px]">
            Build <span className="font-bold">[unbreakable]</span> software with
            <span className="font-bold text-primary"> AI supercharged </span>
            efficiency.
          </p>
          {/* TECHNOLOGY ICONS */}
          <div className="flex items-center gap-6 lg:gap-8 mb-10">
            {[
              { src: "/awsIcon.png", alt: "AWS" },
              { src: "/gcpIcon.png", alt: "Google Cloud" },
              { src: "/azureIcon.png", alt: "Azure" },
              { src: "/sbaseIcon.png", alt: "Supabase" },
            ].map((tech) => (
              <div
                key={tech.alt}
                className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center"
              >
                <img
                  src={tech.src}
                  alt={tech.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
          {/* GET STARTED */}
          <div className="mb-6 w-full lg:w-[450px]">
            <h2 className="text-background font-bold mb-3 text-lg lg:text-xl">
              Ready to build?
            </h2>

            <div className="flex items-center bg-foreground  shadow-md w-[260px] sm:w-[320px] md:w-[378px] ">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 outline-none text-background"
              />
            </div>
          </div>

          <button
            onClick={() => setMode?.("form")}
            className="py-4 px-6 shadow-md text-foreground bg-background font-bold text-lg lg:text-xl"
          >
            Let's Go
          </button>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section
        className="
        relative
        w-full lg:w-1/2
        mt-10 lg:mt-0
      "
      ></section>
    </main>
  );
};

export default HeroSection;
