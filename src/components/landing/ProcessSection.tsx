"use client";
import { useEffect, useRef, useState } from "react";
import ProcessSectionMobile from "./ProcessSectionMobile";
import { ProcessStepItem, TimelineLine } from "./ProcessItems";

export const steps = [
  { id: 0, title: "" },
  /* {
    id: 1,
    title: "Sign Up",
    description:
      "The more we can solidify at the start of the project, the smoother the project will be. We start with a discovery call to go through the ins and outs of your industry, ICPs and problem statements.",
  }, */
  {
    id: 2,
    title: "Discovery",
    description:
      "We work with you to define the problem, shape the solution, and align on what actually matters. Using our structured methodology and quick iteration, we turn early ideas into a clear product direction with prioritized features and a path to execution.",
  },
  {
    id: 3,
    title: "MVP",
    description:
      "We build the first version of your product to validate real demand quickly. This is not a throwaway prototype, but a production-ready foundation designed to get in front of users quickly. By combining strong engineering with AI-accelerated workflows, we reduce time to insight and move you toward product-market fit with less waste.",
  },
  /*   {
    id: 4,
    title: "Beta",
    description: "You test your product with real users and gather feedback.",
  }, */
  {
    id: 5,
    title: "Launch",
    description:
      "We take your product live with the reliability and performance expected of modern software. From final QA to release orchestration, everything is designed to hold up under real-world usage, so your launch is a milestone, not a risk.",
  },
  {
    id: 6,
    title: "Scale",
    description:
      "As your business grows, your product evolves with it. We enhance capabilities, improve performance, and adapt your systems to handle increasing complexity. Our focus is on building scalable, resilient software that doesn’t need to be rebuilt as you grow.",
  },
  {
    id: 7,
    title: "Support",
    description:
      "We give you continuous visibility into product health, delivery, and performance without the overhead. Through integrated dashboards, automated reporting, and AI-assisted insights, you stay informed and in control while focusing on growth, not operations.",
  },
  { id: 8, title: "" },
];

export default function ProcessSection({ isMobile }: Readonly<{ isMobile: boolean }>) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  if (isMobile) {
    return <ProcessSectionMobile />;
  }

  const visibleSteps = steps.filter((step) => step.title);
  const currentStep = visibleSteps[activeStep];

  return (
    <section className="bg-background  relative  ">
      <div className="w-full">
        <div className="grid grid-cols-[180px_1fr] md:grid-cols-[260px_1fr] lg:grid-cols-12 w-full ">
          {/* LEFT SIDE */}
          <div className="lg:col-span-4 pr-2 md:pr-4 relative z-10 w-full max-w-[400px] pb-[100%] mt-[25%] pl-8 mx-auto">
            <TimelineLine className="left-[58px] md:left-[64px] lg:left-[64px] h-[1510px] top-[235px] bottom-[230px]" />

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
                  ? "opacity-100 blur-0 scale-100 translate-x-0 md:-translate-x-[26px]"
                  : "opacity-90 blur-[2px] scale-[0.8] md:scale-[0.6] -translate-x-[45px] lg:translate-x-[-61px] xl:translate-x-[-72px]"
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
          <div className="lg:col-span-8 relative flex flex-col md:min-h-[200vh] text-foreground w-full ">
            <div className="sticky top-0 h-screen flex flex-col justify-end ">
              <div
                className="
                  flex flex-col 
                  md:justify-center
                  lg:justify-end
                  xl:justify-end
                  w-full
                  items-center lg:items-start 
                "
              >
                <h2 className="w-full collapse lg:visible text-largeBody md:text-heading1 text-foreground md:mb-0 lg:mb-0 pb-2">
                  The Spark & Co Process
                </h2>
                <div className="w-full collapse lg:visible font-semibold text-heading2 flex items-end lg:mb-6">
                  {currentStep?.title}
                </div>

                <p className="text-body xl:w-4/5 mb-[5vh] pr-4">
                  {currentStep?.description}
                </p>

                <div className="relative h-[50vh] w-full overflow-x-hidden">
                  <img
                    src="/dashboard.png"
                    alt="Process visual"
                    className="absolute bottom-0 right-0 h-full object-fill "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
