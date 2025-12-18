import { FileText } from "lucide-react";
import { Card } from "../ui/card";

export default function Deliverables() {
  return (
    <section className="mb-16 w-[80vw]">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">
          Detailed Deliverables
        </h2>
      </div>
      <div className="grid gap-4">
        {[
          {
            title: "Working Application",
            items: [
              "Production v1.0 deployed to AWS",
              "Staging environment for testing",
              "Browser support: Chrome 90+, Firefox 88+, Safari 14+",
              "Mobile responsive (viewport 320px+)",
            ],
          },
          {
            title: "Documentation",
            items: [
              "System architecture diagrams",
              "API documentation (OpenAPI 3.0)",
              "User onboarding guides (PDF & video)",
              "Database schema documentation",
              "DevOps runbooks",
            ],
          },
          {
            title: "Design Assets",
            items: [
              "Figma design files (all screens)",
              "Component library",
              "Brand style guide",
              "Exported assets (PNG, SVG)",
            ],
          },
          {
            title: "Testing Artifacts",
            items: [
              "QA test plans and reports",
              "Automated test suite (Jest, Cypress)",
              "Performance testing results",
              "Security penetration test report",
            ],
          },
          {
            title: "Deployment & Training",
            items: [
              "Production deployment",
              "CI/CD pipeline configuration",
              "3 training sessions (2 hours each)",
              "Training materials and videos",
            ],
          },
        ].map((deliverable, idx) => (
          <Card key={idx} className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-primary mb-3">
              {deliverable.title}
            </h3>
            <ul className="space-y-2 text-foreground">
              {deliverable.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
