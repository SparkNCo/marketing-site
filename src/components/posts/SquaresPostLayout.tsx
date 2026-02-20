// @ts-nocheck
export default function SquaresPostLayout({
  children,
  squares = [],
  indexLayout = 10,
  indexComponent = 5,
  width = "",
  margin = "auto",
  tags = [],
  indexTags = 15,
}: {
  children: React.ReactNode;
  squares?: any[];
  indexLayout?: string;
  indexComponent?: string;
}) {
  return (
    <div className={`relative h-full w-${width} mx-${margin}   `}>
      <div className="relative h-full" style={{ zIndex: indexComponent }}>
        {children}
      </div>{" "}
      {tags.length > 0 && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: indexTags }}
        >
          {tags.map((group, i) => {
            const reversed = [...group.labels].reverse();

            return (
              <div
                key={i}
                className="
            absolute
            grid grid-cols-4
            gap-3 
          "
                style={{
                  right: group.x, // anchor top-right
                  top: group.y,
                  width: "max-content",
                  direction: "rtl",
                }}
              >
                {reversed.map((label, j) => (
                  <span
                    key={j}
                    className="
                px-6 py-2 text-2xl w-[225px]
                text-background font-semibold
                rounded-lg
                bg-[#f8f8f8]
                whitespace-nowrap
                text-center
              "
                  >
                    {label}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: indexLayout }}
      >
        {" "}
        {squares.map((sq, i) => {
          const colorAnim = `squareColorAnim_${i}`;
          const moveAnim = `squareMoveAnim_${i}`;
          return (
            <div key={i}>
              {" "}
              {/* Movement animation */}{" "}
              {(sq.moveToX || sq.moveToY) && (
                <style>
                  {" "}
                  {` @keyframes ${moveAnim} { 0% { transform: translate(0px, 0px); } 50% { transform: translate( calc(${sq.moveToX ?? sq.x} - ${sq.x}), calc(${sq.moveToY ?? sq.y} - ${sq.y}) ); } 100% { transform: translate(0px, 0px); } } `}{" "}
                </style>
              )}{" "}
              {/* Square */}{" "}
              <div
                className="absolute"
                style={{
                  left: sq.x,
                  top: sq.y,
                  width: sq.width,
                  height: sq.height,
                  backgroundColor: sq.color,
                  zIndex: sq.zIndex ?? 0,

                  /* CSS variables */
                  "--color-1": sq.color,
                  "--color-2": sq.color2 ?? sq.color,
                  "--move-x": sq.moveToX
                    ? `calc(${sq.moveToX} - ${sq.x})`
                    : "0px",

                  "--move-y": sq.moveToY
                    ? `calc(${sq.moveToY} - ${sq.y})`
                    : "0px",

                  animation: [
                    sq.color2
                      ? `square-color ${sq.duration ?? 3}s ease-in-out ${sq.colorDelay ?? 0}s infinite`
                      : null,

                    sq.moveToX || sq.moveToY
                      ? `square-move ${sq.moveDuration ?? 6}s ease-in-out infinite`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(", "),
                }}
              />
            </div>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
}
