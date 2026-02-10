import StatusCirclesLayout from "../../components/posts/StatusPostLayout.tsx";
import { posts } from "./mockPosts.ts";

export default function PostPage1({ squaresConfig }) {
  const uniquePost = posts[0];

  return (
    <article className="w-full min-h-screen bg-neutral-900 text-white flex flex-col">
      <div className="h-[1080px] w-full">
        <StatusCirclesLayout squaresConfig={squaresConfig}>
          <div
            className="h-full w-full bg-cover bg-center "
            style={{ backgroundImage: `url(${uniquePost.img})` }}
          />
        </StatusCirclesLayout>
      </div>
    </article>
  );
}
