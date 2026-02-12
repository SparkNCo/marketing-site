export default function SquaresPostLayout({
  children,
  squares = [],
  indexLayout = 10,
  indexComponent = 5,
}: {
  children: React.ReactNode;
  squares?: any[];
  indexLayout?: string;
  indexComponent?: string;
}) {
  return (
    <div className="relative w-full h-full">
      {" "}
      {/* Content */}
      <div className="relative h-full" style={{ zIndex: indexComponent }}>
        {children}
      </div>{" "}
      {/* Squares overlay */}{" "}
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
              {/* Color animation */}{" "}
              {sq.color2 && (
                <style>
                  {" "}
                  {` @keyframes ${colorAnim} { 0% { background-color: ${sq.color}; } 50% { background-color: ${sq.color2}; } 100% { background-color: ${sq.color}; } } `}{" "}
                </style>
              )}{" "}
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
                  animation: [
                    sq.color2
                      ? `${colorAnim} ${sq.duration ?? 3}s ease-in-out ${sq.colorDelay ?? 0}s infinite both`
                      : null,
                    sq.moveToX || sq.moveToY
                      ? `${moveAnim} ${sq.moveDuration ?? 6}s ease-in-out infinite`
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
