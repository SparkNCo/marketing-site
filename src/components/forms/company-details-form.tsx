import BuildScaleToggle from "../landing/components/BuildScaleComponent";
import { NextButton } from "../landing/components/NextFormButton";
import { Slider } from "../ui/slider2";
import type { FormStep } from "../utils/interfaces";

export type CompanyDetailsFormProps = Readonly<{
  currentStep: string;
  setCurrentStep: (step: FormStep) => void;
  budgetRange: readonly [number, number];
  setBudgetRange: (v: readonly [number, number]) => void;
  timelineRange: readonly [number, number];
  setTimelineRange: (v: readonly [number, number]) => void;
  setBuildScale: (value: "build" | "scale") => void;
}>;

export function CompanyDetailsForm({
  currentStep,
  setCurrentStep,
  budgetRange,
  setBudgetRange,
  timelineRange,
  setTimelineRange,
  setBuildScale,
}: CompanyDetailsFormProps) {
  return (
    <form className="animate-fade-in flex flex-col h-full font-body">
      {/* Top Content */}
      <div>
        <h2 className="mb-4 text-heading2 text-foreground font-bold">
          Set Project Targets
        </h2>

        <div className="mx-auto w-[full] md:w-[420px] lg:w-[600px] ">
          <BuildScaleToggle
            centerExpanded={true}
            onClick={(value) => setBuildScale(value)}
          />
        </div>

        <div className="flex-1 space-y-8 mt-8">
          <div>
            <p className=" text-foreground text-body">
              Enter your projected monthly spend
            </p>

            <div className="space-y-6 pt-4 mb-8">
              <Slider
                min={1000}
                max={50000}
                step={1000}
                value={budgetRange}
                onValueChange={(value) =>
                  setBudgetRange(value as [number, number])
                }
                className="mt-6"
              />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ${budgetRange[0].toLocaleString()}
                  </span>
                  <span className="text-foreground">to</span>
                  <span className="text-xl font-bold text-primary">
                    ${budgetRange[1].toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-foreground text-body">
          Enter your estimated project timeline
        </p>

        <div className="space-y-4 pt-4">
          <Slider
            min={1}
            max={24}
            step={1}
            value={timelineRange}
            onValueChange={(v) => setTimelineRange(v as [number, number])}
          />
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              {timelineRange[0]} month{timelineRange[0] > 1 && "s"}
            </span>
            <span className="text-foreground">to</span>
            <span className="text-xl font-bold text-primary">
              {timelineRange[1]} month{timelineRange[1] > 1 && "s"}
            </span>
          </div>
        </div>
      </div>

      {currentStep === "company" && (
        <NextButton
          onClick={() => setCurrentStep("calendar")}
          buttonClassName="
    w-full
    h-14 sm:h-16 lg:h-10
    bg-foreground text-background
    hover:bg-foreground active:bg-foreground 
  "
        />
      )}
    </form>
  );
}
