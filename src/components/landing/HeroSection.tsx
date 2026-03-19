import React, { useState } from "react";
import type { HeroSectionProps } from "../utils/interfaces";

const HeroSection: React.FC<HeroSectionProps> = ({ setMode }) => {
  const [email, setEmail] = useState("");

  return (
    <main className="flex flex-col lg:flex-row overflow-hidden justify-start mx-6 lg:mx-20 mt-2 relative">
      {/* TOP BAR */}
      <div className="absolute top-0 left-0 w-full h-[105px] bg-foreground" />

      {/* LEFT SIDE */}
      <section
        data-header="light"
        className="
          relative
          w-full lg:w-1/2
          pt-10 mt-[128px]
          min-h-[535px] lg:min-h-[800px]
          flex flex-col items-start
        "
      >
        {/* CONTENT WRAPPER */}
        <div className="w-full flex flex-col items-start">
          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-background mb-6 leading-tight max-w-[520px]">
            Software that&apos;s up to speed
          </h1>

          {/* SUBTITLE */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-6 text-background leading-snug max-w-[500px] md:max-w-[600px]">
            Build <span className="font-bold">[unbreakable]</span> software with
            <span className="font-bold text-primary"> AI supercharged </span>
            efficiency.
          </p>

          {/* TECH ICONS */}
          <div className="flex items-center gap-5 mb-10">
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

          {/* INPUT */}
          <div className="mb-6 w-full max-w-[420px]">
            <h2 className="text-background font-bold mb-3 text-lg lg:text-xl">
              Ready to build?
            </h2>

            <div className="flex items-center bg-foreground shadow-md w-full">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 outline-none text-background"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => setMode?.("form")}
            className="py-4 px-6 shadow-md text-foreground bg-background font-bold text-lg lg:text-xl"
          >
            Let&apos;s Go
          </button>
        </div>
      </section>

      {/* RIGHT SIDE */}
    </main>
  );
};

export default HeroSection;
