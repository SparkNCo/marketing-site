import { Card } from "../ui/card";

export default function CtaProposal() {
  return (
    <section className="mb-16 w-[80vw]">
      <Card className="p-8 bg-card border-primary border-2 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Ready to Transform Your Inventory Management?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Let's schedule a call to discuss next steps, answer any questions, and
          kick off this project. We're excited to partner with Acme Corp!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity">
            Accept Proposal
          </button>
          <button className="px-8 py-3 bg-card text-foreground border border-border font-semibold rounded-md hover:bg-muted transition-colors">
            Schedule a Call
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          Questions? Contact Sarah Chen, Project Manager
          <br />
          sarah.chen@techforgesolutions.com • (555) 123-4567
        </p>
      </Card>
    </section>
  );
}
