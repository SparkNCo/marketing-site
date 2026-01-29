"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../../lib/utils";

type SliderProps = Omit<
  React.ComponentProps<typeof SliderPrimitive.Root>,
  "value" | "defaultValue"
> & {
  value?: readonly number[];
  defaultValue?: readonly number[];
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderProps) {
  const _values = React.useMemo<number[]>(() => {
    if (Array.isArray(value)) return [...value];
    if (Array.isArray(defaultValue)) return [...defaultValue];
    return [min, max];
  }, [value, defaultValue, min, max]);

  /* data-[disabled]:opacity-50 */
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value ? [...value] : undefined}
      defaultValue={defaultValue ? [...defaultValue] : undefined}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none  data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      {/* TRACK */}
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="
          bg-card
          relative grow overflow-hidden rounded-full
          data-[orientation=horizontal]:h-2
          data-[orientation=horizontal]:w-full
          data-[orientation=vertical]:h-full
          data-[orientation=vertical]:w-2
        "
      >
        {/* RANGE */}
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="
            bg-primary
            absolute
            data-[orientation=horizontal]:h-full
            data-[orientation=vertical]:w-full
          "
        />
      </SliderPrimitive.Track>

      {/* THUMB(S) */}
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="
            block size-5 shrink-0 rounded-full
            bg-secondary
            border-2 border-primary
            shadow-sm
            transition-[color,box-shadow]

            hover:ring-4 hover:ring-[#FAF3DD]/40
            focus-visible:ring-4 focus-visible:ring-[#FAF3DD]/60
            focus-visible:outline-none

            disabled:pointer-events-none disabled:opacity-50
          "
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
