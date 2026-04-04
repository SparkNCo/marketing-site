import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "../../components/ui/button";
import { Plus, Loader2, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { LoadingProposal } from "../proposals/MissingPasscode";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Proposal } from "../proposals/Proposal";
import { SortableFeatureCard, type Feature } from "./SortableFeatureCard";
import type { DiscoveryFormState } from "../discorveryForm/DiscoveryFormProps";
import { supabaseFunctionsUrl } from "../../lib/supabaseFunctionsUrl";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

type FeaturesCollectionProps = Readonly<{
  proposal: Proposal | null;
  submissionId: string;
  pageMode: string;
  setPageMode: Dispatch<SetStateAction<string>>;
  discoveryState: DiscoveryFormState;
}>;

export function FeaturesCollectionMobile({
  proposal,
  submissionId,
  setPageMode,
  discoveryState,
}: FeaturesCollectionProps) {
  const [features, setFeatures] = useState<Feature[]>([]);

  /* --------------------------------
   * Load features
   * -------------------------------- */
  const featuresQuery = useQuery({
    queryKey: ["features", submissionId],
    enabled: !!submissionId,
    queryFn: async () => {
      const response = await fetch(
        `${supabaseFunctionsUrl("features")}?submission_id=${encodeURIComponent(submissionId)}`,
      );
      if (!response.ok) throw new Error("Failed to load features");
      return response.json();
    },
  });

  // populate local state when data arrives
  useEffect(() => {
    if (featuresQuery.data) {
      setFeatures(featuresQuery.data);
    }
  }, [featuresQuery.data]);

  /* --------------------------------
   * Save features
   * -------------------------------- */
  const saveFeaturesMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        supabaseFunctionsUrl("features"),
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
      if (!response.ok) throw new Error("Failed to save features");
      return response.json();
    },
    onSuccess: () => toast.success("Features saved"),
    onError: (error) => console.error("[v0] Error saving features:", error),
  });

  const handleSaveFeatures = () => {
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
      id: generateUUID(),
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
    setFeatures(features.filter((f) => f.id !== id));
  };

  if (featuresQuery.isLoading) return <LoadingProposal />;
  const isSaving = saveFeaturesMutation.isPending;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 mt-4 space-y-6 font-body">
      {/* Header */}
      <div className="text-center">
        <p className="text-heading2 font-bold text-secondary">
          Add features you are interested in implementing
        </p>
      </div>

      {/* Feature List */}
      <div className="space-y-4 sm:space-y-5 w-full">
        {features.map((feature) => (
          <SortableFeatureCard
            key={feature.id}
            feature={feature}
            onUpdate={updateFeature}
            onDelete={deleteFeature}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
        <Button
          variant="outline"
          onClick={addFeature}
          className="w-full md:w-fit px-4 py-6 text-xs sm:text-sm text-foreground hover:text-primary border-2 bg-transparent flex items-center justify-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Feature
        </Button>

        <Button
          onClick={handleSaveFeatures}
          disabled={isSaving}
          className="w-full md:w-fit px-4 py-6 text-xs sm:text-sm font-bold"
        >
          {isSaving ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
