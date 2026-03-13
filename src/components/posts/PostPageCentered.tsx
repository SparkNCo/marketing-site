import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { patchIgPost } from "./patchPost";

export default function PostPageCentered({ uniquePost, edit, blogId }) {
  const [title, setTitle] = useState(uniquePost?.slide_three_title || "");
  const [content, setContent] = useState(uniquePost?.slide_three || "");
  const debounceRef = useRef(null);

  useEffect(() => {
    setTitle(uniquePost?.slide_three_title || "");
    setContent(uniquePost?.slide_three || "");
  }, [uniquePost?.slide_three, uniquePost?.slide_three_title]);

  // const mutation = useMutation({
  //   mutationFn: async ({
  //     slide_three,
  //     slide_three_title,
  //   }: {
  //     slide_three: string;
  //     slide_three_title: string;
  //   }) => {
  //     const res = await fetch(
  //       `${import.meta.env.PUBLIC_ENDPOINT}/igposts?id=${blogId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           slide_three,
  //           slide_three_title,
  //         }),
  //       },
  //     );

  //     if (!res.ok) {
  //       throw new Error("Failed to update post");
  //     }

  //     return res.json();
  //   },
  // });

  const mutation = useMutation({
    mutationFn: (updates: { slide_three: string; slide_three_title: string }) =>
      patchIgPost(blogId!, updates),
  });

  useEffect(() => {
    if (!edit) return;
    if (!blogId) return;

    const originalContent = uniquePost?.slide_three || "";
    const originalTitle = uniquePost?.slide_three_title || "";

    if (content === originalContent && title === originalTitle) return;

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      mutation.mutate({
        slide_three: content,
        slide_three_title: title,
      });
    }, 2000);

    return () => clearTimeout(debounceRef.current);
  }, [content, title]);

  return (
    <article className="w-full h-[1160px] bg-white text-background flex flex-col text-center relative ">
      {/* Hero */}
      <div className="w-[90%] mx-auto py-12 space-y-4 mt-24  ">
        {edit ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold leading-tight  mx-auto bg-transparent outline-none text-center w-full "
          />
        ) : (
          <h1 className="text-4xl font-bold leading-tight  mx-auto">{title}</h1>
        )}
      </div>

      {/* Content */}
      <div className="w-[90%] mx-auto flex flex-col items-center overflow-y-hidden ">
        {edit ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-[90%] text-[34px] font-light text-background bg-transparent outline-none resize-none text-center whitespace-pre-line h-[660px] overflow-y-hidden"
          />
        ) : (
          <div className="w-[90%] text-[34px] font-light text-background whitespace-pre-line h-[660px] overflow-y-hidden">
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
