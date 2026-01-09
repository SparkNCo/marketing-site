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

      setActiveStep((prev) => {
        return closestStep === prev ? prev : closestStep;
      });
    };

    // Create an IntersectionObserver for each step
    stepRefs.current.forEach((stepElement) => {
      if (!stepElement) return;

      const observer = new IntersectionObserver(
        () => {
          updateActiveStep();
        },
        {
          threshold: [0, 1],
        }
      );

      observer.observe(stepElement);
      observers.push(observer);
    });

    updateActiveStep();
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="bg-background py-10">
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-5xl font-bold text-foreground mb-16 text-center">
          The Spark & Co Process
        </h2>

        <div className="grid lg:grid-cols-5 gap-16 max-w-7xl mx-auto">
          {/* LEFT - Scrolls naturally */}
          <div className="lg:col-span-2 pr-4">
            {steps.map((step, index) => {
              const isFocused = index === activeStep;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={`p-4 my-20 mx-auto text-center transition-all duration-300 min-h-[230px] flex items-center justify-center
                    ${
                      isFocused
                        ? "opacity-100 blur-0 scale-100"
                        : "opacity-20 blur-sm scale-[0.65]"
                    }
                  `}
                >
                  {step.title && (
                    <div className="inline-flex items-center gap-4 px-6 py-3">
                      <span className="text-foreground text-xl font-semibold">
                        {index}.
                      </span>
                      <h3 className="text-2xl font-bold text-foreground whitespace-nowrap border-4 border-white rounded-lg p-4 w-[18rem]">
                        {step.title}
                      </h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT - Sticky on desktop, normal scroll on mobile */}
          {activeStep > 0 && activeStep < 4 && (
            <div className="lg:col-span-3 fixed top-[192px] right-0 w-1/2">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {steps[activeStep]?.title || "Step " + steps[activeStep]?.id}
              </h3>
              <p className="text-foreground min-h-[12rem]">
                Content for step {steps[activeStep]?.id}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
