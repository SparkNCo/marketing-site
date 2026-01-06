import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
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

type Feature = Readonly<{
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

function SortableFeatureCard({
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
  const inputBaseClass =
    "mt-3 h-16 lg:h-10 text-4xl lg:text-sm placeholder:text-3xl lg:placeholder:text-sm placeholder:text-body bg-secondary text-body focus:ring-2 focus:ring-primary selection:bg-primary selection:text-body";

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="relative font-body font-title"
    >
      <CardHeader className="flex flex-row items-center gap-4 ">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-slate-400 hover:text-slate-600 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <CardTitle className="flex-1 text-lg font-semibold">
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
        <Input
          id={`title-${feature.id}`}
          value={feature.title}
          onChange={(e) => onUpdate(feature.id, "title", e.target.value)}
          placeholder="Feature name"
          className={inputBaseClass}
        />

        <Input
          id={`purpose-${feature.id}`}
          value={feature.purpose}
          onChange={(e) => onUpdate(feature.id, "purpose", e.target.value)}
          placeholder="What problem does this solve?"
          className={inputBaseClass}
        />

        <Textarea
          id={`description-${feature.id}`}
          value={feature.description}
          onChange={(e) => onUpdate(feature.id, "description", e.target.value)}
          placeholder="Detailed description of the feature"
          rows={3}
          className="mt-3 min-h-48 resize-none rounded-lg border-input bg-secondary p-4 pb-8 text-body focus:outline-none focus:ring-2 focus:ring-primary selection:bg-primary selection:text-body"
        />

        <Input
          id={`integrations-${feature.id}`}
          value={feature.integrations}
          onChange={(e) => onUpdate(feature.id, "integrations", e.target.value)}
          placeholder="Third-party services needed"
          className={inputBaseClass}
        />

        <Input
          id={`tech-${feature.id}`}
          value={feature.tech_constraints}
          onChange={(e) =>
            onUpdate(feature.id, "tech_constraints", e.target.value)
          }
          placeholder="Technical requirements or limitations"
          className={inputBaseClass}
        />
      </CardContent>
    </Card>
  );
}

type FeaturesCollectionProps = Readonly<{
  submissionId: string;
  pageMode: string;
  setPageMode: Dispatch<SetStateAction<string>>;
}>;

export function FeaturesCollection({
  submissionId,
  setPageMode,
}: FeaturesCollectionProps) {
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
      const response = await fetch("/api/features/post-features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: submissionId,
          features: features,
        }),
      });
      console.log("response", response);
      if (response) {
        setPageMode("loading");
      }
    } catch (error) {
      console.error("[v0] Error saving features:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const isFeatureComplete = (feature: Feature) => {
    return (
      feature.title.trim() !== "" &&
      feature.purpose.trim() !== "" &&
      feature.description.trim() !== "" &&
      feature.integrations.trim() !== "" &&
      feature.tech_constraints.trim() !== ""
    );
  };

  const hasCompletedFeature = features.some(isFeatureComplete);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12  ">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-4xl space-y-6 w-full min-h-[80vh] font-body py-8 mt-20">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl md:text-5xl font-bold  tracking-tight text-foreground ">
          Tell us about your Project
        </h1>
        <p className="text-2xl text-foreground font-title">
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
          className="flex-1 bg-transparent py-6 text-foreground hover:text-primary border-2 "
        >
          <Plus className="mr-2" />
          Add Feature
        </Button>

        <Button
          onClick={saveFeatures}
          disabled={isSaving || !hasCompletedFeature}
          title={
            hasCompletedFeature
              ? undefined
              : "Complete at least one feature before saving"
          }
          className="flex-1 py-6 font-bold"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 animate-spin" />
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
