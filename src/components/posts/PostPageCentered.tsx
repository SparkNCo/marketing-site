import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { patchIgPost } from "./patchPost";

export default function PostPageCentered({ uniquePost, edit, blogId }) {
  const [content, setContent] = useState(uniquePost?.takeaways || "");
  const debounceRef = useRef(null);

  useEffect(() => {
    setContent(uniquePost?.takeaways || "");
  }, [uniquePost?.takeaways]);

  const mutation = useMutation({
    mutationFn: (updates: { takeaways: string }) =>
      patchIgPost(blogId!, updates),
  });

  useEffect(() => {
    if (!edit) return;
    if (!blogId) return;

    const originalContent = uniquePost?.takeaways || "";

    if (content === originalContent) return;

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      mutation.mutate({ takeaways: content });
    }, 2000);

    return () => clearTimeout(debounceRef.current);
  }, [content]);
  return (
    <article className="w-full h-[1170px]  bg-white text-background flex flex-col text-center relative  ">
      {/* Content */}
      <div className="w-[90%] mx-auto flex flex-col items-center overflow-y-hidden mt-[6rem]">
        {edit ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-[90%] text-[38px] font-light text-background bg-transparent outline-none resize-none text-center whitespace-pre-line h-[660px] overflow-y-hidden"
          />
        ) : (
          <div className="w-[90%] text-[38px] font-light text-background whitespace-pre-line h-[780px] overflow-y-hidden ">
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
