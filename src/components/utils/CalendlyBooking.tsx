"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import type { CalendarSubmitData } from "./interfaces";
import { MobileTimes } from "./MobileTimes";
import { NextButton } from "../landing/components/NextFormButton";

export type Slot = {
  start: string;
  end: string;
  available: boolean;
};
type AvailabilityDayMap = Record<string, Slot[]>;

type CalendlyBookingProps = Readonly<{
  onSubmit: (data: CalendarSubmitData) => void;
  submitting: boolean;
  availability: AvailabilityDayMap;
}>;

export default function CalendlyBooking({
  onSubmit,
  submitting,
  availability,
}: CalendlyBookingProps) {
  const [availableSlots, setAvailableSlots] = useState(availability);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const slots = availableSlots[selectedDate] ?? [];

  const columns = useMemo(() => {
    if (!slots.length) return [[], [], []];

    const chunkSize = Math.ceil(slots.length / 3);

    return [
      slots.slice(0, chunkSize),
      slots.slice(chunkSize, chunkSize * 2),
      slots.slice(chunkSize * 2),
    ];
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedDate && availableSlots) {
      const firstDayWithSlots = Object.keys(availableSlots).find(
        (day) => availableSlots[day]?.length > 0,
      );

      if (firstDayWithSlots) {
        setSelectedDate(firstDayWithSlots);
      }
    }
  }, [availableSlots, selectedDate]);

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [dayOffset, setDayOffset] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loadingTimes, setLoadingTimes] = useState(false);

  // 👇 6 days (for mobile 2 rows of 3)
  const nextDays = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset + i);
    return d;
  });

  const toDayKey = (date: Date) => date.toISOString().split("T")[0];

  const fetchAvailabilityRange = async (offset: number) => {
    try {
      setLoadingTimes(true);
      setSelectedDate(null);
      setSelectedSlot(null);

      const startDate = new Date();
      startDate.setDate(startDate.getDate() + offset);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 4);
      endDate.setHours(23, 59, 59, 999);

      const res = await fetch(
        `/api/calendly/availability?` +
          new URLSearchParams({
            eventSlug: "discovery",
            start: startDate.toISOString(),
            end: endDate.toISOString(),
          }),
      );

      if (!res.ok) throw new Error("Failed to load availability");

      const data = await res.json();
      setAvailableSlots(data?.days);
    } catch (err) {
      console.error(err);
      setError("Failed to load availability");
    } finally {
      setLoadingTimes(false);
    }
  };

  const canSubmit = Boolean(selectedDate && selectedSlot);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 text-foreground">
      <h2 className="mb-4 text-heading2 text-title font-bold  ">
        Schedule a Discovery Call
      </h2>

      {/* STEP 1 — SELECT DAY */}
      <section>
        <h2 className="text-body font-semibold mb-4">Select a day</h2>

        {/* DESKTOP (unchanged layout) */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            disabled={dayOffset <= 1 || loadingTimes}
            onClick={() => {
              const newOffset = Math.max(1, dayOffset - 5);
              setDayOffset(newOffset);
              fetchAvailabilityRange(newOffset);
            }}
          >
            &lt;
          </Button>

          <div className="grid grid-cols-5 gap-3 flex-1">
            {nextDays.slice(0, 5).map((day) => {
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
                    {day.toLocaleDateString(undefined, {
                      weekday: "short",
                    })}
                  </div>
                  <div className="text-sm">{day.getDate()}</div>
                </button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            disabled={loadingTimes}
            onClick={() => {
              const newOffset = dayOffset + 5;
              setDayOffset(newOffset);
              fetchAvailabilityRange(newOffset);
            }}
          >
            &gt;
          </Button>
        </div>

        {/* MOBILE (new layout) */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className="grid grid-cols-3 gap-3">
            {nextDays.map((day) => {
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
                    {day.toLocaleDateString(undefined, {
                      weekday: "short",
                    })}
                  </div>
                  <div className="text-sm">{day.getDate()}</div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="icon"
              disabled={dayOffset <= 1 || loadingTimes}
              onClick={() => {
                const newOffset = Math.max(1, dayOffset - 6);
                setDayOffset(newOffset);
                fetchAvailabilityRange(newOffset);
              }}
            >
              &lt;
            </Button>

            <Button
              variant="outline"
              size="icon"
              disabled={loadingTimes}
              onClick={() => {
                const newOffset = dayOffset + 6;
                setDayOffset(newOffset);
                fetchAvailabilityRange(newOffset);
              }}
            >
              &gt;
            </Button>
          </div>
        </div>
      </section>

      {/* TIMES */}
      {availableSlots && selectedDate && (
        <section>
          <h2 className="text-body font-semibold mb-4">Available times</h2>

          {slots.length ? (
            <>
              <div className="hidden md:grid grid-cols-3 gap-3">
                {slots.map((slot) => (
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
                    })}{" "}
                    -{" "}
                    {new Date(slot.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </button>
                ))}
              </div>

              <MobileTimes
                slots={slots}
                selectedSlot={selectedSlot}
                setSelectedSlot={setSelectedSlot}
              />
            </>
          ) : (
            <p className="text-muted-foreground">
              No availability for this day
            </p>
          )}
        </section>
      )}

      {!selectedDate && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Available times</h2>
          <div className="flex items-center justify-center h-32 rounded-xl text-sm">
            Select a date to see available time slots
          </div>
        </section>
      )}

      {/* SUBMIT */}
      {/* <Button
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
          <div className="flex items-center gap-2">
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            <span>Booking…</span>
          </div>
        ) : (
          "Confirm meeting"
        )}
      </Button> */}
      <NextButton
        onClick={() =>
          onSubmit({
            selectedDate: selectedDate!,
            selectedTime: selectedSlot!.start,
            selectedStartTime: selectedSlot!.start,
            selectedEndTime: selectedSlot!.end,
            scheduling_url: "https://cal.com/kabir-malkani-glnivq/15min",
          })
        }
        disabled={!canSubmit}
        loading={submitting}
        text="Confirm meeting"
        wrapperClassName="bg-transparent"
        buttonClassName="
    w-full
    h-14 sm:h-16 lg:h-10
    bg-foreground text-background
    hover:bg-foreground active:bg-foreground 
  "
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
