"use client";

import { useEffect, useMemo, useState } from "react";
import { debounce } from "@tanstack/pacer";

type AIResponse = {
  audience: boolean;
  problem: boolean;
  idea: boolean;
  stage: boolean;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  endpoint: string;
  onAnalysis: (data: AIResponse) => void;
  placeholder?: string;
  minLength?: number;
  wait?: number;
};

export function AIAnalyzedTextarea({
  value,
  onChange,
  endpoint,
  onAnalysis,
  placeholder = "Describe your idea...",
  minLength = 20,
  wait = 1500,
}: Props) {
  const [loading, setLoading] = useState(false);

  const debouncedAnalyze = useMemo(
    () =>
      debounce(
        async (text: string) => {
          if (!text.trim() || text.length < minLength) {
            onAnalysis({
              audience: false,
              problem: false,
              idea: false,
              stage: false,
            });
            return;
          }

          try {
            setLoading(true);

            const res = await fetch(
              `${import.meta.env.PUBLIC_ENDPOINT}${endpoint}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: text }),
              },
            );

            if (!res.ok) throw new Error("AI request failed");

            const data: AIResponse = await res.json();
            onAnalysis(data);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        { wait },
      ),
    [endpoint, minLength, wait, onAnalysis],
  );

  useEffect(() => {
    debouncedAnalyze(value);
  }, [value, debouncedAnalyze]);

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-48 p-4  border-input bg-secondary text-body focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      />

      {loading && (
        <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
          Analyzing...
        </div>
      )}
    </div>
  );
}
