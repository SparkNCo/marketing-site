"use client";

type ProposalSidebarProps = {
  sections: Record<string, any>;
  onSelect: (key: string) => void;
};

export default function ProposalSidebar({
  sections,
  onSelect,
}: ProposalSidebarProps) {
  return (
    <div className="w-60 pr-6 hidden lg:block text-foreground">
      <div className="sticky top-32 space-y-4 text-sm">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-primary">☰</span>
          <span>Table of Contents</span>
        </div>

        <div className="space-y-2">
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className="flex items-center gap-2 text-left w-full text-muted-foreground hover:text-primary"
            >
              <span className="text-primary">•</span>
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
