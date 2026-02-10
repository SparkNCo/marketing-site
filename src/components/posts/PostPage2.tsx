import StatusCirclesLayout from "../../components/posts/StatusPostLayout.tsx";

export default function PostPage2({ squaresConfig }) {
  return (
    <article className="w-full min-h-[1080px] bg-neutral-900 text-white flex flex-col">
      <div className="h-[1080px] w-full">
        <StatusCirclesLayout squaresConfig={squaresConfig}>
          <article className="w-full min-h-screen bg-neutral-900 text-white flex flex-col ">
            <div className="w-[70%] mx-auto py-12 space-y-4 flex flex-col gap-8 ">
              {/* Mock section 2 */}
              <p className="text-[38px] max-w-[900px] font-light text-foreground">
                {" "}
                Here’s a writeup of the content in the article. I’m going to
                copy and paste it a few times here.
              </p>{" "}
              <p className="text-[38px] max-w-[600px] font-light text-foreground ">
                {" "}
                Here’s a writeup of the content in the article. I’m going to
                copy and paste it a few times here.
              </p>{" "}
              <p className="text-[38px] max-w-[360px] font-light text-foreground">
                {" "}
                Here’s a writeup of the content in the article.
              </p>{" "}
            </div>
          </article>
        </StatusCirclesLayout>
      </div>
    </article>
  );
}
