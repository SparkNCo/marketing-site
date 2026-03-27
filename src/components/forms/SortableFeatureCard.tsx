import { useSortable } from "@dnd-kit/sortable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Plus, GripVertical, Trash2, Loader2 } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { inputBaseClass } from "./features-collection";

export type Feature = Readonly<{
  id: string;
  title: string;
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
}>;

export function SortableFeatureCard({
  feature,
  onUpdate,
  onDelete,
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
      className="relative font-body font-title px-0"
    >
      <CardHeader className="flex flex-row items-center gap-4 ">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-slate-400 hover:text-slate-600 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <CardTitle className="flex-1 text-heading2 font-semibold text-foreground">
          Feature #{feature.sort_order + 1}
        </CardTitle>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(feature.id)}
          className="text-slate-400 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4  px-0 md:px-6">
        <CardContent className="space-y-4 px-0 md:px-6">
          <Input
            id={`title-${feature.id}`}
            value={feature.title}
            onChange={(e) => onUpdate(feature.id, "title", e.target.value)}
            placeholder="Feature name"
            className="
      mt-3
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

          <div className="relative">
            <Textarea
              id={`description-${feature.id}`}
              value={feature.description}
              onChange={(e) =>
                onUpdate(feature.id, "description", e.target.value)
              }
              placeholder="Detailed description of the feature"
              rows={3}
              className="
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
          </div>
        </CardContent>
      </CardContent>
    </Card>
  );
}
