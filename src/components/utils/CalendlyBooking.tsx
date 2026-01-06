"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LoadingDots } from "./LoadingDotsBar";
import type { CalendarSubmitData, FormStep } from "./interfaces";

type Slot = {
  start: string;
  end: string;
  available: boolean;
};
type AvailabilityDayMap = Record<string, Slot[]>;

interface CalendlyBookingProps {
  onSubmit: (data: CalendarSubmitData) => void;
  submitting: boolean;
  availability: AvailabilityDayMap[];
}

export default function CalendlyBooking({
  onSubmit,
  submitting,
  availability,
}: CalendlyBookingProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [error, setError] = useState<string | null>(null);

  const nextFiveDays = [...Array(5)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const toDayKey = (date: Date) => date.toISOString().split("T")[0];

  const fetchEventTypes = async () => {
    const res = await fetch(
      `/api/calendly/eventypes?` +
        new URLSearchParams({
          eventSlug: "15min",
        })
    );
  };

  const canSubmit = Boolean(selectedDate && selectedSlot);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 text-foreground">
      {/* STEP 1 — SELECT DAY */}
      <section>
        <h2 className="text-xl font-semibold mb-4 ">Select a day</h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {nextFiveDays.map((day) => {
            const key = toDayKey(day);
            return (
              <button
                key={key}
                onClick={() => setSelectedDate(key)}
                className={`p-3 rounded-xl border-2 transition
                  ${
                    selectedDate === key
                      ? "bg-primary text-background border-primary"
                      : "border-muted"
                  }`}
              >
                <div className="font-semibold">
                  {day.toLocaleDateString(undefined, { weekday: "short" })}
                </div>
                <div className="text-sm">{day.getDate()}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* <div onClick={() => fetchEventTypes()}>VER EVENT TYPES</div> */}
      {/* STEP 2 — SELECT TIME SLOT */}
      {/*  {loadingTimes && <LoadingDots />} */}

      {availability && selectedDate && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Available times</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {availability.days[selectedDate]?.map((slot) => (
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
                })}{" "}
                -{" "}
                {new Date(slot.end).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            ))}

            {!availability.days[selectedDate]?.length && (
              <p className="col-span-full text-muted-foreground">
                No availability for this day
              </p>
            )}
          </div>
        </section>
      )}
      {!selectedDate && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Available times</h2>

          <div className="flex items-center justify-center h-32 rounded-xl border-2 border-dashed border-muted text-muted-foreground text-sm">
            Select a date to see available time slots
          </div>
        </section>
      )}
      {/* SUBMIT */}
      <Button
        size="lg"
        disabled={!canSubmit || submitting}
        className="w-full text-lg font-bold flex items-center justify-center gap-2"
        onClick={() =>
          onSubmit({
            selectedDate: selectedDate!,
            selectedTime: selectedSlot!.start,
            selectedStartTime: selectedSlot!.start,
            selectedEndTime: selectedSlot!.end,
            scheduling_url: "https://cal.com/kabir-malkani-glnivq/15min",
          })
        }
      >
        {submitting ? (
          <>
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            Booking…
          </>
        ) : (
          "Confirm meeting"
        )}
      </Button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
