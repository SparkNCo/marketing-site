import { Button } from "../../components/ui/button";
import { Slider } from "../ui/slider2";
import { ChevronRight } from "lucide-react";

export interface CompanyDetailsFormProps {
  budgetRange: [number, number];
  setBudgetRange: (v: [number, number]) => void;
  timelineRange: [number, number];
  setTimelineRange: (v: [number, number]) => void;
  onNext: () => void;
  onPrev?: () => void;
}

export function CompanyDetailsForm({
  currentStep,
  setCurrentStep,
  budgetRange,
  setBudgetRange,
  timelineRange,
  setTimelineRange,
  onNext,
  onPrev,
}: CompanyDetailsFormProps) {
  return (
    <form className="animate-fade-in flex flex-col h-full font-body">
      {/* Top Content */}
      <div>
        <h2 className="mb-6 text-3xl text-foreground font-title">
          Set Project Targets
        </h2>
        <div className="flex-1 space-y-8">
          <div>
            <p className=" text-foreground text-xl">
              Enter your projected monthly spend
            </p>

            <div className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ${budgetRange[0].toLocaleString()}
                  </span>
                  <span className="text-foreground">to</span>
                  <span className="text-2xl font-bold text-primary">
                    ${budgetRange[1].toLocaleString()}
                  </span>
                </div>

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
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              {timelineRange[0]} month{timelineRange[0] > 1 && "s"}
            </span>
            <span className="text-foreground">to</span>
            <span className="text-2xl font-bold text-primary">
              {timelineRange[1]} month{timelineRange[1] > 1 && "s"}
            </span>
          </div>

          <Slider
            min={1}
            max={24}
            step={1}
            value={timelineRange}
            onValueChange={(v) => setTimelineRange(v as [number, number])}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-20 flex justify-center">
        {currentStep === "company" && (
          <Button
            variant="nav"
            onClick={() => setCurrentStep("calendar")}
            className="w-full lg:w-auto text-lg font-bold py-6 lg:py-2 bg-foreground text-background"
          >
            Next
          </Button>
        )}
      </div>
    </form>
  );
}
