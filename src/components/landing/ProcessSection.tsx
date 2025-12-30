"use client"
import { useEffect, useRef, useState } from "react"

const steps = [
  { id: 1, title: "Sign Up" },
  { id: 2, title: "Project Discovery" },
  { id: 3, title: "MVP" },
  { id: 4, title: "Added Assets" },
  { id: 5, title: "Finished Project" },
]

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !stepsRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const stepsHeight = stepsRef.current.scrollHeight
      const windowHeight = window.innerHeight

      // Calculate which step should be active based on scroll position
      if (sectionRect.top <= 100 && sectionRect.bottom >= windowHeight / 2) {
        const scrollProgress = Math.abs(sectionRect.top - 100) / (stepsHeight - windowHeight / 2)
        const stepIndex = Math.min(Math.floor(scrollProgress * steps.length), steps.length - 1)
        setActiveStep(Math.max(0, stepIndex))
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-black py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-20 text-center">The Spark & Co Process</h2>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Left Column - Scrolling Steps */}
          <div ref={stepsRef} className="relative space-y-0">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#F78035]/30"></div>

            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`transition-all duration-500 relative ${activeStep >= index ? "opacity-100" : "opacity-30"}`}
              >
                <div className="flex gap-6 pb-32">
                  {/* Step Number */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#F78035] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {step.id}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold text-white">{step.title}</h3>
                      <div className="w-20 h-1 bg-[#F78035]"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Sticky Content */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 space-y-6">
              <h3 className="text-3xl font-bold text-white">Project Discovery</h3>
              <p className="text-[#F7F4F0]/80 leading-relaxed text-lg">
                The more we can solidify at the start of the project, the smoother the project will be. We start with a
                discovery call to go through the ins and outs of your industry, ICPs and problem statements.
              </p>

              {/* Placeholder for image */}
              <div className="w-full aspect-square bg-emerald-600 rounded-lg mt-8 flex items-center justify-center">
                <span className="text-white/50 text-sm font-mono">Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
