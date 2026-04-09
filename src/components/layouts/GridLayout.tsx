"use client";

import { useEffect, useRef, useState } from "react";

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
}: Readonly<Props>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
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
            top: sq.top === undefined ? undefined : sq.top * cellSize,
            bottom: sq.bottom === undefined ? undefined : sq.bottom * cellSize,
            left: sq.left === undefined ? undefined : sq.left * cellSize,
            right: sq.right === undefined ? undefined : sq.right * cellSize,
            width: sq.width * cellSize,
            height: sq.height * cellSize,
            zIndex: sq.zIndex ?? 0,
          } as const;

          const fadeDuration = sq.duration ?? 0.8;
          const fadeDelay = sq.colorDelay ?? 0;
          const key = `sq-${i}-${sq.color}-${sq.width}-${sq.height}`;

          if (sq.baseColor === undefined) {
            return (
              <div
                key={key}
                className="absolute"
                style={{ ...base, backgroundColor: sq.color }}
              />
            );
          }

          return (
            <div key={key} className="absolute" style={base}>
              <div
                className="absolute inset-0"
                style={{ backgroundColor: sq.color }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: sq.baseColor,
                  ...(inView && {
                    animation: `gridLayoutSquareFadeToSecond ${fadeDuration}s ease forwards`,
                    animationDelay: `${fadeDelay}s`,
                  }),
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
