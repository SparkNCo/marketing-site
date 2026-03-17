// @ts-nocheck
export default function SquaresPostLayoutEdges({
  children,
  squares = [],
  indexLayout = 10,
  indexComponent = 5,
  width = "",
  margin = "auto",
  tags = [],
  indexTags = 15,
  isMobile = false,
}: {
  children: React.ReactNode;
  squares?: Array<{
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width: string;
    height: string;
    color: string;
    color2?: string;
    zIndex?: number;
    duration?: number;
    colorDelay?: number;
    moveTop?: string;
    moveBottom?: string;
    moveLeft?: string;
    moveRight?: string;
    moveDuration?: number;
  }>;
  indexLayout?: number;
  indexComponent?: number;
  isMobile?: boolean;
}) {
  const cellSize = isMobile ? 32 : 64;

  return (
    <div className={`relative h-full w-${width} mx-${margin} overflow-hidden `}>
      {/* Children layer */}
      <div className="relative h-full" style={{ zIndex: indexComponent }}>
        {children}
      </div>

      {/* Tags layer */}
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
                className="absolute grid grid-cols-4 gap-3"
                style={{
                  right: group.x,
                  top: group.y,
                  width: "max-content",
                  direction: "rtl",
                }}
              >
                {reversed.map((label, j) => (
                  <span
                    key={j}
                    className="px-6 py-2 text-2xl w-[225px] text-background font-semibold  bg-[#F7F4F0] whitespace-nowrap text-center"
                  >
                    {label}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Squares layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: indexLayout }}
      >
        {squares.map((sq, i) => {
          const colorAnim = `squareColorAnim_${i}`;
          const moveAnim = `squareMoveAnim_${i}`;
          return (
            <div key={i}>
              {/* Movement animation */}
              {(sq.moveTop || sq.moveBottom || sq.moveLeft || sq.moveRight) && (
                <style>
                  {`
                    @keyframes ${moveAnim} {
                      0% { transform: translate(0, 0); }
                      50% { 
                        transform: translate(
                          ${sq.moveLeft || sq.moveRight ? `calc(${sq.moveLeft ?? sq.left} - ${sq.left ?? 0})` : "0"},
                          ${sq.moveTop || sq.moveBottom ? `calc(${sq.moveTop ?? sq.top} - ${sq.top ?? 0})` : "0"}
                        ); 
                      }
                      100% { transform: translate(0, 0); }
                    }
                  `}
                </style>
              )}
              <div
                className="absolute"
                style={{
                  top: sq.top * cellSize,
                  bottom: sq.bottom * cellSize,
                  left: sq.left * cellSize,
                  right: sq.right * cellSize,
                  width: sq.width * cellSize,
                  height: sq.height * cellSize,
                  backgroundColor: sq.color,
                  zIndex: sq.zIndex ?? 0,
                  "--color-1": sq.color,
                  "--color-2": sq.color2 ?? sq.color,
                  "--move-top": sq.moveTop ?? "0px",
                  "--move-bottom": sq.moveBottom ?? "0px",
                  "--move-left": sq.moveLeft ?? "0px",
                  "--move-right": sq.moveRight ?? "0px",
                  animation: [
                    sq.color2
                      ? `square-color ${sq.duration ?? 3}s ease-in-out ${sq.colorDelay ?? 0}s`
                      : null,
                    sq.moveTop || sq.moveBottom || sq.moveLeft || sq.moveRight
                      ? `square-move ${sq.moveDuration ?? 6}s ease-in-out`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(", "),
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
