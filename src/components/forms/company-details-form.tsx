import { Button } from "../../components/ui/button";
import { Slider } from "../ui/slider2";
import type { FormStep } from "../utils/interfaces";

export type CompanyDetailsFormProps = Readonly<{
  currentStep: string;
  setCurrentStep: (step: FormStep) => void;
  budgetRange: readonly [number, number];
  setBudgetRange: (v: readonly [number, number]) => void;
  timelineRange: readonly [number, number];
  setTimelineRange: (v: readonly [number, number]) => void;
}>;

export function CompanyDetailsForm({
  currentStep,
  setCurrentStep,
  budgetRange,
  setBudgetRange,
  timelineRange,
  setTimelineRange,
}: CompanyDetailsFormProps) {
  return (
    <form className="animate-fade-in flex flex-col h-full font-body">
      {/* Top Content */}
      <div>
        <h2 className="mb-6 text-3xl text-foreground font-title">
          Set Project Targets
        </h2>
        <div className="flex-1 space-y-8 ">
          <div>
            <p className=" text-foreground text-xl">
              Enter your projected monthly spend
            </p>

            <div className="space-y-6 pt-4 mb-8">
              <Slider
                min={5000}
                max={200000}
                step={5000}
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
        <p className="text-foreground text-xl">
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

      {/* Bottom Navigation */}
      <div className="mt-20 flex justify-center">
        {currentStep === "company" && (
          <Button
            variant="nav"
            onClick={() => setCurrentStep("calendar")}
            className="w-full lg:w-auto text-lg font-bold p-6  bg-foreground text-background"
          >
            Next
          </Button>
        )}
      </div>
    </form>
  );
}
