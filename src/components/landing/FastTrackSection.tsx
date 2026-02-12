"use client";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import BuildScaleToggle from "./components/BuildScaleComponent";
function FastTrackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"supercharged" | "control" | "mvp">("mvp");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    console.log("email", email);
  };

  return (
    <main
      ref={sectionRef}
      className=" flex flex-col items-center justify-center bg-transparent text-center py-24 gap-6 h-[1000px] "
    >
      <h1 className="text-4xl font-bold tracking-tight text-background leading-tight">
        Fast Track Your Success
      </h1>
      {/* Paragraph */}
      <p className="text-3xl max-w-2xl text-background leading-snug">
        Modernize your software development process and ignite your business
        potential.
      </p>
      {/* Email input */}
      <div className="max-w-xl">
        <div className="flex items-center bg-foreground rounded-lg shadow-md w-[378px]">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 outline-none text-background"
          />
          <button
            onClick={handleSubmit}
            className="px-4 h-full flex items-center justify-center text-background bg-foreground"
          >
            <ChevronRight className="w-7 h-7 text-background bg-foreground border-2 border-background rounded-md" />
          </button>
        </div>
      </div>
      <div className="mx-auto ">
        <BuildScaleToggle setMode={setMode} centerExpanded={true} />
      </div>
    </main>
  );
}
export default FastTrackSection;
