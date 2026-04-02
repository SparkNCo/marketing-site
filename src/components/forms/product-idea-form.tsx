"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { FormStep } from "../utils/interfaces";
import { AIAnalyzedTextarea } from "./AIAnalyzedTextarea";
import { NextButton } from "../landing/components/NextFormButton";

type ProductIdeaFormProps = Readonly<{
  setCurrentStep: (step: FormStep) => void;
  productIdea: string;
  setProductIdea: (value: string) => void;
}>;

export type AIResponse = {
  audience: boolean;
  problem: boolean;
  idea: boolean;
  stage: boolean;
};

export function ProductIdeaForm({
  setCurrentStep,
  productIdea,
  setProductIdea,
}: ProductIdeaFormProps) {
  const [analysis, setAnalysis] = useState<AIResponse>({
    audience: false,
    problem: false,
    idea: false,
    stage: false,
  });

  const passedCount = Object.values(analysis).filter(Boolean).length;
  const progress = Math.round((passedCount / 4) * 100);
  const canProceed = passedCount >= 2;

  const handleNext = () => {
    if (canProceed) {
      setCurrentStep("company");
    }
  };

  const tips = [
    { key: "audience", text: "Who is your target audience?" },
    { key: "problem", text: "What problem are you solving?" },
    { key: "idea", text: "Describe what your product does." },
    { key: "stage", text: "What stage is your business in?" },
  ];

  return (
    <div className="animate-fade-in space-y-8 text-xl">
      <div className="text-left space-y-2 ">
        <h2 className="mb-4 text-heading2 text-foreground">
          Describe your product idea
        </h2>
        <p className="text-foreground text-body">
          Tell us about your vision, and we&apos;ll bring it to life.
        </p>
      </div>

      <form className="space-y-4">
        <div className="relative">
          <AIAnalyzedTextarea
            value={productIdea}
            onChange={setProductIdea}
            endpoint="/debounce?type=idea"
            onAnalysis={setAnalysis}
            placeholder="Describe your software product idea..."
            wait={500}
          />

          {/* Progress bar */}
          <div className="pointer-events-none absolute left-2 right-2 bottom-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="mt-3 space-y-1.5 flex flex-col items-end">
          {tips.map((tip) => {
            const isDone = analysis[tip.key as keyof AIResponse];
            return (
              <div key={tip.key} className="flex items-start gap-2 text-body">

                <span className={isDone ? "text-primary" : "text-secondary"}>
                  {tip.text}
                </span>

                <Check
                  className={`mt-0.5 h-4 w-4 ${
                    isDone ? "text-primary" : "text-secondary"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* <div className="mt-8 flex justify-center w-full">
          <Button
            variant="nav"
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full lg:w-auto text-lg font-bold py-6 bg-foreground text-background"
          >
            Next
          </Button>
        </div> */}

        <NextButton
          onClick={handleNext}
          disabled={!canProceed}
          buttonClassName="
    w-full
    h-14 sm:h-16 lg:h-10
    bg-foreground text-background
    hover:bg-foreground active:bg-foreground 
  "
        />
      </form>
    </div>
  );
}
