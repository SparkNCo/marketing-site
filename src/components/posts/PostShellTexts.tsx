import { useEffect } from "react";
import PostFooter from "./PostFooter";
import PostPage2 from "./PostPage2";
import PostPageCentered from "./PostPageCentered";
import SquaresPostLayout from "./SquaresPostLayout";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../lib/tanStack";
import { LoadingWrapper } from "../proposals/MissingPasscode";
import { fetchPost } from "./Post1Client";

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
}: Readonly<PostShellProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <PostContent
          squaresConfig={squaresConfig}
          blog={blog}
          edit={edit}
          layoutType={layoutType}
        />
      </div>
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
    <div className="w-[1080px] mx-auto h-[1350px] ">
      <SquaresPostLayout squares={squaresConfig} width="[1080px]">
        {!edit && (
          <div className="absolute inset-0 bg-transparent opacity-50 z-20" />
        )}
        <div className="layout title-foreground ">
          {isCentered ? (
            <PostPageCentered
              key={uniquePost.id}
              uniquePost={uniquePost}
              edit={edit}
              blogId={blog}
            />
          ) : (
            <PostPage2
              key={uniquePost.id}
              uniquePost={uniquePost}
              edit={edit}
              blogId={blog}
            />
          )}

          <PostFooter
            height="h-[180px]"
            bgColor={isCentered ? "bg-[#111111]" : "bg-[#F7F4F0]"}
            imgSrc={isCentered ? "/icon.svg" : "/icon2.svg"}
            arrowColor={isCentered ? "white" : "black"}
            className=" w-[1000px] px-[40px]"
          />
        </div>
      </SquaresPostLayout>
    </div>
  );
}
