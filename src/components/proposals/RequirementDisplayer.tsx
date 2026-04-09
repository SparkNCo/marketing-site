"use client";

import { supabaseFunctionsUrl } from "../../lib/supabaseFunctionsUrl";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Requirement = {
  id: string;
  feature_name: string;
  description: string;
  purpose: string;
  integration_text: string;
  tech_constraints: string;
};

export default function RequirementDisplayer({
  submissionId,
}: Readonly<{
  submissionId: string;
}>) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const requirementsQuery = useQuery({
    queryKey: ["requirements", submissionId],
    queryFn: async () => {
      const res = await fetch(
        `${supabaseFunctionsUrl("features")}?submission_id=${encodeURIComponent(submissionId)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch requirements");
      }

      return res.json();
    },
    enabled: !!submissionId,
  });

  const data: Requirement[] = requirementsQuery.data ?? [];

  return (
    <div className="my-6 space-y-4">
      {/* Title */}
      <h2 className="text-center text-background text-heading2 font-bold">
        Features Required
      </h2>

      {/* Loading */}
      {requirementsQuery.isLoading && (
        <p className="text-center text-sm text-muted-foreground">
          Loading requirements...
        </p>
      )}

      {/* Data */}
      {data.length > 0 && (
        <div className="space-y-3">
          {data.map((req) => {
            const isOpen = openIds.includes(req.id);

            return (
              <div
                key={req.id}
                className="border rounded-lg bg-background shadow-sm overflow-hidden"
              >
                {/* Header (clickable) */}
                <button
                  onClick={() => toggle(req.id)}
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-muted/40 transition"
                >
                  <h3 className="font-semibold text-lg text-primary">
                    {req.feature_name}
                  </h3>

                  <span className="text-sm text-foreground">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Expandable content */}
                <div
                  className={`transition-all duration-300 ease-in-out px-4 ${
                    isOpen ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  {req.description && (
                    <p className="text-sm text-foreground mt-2">
                      {req.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty / Retry */}
      {!requirementsQuery.isLoading && data.length === 0 && (
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">No requirements found</p>

          <button
            onClick={() => requirementsQuery.refetch()}
            className="px-4 py-2 border rounded-md text-sm hover:bg-muted"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
