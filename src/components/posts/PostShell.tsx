import { posts } from "./mockPosts";
import SquaresPostLayout from "./SquaresPostLayout.tsx";
import PostFooter, { PostFooter1 } from "./PostFooter.tsx";
import PostPageCentered from "./PostPageCentered.tsx";
import PostPage4 from "./PostPage4.tsx";
import PostPage1 from "./PostPage-1.tsx";
import PostPage2 from "./PostPage2.tsx";

export function PostShell1({ squaresConfig }) {
  const uniquePost = posts[0];

  return (
    <div className="max-w-[1080px] mx-auto ">
      <SquaresPostLayout squares={squaresConfig}>
        <div className="layout title-foreground ">
          <PostPage1
            client:load
            key={uniquePost.index}
            img={uniquePost.img}
            title={uniquePost.title}
            subtitle={uniquePost.subtitle}
            postId={uniquePost.postId}
            postType={uniquePost.type}
          />
        </div>
      </SquaresPostLayout>
      <PostFooter1 />
    </div>
  );
}

export function PostShell2({ squaresConfig }) {
  const uniquePost = posts[0];

  return (
    <div className="mix-w-[1080px] mx-auto ">
      <SquaresPostLayout squares={squaresConfig}>
        <div className="layout title-foreground ">
          <PostPage2
            client:load
            key={uniquePost.index}
            img={uniquePost.img}
            title={uniquePost.title}
            subtitle={uniquePost.subtitle}
            postId={uniquePost.postId}
            postType={uniquePost.type}
          />
        </div>
      </SquaresPostLayout>

      <PostFooter
        height="h-36"
        bgColor="bg-[#f8f8f8]"
        imgSrc="/nbarIcon2.png"
        arrowColor="text-background"
      />
    </div>
  );
}

export function PostShell3({ squaresConfig }) {
  const uniquePost = posts[0];

  return (
    <div className="max-w-[1080px] mx-auto ">
      <SquaresPostLayout squares={squaresConfig}>
        <div className="layout title-foreground ">
          <PostPageCentered
            client:load
            key={uniquePost.index}
            img={uniquePost.img}
            title={uniquePost.title}
            subtitle={uniquePost.subtitle}
            postId={uniquePost.postId}
            postType={uniquePost.type}
          />
        </div>
      </SquaresPostLayout>

      <PostFooter
        height="h-36"
        bgColor="bg-[#111111]"
        imgSrc="/nbarIcon.png"
        arrowColor="text-foreground"
      />
    </div>
  );
}

export function PostShell4({ squaresConfig }) {
  const uniquePost = posts[0];
  return (
    <div>
      <SquaresPostLayout squares={squaresConfig}>
        <div className="layout title-foreground ">
          <PostPage4
            client:load
            key={uniquePost.index}
            img={uniquePost.img}
            title={uniquePost.title}
            subtitle={uniquePost.subtitle}
            postId={uniquePost.postId}
          />
        </div>
      </SquaresPostLayout>
    </div>
  );
}
