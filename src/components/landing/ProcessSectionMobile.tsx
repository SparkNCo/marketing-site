"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  { id: 1, title: "Sign Up" },
  { id: 2, title: "Project Discovery" },
  { id: 3, title: "MVP" },
];

export default function ProcessSectionMobile() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateActiveStep = () => {
      const viewportCenter = window.innerHeight / 2;

      let closest = 0;
      let closestDistance = Infinity;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });

      setActiveStep(closest);
    };

    window.addEventListener("scroll", updateActiveStep);
    window.addEventListener("resize", updateActiveStep);

    updateActiveStep();

    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, []);

  return (
    <section className="bg-background py-16 text-foreground">
      <div className="px-6">
        <h2 className="text-3xl font-bold text-center mb-20">
          The Spark & Co Process
        </h2>

        <div className="flex flex-col gap-32">
          {steps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[index] = el)}
                className="transition-all duration-500"
              >
                <h3
                  className={`text-lg font-bold border-4 border-white rounded-xl p-4 text-center transition-all duration-300
                  ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-40"}`}
                >
                  {step.title}
                </h3>

                {isActive && (
                  <div className="mt-8 flex flex-col gap-5 animate-fade-in">
                    <div className="font-semibold text-sm">
                      Project Discovery
                    </div>

                    <p className="text-sm leading-relaxed">
                      The more we can solidify at the start of the project,
                      the smoother the project will be. We start with a
                      discovery call to go through the ins and outs of your
                      industry, ICPs and problem statements.
                    </p>

                    <div
                      className="bg-center bg-contain bg-no-repeat"
                      style={{
                        backgroundImage: "url('/dashboard.png')",
                        minHeight: "220px",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}