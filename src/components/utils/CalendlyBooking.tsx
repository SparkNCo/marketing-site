"use client";

import { useEffect, useState } from "react";

type CalendlyAvailability = {
  collection: {
    start_time: string;
    end_time: string;
  }[];
};

export default function CalendlyBooking() {
  const [availability, setAvailability] = useState<CalendlyAvailability | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 30);
        console.log(
          "start",
          `/api/calendly/availability?start=${start.toISOString()}&end=${end.toISOString()}`
        );

        const res = await fetch(
          `/api/calendly/availability?start=${start.toISOString()}&end=${end.toISOString()}`
        );

        if (!res.ok) throw new Error("Request failed");

        const data = await res.json();
        setAvailability(data);
      } catch (err) {
        setError("Failed to load availability");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  if (loading) return <p>Loading availability…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border p-4">
      <pre className="text-xs overflow-auto">
        {JSON.stringify(availability, null, 2)}
      </pre>
    </div>
  );
}
