import { useSortable } from "@dnd-kit/sortable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { GripVertical, Trash2 } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";

export type Feature = Readonly<{
  id: string;
  title: string;
  feature_name?: string;
  purpose: string;
  description: string;
  integrations: string;
  tech_constraints: string;
  sort_order: number;
}>;

type SortableFeatureCardProps = Readonly<{
  feature: Feature;
  onUpdate: (id: string, field: keyof Feature, value: string) => void;
  onDelete: (id: string) => void;
  readOnly?: boolean;
}>;

export function SortableFeatureCard({
  feature,
  onUpdate,
  onDelete,
  readOnly = false,
}: SortableFeatureCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: feature.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="relative font-body font-title w-full px-2 sm:px-0"
    >
      <CardHeader className="flex flex-row items-center gap-4 px-2 sm:px-6">
        {/* Drag handle */}
        {!readOnly && (
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5" />
          </button>
        )}

        {/* Feature title */}
        <CardTitle className="flex-1 text-body font-bold text-foreground">
          Feature #{feature.sort_order + 1}
        </CardTitle>

        {/* Delete button */}
        {!readOnly && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(feature.id)}
            className="text-slate-400 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4 px-2 sm:px-6 pb-4">
        {/* Feature title input */}
        <Input
          id={`title-${feature.id}`}
          value={feature.title || feature.feature_name || ""}
          onChange={(e) => onUpdate(feature.id, "title", e.target.value)}
          readOnly={readOnly}
          disabled={readOnly}
          placeholder="Feature name"
          className="
            w-full
            h-14 sm:h-16 lg:h-10
            text-body sm:text-body
            placeholder:text-xl sm:placeholder:text-3xl lg:placeholder:text-sm
            placeholder:text-background placeholder:opacity-60
            bg-secondary text-background
            focus:ring-primary
            selection:bg-primary selection:text-black selection:font-bold
            rounded-none
          "
        />

        {/* Feature description */}
        <Textarea
          id={`description-${feature.id}`}
          value={feature.description}
          onChange={(e) => onUpdate(feature.id, "description", e.target.value)}
          readOnly={readOnly}
          disabled={readOnly}
          placeholder="Quick description of what the feature does"
          rows={3}
          className="
            w-full
            min-h-40 resize-none
            bg-secondary
            px-4 pt-4 pb-8
            text-body text-sm sm:text-base
            border border-input
            focus:outline-none focus:ring-2 focus:ring-primary
            selection:bg-primary selection:text-body
            rounded-none
          "
        />
      </CardContent>
    </Card>
  );
}
