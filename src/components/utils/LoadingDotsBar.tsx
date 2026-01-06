export function LoadingDots() {
  return (
    <div className="flex justify-center items-center py-4 text-foreground">
      <div className="relative w-28 h-6 px-8 overflow-hidden rounded-full border-4 border-primary bg-background flex items-center px-2">
        <span
          className="w-3.5 h-3.5 rounded-full bg-primary animate-loading-dot"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="w-3.5 h-3.5 rounded-full bg-primary animate-loading-dot"
          style={{ animationDelay: "0.4s" }}
        />
        <span
          className="w-3.5 h-3.5 rounded-full bg-primary animate-loading-dot"
          style={{ animationDelay: "0.8s" }}
        />
        <span
          className="w-3.5 h-3.5 rounded-full bg-primary animate-loading-dot"
          style={{ animationDelay: "1.2s" }}
        />
      </div>
    </div>
  );
}
