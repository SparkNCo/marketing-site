import { MoveRight } from "lucide-react";

export default function PostFooter({
  height = "h-28",
  bgColor = "bg-white",
  imgSrc = "/nbarIcon2.png",
  arrowColor = "text-background",
  hideComponets = false,
}) {
  return (
    <div className={`${height} ${bgColor}`}>
      {!hideComponets && (
        <div className="w-[90%] h-full flex items-center justify-between mx-auto">
          <img
            src={imgSrc}
            alt="footer-icon"
            className="w-24 h-24 object-contain"
          />

          <MoveRight className={`w-24 h-24 ${arrowColor}`} />
        </div>
      )}
    </div>
  );
}

export function PostFooter1() {
  return (
    <div className="flex items-center my-8">
      {" "}
      <div className="w-[70%] mx-auto space-y-2 text-right">
        {" "}
        {/* Big 2-line text */}{" "}
        <h2 className=" text-[52px] font-semibold leading-tight line-clamp-2 text-foreground ">
          {" "}
          Why this thing and that thing are important to other thing{" "}
        </h2>{" "}
        {/* Small text */}{" "}
        <p className="text-[36px] font-light text-neutral-400">
          {" "}
          Derek Guy{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
}
