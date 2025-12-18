import { Code } from "lucide-react";
import { Card } from "../ui/card";

export default function TechStackArchitecture() {
  return (
    <section className="mb-16 w-[80vw]">
      <div className="flex items-center gap-3 mb-6">
        <Code className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">
          Tech Stack & Architecture
        </h2>
      </div>
      <Card className="p-8 bg-card border-border">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Platform & Frameworks
            </h3>
            <ul className="space-y-2 text-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>
                  <span className="font-semibold">Frontend:</span> React 18,
                  Next.js 14, TypeScript
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>
                  <span className="font-semibold">Backend:</span> Node.js,
                  Express, REST API
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>
                  <span className="font-semibold">Database:</span> PostgreSQL 15
                  with replication
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>
                  <span className="font-semibold">Caching:</span> Redis for
                  session and query caching
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Infrastructure & Security
            </h3>
            <ul className="space-y-2 text-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>
                  <span className="font-semibold">Hosting:</span> AWS (EC2, RDS,
                  S3, CloudFront)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>
                  <span className="font-semibold">DevOps:</span> Docker, GitHub
                  Actions CI/CD
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>
                  <span className="font-semibold">Security:</span> SSL/TLS,
                  OAuth 2.0, JWT auth
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span>
                  <span className="font-semibold">Monitoring:</span> CloudWatch,
                  Sentry error tracking
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 p-6 bg-background rounded-md border border-border">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Why This Stack?
          </h3>
          <p className="text-sm text-foreground leading-relaxed">
            We've chosen battle-tested, enterprise-grade technologies that
            balance performance, scalability, and maintainability. This stack is
            used by companies like Airbnb, Netflix, and Uber. React/Next.js
            provides fast, SEO-friendly interfaces. PostgreSQL offers robust
            ACID compliance for financial data. AWS ensures 99.99% uptime with
            easy scaling as you grow.
          </p>
        </div>
      </Card>
    </section>
  );
}
