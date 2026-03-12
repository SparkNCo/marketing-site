export default function PostPageCentered({ uniquePost }) {
  const paragraphs = uniquePost?.slide_three?.split("\n\n") || [];

  return (
    <article className="w-full h-[1160px] bg-white text-background flex flex-col text-center border-4">
      {/* Hero */}
      <div className="w-[60%] mx-auto py-12 space-y-4 mt-40">
        <h1 className="text-4xl font-bold leading-tight max-w-3xl mx-auto">
          So, what does this mean?
        </h1>
      </div>

      {/* Content */}
      <div className="w-[60%] mx-auto flex flex-col gap-12 items-center">
        {paragraphs.map((p, i) => (
          <p key={i} className="w-[75%] text-[34px] font-light text-background">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
