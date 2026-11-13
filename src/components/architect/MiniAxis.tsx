"use client";

import type { Stack } from "./types";

/** Compact read-only version of the priority diagram showing a stack's leaning. */
export function MiniAxis({ stack }: Readonly<{ stack: Stack }>) {
  // Convert 1..5 leanings into a -1..1 position on each axis.
  const x = (stack.speed - stack.customizability) / 4; // right = speed
  const y = (stack.portability - stack.integrated) / 4; // top = portability
  const left = ((x + 1) / 2) * 100;
  const top = ((1 - y) / 2) * 100;

  return (
    <div className="shrink-0">
      <div className="relative h-20 w-20 rounded-md border border-foreground/25 bg-foreground/[0.04]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/15" />
        <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground/15" />
        <div
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary"
          style={{ left: `${left}%`, top: `${top}%` }}
        />
      </div>
      <p className="mt-1 text-center text-[10px] uppercase tracking-wide text-foreground/50">
        Priority fit
      </p>
    </div>
  );
}
