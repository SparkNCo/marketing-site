"use client";

import { useRef, useState } from "react";
import FeaturesOptions from "./components/FeaturesOptions";

function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<"supercharged" | "control" | "mvp">("mvp");

  const content = {
    supercharged: { title: "AI Supercharged", summary: "The perfect balance of human creativity, and AI efficiency" },
    control: { title: "Business Control", summary: "Transparency and clarity that leads to better business decisions" },
    mvp: { title: "MVP to Enterprise", summary: "Guidance and support from “just an idea” to thousands of users." }
  }

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

      <div className="mx-auto w-3/4 relative container pt-40 pb-20 overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 text-title items-stretch">
          <div className="xl:col-span-2 space-y-6">

            {["supercharged", "control", "mvp"].map((m) => {
              if (m !== mode) {
                return (
                  <div className="border-4 p-6 h-48 flex flex-col justify-between bg-background text-foreground">
                    <div>
                      <div className="flex flex-row justify-between gap-6">
                        <h3 className="text-3xl font-bold mb-3">{content[m].title}</h3>
                        <img
                          onClick={() => { setMode(m) }}
                          src="/GoIcon.png"
                          alt="Success"
                          className="w-8 h-8 object-contain cursor-pointer"
                        />
                      </div>
                      <p className="leading-relaxed w-3/4">
                        {content[m].summary}
                      </p>
                    </div>
                  </div>);
              }
            })
            }
          </div>

          <div className="xl:col-span-3 flex relative">
            <div className="absolute bottom-0 right-0">
              <div className="relative w-32 h-32 bg-background">
                <div className="relative w-32 h-32 bg-background">
                  <div className="absolute -top-16 right-0 w-16 h-16 bg-orange-500 z-10" />
                  <div className="absolute -top-16 right-16 w-16 h-16 bg-foreground" />
                  <div className="absolute bottom-0 -left-16 w-16 h-16 bg-orange-500" />
                </div>
              </div>
            </div>

            <FeaturesOptions mode={mode} title={content[mode].title} subtitle={content[mode].summary}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
