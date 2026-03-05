import { CaseStudyCard } from "./components/CaseStudyCard";
import { CaseStudyCardMobile } from "./components/CaseStudyCardMobile";

function CaseStudiesSection({ isMobile }: { isMobile: boolean }) {
  const caseStudies = [
    {
      id: 1,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 2,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 3,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 4,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 5,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 6,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
  ];

  const duplicatedStudies = [...caseStudies, ...caseStudies];

  const CardComponent = isMobile ? CaseStudyCardMobile : CaseStudyCard;

  return (
    <section className="bg-background py-32 overflow-hidden border-4">
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-4xl text-foreground md:text-5xl font-bold mb-12 text-center">
          Case Studies
        </h2>
      </div>

      {/* Top row */}
      <div className="relative mb-12 overflow-hidden">
        <div className="animate-scroll-right flex gap-8">
          {duplicatedStudies.map((study, index) => (
            <CardComponent key={`top-${index}`} study={study} />
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="relative overflow-hidden">
        <div className="animate-scroll-left flex gap-8">
          {duplicatedStudies.map((study, index) => (
            <CardComponent key={`bottom-${index}`} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;
