import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../lib/tanStack/index.ts";
import SquaresPostLayout from "./SquaresPostLayout.tsx";
import { PostFooter1 } from "./PostFooter.tsx";

export type Post1Props = {
  squaresConfig: any[];
  blog: string | null;
  edit: string | null;
};

async function fetchPost(blogId: string) {
  const res = await fetch(
    `${import.meta.env.PUBLIC_ENDPOINT}/igposts?id=${blogId}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export function Post1Client({ squaresConfig, blog, edit }: Post1Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <PostShell1 blog={blog} squaresConfig={squaresConfig} edit={edit} />
    </QueryClientProvider>
  );
}

export function PostShell1({ blog, squaresConfig, edit }) {
  console.log(blog, squaresConfig, edit);

  const {
    data: uniquePost,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", blog],
    queryFn: () => fetchPost(blog),
    enabled: !!blog,
  });

  if (isLoading) return <div className="text-foreground">Loading...</div>;
  if (error) return <div>Error loading post</div>;
  if (!uniquePost) return null;

  const tags = [
    {
      labels: uniquePost.tags || [],
      x: "20px",
      y: "1020px",
    },
  ];
  return (
    <div className="max-w-[1080px] mx-auto ">
      <SquaresPostLayout
        squares={squaresConfig}
        tags={tags}
        edit={edit}
        blogId={blog}
      >
        <div className="layout title-foreground">
          <article>
            <div
              className="h-[1080px] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${uniquePost.img})` }}
            ></div>
          </article>
        </div>
      </SquaresPostLayout>

      <PostFooter1
        title={uniquePost?.title}
        author={uniquePost?.author}
        edit={edit}
        blogId={blog}
      />
    </div>
  );
}
