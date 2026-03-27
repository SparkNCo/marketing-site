import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "../../components/ui/button";
import { Plus, Loader2 } from "lucide-react";
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
} from "@dnd-kit/sortable";
import { LoadingProposal } from "../proposals/MissingPasscode";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { Proposal } from "../proposals/Proposal";
import { SortableFeatureCard, type Feature } from "./SortableFeatureCard";
import type { DiscoveryFormState } from "../discorveryForm/DiscoveryFormProps";

export const inputBaseClass =
  "mt-3 h-16 lg:h-10 text-body lg:text-body placeholder:text-3xl lg:placeholder:text-sm placeholder:text-body bg-secondary text-body focus:ring-2 focus:ring-primary selection:bg-primary selection:text-body";

type FeaturesCollectionProps = Readonly<{
  proposal: Proposal | null;
  submissionId: string;
  pageMode: string;
  setPageMode: Dispatch<SetStateAction<string>>;
  discoveryState: DiscoveryFormState;
}>;

export function FeaturesCollection({
  proposal,
  submissionId,
  setPageMode,
  discoveryState,
}: FeaturesCollectionProps) {
  const [features, setFeatures] = useState<Feature[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  /* --------------------------------
   * Load features
   * -------------------------------- */
  const featuresQuery = useQuery({
    queryKey: ["features", submissionId],
    enabled: !!submissionId,
    queryFn: async () => {
      const response = await fetch(
        //`http://127.0.0.1:54321/functions/v1/features/?submission_id=${submissionId}`,
        `${import.meta.env.PUBLIC_ENDPOINT}/features/?submission_id=${submissionId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load features");
      }

      return response.json();
    },
  });

  /* --------------------------------
   * Save features
   * -------------------------------- */
  const saveFeaturesMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        //  "http://127.0.0.1:54321/functions/v1/features/",
        `${import.meta.env.PUBLIC_ENDPOINT}/features`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submission_id: submissionId,
            features,
            proposal_id: proposal?.proposal_id,
            discovery_state: discoveryState?.currentState,
            estimateTime_min: Number(discoveryState?.estimateTime_min),
            estimateTime_max: Number(discoveryState?.estimateTime_max),
            budget_min: String(discoveryState?.budget_min),
            budget_max: String(discoveryState?.budget_max),
            description: discoveryState?.description,
            lead_id: proposal?.lead_id,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save features");
      }
      setPageMode("waiting");
      return response.json();
    },
    onSuccess: () => {
      setPageMode("waiting");
    },
    onError: (error) => {
      console.error("[v0] Error saving features:", error);
    },
  });

  const handleSaveFeatures = () => {
    console.log(features.length);
    if (features.length === 0) {
      toast.error("You must add at least one feature");
      return;
    }

    saveFeaturesMutation.mutate();
  };

  /* --------------------------------
   * Feature helpers
   * -------------------------------- */
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
      features.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
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

  const isLoading = featuresQuery.isLoading;
  const isSaving = saveFeaturesMutation.isPending;
  if (isLoading) {
    return <LoadingProposal />;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-0 sm:px-6 lg:px-0 py-6 sm:py-8 mt-12 sm:mt-16 md:mt-20 space-y-6 font-body ">
      {/* Header */}
      <div className="text-center md:px-2">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground font-title leading-snug">
          Add all features you are interested in implementing in your project
        </p>
      </div>

      {/* Feature List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={features.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4 sm:space-y-5 ">
            {features.map((feature) => (
              <SortableFeatureCard
                key={feature.id}
                feature={feature}
                onUpdate={updateFeature}
                onDelete={deleteFeature}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          variant="outline"
          onClick={addFeature}
          className="w-full sm:flex-1 py-4 sm:py-5 md:py-6 text-sm sm:text-base text-foreground hover:text-primary border-2 bg-transparent"
        >
          <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Add Feature
        </Button>

        <Button
          onClick={handleSaveFeatures}
          disabled={isSaving}
          title="Complete at least one feature before saving"
          className="w-full sm:flex-1 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-bold"
        >
          {isSaving ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              Saving...
            </span>
          ) : (
            "Save All Features"
          )}
        </Button>
      </div>
    </div>
  );
}
