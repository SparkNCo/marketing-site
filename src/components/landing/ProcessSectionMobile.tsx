"use client";
import { useEffect, useRef, useState } from "react";
import { steps } from "./ProcessSection";
import { ProcessStepItem, TimelineLine } from "./ProcessItems";

export default function ProcessSectionMobile() {
  const visibleSteps = steps.filter((s) => s.title);

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
    <section className="bg-background py-16 text-foreground mt-8">
      <div className="px-6">
        <h2 className="text-largeBody font-bold text-center mb-20">
          The Spark & Co Process
        </h2>

        <div className="relative">
          <TimelineLine className="left-[50px] top-[30px] bottom-[50px] w-[2px]" />

          <div className="flex flex-col gap-28 ">
            {visibleSteps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <div
                  key={step.id}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className="grid grid-cols-[30px_30px_1fr] items-start gap-2"
                >
                  <ProcessStepItem
                    index={index}
                    title={step.title}
                    isActive={isActive}
                  />

                  {/* Step content */}
                  <div className="col-start-3">
                    <div
                      className={`
                        mt-8 flex flex-col gap-5
                        transition-all duration-500 ease-out
                        ${
                          isActive
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-4 pointer-events-none"
                        }
                      `}
                    >
                      {/* TITLE */}
                      <div className="font-semibold text-body">
                        {step.title}
                      </div>

                      {/* DESCRIPTION */}
                      <p className="text-smalltext leading-relaxed">
                        {step.description}
                      </p>

                      {/* IMAGE */}
                      <div
                        className="bg-center bg-contain bg-no-repeat transition-all duration-500"
                        style={{
                          backgroundImage: `url(${
                            step.image || "/dashboard.png"
                          })`,
                          minHeight: "220px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
