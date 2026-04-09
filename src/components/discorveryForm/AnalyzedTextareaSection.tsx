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
  readOnly?: boolean;
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
  readOnly = false,
}: Readonly<Props<T>>) {
  const passedCount = Object.values(analysis).filter(Boolean).length;
  const progress = Math.round(
    (passedCount / Object.keys(analysis).length) * 100,
  );

  return (
    <div>
      <h3 className="mb-2 text-heading2 font-bold text-secondary">{title}</h3>

      <div className="relative">
        <AIAnalyzedTextarea
          value={value}
          onChange={onChange}
          endpoint={endpoint}
          onAnalysis={(data) => setAnalysis(data as unknown as T)}
          placeholder={placeholder}
          wait={2000}
          readOnly={readOnly}
        />

        <div className="pointer-events-none absolute left-2 right-2 bottom-2 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-3 space-y-1.5 flex flex-col items-end">
        {tips.map((tip) => {
          const isDone = analysis[tip.key];
          return (
            <div
              key={tip.key as string}
              className="flex items-start gap-2 text-body"
            >
              <Check
                className={`mt-0.5 h-4 w-4 ${
                  isDone ? "text-primary" : "text-secondary"
                }`}
              />
              <span
                className={
                  isDone ? "text-primary" : "text-secondary"
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
