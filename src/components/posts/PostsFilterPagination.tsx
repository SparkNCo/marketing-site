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
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between bg-foreground items-stretch sm:items-center px-4 py-4">
      {/* <input
        type="text"
        placeholder="Search Articles"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full sm:w-80 px-4 py-2 bg-foreground text-background border border-foreground focus:outline-none focus:ring-2 focus:ring-white/20"
      /> */}

      {totalPosts > 0 && (
        <div className="flex items-center gap-6 text-white">
          <button
            onClick={goPrev}
            disabled={page === 1}
            className="p-2 border border-black bg-foreground text-background disabled:opacity-40"
          >
            <ChevronLeft size={18} strokeWidth={3} />
          </button>

          <span className="text-sm text-background">
            {startIndex + 1}-{endIndex} of {totalPosts}
          </span>

          <button
            onClick={goNext}
            disabled={page === totalPages}
            className="p-2 border-2 border-black bg-foreground text-background disabled:opacity-40"
          >
            <ChevronRight size={18} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
}
