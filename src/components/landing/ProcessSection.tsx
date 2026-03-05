"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  { id: 0, title: "" },
  { id: 1, title: "Sign Up" },
  { id: 2, title: "Project Discovery" },
  { id: 3, title: "MVP" },
  { id: 4, title: "" },
];

export default function ProcessSection() {
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
    <section className="bg-background py-10 relative">
      <div className="container mx-auto px-4 md:px-6 py-10 max-w-[1530px]">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-12 md:mb-16 text-center">
          The Spark & Co Process
        </h2>

        <div className="grid grid-cols-[180px_1fr] md:grid-cols-[260px_1fr] lg:grid-cols-12 max-w-7xl mx-auto">
          {/* LEFT SIDE - Steps */}
          <div className="lg:col-span-4 pr-2 md:pr-4 relative z-10">
            {visibleSteps.map((step, index) => {
              const isFocused = index === activeStep;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={`p-2 md:p-4 my-10 md:my-20 mx-auto text-center transition-all duration-300 min-h-[200px] md:min-h-[300px] flex items-center justify-center
                  ${
                    isFocused
                      ? "opacity-100 blur-0 scale-100"
                      : "opacity-30 md:opacity-20 blur-sm scale-[0.8] md:scale-[0.65]"
                  }`}
                >
                  {step.title && (
                    <div className="inline-flex items-center justify-center px-2 md:px-6 py-3">
                      <h3 className=" text-sm md:text-2xl font-bold text-foreground whitespace-nowrap border-white rounded-xl p-2 md:p-4 min-w-[120px] w-full md:w-[18rem]">
                        {step.title}
                      </h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE - Sticky Content */}
          <div className="lg:col-span-8 text-foreground relative z-0">
            <div className="sticky top-[200px] md:top-[300px] flex flex-col gap-6">
              <div className="w-full md:w-3/4 font-semibold text-sm md:text-lg">
                Project Discovery
              </div>

              <p className="text-sm md:text-xl">
                The more we can solidify at the start of the project, the
                smoother the project will be. We start with a discovery call to
                go through the ins and outs of your industry, ICPSs and problem
                statements
              </p>

              <div
                className="bg-center bg-contain bg-no-repeat"
                style={{
                  backgroundImage: "url('/dashboard.png')",
                  minHeight: "280px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
