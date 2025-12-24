import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash2, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import type { StackSection } from "./TechStackArchitecture";

interface Props {
  stackSections: StackSection[];
  whyThisStack: string;

  onUpdateItem: (
    sectionIndex: number,
    itemIndex: number,
    field: "label" | "value",
    value: string
  ) => void;

  onAddItem: (sectionIndex: number) => void;
  onRemoveItem: (sectionIndex: number, itemIndex: number) => void;

  onUpdateWhyThisStack: (value: string) => void;
}

export default function TechStackArchitectureEditor({
  stackSections,
  whyThisStack,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  onUpdateWhyThisStack,
}: Props) {
  return (
    <div className="space-y-6">
      <Card className="border-border bg-card p-8">
        <div className="grid gap-8 md:grid-cols-2">
          {stackSections.map((section, sectionIndex) => (
            <div key={section.title}>
              {/* Section title (read-only) */}
              <h3 className="mb-4 text-lg font-semibold text-primary">
                {section.title}
              </h3>

              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    {/* Label */}
                    <Input
                      value={item.label}
                      placeholder="Label"
                      maxLength={30}
                      onChange={(e) =>
                        onUpdateItem(
                          sectionIndex,
                          itemIndex,
                          "label",
                          e.target.value
                        )
                      }
                      className="w-1/3 text-sm"
                    />

                    {/* Value */}
                    <Input
                      value={item.value}
                      placeholder="Value"
                      onChange={(e) =>
                        onUpdateItem(
                          sectionIndex,
                          itemIndex,
                          "value",
                          e.target.value
                        )
                      }
                      className="text-sm"
                    />

                    {/* Delete */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        onRemoveItem(sectionIndex, itemIndex)
                      }
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {/* Add item */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 flex items-center gap-2"
                  onClick={() => onAddItem(sectionIndex)}
                >
                  <Plus className="h-4 w-4" />
                  Add item
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Why This Stack */}
        <div className="mt-8 rounded-md border border-border bg-background p-6">
          <h3 className="mb-3 text-lg font-semibold text-primary">
            Why This Stack?
          </h3>

          <Textarea
            value={whyThisStack}
            rows={5}
            onChange={(e) => onUpdateWhyThisStack(e.target.value)}
            className="text-sm"
          />
        </div>
      </Card>
    </div>
  );
}
