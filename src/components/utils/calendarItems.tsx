"use client";

import { Label } from "@radix-ui/react-label";
import { cn } from "../../../lib/utils";

type Slot = {
  time: string;
  scheduling_url: string;
};

type CalendarBookingItemsProps = Readonly<{
  days: Record<string, Slot[]>;
  selectedDate: string | null;
  selectedTime: string | null;
  selectedLink: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onSelectLink: (link: string) => void;
}>;

export function CalendarBookingItems({
  days,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onSelectLink,
}: CalendarBookingItemsProps) {
  const dates = Object.keys(days);

  return (
    <div className="space-y-8">
      {/* ---------- DATE SELECT ---------- */}
      <div>
        <Label className="text-card-foreground mb-3 block">Select Date</Label>

        <div className="grid grid-cols-5 gap-3">
          {dates.map((date) => {
            const d = new Date(date);

            const dayLabel = d.toLocaleDateString(undefined, {
              weekday: "short",
            });

            const dayNumber = d.getDate();

            return (
              <button
                key={date}
                type="button"
                onClick={() => onSelectDate(date)}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center font-medium",
                  selectedDate === date
                    ? "bg-primary text-background border-primary"
                    : "border-4 "
                )}
              >
                <span className="text-xs text-muted-foreground mb-1">
                  {dayLabel}
                </span>
                <span className="text-2xl font-bold text-card-foreground">
                  {dayNumber}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- TIME SELECT ---------- */}
      <div>
        <Label className="text-card-foreground mb-3 block">Select Time</Label>

        {selectedDate ? (
          <div className="grid grid-cols-3 gap-3">
            {days[selectedDate]?.map((slot) => {
              const timeLabel = new Date(slot.time).toLocaleTimeString(
                undefined,
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => {
                    onSelectTime(slot.time);
                    onSelectLink(slot.scheduling_url);
                  }}
                  className={cn(
                    "p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center font-medium",
                    selectedTime === slot.time
                      ? "bg-primary text-background border-primary"
                      : "border-4"
                  )}
                >
                  <span className="text-lg font-semibold text-card-foreground">
                    {timeLabel}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-xl bg-card/40">
            <p className="text-lg text-muted-foreground">
              Please select a date to view available times
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
