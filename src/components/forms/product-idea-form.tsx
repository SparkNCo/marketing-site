"use client";

import { useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { FormStep } from "../StepTwo";

interface ProductIdeaFormProps {
  currentStep: string;
  setCurrentStep: (step: FormStep) => void;

  // NEW props from parent
  productIdea: string;
  setProductIdea: (value: string) => void;
}

const helpTips = [
  { key: "problem", text: "Describe what problem your software solves" },
  { key: "target", text: "Who are your target users?" },
  { key: "feature", text: "What are the key features you need?" },
  { key: "benefit", text: "How will users benefit from this?" },
  { key: "tech", text: "Any specific technologies or integrations?" },
];

export function ProductIdeaForm({
  currentStep,
  setCurrentStep,
  productIdea,
  setProductIdea,
}: ProductIdeaFormProps) {
  const { completeness, missingTips } = useMemo(() => {
    if (!productIdea.trim()) {
      return { completeness: 0, missingTips: helpTips };
    }

    const wordCount = productIdea.trim().split(/\s+/).length;
    const hasProblem = /problem|solve|issue|challenge/i.test(productIdea);
    const hasTarget = /user|customer|target|audience|people/i.test(productIdea);
    const hasFeature = /feature|function|capability|able to/i.test(productIdea);
    const hasBenefit = /benefit|help|improve|faster|easier|better/i.test(
      productIdea
    );
    const hasTech = /technology|integration|api|plugin|tool|framework/i.test(
      productIdea
    );

    let score = Math.min((wordCount / 100) * 25, 25);
    if (hasProblem) score += 15;
    if (hasTarget) score += 15;
    if (hasFeature) score += 15;
    if (hasBenefit) score += 15;
    if (hasTech) score += 15;

    const missing = helpTips.filter((tip) => {
      if (tip.key === "problem") return !hasProblem;
      if (tip.key === "target") return !hasTarget;
      if (tip.key === "feature") return !hasFeature;
      if (tip.key === "benefit") return !hasBenefit;
      if (tip.key === "tech") return !hasTech;
      return false;
    });

    return {
      completeness: Math.min(Math.round(score), 100),
      missingTips: missing,
    };
  }, [productIdea]);

  const handleNext = () => {
    if (completeness >= 50) {
      setCurrentStep("calendar");
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-secondary">
          Describe your product idea
        </h2>
        <p className="text-foreground">
          The more detail you provide, the better we can help
        </p>
      </div>

      <form className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="idea" className="text-base font-medium text-secondary">
              Your Vision
            </Label>
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${completeness}%` }}
                />
              </div>
              <span className="text-sm font-medium text-primary min-w-fit">
                {completeness}%
              </span>
            </div>
          </div>

          <textarea
            id="idea"
            placeholder="Describe your software product idea..."
            value={productIdea}
            onChange={(e) => setProductIdea(e.target.value)}
            className="w-full min-h-48 p-4 rounded-lg  border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {missingTips.length > 0 && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-secondary">
            <div className="flex items-center gap-2 text-secondary font-medium">
              <Lightbulb className="w-5 h-5 text-primary" />
              <span>Tips to improve your description</span>
            </div>
            <ul className="space-y-2">
              {missingTips.map((tip) => (
                <li
                  key={tip.key}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="text-primary font-semibold mt-0.5">→</span>
                  <span>{tip.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          {completeness >= 50 ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-green-600 font-medium">
                Your description looks complete!
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span className="text-amber-600 font-medium">
                Keep adding details (currently {completeness}%)
              </span>
            </>
          )}
        </div>

        <div className="w-full">
          <div className="mt-8 flex justify-between">
            <Button variant={"nav"} onClick={() => setCurrentStep("company")}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button
              variant={"nav"}
              onClick={handleNext}
              disabled={completeness < 50}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
