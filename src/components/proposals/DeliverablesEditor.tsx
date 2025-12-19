import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash2, Plus } from "lucide-react";

export interface Deliverable {
  title: string;
  items: string[];
}

interface Props {
  deliverables: Deliverable[];

  onUpdateItem: (
    deliverableIndex: number,
    itemIndex: number,
    value: string
  ) => void;

  onAddItem: (deliverableIndex: number) => void;

  onRemoveItem: (deliverableIndex: number, itemIndex: number) => void;
}

export default function DeliverablesEditor({
  deliverables,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {deliverables.map((deliverable, deliverableIndex) => (
          <Card
            key={deliverable.title}
            className="border-border bg-background p-6"
          >
            {/* Title (read-only) */}
            <h3 className="mb-4 text-xl font-bold text-primary">
              {deliverable.title}
            </h3>

            {/* Items */}
            <div className="space-y-2">
              {deliverable.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center gap-2">
                  <Input
                    value={item}
                    maxLength={40}
                    onChange={(e) =>
                      onUpdateItem(deliverableIndex, itemIndex, e.target.value)
                    }
                    className="text-base"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(deliverableIndex, itemIndex)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add item */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4 flex items-center gap-2"
              onClick={() => onAddItem(deliverableIndex)}
            >
              <Plus className="h-4 w-4" />
              Add item
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
