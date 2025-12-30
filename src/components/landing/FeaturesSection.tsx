"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

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
      className="bg-background w-full"
    >
      <div className="mx-auto w-3/5 relative container py-40 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-title items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border-4 p-6 h-48 flex flex-col justify-between bg-background text-foreground">
              <div>
                <h3 className="text-2xl font-bold mb-3">AI Supercharged</h3>
                <p className="leading-relaxed">
                  The perfect balance of human creativity and AI efficiency
                </p>
              </div>
            </div>

            <div className="border-4 p-6 h-48 flex flex-col justify-between bg-background text-foreground">
              <div>
                <h3 className="text-2xl font-bold mb-3">Business Control</h3>
                <p className="leading-relaxed">
                  Transparency and clarity that leads to better business
                  decisions
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 flex relative">
            <div className="absolute bottom-0 right-0">
              <div className="relative w-32 h-32 bg-black">
                <div className="relative w-32 h-32 bg-black">
                  <div className="absolute -top-16 right-0 w-16 h-16 bg-orange-500 z-10" />
                  <div className="absolute -top-16 right-16 w-16 h-16 bg-foreground" />
                  <div className="absolute bottom-0 -left-16 w-16 h-16 bg-orange-500" />
                </div>
              </div>
            </div>

            <div className="bg-card border p-6 flex flex-col justify-between text-title h-[408px] w-full">
              <div>
                <div className="flex items-around justify-between w-full">
                  <h3 className="text-3xl font-bold mb-4">MVP to Enterprise</h3>
                  <div className="w-16 h-16 flex items-center justify-center z-10">
                    <img
                      src={"/Frame.png"}
                      alt="spark/co"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-3/4">
                  <p className="mb-6 text-xl font-semibold">
                    Guidance and support from just an idea to thousands of users
                  </p>

                  <ul className="space-y-4 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                      <span>Battle tested systems that are ready to scale</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                      <span>Flexible Partnership Models</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                      <span>
                        Consulting on go-to-market and growth strategy
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
