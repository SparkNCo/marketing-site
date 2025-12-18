import { useState } from "react";
import { Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

type TeamMember = {
  name: string;
  role: string;
  description: string;
  commitment: string;
};

export default function DedicatedTeam() {
  const [teamMembers] = useState<TeamMember[]>([
    {
      name: "Sarah Chen",
      role: "Project Manager",
      description:
        "15+ years leading enterprise projects. PMP certified. Your single point of contact.",
      commitment: "25 hrs/week",
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead / Architect",
      description:
        "Former AWS Solutions Architect. Expert in scalable cloud infrastructure and system design.",
      commitment: "40 hrs/week",
    },
    {
      name: "Emily Watson",
      role: "Senior Full-Stack Developer",
      description:
        "10 years building enterprise apps. React, Node.js, PostgreSQL specialist.",
      commitment: "40 hrs/week",
    },
    {
      name: "David Kim",
      role: "Senior Full-Stack Developer",
      description:
        "Backend optimization expert. API design and integration specialist.",
      commitment: "40 hrs/week",
    },
    {
      name: "Priya Sharma",
      role: "UI/UX Designer",
      description:
        "Award-winning designer focused on enterprise UX and accessibility compliance.",
      commitment: "20 hrs/week",
    },
    {
      name: "Alex Thompson",
      role: "QA Engineer",
      description:
        "Automated testing specialist. Security and performance auditing experience.",
      commitment: "30 hrs/week",
    },
  ]);

  return (
    <section className="mb-16 w-[80vw]">
      {/* Header stays hardcoded */}
      <div className="mb-6 flex items-center gap-3">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">
          Your Dedicated Team
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {teamMembers.map((member) => (
          <Card
            key={member.name}
            className="border-border bg-card p-6 transition-colors hover:border-primary border-card"
          >
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-primary">{member.role}</p>
            </div>

            <p className="mb-3 text-sm leading-relaxed text-foreground">
              {member.description}
            </p>

            <Badge variant="outline" className="text-xs">
              {member.commitment}
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
}
