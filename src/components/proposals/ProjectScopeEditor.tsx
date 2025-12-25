import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash2, Plus } from "lucide-react";
import type { ScopeList, ScopeSection } from "./ProjectScope";

interface Props {
  sections: ScopeSection[];
  scopeComparison: ScopeList[];

  onUpdateBullet: (
    sectionIndex: number,
    bulletIndex: number,
    value: string
  ) => void;

  onAddBullet: (sectionIndex: number) => void;

  onRemoveBullet: (sectionIndex: number, bulletIndex: number) => void;

  updateScopeComparison: (
    groupIndex: number,
    itemIndex: number,
    value: string
  ) => void;

  updateScopeItem: (
    groupIndex: number,
    itemIndex: number,
    value: string
  ) => void;

  addScopeItem: (groupIndex: number) => void;

  removeScopeItem: (groupIndex: number, itemIndex: number) => void;
}

export default function ProjectScopeEditor({
  sections,
  scopeComparison,
  onUpdateBullet,
  onAddBullet,
  onRemoveBullet,
  updateScopeItem,
  addScopeItem,
  removeScopeItem,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section, sectionIndex) => (
          <Card key={section.title} className="border-border bg-card p-6">
            {/* Title (read-only) */}
            <h3 className="mb-4 text-xl font-bold text-primary">
              {section.title}
            </h3>

            {/* Bullets */}
            <div className="space-y-2">
              {section.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex items-center gap-2">
                  <Input
                    value={bullet}
                    maxLength={40}
                    onChange={(e) =>
                      onUpdateBullet(sectionIndex, bulletIndex, e.target.value)
                    }
                    className="text-base"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveBullet(sectionIndex, bulletIndex)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add bullet */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4 flex items-center gap-2"
              onClick={() => onAddBullet(sectionIndex)}
            >
              <Plus className="h-4 w-4" />
              Add item
            </Button>
          </Card>
        ))}
      </div>

      <Card className="border-border bg-background p-6">
        <h3 className="mb-4 text-xl font-bold text-primary">
          In-Scope vs. Out-of-Scope
        </h3>

        <div className="grid gap-8 md:grid-cols-2">
          {scopeComparison.map((group, groupIndex) => (
            <div key={group.title}>
              <h4
                className={`mb-3 font-bold ${
                  group.title === "In-Scope"
                    ? "text-secondary"
                    : "text-muted-foreground"
                }`}
              >
                {group.title}
              </h4>

              <div className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    <Input
                      value={item}
                      maxLength={40}
                      onChange={(e) =>
                        updateScopeItem(groupIndex, itemIndex, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeScopeItem(groupIndex, itemIndex)}
                      className="text-destructive text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addScopeItem(groupIndex)}
                  className="mt-2 text-sm text-primary hover:underline"
                >
                  + Add item
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
