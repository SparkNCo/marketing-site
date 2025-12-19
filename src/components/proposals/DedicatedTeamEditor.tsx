import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Trash2, Plus } from "lucide-react";
import type { TeamMember } from "./DedicatedTeam";

interface Props {
  teamMembers: TeamMember[];

  onUpdateMember: (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => void;

  onAddMember: () => void;
  onRemoveMember: (index: number) => void;
}

export default function DedicatedTeamEditor({
  teamMembers,
  onUpdateMember,
  onAddMember,
  onRemoveMember,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className="border-border bg-background p-6"
          >
            <div className="space-y-3">
              {/* Name */}
              <Input
                value={member.name}
                placeholder="Name"
                onChange={(e) =>
                  onUpdateMember(index, "name", e.target.value)
                }
              />

              {/* Role */}
              <Input
                value={member.role}
                placeholder="Role"
                onChange={(e) =>
                  onUpdateMember(index, "role", e.target.value)
                }
              />

              {/* Description */}
              <Textarea
                value={member.description}
                placeholder="Description"
                rows={4}
                onChange={(e) =>
                  onUpdateMember(index, "description", e.target.value)
                }
                className="text-sm"
              />

              {/* Commitment */}
              <Input
                value={member.commitment}
                placeholder="Commitment (e.g. 40 hrs/week)"
                onChange={(e) =>
                  onUpdateMember(index, "commitment", e.target.value)
                }
              />

              {/* Remove */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveMember(index)}
                className="text-destructive flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Remove member
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add member */}
      <Button
        type="button"
        variant="outline"
        className="flex items-center gap-2"
        onClick={onAddMember}
      >
        <Plus className="h-4 w-4" />
        Add team member
      </Button>
    </div>
  );
}