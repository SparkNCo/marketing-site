import { Calendar } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface Dependency {
  week: string;
  description: string;
}

interface Risk {
  title: string;
  mitigation: string;
}

const dependencies: Dependency[] = [
  {
    week: "Week 1",
    description: "Client must provide SAP API credentials and documentation",
  },
  {
    week: "Week 3",
    description: "Final design approval required to proceed with development",
  },
  {
    week: "Week 12",
    description: "UAT participants identified and scheduled",
  },
];

const risks: Risk[] = [
  {
    title: "SAP Integration Complexity",
    mitigation:
      "Early API testing and fallback to batch sync if real-time proves infeasible",
  },
  {
    title: "Legacy Data Quality",
    mitigation: "Data audit in Week 1, cleansing scripts, and validation rules",
  },
  {
    title: "Scope Creep",
    mitigation: "Formal change request process with impact analysis",
  },
];

export default function PlanTimeline() {
  return (
    <section className="mb-16 w-[80vw]">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">
          Project Plan & Timeline
        </h2>
      </div>
      <Card className="p-8 bg-card border-border border-card">
        <p className="text-foreground mb-6 leading-relaxed">
          Total project duration:{" "}
          <span className="font-semibold text-primary">16 weeks</span> from
          contract signing
        </p>
        <div className="space-y-6">
          {[
            {
              phase: "Discovery & Design",
              duration: "Weeks 1-3",
              tasks: [
                "Requirements finalization",
                "UI/UX design",
                "Technical architecture",
                "Database schema design",
              ],
            },
            {
              phase: "Development - Phase 1",
              duration: "Weeks 4-7",
              tasks: [
                "Core inventory module",
                "User authentication",
                "Dashboard development",
                "API development",
              ],
            },
            {
              phase: "Development - Phase 2",
              duration: "Weeks 8-11",
              tasks: [
                "Reporting & analytics",
                "Third-party integrations",
                "Advanced features",
                "Mobile optimization",
              ],
            },
            {
              phase: "QA & Testing",
              duration: "Weeks 12-14",
              tasks: [
                "Functional testing",
                "Performance testing",
                "Security audit",
                "Bug fixes",
              ],
            },
            {
              phase: "UAT & Training",
              duration: "Week 15",
              tasks: [
                "User acceptance testing",
                "Training sessions",
                "Documentation review",
                "Feedback incorporation",
              ],
            },
            {
              phase: "Launch & Support",
              duration: "Week 16+",
              tasks: [
                "Production deployment",
                "Monitoring setup",
                "90-day support period begins",
                "Performance optimization",
              ],
            },
          ].map((milestone, idx) => (
            <div key={idx} className="border-l-2 border-primary pl-6 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {milestone.phase}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {milestone.duration}
                </Badge>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {milestone.tasks.map((task, i) => (
                  <li key={i}>• {task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Dependencies & Decision Deadlines
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
            {dependencies.map((item) => (
              <div
                key={item.week}
                className="rounded-md border border-border bg-background p-4 border-card"
              >
                <p className="mb-1 font-semibold text-secondary">{item.week}</p>
                <p className="text-sm text-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
