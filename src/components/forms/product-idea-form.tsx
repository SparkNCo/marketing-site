"use client";

import { useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Check } from "lucide-react";
import type { FormStep } from "../utils/interfaces";

type ProductIdeaFormProps = Readonly<{
  setCurrentStep: (step: FormStep) => void;
  productIdea: string;
  setProductIdea: (value: string) => void;
}>;

const validations = [
  {
    key: "problem",
    text: "Describe what problem your software solves",
    test: (value: string) => /problem|solve|issue|challenge/i.test(value),
  },
  {
    key: "target",
    text: "Who are your target users?",
    test: (value: string) =>
      /user|customer|target|audience|people/i.test(value),
  },
  {
    key: "feature",
    text: "What are the key features you need?",
    test: (value: string) => /feature|function|capability|able to/i.test(value),
  },
  {
    key: "benefit",
    text: "How will users benefit from this?",
    test: (value: string) =>
      /benefit|help|improve|faster|easier|better/i.test(value),
  },
  {
    key: "tech",
    text: "Any specific technologies or integrations?",
    test: (value: string) =>
      /technology|integration|api|plugin|tool|framework/i.test(value),
  },
];

export function ProductIdeaForm({
  setCurrentStep,
  productIdea,
  setProductIdea,
}: ProductIdeaFormProps) {
  const { passedCount, currentTip, progress } = useMemo(() => {
    if (!productIdea.trim()) {
      return {
        passedCount: 0,
        currentTip: validations[0],
        progress: 0,
      };
    }

    const results = validations.map((v) => v.test(productIdea));
    const passed = results.filter(Boolean).length;

    return {
      passedCount: passed,
      currentTip: validations[passed] ?? null,
      progress: Math.round((passed / validations.length) * 100),
    };
  }, [productIdea]);

  const canProceed = passedCount >= 3;

  const handleNext = () => {
    if (canProceed) {
      setCurrentStep("company");
    }
  };

  return (
    <div className="animate-fade-in space-y-8 text-xl">
      <div className="text-left space-y-2 ">
        <h2 className="mb-4 text-3xl text-foreground font-bold">
          Describe your product idea
        </h2>
        <p className="text-foreground">
          Tell us about your vision and we'll bring it to life
        </p>
      </div>

      <form className="space-y-4">
        {/* Textarea wrapper (relative for progress bar) */}
        <div className="relative">
          <textarea
            id="idea"
            placeholder="Describe your software product idea..."
            value={productIdea}
            onChange={(e) => setProductIdea(e.target.value)}
            className="w-full min-h-48 p-4 pb-8 rounded-lg border-input bg-secondary text-body focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />

          {/* Progress bar INSIDE textarea */}
          <div className="pointer-events-none absolute left-2 right-2 bottom-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Helper tip under textarea */}
        {currentTip && (
          <div className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 h-4 w-4 text-gray-400" />
            <span>{currentTip.text}</span>
          </div>
        )}

        <div className="mt-8 flex justify-center w-full">
          <Button
            variant="nav"
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full lg:w-auto text-lg font-bold py-6 bg-foreground text-background"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
