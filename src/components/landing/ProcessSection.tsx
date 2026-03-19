"use client";
import { useEffect, useRef, useState } from "react";
import ProcessSectionMobile from "./ProcessSectionMobile";
import { ProcessStepItem, TimelineLine } from "./ProcessItems";

export const steps = [
  { id: 0, title: "" },
  { id: 1, title: "Sign Up" },
  { id: 2, title: "Discovery" },
  { id: 3, title: "MVP" },
  { id: 4, title: "Beta" },
  { id: 5, title: "Launch" },
  { id: 6, title: "Scale" },
  { id: 7, title: "Support" },
  { id: 8, title: "" },
];

export default function ProcessSection({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return <ProcessSectionMobile />;
  }

  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const updateActiveStep = () => {
      const viewportCenter = window.innerHeight / 2;

      let closestStep = 0;
      let closestDistance = Infinity;

      stepRefs.current.forEach((stepElement, index) => {
        if (!stepElement) return;

        const rect = stepElement.getBoundingClientRect();
        const stepCenter = rect.top + rect.height / 2;
        const distance = Math.abs(stepCenter - viewportCenter);

        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && distance < closestDistance) {
          closestDistance = distance;
          closestStep = index;
        }
      });

      setActiveStep((prev) => (closestStep === prev ? prev : closestStep));
    };

    stepRefs.current.forEach((stepElement) => {
      if (!stepElement) return;

      const observer = new IntersectionObserver(updateActiveStep, {
        threshold: [0, 1],
      });

      observer.observe(stepElement);
      observers.push(observer);
    });

    updateActiveStep();

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const visibleSteps = steps.filter((step) => step.title);

  return (
    <section className="bg-background py-10 relative mt-8 ">
      <div className="container mx-auto px-4 md:px-6 py-10 max-w-[1530px]">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 md:mb-16 text-center">
          The Spark & Co Process
        </h2>

        <div className="grid grid-cols-[180px_1fr] md:grid-cols-[260px_1fr] lg:grid-cols-12 max-w-7xl mx-auto">
          <div className="lg:col-span-4 pr-2 md:pr-4 relative z-10 w-[350px]">
            <TimelineLine className="left-[58px] md:left-[33px] lg:left-[33px] top-[230px] bottom-[230px]" />

            {visibleSteps.map((step, index) => {
              const isFocused = index === activeStep;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={`grid grid-cols-[40px_40px_1fr] items-center my-10 md:my-20 min-h-[200px] md:min-h-[300px] transition-all duration-300
                  ${
                    isFocused
                      ? "opacity-100 blur-0 scale-100 translate-x-0 md:-translate-x-[25px]"
                      : "opacity-90 blur-[2px] scale-[0.8] md:scale-[0.65] -translate-x-[62px]"
                  }`}
                >
                  <ProcessStepItem
                    index={index}
                    title={step.title}
                    isActive={isFocused}
                  />
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-8 text-foreground relative z-0">
            <div className="sticky top-[200px] md:top-[300px] flex flex-col gap-6">
              <div className="w-full md:w-3/4 font-semibold text-sm md:text-lg">
                Project Discovery
              </div>

              <p className="text-sm md:text-xl">
                The more we can solidify at the start of the project, the
                smoother the project will be. We start with a discovery call to
                go through the ins and outs of your industry, ICPs and problem
                statements.
              </p>

              <div
                className="bg-center bg-contain bg-no-repeat"
                style={{
                  backgroundImage: "url('/dashboard.png')",
                  minHeight: "280px",
                  height: "50vh",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
