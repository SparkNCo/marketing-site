import SquaresPostLayout from "./SquaresPostLayout.tsx";
import PostFooter from "./PostFooter.tsx";
import PostPageCentered from "./PostPageCentered.tsx";
import PostPage2 from "./PostPage2.tsx";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../lib/tanStack/index.ts";
import { useEffect } from "react";

export async function fetchPost(blogId: string) {
  const res = await fetch(
    `${import.meta.env.PUBLIC_ENDPOINT}/igposts?id=${blogId}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

type PostShellProps = {
  squaresConfig: any[];
  blog: string;
  layoutType: "page2" | "centered";
};

export function PostShell5({
  squaresConfig,
  edit,
  blog,
  layoutType,
}: PostShellProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PostContent
        squaresConfig={squaresConfig}
        blog={blog}
        layoutType={layoutType}
      />
    </QueryClientProvider>
  );
}

function PostContent({ squaresConfig, blog, layoutType }: PostShellProps) {
  const {
    data: uniquePost,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", blog],
    queryFn: () => fetchPost(blog),
    enabled: !!blog,
  });

  const isCentered = layoutType === "page3";

  useEffect(() => {
    fetchPost(blog);
  }, [blog]);

  if (isLoading) {
    return <div className="w-[1080px] mx-auto h-[1170px]">Loading...</div>;
  }

  if (error || !uniquePost) {
    return <div className="w-[1080px] mx-auto h-[1170px]">Post not found</div>;
  }

  return (
    <div className="w-[1080px] mx-auto h-[1170px]">
      <SquaresPostLayout squares={squaresConfig} width="[1080px]">
        <div className="layout title-foreground">
          {isCentered ? (
            <PostPageCentered
              key={uniquePost.blog_id}
              uniquePost={uniquePost}
            />
          ) : (
            <PostPage2 key={uniquePost.blog_id} uniquePost={uniquePost} />
          )}
        </div>
      </SquaresPostLayout>

      <PostFooter
        height="h-[180px]"
        bgColor={isCentered ? "bg-[#111111]" : "bg-[#F7F4F0]"}
        imgSrc={isCentered ? "/nbarIcon.png" : "/nbarIcon2.png"}
        arrowColor={isCentered ? "text-foreground" : "text-background"}
      />
    </div>
  );
}
