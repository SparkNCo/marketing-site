"use client";

import { Slider } from "../ui/slider2";

type Props = {
  title: string;
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  format?: (val: number) => string;
};

export function RangeSliderSection({
  title,
  min,
  max,
  step,
  value,
  onChange,
  format = (v) => v.toString(),
}: Props) {
  return (
    <div>
      <h3 className="mb-2 text-heading2 font-bold text-primary">{title}</h3>

      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onChange([v[0], v[1]])}
      />

      <div className="mt-4 flex items-center justify-between">
        <span className="text-body font-bold text-primary">
          {format(value[0])}
        </span>
        <span className="text-foreground">to</span>
        <span className="text-body font-bold text-primary">
          {format(value[1])}
        </span>
      </div>
    </div>
  );
}
