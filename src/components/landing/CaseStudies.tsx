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
    <section className="bg-background mt-32 py-32 overflow-hidden ">
      <div className="pl-16 mb-20">
        <h2 className="text-largeBody md:text-heading1 text-foreground mb-4 text-left">
          Don't just take our word for it
        </h2>

        <p className="text-body md:text-heading2 text-foreground mb-12 text-left leading-relaxed lg:container">
          We partner with teams to ship software that holds up in production, not
          just on a roadmap. Here’s how founders and product leaders describe
          working with us—and what it unlocked for their businesses.
        </p>
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
