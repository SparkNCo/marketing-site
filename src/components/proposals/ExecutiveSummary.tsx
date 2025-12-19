"use client";

import { FileText, Pencil, Save } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import ExecutiveSummaryEditor from "./ExecutiveSummaryEditor";

export interface SummaryItem {
  title: string;
  content: string;
}

export default function ExecutiveSummary() {
  const [isEditing, setIsEditing] = useState(false);

  const [summaryItems, setSummaryItems] = useState<SummaryItem[]>([
    {
      title: "Client Objectives",
      content:
        "Acme Corp seeks to modernize their legacy inventory management system to improve operational efficiency, reduce manual errors, and provide real-time visibility across 15 warehouse locations.",
    },
    {
      title: "Opportunity & Value Statement",
      content:
        "Our proposed cloud-based solution will reduce inventory processing time by 60%, eliminate duplicate data entry, and provide actionable insights through advanced analytics—translating to estimated annual savings of $450,000 and improved customer satisfaction.",
    },
    {
      title: "High-Level Solution Methodology",
      content:
        "We will deliver a full-stack web application with mobile-responsive design, built using modern frameworks, integrated with existing ERP systems, and deployed on scalable cloud infrastructure with 99.9% uptime SLA.",
    },
  ]);

  const toggleEditMode = () => {
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
  };

  return (
    <section className="mb-16 w-[80vw]">
      {/* Header */}
      <div className="mb-6 mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">
            Executive Summary
          </h2>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleEditMode()}
          className="flex items-center gap-2"
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
        <Card className="border-border bg-card p-8">
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
