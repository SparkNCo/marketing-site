import { SDLCDonutChart } from "./components/DonutChart/sdlc-donut-chart";

export default function DonutChatSection() {
  return (
    <main className="relative min-h-screen overflow-hidden">
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
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <div className="mb-12 text-center">
          <p className="mb-2 text-body  uppercase tracking-widest text-primary font-bold">
            SDLC Completeness
          </p>
          <h1 className="text-largeBody md:text-heading1 font-bold tracking-tight text-foreground ">
            Code Generation is Only the Beginning
          </h1>
          <p className="mx-auto mt-4 max-w-2xl  text-body text-foreground">
            Discover why your development process might not be as complete as
            you think. Select the phases you&apos;ve implemented and see the
            full picture.
          </p>
        </div>

        <SDLCDonutChart />

        {/* <p className="mt-12 max-w-lg text-center text-sm text-foreground">
          True product completeness requires orchestrating the entire software
          development lifecycle—not just writing code.
        </p> */}
      </div>
    </main>
  );
}
