"use client";

import { FileText, Pencil, Save } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import ExecutiveSummaryEditor from "./ExecutiveSummaryEditor";

type SummaryItem = {
  title: string;
  content: string;
};
interface ExecutiveSummaryProps {
  summary_items?: SummaryItem[];
  setProposal: (data: SummaryItem[]) => void;
}

export default function ExecutiveSummary({
  summary_items = [],
  setProposal,
}: ExecutiveSummaryProps) {
  const [isDirty, setIsDirty] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [summaryItems, setSummaryItems] =
    useState<SummaryItem[]>(summary_items);

  const toggleEditMode = () => {
    if (isEditing) {
      setProposal(summaryItems);
    }
    setIsEditing((prev) => !prev);
  };

  const updateItem = (
    index: number,
    field: keyof SummaryItem,
    value: string
  ) => {
    setSummaryItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
    if (isEditing && isDirty) {
      setProposal(summaryItems);
    }
  };
  return (
    <section className="mb-16 w-[80vw]">
      {/* Header */}
      <div className="mb-6 mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-card">Executive Summary</h2>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleEditMode()}
          className="flex items-center gap-2 bg-background"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" /> Save
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" /> Edit
            </>
          )}
        </Button>
      </div>

      {/* Conditional Render */}
      {isEditing ? (
        <ExecutiveSummaryEditor items={summaryItems} onChange={updateItem} />
      ) : (
        <Card className="border-border bg-background p-8">
          <div className="space-y-6">
            {summaryItems.map((item) => (
              <div key={item.title}>
                <h3 className="mb-2 text-lg font-bold text-primary">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-foreground">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </section>
  );
}
