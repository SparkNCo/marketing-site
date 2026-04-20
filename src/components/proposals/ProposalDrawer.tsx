"use client";

import { useState } from "react";
import { BookOpen, X } from "lucide-react";

export default function ProposalDrawer({
  sections,
  onSelect,
}: Readonly<{
  sections: string[];
  onSelect: (key: string) => void;
}>) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (key: string) => {
    onSelect(key);
    setOpen(false);
  };

  return (
    <>
      {/* Trigger - floating pill at bottom-right */}
      <button
        type="button"
        onClick={handleOpen}
        className="fixed bottom-6 right-4 z-30 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition hover:opacity-90 2xl:hidden"
        aria-label="Open table of contents"
      >
        <BookOpen className="h-4 w-4" />
        Contents
      </button>

      {/* Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close table of contents"
          className="fixed inset-0 bg-black/40 z-40"
          onClick={handleClose}
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

          <button type="button" aria-label="Close drawer" onClick={handleClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto">
          {sections.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleClick(key)}
              className="flex items-center gap-2 text-left w-full text-foreground hover:text-primary"
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
