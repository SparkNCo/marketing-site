"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
} from "lucide-react";
import type { FormStep } from "./interfaces";

interface CalendarBookingProps {
  onSubmit: (data: { selectedDate: string; selectedTime: string }) => void;
  currentStep: string;
  setCurrentStep: (step: FormStep) => void;
  submitting: boolean;
  setSubmitting: (submitting: boolean) => void;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function CalendarBooking({
  onSubmit,
  currentStep,
  setCurrentStep,
  submitting,
  setSubmitting,
}: CalendarBookingProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const getNextBusinessDays = () => {
    const days = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + 1);

    for (let i = 0; i < 10; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push(date);
      }
    }

    return days.slice(0, 5);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (selectedDate && selectedTime) {
      onSubmit({
        selectedDate,
        selectedTime,
      });
    }
  };

  const businessDays = getNextBusinessDays();

  return (
    <div className="animate-fade-in space-y-8 font-body">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-secondary font-title">
          Schedule your discovery call
        </h2>
        <p className="text-foreground text-2xl">
          Choose a time that works for you
        </p>
      </div>

      <form className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-medium text-secondary">
            <Calendar className="w-5 h-5" />
            <span>Select a Date</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {businessDays.map((date, index) => {
              const dateStr = date.toISOString().split("T")[0];
              const dayName = daysOfWeek[index];
              const dayNum = date.getDate();

              const isActive = selectedDate === dateStr;

              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => setSelectedDate(dateStr)}
                  className={`
                  p-3 rounded-xl border-2 transition-all cursor-pointer
                  flex flex-col items-center justify-center font-medium
                  ${
                    isActive
                      ? "border-primary bg-primary text-foreground shadow-sm"
                      : "border-input hover:border-foreground hover:bg-primary"
                  }
                  active:scale-[0.97]
                `}
                >
                  <div className="text-xs font-semibold opacity-80">
                    {dayName}
                  </div>
                  <div className="text-lg font-bold">{dayNum}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 font-medium text-secondary">
            <Clock className="w-5 h-5" />
            <span>Select a Time</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => {
              const isActive = selectedTime === time;

              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`
          p-3 rounded-xl border-2 transition-all cursor-pointer font-medium
          ${
            isActive
              ? "border-primary bg-primary text-foreground shadow-sm"
              : "border-input hover:border-foreground hover:hover:bg-primary"
          }
          active:scale-[0.97]
        `}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant={"nav"}
            onClick={() => setCurrentStep("product")}
            disabled={currentStep === "contact"}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            variant={"nav"}
            type="button"
            onClick={() => handleSubmit()}
            disabled={!selectedDate || !selectedTime || submitting}
          >
            {submitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                Submit
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
