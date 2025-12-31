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
  const stepsRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const [goingDown, setGoingDown] = useState(true);

  const [activeStep, setActiveStep] = useState(0);

  /* -------------------------------------------
     STEP FOCUS TRACKING (middle-based)
  -------------------------------------------- */
  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;

    const onScroll = () => {
      const items = Array.from(el.children) as HTMLElement[];
      const middle = el.scrollTop + el.clientHeight / 2;

      const index = items.findIndex(
        (item) =>
          item.offsetTop <= middle &&
          item.offsetTop + item.offsetHeight >= middle
      );

      if (index !== -1) setActiveStep(index);
    };

    el.addEventListener("scroll", onScroll);
    onScroll();

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // 🚫 only hijack when goingDown is true
      if (!goingDown) return;

      const section = sectionRef.current;
      const stepsEl = stepsRef.current;
      if (!section || !stepsEl) return;

      const rect = section.getBoundingClientRect();
      const bottomInView = rect.bottom <= window.innerHeight;

      if (!bottomInView) return;

      const atTop = stepsEl.scrollTop <= 0;
      const atBottom =
        stepsEl.scrollTop + stepsEl.clientHeight >= stepsEl.scrollHeight - 1;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // ✅ RELEASE scroll & disable goingDown
      if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
        setGoingDown(false);
        return;
      }

      // Lock page scroll
      e.preventDefault();

      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const items = Array.from(stepsEl.children) as HTMLElement[];
      const currentItem = items[activeStep];
      if (!currentItem) return;

      const scrollAmount = currentItem.offsetHeight;

      stepsEl.scrollBy({
        top: scrollingDown ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 450);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeStep, goingDown]);

  useEffect(() => {
    const onWheelUp = (e: WheelEvent) => {
      // 🚫 only when scrolling UP
      if (e.deltaY > 0) return;

      // 🚫 only when upward mode is active
      if (goingDown) return;

      const section = sectionRef.current;
      const stepsEl = stepsRef.current;
      if (!section || !stepsEl) return;

      const rect = section.getBoundingClientRect();

      // ✅ Hijack when TOP BORDER is visible
      const sectionInView = rect.top >= 0 && rect.top <= window.innerHeight;

      if (!sectionInView) return;

      // ✅ RELEASE at first step
      if (activeStep <= 0) {
        setGoingDown(true);
        return;
      }

      e.preventDefault();

      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const items = Array.from(stepsEl.children) as HTMLElement[];
      const current = items[activeStep];
      if (!current) return;

      stepsEl.scrollBy({
        top: -current.offsetHeight,
        behavior: "smooth",
      });

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 450);
    };

    window.addEventListener("wheel", onWheelUp, { passive: false });
    return () => window.removeEventListener("wheel", onWheelUp);
  }, [activeStep, goingDown]);

  return (
    <section ref={sectionRef} className="bg-black ">
      <div className="sticky top-0 h-screen flex items-center ">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-white mb-16 text-center">
            The Spark & Co Process {goingDown ? "(Going Down)" : "(Going Up)"}
          </h2>

          <div className="grid lg:grid-cols-5 gap-16 max-w-7xl mx-auto ">
            {/* LEFT */}
            <div
              ref={stepsRef}
              className="lg:col-span-2 h-[36rem] overflow-y-auto pr-4 hide-scrollbar"
            >
              {steps.map((step, index) => {
                const isFocused = index === activeStep + 1;

                return (
                  <div
                    key={step.id}
                    className={`p-4 my-12 transition-all duration-300  w-[24rem] mx-auto text-center ${step.title !== "" && "border-4"}
                      ${
                        isFocused
                          ? "opacity-100 blur-0 scale-100"
                          : "opacity-30 blur-sm scale-[0.7]"
                      }
                    `}
                  >
                    {step.title && (
                      <h3 className="text-3xl font-bold text-white">
                        {step.title}
                      </h3>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-3">
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
