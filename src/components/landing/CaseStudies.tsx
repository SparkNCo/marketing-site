import { CaseStudyCard } from "./components/CaseStudyCard";
import { CaseStudyCardMobile } from "./components/CaseStudyCardMobile";

function CaseStudiesSection({ isMobile }: Readonly<{ isMobile: boolean }>) {
  const caseStudies = [
    {
      id: 1,
      title: "BeAssured",
      subtitle: "SEO and GMB Optimization Platform",
      review:
        "Couldn't be happier—the team turned our SEO and GMB goals into a product we trust and enjoy shipping.",
      author: "Tom Davenport",
      role: "Owner",
    },
    {
      id: 2,
      title: "RentScape",
      subtitle: "Automated Rental Listing Agent",
      review:
        "Your crew made building our rental agent feel effortless; we're grateful for the speed, care, and partnership.",
      author: "Nicolaus Wong",
      role: "CEO",
    },
    {
      id: 3,
      title: "Bender",
      subtitle: "Social Media Chat Manager",
      review:
        "Working with you was a joy—you helped us ship a social chat product that finally matches our brand and pace.",
      author: "Ivo Sofiganov",
      role: "Owner",
    },
    {
      id: 4,
      title: "PursuitAI",
      subtitle: "Fitness and Nutrition AI App",
      review:
        "Delighted you steered our fitness app from fuzzy idea to launch; the collaboration felt supportive every week.",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 5,
      title: "NextMarket",
      subtitle: "Vendor Marketplace",
      review:
        "Incredibly thankful for how you walked us through marketplace complexity and helped us ship with confidence.",
      author: "Alkyhan Sehra",
      role: "CEO",
    },
    {
      id: 6,
      title: "Curabit",
      subtitle: "Chatbot and Chat Analysis Platform",
      review:
        "Happy isn't strong enough—you helped us unify reviews and chatbot flows so support finally feels human.",
      author: "Sana Mungroo",
      role: "CEO",
    },
    {
      id: 7,
      title: "SoCo Market",
      subtitle: "Link-in-bio Services and Crypto Transfers",
      review:
        "Thrilled with how you shaped our link-in-bio and crypto experience; customers feel the polish and we do too.",
      author: "Thai Doan",
      role: "CMO",
    },
  ];

  const duplicatedStudies = [...caseStudies, ...caseStudies];

  const CardComponent = isMobile ? CaseStudyCardMobile : CaseStudyCard;

  return (
    <section className="bg-background mt-32 pt-8 md:pb-32">
      <div className="px-6 lg:px-16 mb-20">
        <h2 className="text-largeBody md:text-heading1 text-foreground mb-4 text-left">
          Don't just take our word for it
        </h2>

        <p className="text-body md:text-heading2 text-foreground mb-12 text-left leading-relaxed lg:container">
          We partner with teams to ship software that holds up in production,
          not just on a roadmap. Here’s how founders and product leaders
          describe working with us—and what it unlocked for their businesses.
        </p>
      </div>

      {/* Top row */}
      <div className="relative mb-12 overflow-hidden [transform:translateZ(0)] isolate">
        <div className="animate-scroll-right gap-8">
          {duplicatedStudies.map((study, index) => (
            <CardComponent
              key={`top-${study.id}-${index < caseStudies.length ? "a" : "b"}`}
              study={study}
            />
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="relative overflow-hidden [transform:translateZ(0)] isolate">
        <div className="animate-scroll-left gap-8">
          {duplicatedStudies.map((study, index) => (
            <CardComponent
              key={`bottom-${study.id}-${index < caseStudies.length ? "a" : "b"}`}
              study={study}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;
