import React, { useState } from "react";
import type { HeroSectionProps } from "../utils/interfaces";
import EmailCapture from "../ui/EmailTemplate/EmailInput";

const HeroSection: React.FC<HeroSectionProps> = ({ setMode }) => {
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
    <main className="flex flex-col lg:flex-row overflow-hidden justify-start mx-6 lg:mx-20  relative">
      {/* <div className="absolute top-0 left-0 w-full h-[95px] bg-foreground w-[100vw] " /> */}
      
      <section
        data-header="light"
        className="
          relative
          w-full lg:w-1/2
          mt-[25px] 
          min-h-[535px] lg:min-h-[800px]
          flex flex-col items-start 
        "
      >
        {/* CONTENT WRAPPER */}
        <div className="w-full flex flex-col items-start ">
          {/* TITLE */}
          <h1 className="text-largeBody md:text-heading1 font-bold tracking-tight text-background mb-6 leading-tight max-w-[520px]">
            Software that&apos;s up to speed
          </h1>
          {/* SUBTITLE */}
          <p className="text-body md:text-largeBody mb-6 text-background leading-snug max-w-[500px] ">
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
          <EmailCapture
            label="Ready to build?"
            buttonClassName="w-[130px] h-[60px] text-foreground bg-background"
            containerClassName="mb-6 w-full max-w-[420px]"
            inputWrapperClassName="max-w-[380px] md:max-w-full "
            onValidSubmit={() => setMode?.("form")}
          />
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
