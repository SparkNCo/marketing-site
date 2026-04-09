"use client";

type ProposalSidebarProps = {
  sections: Record<string, unknown>;
  onSelect: (key: string) => void;
};

/** Desktop-only: table of contents in a fixed-width rail with independent scroll. */
export default function ProposalSidebar({
  sections,
  onSelect,
}: Readonly<ProposalSidebarProps>) {
  const keys = Object.keys(sections);

  return (
    <nav
      className="flex h-full min-h-0 flex-col bg-secondary"
      aria-label="Table of contents"
    >
      {/* Sticky block: stays under the site header while the page scrolls */}
      <div
        className="
          sticky z-20 flex max-h-[calc(100vh-6.5rem)] flex-col
          bg-secondary/40
          top-[6.5rem]
        "
      >
        <div className="shrink-0 border-b border-foreground/10 px-4 py-3 lg:px-5">
          <h2 className="text-smalltext font-title font-semibold uppercase tracking-wider text-foreground/80">
            Contents
          </h2>
        </div>

        <ul
          className="
            min-h-0 flex-1 list-none space-y-0.5 overflow-y-auto overflow-x-hidden
            overscroll-contain px-2 py-3 lg:px-3
          "
        >
          {keys.map((key) => (
            <li key={key}>
              <button
                type="button"
                onClick={() => onSelect(key)}
                className="
                  w-full rounded-md px-2 py-2 text-left text-smalltext text-foreground/80
                  transition-colors hover:bg-foreground/5 hover:text-primary
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                "
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
