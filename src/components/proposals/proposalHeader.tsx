import { Badge } from "../ui/badge";

export default function ProposalHeader() {
  return (
    <header className="border-b border-border sticky top-0 bg-background backdrop-blur-sm z-10 border-b-card ">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Software Development Proposal
            </h1>
            <p className="text-sm text-secondary mt-1">
              TechForge Solutions - Prepared for Acme Corp
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            Valid until: Jan 31, 2025
          </Badge>
        </div>
      </div>
    </header>
  );
}
