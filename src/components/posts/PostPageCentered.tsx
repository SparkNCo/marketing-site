import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

export default function PostPageCentered({ uniquePost, edit, blogId }) {
  const [content, setContent] = useState(uniquePost?.slide_three || "");
  const debounceRef = useRef(null);

  useEffect(() => {
    setContent(uniquePost?.slide_three || "");
  }, [uniquePost?.slide_three]);

  const mutation = useMutation({
    mutationFn: async (slide_three: string) => {
      const res = await fetch(
        `${import.meta.env.PUBLIC_ENDPOINT}/igposts?id=${blogId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slide_three }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update post");
      }

      return res.json();
    },
  });

  useEffect(() => {
    if (!edit) return;
    if (!blogId) return;

    const original = uniquePost?.slide_three || "";

    if (content === original) return;

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      mutation.mutate(content);
    }, 2000);

    return () => clearTimeout(debounceRef.current);
  }, [content]);

  return (
    <article className="w-full h-[1160px] bg-white text-background flex flex-col text-center ">
      {/* Hero */}
      <div className="w-[60%] mx-auto py-12 space-y-4 mt-40">
        <h1 className="text-4xl font-bold leading-tight max-w-3xl mx-auto">
          So, what does this mean?
        </h1>
      </div>

      {/* Content */}
      <div className="w-[60%] mx-auto flex flex-col items-center overflow-y-hidden">
        {edit ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-[90%] text-[34px] font-light text-background bg-transparent outline-none resize-none text-center whitespace-pre-line  h-[550px] overflow-y-hidden"
          />
        ) : (
          <div className="w-[90%] text-[34px] font-light text-background whitespace-pre-line  h-[550px] overflow-y-hidden">
            {content}
          </div>
        )}
      </div>

      {mutation.isPending && (
        <div className="absolute bottom-6 right-6 text-xs text-neutral-400">
          Saving...
        </div>
      )}
    </article>
  );
}
