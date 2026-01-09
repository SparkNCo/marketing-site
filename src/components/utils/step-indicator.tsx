"use client";

type StepIndicatorProps = Readonly<{
  currentStep: number;
  totalSteps: number;
}>;

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mb-12">
      {/* Rolling square indicator */}
      <div className="relative h-16 mb-6">
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#333333] rounded-full overflow-visible">
          <div
            className="absolute bottom-0 w-6 h-6 bg-primary rounded-sm transition-all duration-500"
            style={{
              left: `calc(${progressPercentage}% - 12px)`,
              transform: `
                rotate(${progressPercentage * 1.8}deg)
                translateY(${0 - progressPercentage * 0.01}px)
              `,
              transformOrigin: "center",
            }}
          />
        </div>
      </div>

      {/* Step labels */}
      <div className="flex justify-between px-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`text-xs font-medium transition-colors ${
              i <= currentStep ? "text-primary" : "text-foreground"
            }`}
          >
            Step {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
