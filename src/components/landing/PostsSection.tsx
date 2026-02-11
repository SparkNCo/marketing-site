import { useMemo, useState, useEffect } from "react";
import PostCard from "../posts/PostCard1";
import { posts } from "../posts/mockPosts";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PostsSection() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 3;

  /* ----------------------------------------
     Add tag on ENTER
  ---------------------------------------- */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const newTag = input.trim().toLowerCase();
      if (!newTag) return;

      if (!tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag]);
      }

      setInput("");
    }
  };

  /* ----------------------------------------
     Remove tag
  ---------------------------------------- */
  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  /* ----------------------------------------
     Filter posts
  ---------------------------------------- */
  const filteredPosts = useMemo(() => {
    if (tags.length === 0) return posts;

    return posts.filter((post) => {
      const text = `
        ${post.title || ""}
        ${post.subtitle || ""}
        ${post.content || ""}
      `.toLowerCase();

      return tags.every((tag) => text.includes(tag));
    });
  }, [tags]);

  /* ----------------------------------------
     Pagination calculations
  ---------------------------------------- */
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalPosts);

  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  /* Reset page when tags change */
  useEffect(() => {
    setPage(1);
  }, [tags]);

  /* ----------------------------------------
     Navigation handlers
  ---------------------------------------- */
  const goPrev = () => {
    setPage((p) => Math.max(p - 1, 1));
  };

  const goNext = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };

  return (
    <section className=" w-[850px] mx-auto py-12 space-y-8">
      {/* Header */}
      <div className="w-full mx-auto flex flex-row gap-4 justify-between bg-foreground items-center px-4 py-2">
        {/* Input */}
        <input
          type="text"
          placeholder="Type a word and press Enter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            w-80 px-4 py-2 rounded-xl
            bg-foreground text-background
            border border-foreground
            focus:outline-none focus:ring-2 focus:ring-white/20
          "
        />

        {/* Saved Tags */}

        {/* Range Pagination */}
        {totalPosts > 0 && (
          <div className="flex items-center gap-4 mt-2 text-white mb-2">
            {/* Prev */}
            <button
              onClick={goPrev}
              disabled={page === 1}
              className="
        p-2 rounded-md
        border border-black
        bg-foreground text-background
        disabled:opacity-40
        flex items-center justify-center
      "
            >
              <ChevronLeft size={18} strokeWidth={3} />
            </button>

            {/* Range Text */}
            <span className="text-sm text-background">
              {startIndex + 1}-{endIndex} of {totalPosts}
            </span>

            {/* Next */}
            <button
              onClick={goNext}
              disabled={page === totalPages}
              className="
        p-2 rounded-lg
        border-2 border-black
        bg-foreground text-background
        disabled:opacity-40
        flex items-center justify-center
      "
            >
              <ChevronRight size={18} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
      <div className="w-full mx-auto flex flex-row  px-4 py-2">
        {tags.length > 0 && (
          <div
            className="
      grid gap-2
      [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))]
      w-full
    "
          >
            {tags.map((tag, i) => (
              <div
                key={i}
                className="
          flex items-center justify-between
          px-3 py-1 rounded-full
          bg-white text-black text-sm font-medium
          w-full
        "
              >
                <span className="truncate">#{tag}</span>

                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-black/60 hover:text-black"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-4 w-full mx-auto h-[30rem] ">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <PostCard
              key={post.index}
              img={post.img}
              title={post.title}
              subtitle={post.subtitle}
              postId={post.postId}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-neutral-400">
            No posts match these tags.
          </p>
        )}
      </div>
    </section>
  );
}
