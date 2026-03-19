import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { patchIgPost } from "./patchPost";

export default function PostPage2({ uniquePost, edit, blogId }) {
  const [content, setContent] = useState(uniquePost?.summary || "");
  const debounceRef = useRef(null);

  useEffect(() => {
    setContent(uniquePost?.summary || "");
  }, [uniquePost?.summary]);

  const mutation = useMutation({
    mutationFn: (summary: string) => patchIgPost(blogId!, { summary }),
  });

  useEffect(() => {
    if (!edit) return;
    if (!blogId) return;

    const original = uniquePost?.summary || "";

    if (content === original) return;

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      mutation.mutate(content);
    }, 2000);

    return () => clearTimeout(debounceRef.current);
  }, [content]);

  return (
    <article className="w-[900px] mx-auto h-[1170px] text-white flex flex-col ">
      <article className="w-[900px] mx-auto text-white flex flex-col mt-12">
        <div className="py-12 flex flex-col gap-12">
          {edit ? (
            <textarea
              value={content}
              rows={6}
              onChange={(e) => setContent(e.target.value)}
              className="w-[100%] text-[38px] font-light text-foreground whitespace-pre-line text-left bg-transparent outline-none h-[580px] "
            />
          ) : (
            <p className="w-[100%] text-[38px] font-light text-foreground whitespace-pre-line text-left ">
              {content}
            </p>
          )}
        </div>
      </article>
    </article>
  );
}
