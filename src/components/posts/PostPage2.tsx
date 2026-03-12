import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";

export default function PostPage2({ uniquePost, edit, blogId }) {
  const [content, setContent] = useState(uniquePost?.slide_two || "");
  const debounceRef = useRef(null);

  useEffect(() => {
    setContent(uniquePost?.slide_two || "");
  }, [uniquePost?.slide_two]);

  const mutation = useMutation({
    mutationFn: async (slide_two: string) => {
      const res = await fetch(
        `${import.meta.env.PUBLIC_ENDPOINT}/igposts?id=${blogId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slide_two,
          }),
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

    const original = uniquePost?.slide_two || "";

    // prevent unnecessary saves
    if (content === original) return;

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      mutation.mutate(content);
    }, 2000);

    return () => clearTimeout(debounceRef.current);
  }, [content]);

  const paragraphs = content.split("\n\n");

  return (
    <article className="w-[1080px] h-[1170px] text-white flex flex-col">
      <article className="w-[900px] mx-auto text-white flex flex-col mt-12">
        <div className="py-12 flex flex-col gap-12">
          {paragraphs.map((p, i) =>
            edit ? (
              <textarea
                key={i}
                value={p}
                rows={3}
                onChange={(e) => {
                  const updated = [...paragraphs];
                  updated[i] = e.target.value;
                  setContent(updated.join("\n\n"));
                }}
                className="w-[75%] text-[38px] font-light text-foreground whitespace-pre-line text-left bg-transparent outline-none resize-none"
              />
            ) : (
              <p
                key={i}
                className="w-[75%] text-[38px] font-light text-foreground whitespace-pre-line text-left"
              >
                {p}
              </p>
            ),
          )}
        </div>
      </article>
    </article>
  );
}
