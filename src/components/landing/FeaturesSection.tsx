"use client";

import { useEffect, useRef, useState } from "react";
import FeaturesOptions from "./components/FeaturesOptions";

function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mode, setMode] = useState<"supercharged" | "control" | "">("");

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const offset =
          window.scrollY -
          (sectionRef.current.offsetTop - window.innerHeight / 2);
        setScrollY(offset * 0.1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      data-header="dark"
      ref={sectionRef}
      className="bg-background w-full "
    >
      <div className="h-24 w-full  relative">
        <div className="absolute top-0 left-0 pointer-events-none bg-foreground">
          <div className="relative w-32 h-16">
            <div className="absolute -bottom-16 left-0 w-16 h-16 bg-orange-500 z-10" />
            <div className="absolute top-0 -right-16 w-16 h-16 bg-orange-500" />
          </div>
        </div>
      </div>

      <div className="mx-auto w-3/5 relative container py-40 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 text-title items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border-4 p-6 h-48 flex flex-col justify-between bg-background text-foreground">
              <div>
                <div className="flex flex-row justify-between gap-6">
                  <h3 className="text-3xl font-bold mb-3">AI Supercharged</h3>
                  <img
                    onClick={() => setMode("supercharged")}
                    src="/GoIcon.png"
                    alt="Success"
                    className="w-8 h-8 object-contain cursor-pointer"
                  />
                </div>
                <p className="leading-relaxed w-3/4">
                  The perfect balance of human creativity and AI efficiency
                </p>
              </div>
            </div>

            <div className="border-4 p-6 h-48 flex flex-col justify-between bg-background text-foreground">
              <div>
                <div className="flex flex-row justify-between gap-6">
                  <h3 className="text-3xl font-bold mb-3">Business Control</h3>
                  <img
                    onClick={() => setMode("control")}
                    src="/GoIcon.png"
                    alt="Success"
                    className="w-8 h-8 object-contain cursor-pointer"
                  />
                </div>
                <p className="leading-relaxed w-3/4">
                  Transparency and clarity that leads to better business
                  decisions
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 flex relative">
            <div className="absolute bottom-0 right-0">
              <div className="relative w-32 h-32 bg-background">
                <div className="relative w-32 h-32 bg-background">
                  <div className="absolute -top-16 right-0 w-16 h-16 bg-orange-500 z-10" />
                  <div className="absolute -top-16 right-16 w-16 h-16 bg-foreground" />
                  <div className="absolute bottom-0 -left-16 w-16 h-16 bg-orange-500" />
                </div>
              </div>
            </div>

            <FeaturesOptions mode={mode} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
