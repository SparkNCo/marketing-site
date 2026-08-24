"use client";

import { useRef } from "react";
import type { PriorityAxis } from "./types";

type Props = {
  value: PriorityAxis;
  onChange: (value: PriorityAxis) => void;
};

const clamp = (n: number) => Math.max(-1, Math.min(1, n));

/**
 * Two-axis priority diagram.
 * Horizontal: customizability (left) ↔ speed (right)
 * Vertical:   integrated (bottom) ↔ portability (top)
 * The user drags/clicks a marker to express their trade-off preference.
 */
export function AxisSelector({ value, onChange }: Readonly<Props>) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromEvent = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width; // 0..1
    const py = (clientY - rect.top) / rect.height; // 0..1
    onChange({
      x: clamp(px * 2 - 1),
      y: clamp(1 - py * 2),
    });
  };

  // Marker position in %.
  const left = ((value.x + 1) / 2) * 100;
  const top = ((1 - value.y) / 2) * 100;

  return (
    <div className="mx-auto w-full max-w-sm select-none">
      <div className="mb-2 text-center text-smalltext font-semibold uppercase tracking-wide text-primary">
        Portability
      </div>
      <div className="flex items-center gap-2">
        <div className="text-smalltext font-semibold uppercase tracking-wide text-primary [writing-mode:vertical-rl] rotate-180">
          Customizability
        </div>

        <div
          ref={ref}
          role="application"
          aria-label="Priority diagram. Click to set your preference between speed, customizability, portability and an integrated platform."
          className="relative aspect-square flex-1 cursor-crosshair rounded-lg border border-foreground/25 bg-foreground/[0.04]"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setFromEvent(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (dragging.current) setFromEvent(e.clientX, e.clientY);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
        >
          {/* Grid lines */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/15" />
          <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground/15" />

          {/* Marker */}
          <div
            className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary shadow-md transition-all duration-100"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        </div>

        <div className="text-smalltext font-semibold uppercase tracking-wide text-primary [writing-mode:vertical-rl]">
          Speed
        </div>
      </div>
      <div className="mt-2 text-center text-smalltext font-semibold uppercase tracking-wide text-primary">
        Integrated
      </div>
    </div>
  );
}
