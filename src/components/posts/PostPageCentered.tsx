import { posts } from "./mockPosts.ts";

export default function PostPageCentered() {
  return (
    <article className="w-full h-[1080px] bg-white text-background flex flex-col text-center">
      {/* Hero */}
      <div className="w-[60%] mx-auto py-12 space-y-4 mt-32">
        <h1 className="text-4xl font-bold leading-tight max-w-3xl mx-auto">
          So, what does this mean?
        </h1>
      </div>

      {/* Content */}
      <div className="w-[60%] mx-auto space-y-12">
        {/* Section 1 */}
        <section className="space-y-4 max-w-3xl mx-auto text-center">
          <p className="text-[24px] max-w-[900px] font-light text-background">
            Generative design systems are transforming how teams prototype,
            iterate, and ship digital products. Instead of static components,
            designers now work with adaptive UI patterns that respond to data,
            user behavior, and AI-driven personalization layers.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4 max-w-3xl mx-auto text-center">
          <p className="text-[24px] max-w-[900px] font-light text-background">
            As organizations expand their digital ecosystems, maintaining visual
            and functional consistency becomes critical. Tokenized styling,
            cross-platform component pipelines, and automated accessibility
            testing are becoming foundational to modern product development.
          </p>
        </section>
      </div>
    </article>
  );
}
