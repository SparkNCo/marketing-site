"use client";

import { AxisSelector } from "../AxisSelector";
import type { PriorityAxis } from "../types";

type Props = {
  value: PriorityAxis;
  onChange: (value: PriorityAxis) => void;
};

export function PriorityStep({ value, onChange }: Readonly<Props>) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-heading2 font-title font-bold text-foreground">
          What matters most?
        </h3>
        <p className="text-smalltext text-foreground/70">
          Drag the marker to show where your product sits between speed of
          delivery, customizability, portability and an integrated platform.
        </p>
      </div>

      <AxisSelector value={value} onChange={onChange} />
    </div>
  );
}
