import { useMemo, useState } from "react";
import PostCard from "../posts/PostCard1";
import { posts } from "../posts/mockPosts";

export default function PostsSection() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 3;

  /* ---------------- FILTER ---------------- */

  const filteredPosts = useMemo(() => {
    return posts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  /* Reset page when searching */
  useMemo(() => {
    setPage(1);
  }, [search]);

  /* ---------------- UI ---------------- */

  return (
    <section className="w-full px-8 py-12 space-y-8">
      {/* Header */}
      <div className="w-[80%] mx-auto flex items-center justify-between">
        {/* Search */}
        <input
          type="title"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-72 px-4 py-2 rounded-xl
            bg-neutral-800 title-white
            border border-neutral-700
            focus:outline-none focus:ring-2 focus:ring-white/20
          "
        />

        {/* Pagination */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`
                w-9 h-9 rounded-lg title-sm
                ${
                  page === i + 1
                    ? "bg-white title-black"
                    : "bg-neutral-800 title-white"
                }
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-3 gap-8 w-[80%] mx-auto h-[30rem]">
        {paginatedPosts.map((post) => (
          <PostCard
            key={post.index}
            img={post.img}
            title={post.title}
            subtitle={post.subtitle}
            postId={post.postId}
          />
        ))}
      </div>
    </section>
  );
}
