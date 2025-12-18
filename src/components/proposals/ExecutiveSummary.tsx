"use client";

import { FileText } from "lucide-react";
import { Card } from "../ui/card";
import { useState } from "react";

interface SummaryItem {
  title: string;
  content: string;
}

export default function ExecutiveSummary() {
  const [summaryItems] = useState<SummaryItem[]>([
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

  return (
    <section className="mb-16 w-[80vw]">
      {/* Section Header (hardcoded title is OK) */}
      <div className="flex items-center gap-3 mb-6 mt-10">
        <FileText className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">
          Executive Summary
        </h2>
      </div>

      <Card className="p-8 bg-card border-border border-card">
        <div className="space-y-6">
          {summaryItems.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-bold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-foreground leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
