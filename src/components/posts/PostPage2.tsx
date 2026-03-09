export default function PostPage2({ uniquePost }) {
  const paragraphs = uniquePost?.slide_two?.split("\n\n") || [];

  const widths = ["w-[90%]", "w-[75%]", "w-[50%]"];

  return (
    <article className="w-[1080px] h-[1170px] text-white flex flex-col">
      <article className="w-[900px] mx-auto text-white flex flex-col mt-12 ">
        <div className="py-12 flex flex-col gap-12 ">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={`${widths[i] || "w-[75%]"} text-[38px] font-light text-foreground whitespace-pre-line text-left`}
            >
              {p}
            </p>
          ))}
        </div>
      </article>
    </article>
  );
}
