"use client";

import { cn } from "../../../lib/utils";
import { toOptionValue, toTitleCase } from "./optionFormat";

type Props = {
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  /** Optional label rendered above the button group. */
  label?: string;
  columns?: 2 | 3;
};

/**
 * Renders every option as a highlightable pill button. Selected options are
 * filled with the brand colour; clicking toggles membership.
 */
export function MultiSelectButtons({
  options,
  selected,
  onToggle,
  label,
  columns = 2,
}: Readonly<Props>) {
  return (
    <div className="space-y-3">
      {label ? (
        <h4 className="text-smalltext font-semibold uppercase tracking-wide text-foreground/70">
          {label}
        </h4>
      ) : null}
      <div
        className={cn(
          "flex flex-wrap gap-2.5",
          columns === 3 ? "sm:gap-3" : "sm:gap-3",
        )}
      >
        {options.map((option) => {
          const value = toOptionValue(option);
          const active = selected.some((s) => toOptionValue(s) === value);
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(value)}
              className={cn(
                "rounded-full border px-4 py-2 text-smalltext font-medium transition-all",
                active
                  ? "border-primary bg-primary text-background shadow-sm"
                  : "border-foreground/25 bg-transparent text-foreground hover:border-primary/70 hover:text-primary",
              )}
            >
              {toTitleCase(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
