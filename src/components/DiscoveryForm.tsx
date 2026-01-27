import { FileText } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  FeaturesCollection,
  inputBaseClass,
} from "./forms/features-collection";
import { Textarea } from "./ui/textarea";

type DiscoveryFormProps = {
  calTime?: string;
  requirementOverview?: string;
  timeline?: string;
  budget?: string;
};

export default function DiscoveryForm({
  calTime = "<enter cal.com time>",
  requirementOverview = "",
  timeline = "",
  budget = "",
  proposal,
  passcode,
  pageMode,
  setPageMode,
}: DiscoveryFormProps) {
  return (
    <section className="mt-28 mb-16 w-[80vw] mx-auto  p-8">
      {/* Header */}
      <div className="mb-6 mt-10 flex items-center gap-3 mx-auto w-fit">
        <FileText className="h-6 w-6 text-primary" />
        <h2 className="mb-3 text-4xl md:text-5xl font-bold  tracking-tight text-foreground">
          Discovery
        </h2>
      </div>

      {/* Subtitle */}
      <p className="text-2xl text-foreground font-title mb-8 mx-auto w-fit">
        Here's an outline of what we'll be discussing on our call at{" "}
        <span className="font-medium text-foreground">{calTime}</span>. Please
        add as much detail as you can before we meet. See you soon!
      </p>

      {/* Content */}
      <Card className="border-border bg-background p-8">
        <div className="space-y-8 text-2xl  font-title">
          {/* Requirement Overview */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-primary">
              Requirement Overview
            </h3>
            <Textarea
              defaultValue={requirementOverview}
              className="mt-3 min-h-48 resize-none rounded-lg border-input bg-secondary p-4 pb-8 text-body focus:outline-none focus:ring-2 focus:ring-primary selection:bg-primary selection:text-body"
              placeholder="Describe the main requirements..."
            />
          </div>

          {/* Timeline */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-primary">Timeline</h3>
            <Input
              type="text"
              defaultValue={timeline}
              className={inputBaseClass}
              placeholder="Expected timeline"
            />
          </div>

          {/* Budget */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-primary">Budget</h3>
            <Input
              type="text"
              defaultValue={budget}
              className={inputBaseClass}
              placeholder="Estimated budget"
            />
          </div>

          {/* Current State */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-primary">
              Current State
            </h3>
            <Textarea
              className="mt-3 min-h-48 resize-none rounded-lg border-input bg-secondary p-4 pb-8 text-body focus:outline-none focus:ring-2 focus:ring-primary selection:bg-primary selection:text-body"
              placeholder="Current resources, tools, and any restrictions..."
            />
          </div>

          <FeaturesCollection
            proposal={proposal}
            submissionId={passcode}
            pageMode={pageMode}
            setPageMode={setPageMode}
          />
        </div>
      </Card>
    </section>
  );
}
