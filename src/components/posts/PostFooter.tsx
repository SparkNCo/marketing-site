import { ArrowBigRight } from "lucide-react";

export default function PostFooter({
  height = "h-28",
  bgColor = "bg-white",
  imgSrc = "/nbarIcon2.png",
  arrowColor = "text-background",
  hideComponets = false,
}) {
  return (
    <div className={`${height} ${bgColor} w-[1080px]`}>
      {!hideComponets && (
        <div className="w-[90%] h-full flex items-center justify-between mx-auto z-20">
          <img
            src={imgSrc}
            alt="footer-icon"
            className="w-32 h-32 object-contain"
          />
          <ArrowBigRight
            className={`w-20 h-20 ${arrowColor}`}
            fill={imgSrc === "/nbarIcon.png" ? "white" : "black"}
          />{" "}
        </div>
      )}
    </div>
  );
}

export function PostFooter1({ title, author }) {
  return (
    <div className="h-[270px] flex items-center  ">
      <div className="w-full mx-auto space-y-2 flex flex-col items-end text-right mr-[20px]">
        <h2 className="text-[52px] font-semibold leading-tight line-clamp-2 text-foreground w-[850px]">
          {title}
        </h2>

        <p className="text-[36px] font-light text-neutral-400 py-6">{author}</p>
      </div>
    </div>
  );
}
