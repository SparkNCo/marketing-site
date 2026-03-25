import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../posts/PostCard1";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PostsFilterPagination from "../posts/PostsFilterPagination";

const fetchPosts = async () => {
  const res = await fetch(
    "https://ozybsusoollnomaaxkcy.supabase.co/functions/v1/contentfull?contentType=igPost",
  );

  if (!res.ok) {
    throw new Error("Error fetching posts");
  }

  return res.json();
};

export default function PostsSection({ selectedFeatures }) {
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

    const activeFilters = [
      ...tags,
      ...(selectedFeatures || []).map((f) => f.toLowerCase()),
    ];

    if (activeFilters.length === 0) return allPosts;

    return allPosts.filter((post) => {
      const text = `
      ${post.title || ""}
      ${post.summary || ""}
      ${post.author || ""}
      ${(post.tags || []).join(" ")}
    `.toLowerCase();

      return activeFilters.every((filter) => text.includes(filter));
    });
  }, [tags, selectedFeatures, allPosts]);

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
    <section className="w-full max-w-[850px] mx-auto space-y-4 mb-12 px-4 md:px-8 lg:px-0 mb-40">
      {/* FILTERING AND PAGINATION */}
      <PostsFilterPagination
        input={input}
        setInput={setInput}
        handleKeyDown={handleKeyDown}
        totalPosts={totalPosts}
        startIndex={startIndex}
        endIndex={endIndex}
        page={page}
        totalPages={totalPages}
        goPrev={goPrev}
        goNext={goNext}
        selectedFeatures={selectedFeatures}
      />

      {tags.length > 0 && (
        <div className="grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] w-full border-4 border-red-800">
          {tags.map((tag, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-1 rounded-full "
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
      {/* FILTERING AND PAGINATION ENDS */}
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
