import StatusCirclesLayout from "../../components/posts/StatusPostLayout.tsx";

export default function PostCard({ img, title, subtitle, postId }) {
  return (
    <article className="w-full h-full rounded-2xl overflow-hidden shadow-lg bg-neutral-900 title-white flex flex-col">
      {/* 80% Image */}
      <div className="h-[80%]">
        <StatusCirclesLayout>
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        </StatusCirclesLayout>
      </div>

      {/* 20% title */}
      <div className="h-[20%] p-4 flex flex-col justify-center">
        <h2 className="title-lg font-semibold leading-snug line-clamp-2">
          {title}
        </h2>

        {/* Redirect link */}
        <a
          href={`/post?postId=${postId}`}
          className="
            title-sm font-light title-neutral-400 mt-1
            hover:title-white transition-colors
          "
        >
          {subtitle}
        </a>
      </div>
    </article>
  );
}
