import { useEffect } from "react";
import PostFooter from "./PostFooter";
import PostPage2 from "./PostPage2";
import PostPageCentered from "./PostPageCentered";
import { fetchPost } from "./PostShell";
import SquaresPostLayout from "./SquaresPostLayout";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../lib/tanStack";
import { LoadingWrapper } from "../proposals/MissingPasscode";

type PostShellProps = {
  squaresConfig: any[];
  blog: string;
  edit: string | null;
  layoutType: "page2" | "centered";
};

export function PostShell5({
  squaresConfig,
  blog,
  layoutType,
  edit,
}: PostShellProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PostContent
        squaresConfig={squaresConfig}
        blog={blog}
        edit={edit}
        layoutType={layoutType}
      />
    </QueryClientProvider>
  );
}

function PostContent({
  squaresConfig,
  blog,
  layoutType,
  edit,
}: PostShellProps) {
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
    return <LoadingWrapper label="Loading post..." />;
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
              edit={edit}
              blogId={blog}
            />
          ) : (
            <PostPage2
              key={uniquePost.blog_id}
              uniquePost={uniquePost}
              edit={edit}
              blogId={blog}
            />
          )}
        </div>
      </SquaresPostLayout>

      <PostFooter
        height="h-[180px]"
        bgColor={isCentered ? "bg-[#111111]" : "bg-[#f8f8f8]"}
        imgSrc={isCentered ? "/nbarIcon.png" : "/nbarIcon2.png"}
        arrowColor={isCentered ? "white" : "black"}
      />
    </div>
  );
}
