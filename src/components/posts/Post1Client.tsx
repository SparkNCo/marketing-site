import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../lib/tanStack/index.ts";
import {
  CONTENTFUL_CONTENT_TYPE_SOCIAL_MEDIA_BLOG_PROMO,
  fetchPostByUrl,
} from "../../lib/contentfulPost.ts";
import SquaresPostLayout from "./SquaresPostLayout.tsx";
import { PostFooter1 } from "./PostFooter.tsx";
import { LoadingWrapper } from "../proposals/MissingPasscode.tsx";

export type Post1Props = {
  squaresConfig: any[];
  blog: string | null;
  edit: string | null;
};
export async function fetchPost(blog: string) {
  console.log("blog calling", blog);
  return fetchPostByUrl(blog, CONTENTFUL_CONTENT_TYPE_SOCIAL_MEDIA_BLOG_PROMO);
}

export function Post1Client({ squaresConfig, blog, edit }: Readonly<Post1Props>) {
  return (
    <QueryClientProvider client={queryClient}>
      <PostShell1 blog={blog} squaresConfig={squaresConfig} edit={edit} />
    </QueryClientProvider>
  );
}

export function PostShell1({ blog, squaresConfig, edit }: Readonly<Post1Props>) {
  const {
    data: uniquePost,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", blog, CONTENTFUL_CONTENT_TYPE_SOCIAL_MEDIA_BLOG_PROMO],
    queryFn: () => fetchPost(blog!),
    enabled: !!blog,
  });

  if (isLoading) {
    return <LoadingWrapper label="Loading post..." />;
  }
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
    <div className="relative max-w-[1080px] h-[1350px] mx-auto">
      {!edit && <div className="absolute inset-0 bg-transparent opacity-100 z-20" />}

      <div className="w-full h-[1350px] z-10">
        <SquaresPostLayout
          squares={squaresConfig}
          tags={tags}
          edit={edit}
          blogId={blog}
        >
          <div className="layout title-foreground w-full">
            <article className="w-full">
              <div
                className="w-full h-[1080px] bg-cover bg-center relative"
                style={{ backgroundImage: `url(${uniquePost.coverImage})` }}
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
    </div>
  );
}
