"use client";

import { Check } from "lucide-react";
import { AIAnalyzedTextarea } from "../forms/AIAnalyzedTextarea";

type Tip<T> = {
  key: keyof T;
  text: string;
};

type Props<T> = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  endpoint: string;
  analysis: T;
  setAnalysis: (val: T) => void;
  tips: Tip<T>[];
  placeholder: string;
};

export function AnalyzedTextareaSection<T extends Record<string, boolean>>({
  title,
  value,
  onChange,
  endpoint,
  analysis,
  setAnalysis,
  tips,
  placeholder,
}: Props<T>) {
  const passedCount = Object.values(analysis).filter(Boolean).length;
  const progress = Math.round(
    (passedCount / Object.keys(analysis).length) * 100,
  );

  return (
    <div>
      <h3 className="mb-2 text-heading2 font-bold text-primary">{title}</h3>

      <div className="relative">
        <AIAnalyzedTextarea
          value={value}
          onChange={onChange}
          endpoint={endpoint}
          onAnalysis={setAnalysis}
          placeholder={placeholder}
          wait={2000}
        />

        <div className="pointer-events-none absolute left-2 right-2 bottom-2 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        {tips.map((tip) => {
          const isDone = analysis[tip.key as keyof T];
          return (
            <div
              key={tip.key as string}
              className="flex items-start gap-2 text-body"
            >
              <Check
                className={`mt-0.5 h-4 w-4 ${
                  isDone ? "text-primary" : "text-gray-500"
                }`}
              />
              <span
                className={
                  isDone ? "text-primary" : "text-foreground/80"
                }
              >
                {tip.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
