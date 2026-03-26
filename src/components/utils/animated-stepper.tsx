"use client";

import type { FormStep } from "./interfaces";

const STEP_ORDER: FormStep[] = [
  "contact",
  "product",
  "company",
  "calendar",
  "success",
];

type AnimatedStepperProps = Readonly<{
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: FormStep) => void;
}>;

export default function AnimatedStepper(props: AnimatedStepperProps) {
  return (
    <>
      {/* ✅ Mobile version */}
      <MobileStepper {...props} />

      {/* ✅ Desktop version (UNCHANGED) */}
      <div className="hidden sm:flex items-center ">
        {Array.from({ length: props.totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === props.currentStep + 1;
          const isCompleted = stepNumber < props.currentStep + 1;

          let stepClasses = "bg-card text-text font-bold text-2xl";

          if (isCompleted) {
            stepClasses = "bg-primary text-accent-foreground text-2xl";
          }

          if (isActive) {
            stepClasses =
              "bg-primary text-primary-foreground scale-110 rotate-12 translate-y-[-4px] text-2xl";
          }

          const handleClick = () => {
            const targetStep = STEP_ORDER[index];

            if (STEP_ORDER[props.currentStep] === "success") return;
            if (index >= props.currentStep) return;

            props.setCurrentStep(targetStep);
          };

          const isDisabled =
            STEP_ORDER[props.currentStep] === "success" ||
            index >= props.currentStep;

          return (
            <div key={stepNumber} className="flex items-center mb-8 ">
              <button
                type="button"
                onClick={handleClick}
                disabled={isDisabled}
                className={`
                  w-12 h-12 flex items-center justify-center font-semibold transition-all duration-500 
                  ${stepClasses}
                `}
                style={{
                  transitionProperty: "transform, background-color, color",
                }}
              >
                {stepNumber}
              </button>

              {stepNumber < props.totalSteps && (
                <div
                  className={`w-12 h-1 mx-2 transition-colors duration-300 ${
                    isCompleted ? "bg-primary" : "bg-card"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export function MobileStepper({
  currentStep,
  totalSteps,
}: AnimatedStepperProps) {
  return (
    <div className="sm:hidden w-full overflow-x-hidden h-[40px] my-6 flex items-center justify-center ">
      <div className="flex items-center  w-full ">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep + 1;
          const isCompleted = stepNumber < currentStep + 1;

          return (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`
                  min-w-[36px] h-9 flex items-center justify-center text-sm font-semibold
                  ${
                    isCompleted
                      ? "bg-primary text-accent-foreground"
                      : isActive
                        ? "bg-primary text-primary-foreground scale-105"
                        : "bg-card text-text"
                  }
                `}
              >
                {stepNumber}
              </div>

              {stepNumber < totalSteps && (
                <div
                  className={`mx-2 w-6 h-[2px] ${
                    isCompleted ? "bg-primary" : "bg-card"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
