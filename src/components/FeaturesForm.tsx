import { FeaturesCollection } from "./forms/features-collection";
import type { FeaturesFormProps } from "./utils/interfaces";



export default function FeaturesForm({ onSubmit }: FeaturesFormProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-secondary">
      <FeaturesCollection submissionId={""} />
    </main>
  );
}
