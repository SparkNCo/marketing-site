import { useState } from "react";
import { Pencil, Save, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import DedicatedTeamEditor from "./DedicatedTeamEditor";

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  commitment: string;
};

const initialTeam = [
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
];

export default function DedicatedTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeam);
  const [isEditing, setIsEditing] = useState(false);

  const updateTeamMember = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    setTeamMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    );
  };
  const addTeamMember = () => {
    setTeamMembers((prev) => [
      ...prev,
      {
        name: "",
        role: "",
        description: "",
        commitment: "",
      },
    ]);
  };
  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <section className="mb-16 w-[80vw]">
      {/* Header stays hardcoded */}

      <div className="mb-6 mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-card">
            Your Dedicated Team
          </h2>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleEditMode()}
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
        <DedicatedTeamEditor
          teamMembers={teamMembers}
          onUpdateMember={updateTeamMember}
          onAddMember={addTeamMember}
          onRemoveMember={removeTeamMember}
        />
      ) : (
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
                <p className="text-sm font-medium text-primary">
                  {member.role}
                </p>
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
      )}
    </section>
  );
}
