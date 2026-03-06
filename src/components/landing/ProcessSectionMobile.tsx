"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  { id: 1, title: "Sign Up" },
  { id: 2, title: "Project Discovery" },
  { id: 3, title: "MVP" },
];

export default function ProcessSectionMobile() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));

          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.1 },
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background py-10 text-foreground">
      <div className="px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          The Spark & Co Process
        </h2>

        <div className="flex flex-col gap-12">
          {steps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[index] = el)}
                data-index={index}
                className="transition-all duration-300"
              >
                <h3 className="text-lg text-foreground font-bold border-4 border-white rounded-xl p-4 text-center">
                  {step.title}
                </h3>

                {isActive && (
                  <div className="mt-6 flex flex-col gap-4">
                    <div className="font-semibold text-sm">
                      Project Discovery
                    </div>

                    <p className="text-sm">
                      The more we can solidify at the start of the project, the
                      smoother the project will be. We start with a discovery
                      call to go through the ins and outs of your industry, ICPs
                      and problem statements.
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
