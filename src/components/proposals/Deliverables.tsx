import { ArrowRight, FileText, Pencil, Save } from "lucide-react";
import { Card } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";
import DeliverablesEditor from "./DeliverablesEditor";

interface Deliverable {
  title: string;
  items: string[];
}

export default function Deliverables({
  initialDeliverables,
  setProposal,
  dbUser,
}) {
  const [deliverables, setDeliverables] =
    useState<Deliverable[]>(initialDeliverables);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    if (isEditing) {
      setProposal(deliverables);
    }
    setIsEditing((prev) => !prev);
  };

  const updateDeliverableItem = (
    deliverableIndex: number,
    itemIndex: number,
    value: string
  ) => {
    setDeliverables((prev) =>
      prev.map((del, dIdx) =>
        dIdx === deliverableIndex
          ? {
              ...del,
              items: del.items.map((item, iIdx) =>
                iIdx === itemIndex ? value : item
              ),
            }
          : del
      )
    );
  };

  const addDeliverableItem = (deliverableIndex: number) => {
    setDeliverables((prev) =>
      prev.map((del, dIdx) =>
        dIdx === deliverableIndex ? { ...del, items: [...del.items, ""] } : del
      )
    );
  };

  const removeDeliverableItem = (
    deliverableIndex: number,
    itemIndex: number
  ) => {
    setDeliverables((prev) =>
      prev.map((del, dIdx) =>
        dIdx === deliverableIndex
          ? {
              ...del,
              items: del.items.filter((_, i) => i !== itemIndex),
            }
          : del
      )
    );
  };

  return (
    <section className="mb-16 w-[80vw]">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-card">
            Detailed Deliverables
          </h2>
        </div>
        {dbUser?.role === "admin" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleEditMode()}
            className="flex items-center gap-2 bg-background"
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
        )}
      </div>

      <div className="grid gap-4">
        {deliverables?.map((deliverable, dIdx) => (
          <Card
            key={deliverable.title}
            className="border-border bg-background p-6"
          >
            <h3 className="mb-3 text-lg font-semibold text-primary">
              {deliverable.title}
            </h3>

            {!isEditing ? (
              <ul className="space-y-2 text-foreground">
                {deliverable.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <ArrowRight className="mt-0.5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <DeliverablesEditor
                deliverables={deliverables}
                onUpdateItem={updateDeliverableItem}
                onAddItem={addDeliverableItem}
                onRemoveItem={removeDeliverableItem}
              />
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
