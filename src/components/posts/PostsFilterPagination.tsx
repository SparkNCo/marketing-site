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
    <div className="w-full flex flex-row items-center justify-between gap-3 bg-foreground px-4 py-2">
      {/* LEFT - TAG */}
      <div className="flex items-center min-w-0">
        {selectedFeatures?.[0] && (
          <span
            className="
              px-3 py-2 text-sm 
              border border-background 
              bg-background text-foreground 
              font-semibold rounded-md
              truncate
            "
          >
            {selectedFeatures[0]}
          </span>
        )}
      </div>

      {/* RIGHT - PAGINATION */}
      {totalPosts > 0 && (
        <div className="flex items-center gap-2 text-white shrink-0 ">
          <button
            onClick={goPrev}
            disabled={page === 1}
            className="p-2 bg-foreground text-background disabled:opacity-40"
          >
            <img
              src="/GoIcon.svg"
              alt="Previous"
              className="w-8 h-8 rotate-180"
            />
          </button>

          <span className="text-xs sm:text-sm text-background whitespace-nowrap">
            {startIndex + 1}-{endIndex} of {totalPosts}
          </span>

          <button
            onClick={goNext}
            disabled={page === totalPages}
            className="p-2 bg-foreground text-background disabled:opacity-40"
          >
            <img src="/GoIcon.svg" alt="Next" className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
