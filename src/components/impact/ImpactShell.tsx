"use client";

import React from "react";
import { Button } from "../ui/button";
import ImpactProgramCard from "./ImpactProgramCard";
import Header from "../Header";
import Footer from "../Footer";
import { AppProvider } from "../../lib/AppProvider";

type ProgramProject = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

const programProjects: ProgramProject[] = [
  {
    id: 1,
    title: "SoCo Market",
    description:
      "Protects freelancers from fraudulent transactions, helps them with secure contracts, and provides them a community to grow.",
  },
  {
    id: 2,
    title: "DFTM",
    description:
      "Educates buyers on where their money is going, so they can make socially responsible purchase decisions and only support companies that support them.",
  },
];

const ImpactShell: React.FC = () => {
  const handleApply = () => {
    globalThis.location.href = "/";
  };

  const handleBackHome = () => {
    globalThis.location.href = "/";
  };

  return (
    <AppProvider>
      <div className="bg-background min-h-screen">
        <Header headerMode="index" />

        <main className="pt-32 mt-10 pb-20 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <section className="mb-20">
              <h1 className="text-heading1 md:text-[56px] font-bold text-foreground mb-8 leading-tight">
                Social Contracts
              </h1>

              <div className="space-y-6 text-foreground">
                <p className="text-largeBody md:text-heading2 leading-relaxed">
                  The Social Contracts Program subsidizes our fees for qualifying projects
                  that create meaningful social, community, educational,
                  environmental, or public-benefit outcomes.
                </p>

                <div className="bg-foreground/5 border-l-4 border-primary p-6 rounded-r-lg">
                  <h2 className="text-heading2 font-bold mb-4">
                    Eligibility Requirements
                  </h2>
                  <p className="text-body mb-4">
                    <span className="font-bold text-primary">
                      Projects must be not for profit to qualify.
                    </span>
                  </p>
                  <p className="text-body leading-relaxed">
                    To help you self-assess whether your project is a good fit,
                    please consider the following additional qualification
                    points:
                  </p>
                </div>

                <ul className="space-y-4 text-body leading-relaxed">
                  <li className="flex gap-4">
                    <span className="text-primary font-bold text-heading2 flex-shrink-0">
                      •
                    </span>
                    <span>
                      <strong>Clear Mission:</strong> The organization has a
                      clear social, community, educational, environmental, or
                      public-benefit mission.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-primary font-bold text-heading2 flex-shrink-0">
                      •
                    </span>
                    <span>
                      <strong>Decision Authority:</strong> The project has a
                      defined decision-maker and can move forward within a
                      reasonable timeline.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-primary font-bold text-heading2 flex-shrink-0">
                      •
                    </span>
                    <span>
                      <strong>Team Capacity:</strong> The team can provide the
                      content, access, and feedback needed to complete the
                      project.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-primary font-bold text-heading2 flex-shrink-0">
                      •
                    </span>
                    <span>
                      <strong>Realistic Scope:</strong> The requested work is
                      scoped to a realistic first engagement rather than a broad
                      multi-phase program.
                    </span>
                  </li>
                </ul>

                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleApply}
                    variant="nav"
                    size="lg"
                    className="text-body px-8 py-6 h-auto"
                  >
                    Apply Through Main Landing Page
                  </Button>
                </div>
              </div>
            </section>

            <section className="mt-32">
              <h2 className="text-largeBody md:text-heading1 font-bold text-foreground mb-12">
                Current Program Projects
              </h2>

              {programProjects.length === 0 ? (
                <p className="text-body text-foreground/70 text-center py-12">
                  No program projects available at this time.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {programProjects.map((project) => (
                    <ImpactProgramCard
                      key={project.id}
                      image={project.image}
                      title={project.title}
                      description={project.description}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>

        <Footer mode="index" />
      </div>
    </AppProvider>
  );
};

export default ImpactShell;
