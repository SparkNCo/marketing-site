import SquaresGridLayout from "../layouts/GridLayout.tsx";
import SquaresPostLayout from "./SquaresPostLayout.tsx";

/* const squaresConfig = [
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
]; */

const squaresConfig = [
  { right: 9, top: 8.17, width: 1, height: 1, color: "#F7F4F0" },
  { right: 0, top: 11.17, width: 9.96, height: 1, color: "#F7F4F0" },
  { right: 7, top: 10.17, width: 2, height: 1, color: "#F7F4F0" },
  { right: 5, top: 8.17, width: 1, height: 1, color: "#F7F4F0" },
  { right: 4, top: 9.17, width: 2, height: 1, color: "#F7F4F0" },
  { right: 2, top: 5.17, width: 2, height: 2, color: "#F7F4F0" },
  { right: 2, top: 4.17, width: 1, height: 1, color: "#F7F4F0" },
  { right: 0, top: 10.17, width: 6, height: 1, color: "#F7F4F0" },
  { right: 0, top: 7.17, width: 2, height: 2, color: "#F7F4F0" },
  { right: 0, top: 9.17, width: 2, height: 1, color: "#F7F4F0" },
];

export default function PostCard({ img, title, subtitle, postId, url }) {
  return (
    <article className=" w-full m:w-[275px] h-[387px] overflow-hidden shadow-lg bg-foreground title-white flex flex-col mx-auto ">
      <div className="h-[80%] ">
        {/*         <SquaresPostLayout squares={squaresConfig}>
          <div
            className="h-[280px] w-full bg-cover "
            style={{ backgroundImage: `url(${img})` }}
          />
        </SquaresPostLayout> */}

        <SquaresGridLayout
          squares={squaresConfig}
          background="#F7F4F0"
          width="100%"
          cellSize={23}
          className="h-[280px] w-full bg-cover "
          indexLayout={1}
          indexComponent={0}
        >
          <div
            className="h-[280px] w-full bg-cover "
            style={{ backgroundImage: `url(${img})` }}
            onClick={() => {
              window.location.href = `/blog/${url}`;
            }}
          />
        </SquaresGridLayout>
      </div>

      <div className="h-full p-4 flex flex-col  ">
        <div className="flex flex-col text-right gap-2">
          <a
            href={`/blog/${url}`}
            className="
    text-body font-light text-background
    hover:text-background transition-colors font-medium
  "
          >
            {title}
          </a>

          <span className="text-smalltext font-light text-background font-medium">
            5 min read &gt;
          </span>
        </div>
      </div>
    </article>
  );
}
