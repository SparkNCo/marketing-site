"use client";

type AnimatedStepperProps = Readonly<{
  currentStep: number;
  totalSteps: number;
}>;

export default function AnimatedStepper({
  currentStep,
  totalSteps,
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

        return (
          <div key={stepNumber} className="flex items-center mb-8">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center font-semibold transition-all duration-500 ${stepClasses}`}
              style={{
                transitionProperty: "transform, background-color, color",
              }}
            >
              {stepNumber}
            </div>

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
