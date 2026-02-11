import React from "react";



export interface SquareConfig {
  x: string;
  y: string;
  width: string;
  height: string;
  color: string;
  zIndex?: number;
  borderRadius?: string;
}
interface SquaresLayoutProps {
  squares: SquareConfig[];
  children: React.ReactNode;
}
const SquaresLayout: React.FC<SquaresLayoutProps> = ({ squares, children }) => {
  return (
    <div className="relative w-full h-full">
      {" "}
      {/* Squares layer */}{" "}
      {squares.map((sq, i) => (
        <div
          key={i}
          className="fixed pointer-events-none"
          style={{
            left: sq.x,
            top: sq.y,
            width: sq.width,
            height: sq.height,
            backgroundColor: sq.color,
            zIndex: sq.zIndex ?? 0,
            borderRadius: sq.borderRadius ?? "0px",
          }}
        />
      ))}{" "}
      {/* Content layer */} <div className="relative z-10">{children}</div>{" "}
    </div>
  );
};
export default SquaresLayout;
