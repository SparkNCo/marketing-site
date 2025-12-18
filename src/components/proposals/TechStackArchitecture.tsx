import { useState } from "react";
import { Code } from "lucide-react";
import { Card } from "../ui/card";

type StackItem = {
  label: string;
  value: string;
};

type StackSection = {
  title: string;
  items: StackItem[];
};

export default function TechStackArchitecture() {
  const [stackSections] = useState<StackSection[]>([
    {
      title: "Platform & Frameworks",
      items: [
        {
          label: "Frontend",
          value: "React 18, Next.js 14, TypeScript",
        },
        {
          label: "Backend",
          value: "Node.js, Express, REST API",
        },
        {
          label: "Database",
          value: "PostgreSQL 15 with replication",
        },
        {
          label: "Caching",
          value: "Redis for session and query caching",
        },
      ],
    },
    {
      title: "Infrastructure & Security",
      items: [
        {
          label: "Hosting",
          value: "AWS (EC2, RDS, S3, CloudFront)",
        },
        {
          label: "DevOps",
          value: "Docker, GitHub Actions CI/CD",
        },
        {
          label: "Security",
          value: "SSL/TLS, OAuth 2.0, JWT auth",
        },
        {
          label: "Monitoring",
          value: "CloudWatch, Sentry error tracking",
        },
      ],
    },
  ]);

  const [whyThisStack] = useState(
    "We've chosen battle-tested, enterprise-grade technologies that balance performance, scalability, and maintainability. This stack is used by companies like Airbnb, Netflix, and Uber. React/Next.js provides fast, SEO-friendly interfaces. PostgreSQL offers robust ACID compliance for financial data. AWS ensures 99.99% uptime with easy scaling as you grow."
  );

  return (
    <section className="mb-16 w-[80vw]">
      {/* Header stays hardcoded */}
      <div className="mb-6 flex items-center gap-3">
        <Code className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">
          Tech Stack & Architecture
        </h2>
      </div>

      <Card className="border-border bg-card p-8 border-card">
        <div className="grid gap-8 md:grid-cols-2">
          {stackSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-lg font-semibold text-primary">
                {section.title}
              </h3>

              <ul className="space-y-2 text-sm text-foreground">
                {section.items.map((item) => (
                  <li key={item.label} className="flex items-start gap-2">
                    <span className="mt-1 text-primary">→</span>
                    <span>
                      <span className="font-semibold">{item.label}:</span>{" "}
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-md border border-border bg-background p-6 border-card">
          <h3 className="mb-3 text-lg font-semibold text-primary">
            Why This Stack?
          </h3>
          <p className="text-sm leading-relaxed text-foreground">
            {whyThisStack}
          </p>
        </div>
      </Card>
    </section>
  );
}
