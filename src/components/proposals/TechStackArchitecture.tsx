import { useState } from "react";
import { Code, Pencil, Save, ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import TechStackArchitectureEditor from "./TechStackArchitectureEditor";
import { Button } from "../ui/button";

type StackItem = {
  label: string;
  value: string;
};

export type StackSection = {
  title: string;
  items: StackItem[];
};

const initialStackSections = [
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
];

const initialWhyThisStack =
  "We've chosen battle-tested, enterprise-grade technologies that balance performance, scalability, and maintainability. This stack is used by companies like Airbnb, Netflix, and Uber. React/Next.js provides fast, SEO-friendly interfaces. PostgreSQL offers robust ACID compliance for financial data. AWS ensures 99.99% uptime with easy scaling as you grow.";

export default function TechStackArchitecture() {
  const [stackSections, setStackSections] =
    useState<StackSection[]>(initialStackSections);
  const [whyThisStack, setWhyThisStack] = useState(initialWhyThisStack);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((v) => !v);

  const updateStackValue = (
    sectionIndex: number,
    itemIndex: number,
    value: string
  ) => {
    setStackSections((prev) =>
      prev.map((section, sIdx) =>
        sIdx === sectionIndex
          ? {
              ...section,
              items: section.items.map((item, iIdx) =>
                iIdx === itemIndex ? { ...item, value } : item
              ),
            }
          : section
      )
    );
  };

  const updateWhyThisStack = (value: string) => {
    setWhyThisStack(value);
  };

  const updateStackItem = (
    sectionIndex: number,
    itemIndex: number,
    field: "label" | "value",
    value: string
  ) => {
    setStackSections((prev) =>
      prev.map((section, sIdx) =>
        sIdx === sectionIndex
          ? {
              ...section,
              items: section.items.map((item, iIdx) =>
                iIdx === itemIndex ? { ...item, [field]: value } : item
              ),
            }
          : section
      )
    );
  };

  const addStackItem = (sectionIndex: number) => {
    setStackSections((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              items: [...section.items, { label: "", value: "" }],
            }
          : section
      )
    );
  };

  const removeStackItem = (sectionIndex: number, itemIndex: number) => {
    setStackSections((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              items: section.items.filter((_, i) => i !== itemIndex),
            }
          : section
      )
    );
  };

  return (
    <section className="mb-16 w-[80vw]">
      {/* Header stays hardcoded */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-card">
            Tech Stack & Architecture
          </h2>{" "}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleEdit}
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

      {!isEditing ? (
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
                      <span className="mb-1 text-primary">
                        <ArrowRight />
                      </span>
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

          <div className="mt-8 rounded-md border border-border bg-card p-6 border-primary">
            <h3 className="mb-3 text-lg font-semibold text-primary">
              Why This Stack?
            </h3>
            <p className="text-sm leading-relaxed text-foreground">
              {whyThisStack}
            </p>
          </div>
        </Card>
      ) : (
        <TechStackArchitectureEditor
          stackSections={stackSections}
          whyThisStack={whyThisStack}
          onUpdateItem={updateStackItem}
          onAddItem={addStackItem}
          onRemoveItem={removeStackItem}
          onUpdateWhyThisStack={updateWhyThisStack}
        />
      )}
    </section>
  );
}
