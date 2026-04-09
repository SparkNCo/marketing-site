import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { patchIgPost } from "./patchPost";

type PostFooterProps = {
  height?: string;
  bgColor?: string;
  imgSrc?: string;
  arrowColor?: string;
  hideComponets?: boolean;
  className?: string;
};

export default function PostFooter({
  height = "h-28",
  bgColor = "bg-white",
  imgSrc = "/icon2.svg",
  arrowColor = "text-white",
  hideComponets = false,
  className = "",
}: Readonly<PostFooterProps>) {
  return (
    <div className={`${height} ${bgColor} w-[1080px] ${className}`}>
      {!hideComponets && (
        <div className="w-[90%] h-full flex items-center justify-between mx-auto z-20">
          <img
            src={imgSrc}
            alt="footer-icon"
            className="w-32 h-32 object-contain"
          />
          {arrowColor === "black" ? (
            <img src="/Arrow 1.svg" alt="arrow" className="w-20 h-20" />
          ) : (
            <img src="/Arrow 2.svg" alt="arrow" className="w-20 h-20" />
          )}
        </div>
      )}
    </div>
  );
}

type PostFooter1Props = {
  title: string;
  author: string;
  edit: boolean | string | null;
  blogId: string | null;
};

export function PostFooter1({
  title,
  author,
  edit,
  blogId,
}: Readonly<PostFooter1Props>) {
  const [localTitle, setLocalTitle] = useState(title);
  const [localAuthor, setLocalAuthor] = useState(author);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mutation = useMutation({
    mutationFn: (updates: { title: string; author: string }) =>
      patchIgPost(blogId!, updates),
  });

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  useEffect(() => {
    setLocalAuthor(author);
  }, [author]);

  useEffect(() => {
    if (!edit) return;

    // do nothing if values didn't change
    if (localTitle === title && localAuthor === author) return;

    clearTimeout(debounceRef.current ?? undefined);

    debounceRef.current = setTimeout(() => {
      mutation.mutate({
        title: localTitle,
        author: localAuthor,
      });
    }, 2000);

    return () => clearTimeout(debounceRef.current ?? undefined);
  }, [localTitle, localAuthor]);

  return (
    <div className="h-[250px] flex items-center mt-[10px]">
      <div className="w-full mx-auto space-y-2 flex flex-col items-end text-right mr-[20px]">
        {edit ? (
          <textarea
            value={localTitle || ""}
            rows={2}
            className="text-[52px] font-semibold leading-tight text-foreground w-[850px] resize-none bg-transparent outline-none text-right overflow-hidden"
            onChange={(e) => setLocalTitle(e.target.value)}
          />
        ) : (
          <h2 className="text-[52px] font-semibold leading-tight line-clamp-2 text-foreground w-[850px]">
            {title}
          </h2>
        )}

        {edit ? (
          <input
            value={localAuthor || ""}
            className="text-[36px] font-light text-neutral-400 my-6 bg-transparent outline-none text-right overflow-hidden"
            onChange={(e) => setLocalAuthor(e.target.value)}
          />
        ) : (
          <p className="text-[36px] font-light text-neutral-400 my-6">
            {author}
          </p>
        )}
      </div>
    </div>
  );
}
