import { posts } from "./mockPosts";
import SquaresPostLayout from "./SquaresPostLayout.tsx";
import PostFooter, { PostFooter1 } from "./PostFooter.tsx";
import PostPageCentered from "./PostPageCentered.tsx";
import PostPage4 from "./PostPage4.tsx";
import PostPage2 from "./PostPage2.tsx";

export function PostShell1({ squaresConfig }) {
  const uniquePost = posts[0];
  const tags = [
    { labels: ["AI Innovation","Founder Story"], x: "0px", y: "1020px" },
  ];
  return (
    <div className="max-w-[1080px] mx-auto ">
      <SquaresPostLayout squares={squaresConfig} tags={tags}>
        <div className="layout title-foreground">
          <article>
            {/* HERO IMAGE WRAPPER */}
            <div
              className="h-[1080px] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${uniquePost.img})` }}
            >
              {/* TAGS — ABSOLUTE */}
            </div>
          </article>
        </div>
      </SquaresPostLayout>

      <PostFooter1 />
    </div>
  );
}

export function PostShell2({ squaresConfig }) {
  const uniquePost = posts[0];

  return (
    <div className="max-w-[1080px] mx-auto ">
      <SquaresPostLayout squares={squaresConfig} width={"[1080px]"}>
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
        <PostFooter
          height="h-36"
          bgColor="bg-[#f8f8f8]"
          imgSrc="/nbarIcon2.png"
          arrowColor="text-background"
        />
      </SquaresPostLayout>
    </div>
  );
}

export function PostShell3({ squaresConfig }) {
  const uniquePost = posts[0];

  return (
    <div className="max-w-[1080px]  mx-auto ">
      <SquaresPostLayout squares={squaresConfig} width={"[1080px]"}>
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
      <div>
        <PostFooter
          height="h-36"
          bgColor="bg-[#111111]"
          imgSrc="/nbarIcon.png"
          arrowColor="text-foreground"
        />
      </div>
    </div>
  );
}

export function PostShell4({ squaresConfig }) {
  const uniquePost = posts[0];
  return (
    <div>
      <SquaresPostLayout squares={squaresConfig} width={"[1080px]"}>
        <div className="layout title-foreground borer-4 ">
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
