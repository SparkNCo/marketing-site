import { Button } from "../../components/ui/button";
import { Slider } from "../ui/slider2";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CompanyDetailsFormProps } from "../utils/types";

export function CompanyDetailsForm({
  currentStep,
  setCurrentStep,
  budgetRange,
  setBudgetRange,
}: CompanyDetailsFormProps) {
  return (
    <form className="animate-fade-in flex flex-col h-full font-body">
      {/* Top Content */}
      <div className="flex-1 space-y-8">
        <div>
          <h2 className="mb-2 text-3xl font-semibold text-secondary font-title">
            What's your budget range?
          </h2>
          <p className=" text-foreground text-xl">
            Help us understand your investment capacity
          </p>
        </div>

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

      {/* Bottom Navigation */}
      <div className="mt-20 flex justify-between">
        <Button
          variant={"nav"}
          onClick={() => setCurrentStep("contact")}
          disabled={currentStep === "contact"}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        {currentStep === "company" && (
          <Button variant={"nav"} onClick={() => setCurrentStep("calendar")}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
