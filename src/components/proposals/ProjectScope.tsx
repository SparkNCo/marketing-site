import { Code } from "lucide-react";
import { Card } from "../ui/card";

interface ScopeSection {
  title: string;
  bullets: string[];
}

interface ScopeList {
  title: string;
  titleClass: string;
  listClass: string;
  items: string[];
}

const scopeComparison: ScopeList[] = [
  {
    title: "In-Scope",
    titleClass: "text-secondary",
    listClass: "text-foreground",
    items: [
      "Custom application development",
      "Database design and setup",
      "Third-party integrations",
      "User training (3 sessions)",
      "90 days post-launch support",
      "Security auditing",
    ],
  },
  {
    title: "Out-of-Scope",
    titleClass: "text-muted-foreground",
    listClass: "text-muted-foreground",
    items: [
      "Hardware procurement",
      "Legacy data migration (available as add-on)",
      "Native mobile apps",
      "On-premise deployment",
      "24/7 phone support",
    ],
  },
];

export default function ProjectScope() {
  const sections: ScopeSection[] = [
    {
      title: "Features & Modules",
      bullets: [
        "Real-time inventory tracking dashboard",
        "Automated purchase order generation",
        "Barcode / QR scanning capabilities",
        "Multi-warehouse management",
        "Advanced reporting and analytics",
        "Role-based access control",
      ],
    },
    {
      title: "User Types & Roles",
      bullets: [
        "System Administrator (full access)",
        "Warehouse Manager (location-specific)",
        "Inventory Specialist (data entry & updates)",
        "Purchasing Agent (PO management)",
        "Executive (read-only analytics)",
      ],
    },
    {
      title: "Integrations",
      bullets: [
        "SAP ERP system (bi-directional sync)",
        "QuickBooks for financial data",
        "Shipping carrier APIs (FedEx, UPS, USPS)",
        "Email notifications (SendGrid)",
      ],
    },
    {
      title: "Platforms",
      bullets: [
        "Web application (Chrome, Firefox, Safari)",
        "Mobile-responsive design (iOS & Android)",
        "Cloud infrastructure (AWS)",
        "RESTful API backend",
      ],
    },
  ];

  return (
    <section className="mb-16 w-[80vw]">
      <div className="mb-6 flex items-center gap-3">
        <Code className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">Project Scope</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title} className="border-border bg-card p-6 border-card">
            <h3 className="mb-4 text-xl font-bold text-primary">
              {section.title}
            </h3>

            <ul className="list-disc space-y-2 pl-6 text-foreground">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* In / Out Scope */}
      <Card className="mt-6 border-border bg-card p-6 border-card">
        <h3 className="mb-4 text-xl font-bold text-primary">
          In-Scope vs. Out-of-Scope
        </h3>

        <div className="grid gap-8 md:grid-cols-2">
          {scopeComparison.map((group) => (
            <div key={group.title}>
              <h4 className={`mb-3 font-bold ${group.titleClass}`}>
                {group.title}
              </h4>

              <ul
                className={`list-disc space-y-1 pl-6 text-sm ${group.listClass}`}
              >
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
