import StatusCirclesLayout from "../../components/posts/StatusPostLayout.tsx";
import SquaresPostLayout from "./SquaresPostLayout.tsx";

const squaresConfig = [
  {
    x: "46px",
    y: "257px",
    width: "229px",
    height: "23px",
    color: "#F7F4F0",
  },
  //2nd line
  {
    x: "69px",
    y: "234px",
    width: "46px",
    height: "23px",
    color: "#F7F4F0",
  },
  {
    x: "138px",
    y: "234px",
    width: "138px",
    height: "23px",
    color: "#F7F4F0",
  },
  //3rd line
  {
    x: "138px",
    y: "211px",
    width: "46px",
    height: "23px",
    color: "#F7F4F0",
  },
  {
    x: "230px",
    y: "211px",
    width: "46px",
    height: "23px",
    color: "#F7F4F0",
  },
  //4th line
  {
    x: "46px",
    y: "188px",
    width: "23px",
    height: "23px",
    color: "#F7F4F0",
  },
  {
    x: "138px",
    y: "188px",
    width: "23px",
    height: "23px",
    color: "#F7F4F0",
  },
  {
    x: "230px",
    y: "165px",
    width: "46px",
    height: "46px",
    color: "#F7F4F0",
  },
  //top box
  {
    x: "188px",
    y: "119px",
    width: "46px",
    height: "46px",
    color: "#F7F4F0",
  },
  {
    x: "211px",
    y: "96px",
    width: "23px",
    height: "23px",
    color: "#F7F4F0",
  },
];

export default function PostCard({ img, title, subtitle, postId }) {
  return (
    <article className=" w-full m:w-[275px] h-[387px] overflow-hidden shadow-lg bg-foreground title-white flex flex-col mx-auto ">
      <div className="h-[80%]">
        <SquaresPostLayout squares={squaresConfig}>
          <div
            className="h-[280px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        </SquaresPostLayout>
      </div>

      <div className="h-full p-4 flex flex-col  ">
        {/* Redirect + meta */}
        <div className=" flex flex-col text-right gap-2">
          <a
            href={`/post?postId=${postId}`}
            className="
              title-sm font-light title-neutral-400
              hover:title-white transition-colors
            "
          >
            Why this thing and that thing are important to other thing
          </a>

          <span className="title-sm font-light title-neutral-400">
            5 min read &gt;
          </span>
        </div>
      </div>
    </article>
  );
}
