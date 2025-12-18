import { FileText } from "lucide-react";
import { Card } from "../ui/card";

export default function ExecutiveSummary() {
  return (
    <section className="mb-16 w-[80vw] ">
      <div className="flex items-center gap-3 mb-6 mt-10">
        <FileText className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground ">
          Executive Summary
        </h2>
      </div>
      <Card className="p-8 bg-card border-border">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">
              Client Objectives
            </h3>
            <p className="text-foreground leading-relaxed">
              Acme Corp seeks to modernize their legacy inventory management
              system to improve operational efficiency, reduce manual errors,
              and provide real-time visibility across 15 warehouse locations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">
              Opportunity & Value Statement
            </h3>
            <p className="text-foreground leading-relaxed">
              Our proposed cloud-based solution will reduce inventory processing
              time by 60%, eliminate duplicate data entry, and provide
              actionable insights through advanced analytics—translating to
              estimated annual savings of $450,000 and improved customer
              satisfaction.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">
              High-Level Solution Methodology
            </h3>
            <p className="text-foreground leading-relaxed">
              We will deliver a full-stack web application with
              mobile-responsive design, built using modern frameworks,
              integrated with existing ERP systems, and deployed on scalable
              cloud infrastructure with 99.9% uptime SLA.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
