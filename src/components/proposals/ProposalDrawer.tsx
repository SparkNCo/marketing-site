"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function ProposalDrawer({
  sections,
  onSelect,
}: {
  sections: string[];
  onSelect: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = (key: string) => {
    onSelect(key);
    setOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-3 lg:hidden">
        <span className="text-smalltext font-medium text-foreground/80">
          Proposal
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md border border-foreground/15 p-2 text-foreground transition hover:bg-foreground/5"
          aria-label="Open table of contents"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-background z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold text-lg">Table of Contents</h3>

          <button onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto">
          {sections.map((key) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className="flex items-center gap-2 text-left w-full text-muted-foreground hover:text-primary"
            >
              <span className="text-primary">•</span>
              {key}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
