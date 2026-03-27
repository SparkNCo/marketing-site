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
    <div className="w-80 hidden lg:block text-foreground">
      <div className="sticky top-32">
        <div className="bg-background  rounded-lg shadow-sm overflow-hidden">
          
          {/* Header (same as drawer) */}
          <div className="p-4  flex items-center gap-2">
            <span className="text-primary text-lg">☰</span>
            <h3 className="font-semibold text-lg">
              Table of Contents
            </h3>
          </div>

          {/* Content (same spacing/feel as drawer) */}
          <div className="p-4 space-y-3">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className="flex items-center gap-2 text-left w-full text-muted-foreground hover:text-primary transition"
              >
                <span className="text-primary">•</span>
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}