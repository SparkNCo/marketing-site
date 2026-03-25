"use client";
import { useRef, useState } from "react";
import PrimaryButton from "../ui/primary-button";
import type { HeroSectionProps } from "../utils/interfaces";
import EmailCapture from "../ui/EmailTemplate/EmailInput";

const FastTrackSection: React.FC<HeroSectionProps> = ({ setMode }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      setShake(true);

      setTimeout(() => setShake(false), 400);
      return;
    }

    setError("");
    setMode?.("form");
  };

  return (
    <main
      ref={sectionRef}
      className="flex flex-col items-center justify-center bg-transparent text-center py-24 gap-6 h-[1000px] sm:h-[1000px] md:h-[1250px] lg:h-[1386px]"
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
        buttonClassName="w-[130px] h-[60px] self-center"
        onValidSubmit={() => setMode?.("form")}
      />
    </main>
  );
};

export default FastTrackSection;
