"use client";
import { useRef, useState } from "react";

function FastTrackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  return (
    <main
      ref={sectionRef}
      className="flex flex-col items-center justify-center bg-transparent text-center py-24 gap-6 h-[680px]  md:h-[1186px] lg:h-[1186px]"
    >
      {/* Heading */}
      <h1 className="font-bold tracking-tight text-background leading-tight text-3xl sm:text-4xl md:text-4xl">
        Fast Track Your Success
      </h1>

      {/* Paragraph */}
      <p className="text-background leading-snug max-w-[90%] md:max-w-2xl text-lg sm:text-xl md:text-2xl lg:text-3xl w-[280px] sm:w-[480px] md:w-[720px] lg:w-[600px]">
        Modernize your software development process and ignite your business
        potential.
      </p>

      {/* Email input */}
      <div className="max-w-xl">
        <div className="flex items-center bg-foreground  shadow-md w-[260px] sm:w-[320px] md:w-[378px] ">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 outline-none text-background"
          />
          {/* <button
            onClick={handleSubmit}
            className="px-4 h-full flex items-center justify-center text-background bg-foreground"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-background bg-foreground border-2 border-background rounded-md" />
          </button> */}
        </div>
      </div>

      {/* Toggle */}
      {/* <div className="mx-auto w-[280px] md:w-[420px] lg:w-[600px]">
        <BuildScaleToggle setMode={setMode} centerExpanded={true} />
      </div> */}
    </main>
  );
}

export default FastTrackSection;
