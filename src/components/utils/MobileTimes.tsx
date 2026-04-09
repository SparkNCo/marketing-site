import { useState } from "react";
import { Button } from "../ui/button";
import type { Slot } from "./CalendlyBooking";

export const MobileTimes = ({
  slots,
  selectedSlot,
  setSelectedSlot,
}: {
  slots: Slot[];
  selectedSlot: Slot | null;
  setSelectedSlot: (slot: Slot) => void;
}) => {
  const [timeOffset, setTimeOffset] = useState(0);

  const visibleSlots = slots.slice(timeOffset, timeOffset + 6);

  const canGoPrev = timeOffset > 0;
  const canGoNext = timeOffset + 6 < slots.length;

  return (
    <div className="flex flex-col gap-4 md:hidden">
      {/* GRID 2 rows */}
      <div className="grid grid-cols-3 gap-3">
        {visibleSlots.map((slot) => (
          <button
            key={slot.start}
            onClick={() => setSelectedSlot(slot)}
            className={`p-3 rounded-xl border-2 transition
              ${
                selectedSlot?.start === slot.start
                  ? "bg-primary text-background border-primary"
                  : "border-muted"
              }`}
          >
            {new Date(slot.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
            {" - "}
            {new Date(slot.end).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </button>
        ))}
      </div>

      {/* ARROWS */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="icon"
          disabled={!canGoPrev}
          onClick={() => setTimeOffset((prev) => Math.max(0, prev - 6))}
        >
          &lt;
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled={!canGoNext}
          onClick={() =>
            setTimeOffset((prev) => (prev + 6 < slots.length ? prev + 6 : prev))
          }
        >
          &gt;
        </Button>
      </div>
    </div>
  );
};
