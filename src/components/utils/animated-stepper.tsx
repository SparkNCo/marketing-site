"use client";

import type { FormStep } from "./interfaces";

const STEP_ORDER: FormStep[] = [
  "product",
  "contact",
  "company",
  "calendar",
  "success",
];

type AnimatedStepperProps = Readonly<{
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: FormStep) => void;
}>;

export default function AnimatedStepper({
  currentStep,
  totalSteps,
  setCurrentStep,
}: AnimatedStepperProps) {
  return (
    <div className="flex items-center gap-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep + 1;
        const isCompleted = stepNumber < currentStep + 1;

        let stepClasses = "bg-card text-secondary-foreground";

        if (isCompleted) {
          stepClasses = "bg-primary text-accent-foreground";
        }

        if (isActive) {
          stepClasses =
            "bg-primary text-primary-foreground scale-110 rotate-12 translate-y-[-4px]";
        }

        const handleClick = () => {
          setCurrentStep(STEP_ORDER[index]);
        };

        return (
          <div key={stepNumber} className="flex items-center mb-8">
            <button
              type="button"
              onClick={handleClick}
              className={`w-12 h-12 rounded-lg flex items-center justify-center font-semibold transition-all duration-500 cursor-pointer ${stepClasses}`}
              style={{
                transitionProperty: "transform, background-color, color",
              }}
            >
              {stepNumber}
            </button>

            {stepNumber < totalSteps && (
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
  );
}
