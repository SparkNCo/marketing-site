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
        },
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
    <section className="bg-background py-10 ">
      <div className=" mx-auto  py-10 ">
        <h2 className="text-5xl font-bold text-foreground mb-16 text-center ">
          The Spark & Co Process
        </h2>

        <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto border-4 border-red-800 ">
          {/* LEFT - Scrolls naturally */}
          <div className="lg:col-span-3 pr-4 mx-auto z-10">
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

          <div
            className="lg:col-span-9 fixed  top-[192px] right-0 w-9/12  bg-center bg-contain bg-no-repeat mx-auto z-0"
            style={{
              backgroundImage: "url('/dashboard.png')",
              minHeight: "400px",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
