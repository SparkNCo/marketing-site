export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-foreground/10 bg-card/60 px-6 py-6 text-sm text-secondary backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 text-left">
        <span className="text-xs uppercase tracking-[0.3em] text-foreground/60">
          Get in touch
        </span>
        <span className="text-lg font-semibold text-foreground">
          kabir@buildwithspark.co
        </span>
        <span className="text-xs text-foreground/50">
          Crafted with playful precision for bold brands.
        </span>
      </div>
    </footer>
  );
}
