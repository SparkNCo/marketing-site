export type Feature = Readonly<{
  id: string;
  title: string;
  purpose: string;
  description: string;
  integrations: string;
  tech_constraints: string;
  sort_order: number;
}>;

export type SortableFeatureCardProps = Readonly<{
  feature: Feature;
  onUpdate: (id: string, field: keyof Feature, value: string) => void;
  onDelete: (id: string) => void;
}>;
