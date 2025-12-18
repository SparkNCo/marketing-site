import { Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export default function DedicatedTeam() {
  return (
    <section className="mb-16 w-[80vw]">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">
          Your Dedicated Team
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
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
        ].map((member, idx) => (
          <Card
            key={idx}
            className="p-6 bg-card border-border hover:border-primary transition-colors"
          >
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-primary font-medium">{member.role}</p>
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              {member.description}
            </p>
            <Badge variant="secondary" className="text-xs">
              {member.commitment}
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
}
