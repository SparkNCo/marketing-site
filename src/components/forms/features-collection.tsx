import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Plus, GripVertical, Trash2, Loader2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Feature = {
  id: string;
  title: string;
  purpose: string;
  description: string;
  integrations: string;
  tech_constraints: string;
  sort_order: number;
};

function SortableFeatureCard({
  feature,
  onUpdate,
  onDelete,
}: {
  feature: Feature;
  onUpdate: (id: string, field: keyof Feature, value: string) => void;
  onDelete: (id: string) => void;
}) {
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
      className="relative font-body font-title  "
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <button
          className="cursor-grab touch-none text-slate-400 hover:text-slate-600 active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <CardTitle className="flex-1 text-lg">
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
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`title-${feature.id}`}>Title</Label>
          <Input
            id={`title-${feature.id}`}
            value={feature.title}
            onChange={(e) => onUpdate(feature.id, "title", e.target.value)}
            placeholder="Feature name"
            className="mt-1.5 "
          />
        </div>
        <div>
          <Label htmlFor={`purpose-${feature.id}`}>Purpose</Label>
          <Input
            id={`purpose-${feature.id}`}
            value={feature.purpose}
            onChange={(e) => onUpdate(feature.id, "purpose", e.target.value)}
            placeholder="What problem does this solve?"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor={`description-${feature.id}`}>Description</Label>
          <Textarea
            id={`description-${feature.id}`}
            value={feature.description}
            onChange={(e) =>
              onUpdate(feature.id, "description", e.target.value)
            }
            placeholder="Detailed description of the feature"
            rows={3}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor={`integrations-${feature.id}`}>Integrations</Label>
          <Input
            id={`integrations-${feature.id}`}
            value={feature.integrations}
            onChange={(e) =>
              onUpdate(feature.id, "integrations", e.target.value)
            }
            placeholder="Third-party services needed"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor={`tech-${feature.id}`}>Tech Constraints</Label>
          <Input
            id={`tech-${feature.id}`}
            value={feature.tech_constraints}
            onChange={(e) =>
              onUpdate(feature.id, "tech_constraints", e.target.value)
            }
            placeholder="Technical requirements or limitations"
            className="mt-1.5"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function FeaturesCollection({ submissionId }: { submissionId: string }) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadFeatures();
  }, [submissionId]);

  const loadFeatures = async () => {
    try {
      const response = await fetch(
        `/api/features?submission_id=${submissionId}`
      );
      if (response.ok) {
        const data = await response.json();
        setFeatures(data);
      }
    } catch (error) {
      console.error("[v0] Error loading features:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFeature = () => {
    const newFeature: Feature = {
      id: crypto.randomUUID(),
      title: "",
      purpose: "",
      description: "",
      integrations: "",
      tech_constraints: "",
      sort_order: features.length,
    };
    setFeatures([...features, newFeature]);
  };

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    setFeatures(
      features.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const deleteFeature = (id: string) => {
    const filtered = features.filter((f) => f.id !== id);
    const reordered = filtered.map((f, idx) => ({ ...f, sort_order: idx }));
    setFeatures(reordered);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFeatures((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const reordered = arrayMove(items, oldIndex, newIndex);
        return reordered.map((f, idx) => ({ ...f, sort_order: idx }));
      });
    }
  };

  const saveFeatures = async () => {
    setIsSaving(true);
    try {
      console.log("features", features);
      await fetch("/api/features/post-features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: submissionId,
          features: features,
        }),
      });
    } catch (error) {
      console.error("[v0] Error saving features:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12  ">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }
  const isEmpty = features.length === 0;
  return (
    <div className="mx-auto max-w-4xl space-y-6 w-full min-h-[80vh] font-body ">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl md:text-5xl font-bold font-title  tracking-tight">
          Tell us about your Project
        </h1>
        <p className="text-2xl text-foreground font-body">
          Add All features you are interested to implement in your Project
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={features.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {features.map((feature) => (
            <SortableFeatureCard
              key={feature.id}
              feature={feature}
              onUpdate={updateFeature}
              onDelete={deleteFeature}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={addFeature}
          className="flex-1 bg-transparent"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Feature
        </Button>
        <Button
          onClick={saveFeatures}
          disabled={isSaving || features.length === 0}
          className="flex-1"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save All Features"
          )}
        </Button>
      </div>
    </div>
  );
}
