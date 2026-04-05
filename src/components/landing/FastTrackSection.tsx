"use client";
import { useRef } from "react";
import type { HeroSectionProps } from "../utils/interfaces";
import EmailCapture from "../ui/EmailTemplate/EmailInput";

const FastTrackSection: React.FC<HeroSectionProps> = ({ setMode }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <main
      ref={sectionRef}
      className="flex flex-col items-center justify-center bg-transparent text-center py-24 gap-6 h-[900px] md:min-h-[1100px] lg:min-h-[1200px]"
    >
      <h1 className="font-bold tracking-tight text-background leading-tight text-largeBody md:text-heading1 ">
        Fast Track Your Success
      </h1>

      <p className="text-background leading-snug max-w-[90%] md:max-w-2xl text-body w-[280px] sm:w-[480px] md:w-[720px] lg:w-[600px]">
        Modernize your software development process and ignite your business
        potential.
      </p>

      <EmailCapture
        containerClassName="max-w-xl w-full items-center"
        inputWrapperClassName="w-[260px] sm:w-[320px] md:w-[378px]"
        buttonClassName="w-[130px] h-[60px] self-center text-foreground bg-background"
        onValidSubmit={() => setMode?.("form")}
      />
    </main>
  );
};

export default FastTrackSection;
