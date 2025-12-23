"use client";

import { Code, Pencil, Save } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import ProjectScopeEditor from "./ProjectScopeEditor";

export interface ScopeSection {
  title: string;
  bullets: string[];
}

export interface ScopeList {
  title: string;
  items: string[];
}

export default function ProjectScope() {
  const [isEditing, setIsEditing] = useState(false);

  const initialSections: ScopeSection[] = [
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

  const [sections, setSections] = useState<ScopeSection[]>(initialSections);

  const [scopeComparison, setScopeComparison] = useState<ScopeList[]>([
    {
      title: "In-Scope",
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
      items: [
        "Hardware procurement",
        "Legacy data migration (available as add-on)",
        "Native mobile apps",
        "On-premise deployment",
        "24/7 phone support",
      ],
    },
  ]);

  const toggleEdit = () => setIsEditing((v) => !v);

  const updateScopeComparison = (
    groupIndex: number,
    itemIndex: number,
    value: string
  ) => {
    setScopeComparison((prev) =>
      prev.map((group, gi) =>
        gi === groupIndex
          ? {
              ...group,
              items: group.items.map((item, ii) =>
                ii === itemIndex ? value : item
              ),
            }
          : group
      )
    );
  };

  const updateBullet = (
    sectionIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    setSections((prev) =>
      prev.map((section, sIdx) =>
        sIdx !== sectionIndex
          ? section
          : {
              ...section,
              bullets: section.bullets.map((b, bIdx) =>
                bIdx === bulletIndex ? value : b
              ),
            }
      )
    );
  };

  const addBullet = (sectionIndex: number) => {
    setSections((prev) =>
      prev.map((section, idx) =>
        idx !== sectionIndex
          ? section
          : {
              ...section,
              bullets: [...section.bullets, ""],
            }
      )
    );
  };

  const removeBullet = (sectionIndex: number, bulletIndex: number) => {
    setSections((prev) =>
      prev.map((section, sIdx) =>
        sIdx !== sectionIndex
          ? section
          : {
              ...section,
              bullets: section.bullets.filter(
                (_, bIdx) => bIdx !== bulletIndex
              ),
            }
      )
    );
  };
  const updateScopeItem = (
    groupIndex: number,
    itemIndex: number,
    value: string
  ) => {
    setScopeComparison((prev) =>
      prev.map((group, gIdx) =>
        gIdx === groupIndex
          ? {
              ...group,
              items: group.items.map((item, iIdx) =>
                iIdx === itemIndex ? value : item
              ),
            }
          : group
      )
    );
  };

  const addScopeItem = (groupIndex: number) => {
    setScopeComparison((prev) =>
      prev.map((group, gIdx) =>
        gIdx === groupIndex ? { ...group, items: [...group.items, ""] } : group
      )
    );
  };

  const removeScopeItem = (groupIndex: number, itemIndex: number) => {
    setScopeComparison((prev) =>
      prev.map((group, gIdx) =>
        gIdx === groupIndex
          ? {
              ...group,
              items: group.items.filter((_, i) => i !== itemIndex),
            }
          : group
      )
    );
  };

  return (
    <section className="mb-16 w-[80vw]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-Card">Project Scope</h2>
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

      {isEditing ? (
        <ProjectScopeEditor
          sections={sections}
          scopeComparison={scopeComparison}
          updateScopeComparison={updateScopeComparison}
          onUpdateBullet={updateBullet}
          onAddBullet={addBullet}
          onRemoveBullet={removeBullet}
          updateScopeItem={updateScopeItem}
          addScopeItem={addScopeItem}
          removeScopeItem={removeScopeItem}
        />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <Card
                key={section.title}
                className="border-border bg-card p-6 border-card"
              >
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

          <Card className="mt-6 border-border bg-card p-6 border-card">
            <h3 className="mb-4 text-xl font-bold text-primary">
              In-Scope vs. Out-of-Scope
            </h3>

            <div className="grid gap-8 md:grid-cols-2">
              {scopeComparison.map((group) => (
                <div key={group.title}>
                  <h4 className={`mb-3 font-bold text-secondary`}>
                    {group.title}
                  </h4>

                  <ul
                    className={`list-disc space-y-1 pl-6 text-sm text-foreground`}
                  >
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </section>
  );
}
