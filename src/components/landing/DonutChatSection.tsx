import { SDLCDonutChart } from "./components/DonutChart/sdlc-donut-chart";

type DonutChatSectionProps = {
  setMode?: (mode: "index" | "form") => void;
};

export default function DonutChatSection({ setMode }: Readonly<DonutChatSectionProps>) {
  return (
    <main className="relative overflow-hidden">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-chart-2/10 blur-3xl" />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center px-4 md:pt-32">
      
        <SDLCDonutChart setMode={setMode} />

      </div>
    </main>
  );
}
