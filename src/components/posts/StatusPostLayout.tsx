export default function StatusPostLayout({ children, squares = [] }) {
  return (
    <div className="relative w-full h-full">
      {/* Content */}
      <div className="relative z-0 h-full">{children}</div>

      {/* Squares overlay */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {squares.map((sq, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: sq.x,
              top: sq.y,
              width: sq.width,
              height: sq.height,
              backgroundColor: sq.color,
            }}
          />
        ))}
      </div>
    </div>
  );
}
