import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../posts/PostCard1";
import { ChevronLeft, ChevronRight } from "lucide-react";

const fetchPosts = async () => {
  const res = await fetch(
    "https://ozybsusoollnomaaxkcy.supabase.co/functions/v1/contentfull?contentType=igPost",
  );

  if (!res.ok) {
    throw new Error("Error fetching posts");
  }

  return res.json();
};

export default function PostsSection() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 3;

  const { data, isLoading, error } = useQuery({
    queryKey: ["igPosts"],
    queryFn: fetchPosts,
  });

  const allPosts = data || [];

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

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const filteredPosts = useMemo(() => {
    if (!allPosts.length) return [];

    if (tags.length === 0) return allPosts;

    return allPosts.filter((post) => {
      const text = `
        ${post.title || ""}
        ${post.summary || ""}
        ${post.author || ""}
        ${(post.tags || []).join(" ")}
      `.toLowerCase();

      return tags.every((tag) => text.includes(tag));
    });
  }, [tags, allPosts]);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalPosts);

  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  useEffect(() => {
    setPage(1);
  }, [tags]);

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));

  /* ----------------------------------------
     States
  ---------------------------------------- */
  if (isLoading) {
    return <p className="text-center text-white">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading posts</p>;
  }

  return (
    <section className="w-full max-w-[850px]   mx-auto space-y-4 mb-12 px-4 md:px-8 lg:px-0">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between bg-foreground items-stretch sm:items-center px-4 py-4">
        <input
          type="text"
          placeholder="Search Articles"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full sm:w-80 px-4 py-2 bg-foreground text-background border border-foreground focus:outline-none focus:ring-2 focus:ring-white/20"
        />

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

      {/* Tags */}
      {tags.length > 0 && (
        <div className="grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] w-full">
          {tags.map((tag, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-1 rounded-full bg-white text-black text-sm"
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

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <PostCard
              key={post.id}
              img={post.coverImage}
              title={post.title}
              subtitle={post.author}
              postId={post.id}
              url={post.url}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-neutral-400">
            No posts match these tags.
          </p>
        )}
      </div>
    </section>
  );
}
