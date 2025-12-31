"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  { id: 0, title: "" },
  { id: 1, title: "Sign Up" },
  { id: 2, title: "Project Discovery" },
  { id: 3, title: "MVP" },
  { id: 4, title: "3213213213213" },
  { id: 5, title: "MsadasdsadsadasVP" },
  { id: 6, title: "MV3214321453543P" },
  { id: 7, title: "" },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isAnimatingRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [goingDown, setGoingDown] = useState(true);
  const [activeStep, setActiveStep] = useState(1);
  const [isHijacked, setIsHijacked] = useState(false);
  /* -------------------------------------------
     STEP FOCUS TRACKING (middle-based)
  -------------------------------------------- */

  const STEP_HEIGHT = 230;

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // 🚫 only hijack when enabled
      if (goingDown) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();

      const topInView = rect.top >= 0;
      if (!topInView) return;

      // 🚨 lock page scroll
      e.preventDefault();

      // 🔒 animation lock (VERY important)
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      // mark hijacked (for testing)
      if (!isHijacked) setIsHijacked(true);

      setActiveStep((prev) => {
        const next =
          e.deltaY > 0
            ? Math.min(prev + 1, steps.length - 1)
            : Math.max(prev - 1, 0);

        return next;
      });

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 450);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goingDown, isHijacked]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // 🚫 only hijack when enabled
      if (!goingDown) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const bottomInView = rect.bottom <= window.innerHeight;
      if (!bottomInView) return;

      // 🚨 lock page scroll
      e.preventDefault();

      // 🔒 animation lock (VERY important)
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      // mark hijacked (for testing)
      if (!isHijacked) setIsHijacked(true);

      setActiveStep((prev) => {
        const next =
          e.deltaY > 0
            ? Math.min(prev + 1, steps.length - 1)
            : Math.max(prev - 1, 0);

        return next;
      });

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 450);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goingDown, isHijacked]);

  useEffect(() => {
    if (goingDown && activeStep === 6) {
      setGoingDown(false);
      setIsHijacked(false);
    } else if (!goingDown && activeStep === 1) {
      setGoingDown(true);
      setIsHijacked(false);
    }
  }, [activeStep]);

  return (
    <section ref={sectionRef} className="bg-background py-10">
      <div className="sticky top-0 h-screen flex items-center ">
        <div className="container mx-auto px-6 py-10">
          <h2 className="text-5xl font-bold text-white mb-16 text-center">
            The Spark & Co Process
          </h2>

          <div className="grid lg:grid-cols-5 gap-16 max-w-7xl mx-auto ">
            {/* LEFT */}
            <div className="lg:col-span-2 h-[36rem] overflow-hidden pr-4">
              <div
                ref={listRef}
                className="transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(${
                    18 * 16 - activeStep * STEP_HEIGHT
                  }px)`,
                }}
              >
                {steps.map((step, index) => {
                  const isFocused = index === activeStep;

                  return (
                    <div
                      key={step.id}
                      className={`p-4 my-20  mx-auto text-center transition-all duration-300
${
  isFocused ? "opacity-100 blur-0 scale-100" : "opacity-20 blur-sm scale-[0.65]"
}
          `}
                    >
                      {step.title && (
                        <div className="inline-flex items-center gap-4 px-6 py-3 ">
                          <span className="text-white text-xl font-semibold">
                            {index}.
                          </span>

                          <h3 className="text-2xl font-bold text-white whitespace-nowrap border-4 border-white rounded-lg p-4 w-[18rem]">
                            {step.title}
                          </h3>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-3 border">
              <div className="max-w-xl p-6 ">
                <h3 className="text-2xl font-bold text-white mb-4 ">
                  {steps[activeStep]?.title}
                </h3>
                <p className="text-white/70 h-48 ">
                  Content for step {steps[activeStep]?.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
