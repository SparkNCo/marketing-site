import { posts } from "./mockPosts";
import SquaresPostLayout from "./SquaresPostLayout.tsx";
import PostFooter, { PostFooter1 } from "./PostFooter.tsx";
import PostPageCentered from "./PostPageCentered.tsx";
import PostPage4 from "./PostPage4.tsx";
import PostPage2 from "./PostPage2.tsx";

export function PostShell1({ blog, squaresConfig }) {
  const uniquePost = posts.find((post) => post.blog_id === blog) || posts[0];

  const tags = [
    {
      labels: uniquePost.tags || [],
      x: "20px",
      y: "1020px",
    },
  ];
  return (
    <div className="max-w-[1080px] mx-auto ">
      <SquaresPostLayout squares={squaresConfig} tags={tags}>
        <div className="layout title-foreground">
          <article>
            <div
              className="h-[1080px] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${uniquePost.img})` }}
            ></div>
          </article>
        </div>
      </SquaresPostLayout>

      <PostFooter1 title={uniquePost?.title} author={uniquePost?.author} />
    </div>
  );
}

// export function PostShell2({ squaresConfig, blog }) {
//   const uniquePost = posts.find((post) => post.blog_id === blog) || posts[0];

//   return (
//     <div className="max-w-[1080px] h-[1350px] mx-auto ">
//       <SquaresPostLayout squares={squaresConfig} width={"[1080px]"}>
//         <div className="layout title-foreground ">
//           <PostPage2
//             client:load
//             key={uniquePost.index}
//             uniquePost={uniquePost}
//           />
//         </div>
//         <PostFooter
//           height="h-[180px]"
//           bgColor="bg-[#f8f8f8]"
//           imgSrc="/nbarIcon2.png"
//           arrowColor="text-background"
//         />
//       </SquaresPostLayout>
//     </div>
//   );
// }

// export function PostShell3({ squaresConfig, blog }) {
//   const uniquePost = posts.find((post) => post.blog_id === blog) || posts[0];

//   return (
//     <div className="max-w-[1080px] h-[1260px] mx-auto ">
//       <SquaresPostLayout squares={squaresConfig} width={"[1080px]"}>
//         <div className="layout title-foreground ">
//           <PostPageCentered
//             client:load
//             key={uniquePost.index}
//             uniquePost={uniquePost}
//           />
//         </div>
//       </SquaresPostLayout>
//       <div>
//         <PostFooter
//           height="h-[180px]"
//           bgColor="bg-[#111111]"
//           imgSrc="/nbarIcon.png"
//           arrowColor="text-foreground"
//         />
//       </div>
//     </div>
//   );
// }

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

type PostShellProps = {
  squaresConfig: any[];
  blog: string;
  layoutType: "page2" | "centered"; // determines which page component to render
};

export function PostShell5({
  squaresConfig,
  blog,
  layoutType,
}: PostShellProps) {
  // Find the post by blog_id or fallback to first
  const uniquePost = posts.find((post) => post.blog_id === blog) || posts[0];

  // Layout-specific props
  const isCentered = layoutType === "centered";

  return (
    <div
      className={`w-[1080px] mx-auto h-[1170px] `}
    >
      <SquaresPostLayout squares={squaresConfig} width="[1080px]">
        <div className="layout title-foreground">
          {isCentered ? (
            <PostPageCentered
              client:load
              key={uniquePost.index}
              uniquePost={uniquePost}
            />
          ) : (
            <PostPage2
              client:load
              key={uniquePost.index}
              uniquePost={uniquePost}
            />
          )}
        </div>
      </SquaresPostLayout>

      <PostFooter
        height="h-[180px]"
        bgColor={isCentered ? "bg-[#111111]" : "bg-[#f8f8f8]"}
        imgSrc={isCentered ? "/nbarIcon.png" : "/nbarIcon2.png"}
        arrowColor={isCentered ? "text-foreground" : "text-background"}
      />
    </div>
  );
}
