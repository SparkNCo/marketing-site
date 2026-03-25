import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PostsFilterPagination({
  input,
  setInput,
  handleKeyDown,
  totalPosts,
  startIndex,
  endIndex,
  page,
  totalPages,
  goPrev,
  goNext,
  selectedFeatures,
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between bg-foreground items-start sm:items-center px-4 py-4">
      {/* LEFT — TAGS */}
      <div className="flex flex-wrap gap-2">
        {selectedFeatures?.map((feature, i) => (
          <span
            key={`${feature}-${i}`}
            className="px-3 py-2 text-sm border border-background bg-background text-foreground text-body font-semibold rounded-md"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* RIGHT — PAGINATION */}
      {totalPosts > 0 && (
        <div className="flex items-center gap-2 text-white ml-auto">
          <button
            onClick={goPrev}
            disabled={page === 1}
            className="p-2  bg-foreground text-background disabled:opacity-40"
          >
            <img
              src="/GoIcon.svg"
              alt="Previous"
              className="w-8 h-8 rotate-180 text-background"
            />
          </button>

          <span className="text-sm text-background whitespace-nowrap">
            {startIndex + 1}-{endIndex} of {totalPosts}
          </span>

          <button
            onClick={goNext}
            disabled={page === totalPages}
            className="p-2  bg-foreground text-background disabled:opacity-40"
          >
            <img
              src="/GoIcon.svg"
              alt="Next"
              className="w-8 h-8 text-background "
            />
          </button>
        </div>
      )}
    </div>
  );
}
