"use client";

interface Square {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;

  width: number;
  height: number;

  /** Final color; also the underlay when `baseColor` is set. */
  color: string;
  /** Optional starting color; when set, fades out to reveal `color`. */
  baseColor?: string;

  zIndex?: number;

  duration?: number;
  colorDelay?: number;
}

interface Props {
  children: React.ReactNode;

  squares?: Square[];

  width?: string;
  height?: string;

  margin?: string;
  background?: string;

  cellSize?: number;

  indexLayout?: number;
  indexComponent?: number;
  className?: string;
}

export default function SquaresGridLayout({
  children,
  squares = [],
  width = "auto",
  margin = "auto",
  background = "transparent",
  cellSize = 64,
  indexLayout = 10,
  indexComponent = 5,
  className,
}: Props) {
  return (
    <div
      key={"SquareLayout"}
      id={"SquareLayoutID"}
      className={`relative overflow-hidden m-[${margin}] ${className}`}
      style={{
        width,
        background,
      }}
    >
      {/* CHILDREN LAYER */}
      <div
        className="relative h-full w-full"
        style={{ zIndex: indexComponent }}
      >
        {children}
      </div>

      <style>{`
        @keyframes gridLayoutSquareFadeToSecond {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>

      {/* SQUARES LAYER */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: indexLayout }}
        id="SquareSectionSquares"
      >
        {squares.map((sq, i) => {
          const base = {
            top: sq.top !== undefined ? sq.top * cellSize : undefined,
            bottom:
              sq.bottom !== undefined ? sq.bottom * cellSize : undefined,

            left: sq.left !== undefined ? sq.left * cellSize : undefined,
            right: sq.right !== undefined ? sq.right * cellSize : undefined,

            width: sq.width * cellSize,
            height: sq.height * cellSize,

            zIndex: sq.zIndex ?? 0,
          } as const;

          const fadeDuration = sq.duration ?? 0.8;
          const fadeDelay = sq.colorDelay ?? 0;

          if (sq.baseColor !== undefined) {
            return (
              <div key={i} className="absolute" style={base}>
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: sq.color }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: sq.baseColor,
                    animation: `gridLayoutSquareFadeToSecond ${fadeDuration}s ease forwards`,
                    animationDelay: `${fadeDelay}s`,
                  }}
                />
              </div>
            );
          }

          return (
            <div
              key={i}
              className="absolute"
              style={{
                ...base,
                backgroundColor: sq.color,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
