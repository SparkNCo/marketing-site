import { CaseStudyCard } from "./components/CaseStudyCard";
import { CaseStudyCardMobile } from "./components/CaseStudyCardMobile";

function CaseStudiesSection({ isMobile }: Readonly<{ isMobile: boolean }>) {
  const caseStudies = [
    {
      id: 1,
      title: "BeAssured",
      subtitle: "SEO & Google Business Optimization Platform",
      review:
        "Couldn't be happier—the team turned our SEO and GMB goals into a product we trust and enjoy shipping.",
      author: "Tom Davenport",
      role: "Owner",
      primaryImage: "/screenshots/beassured-1.jpeg",
      secondaryImage: "/screenshots/beassured-2.jpeg",
    },
    {
      id: 2,
      title: "RentScape",
      subtitle: "End-to-End Rental Management Platform",
      review:
        "Your crew made building our rental agent feel effortless; we're grateful for the speed, care, and partnership.",
      author: "Nicolaus Wong",
      role: "CEO",
      primaryImage: "/screenshots/rentscape-1.jpeg",
      secondaryImage: "/screenshots/rentscape-2.jpeg",
    },
    {
      id: 3,
      title: "Bender",
      subtitle: "WhatsApp Influencer Assistant",
      review:
        "Working with you was a joy—you helped us ship a social chat product that finally matches our brand and pace.",
      author: "Ivo Sofiganov",
      role: "Owner",
    },
    {
      id: 4,
      title: "PursuitAI",
      subtitle: "Gym-Connected Fitness & Nutrition App",
      review:
        "Delighted you steered our fitness app from fuzzy idea to launch; the collaboration felt supportive every week.",
      author: "Sash Alagh",
      role: "CEO",
      primaryImage: "/screenshots/pursuit-1.jpeg",
      secondaryImage: "/screenshots/pursuit-2.jpeg",
    },
    {
      id: 5,
      title: "NextMarket",
      subtitle: "Vendors & Markets Marketplace",
      review:
        "Incredibly thankful for how you walked us through marketplace complexity and helped us ship with confidence.",
      author: "Alkyhan Sehra",
      role: "CEO",
      primaryImage: "/screenshots/nextmarket-1.jpeg",
      secondaryImage: "/screenshots/nextmarket-2.jpeg",
    },
    {
      id: 6,
      title: "Curabit",
      subtitle: "Customizable Chatbot & Conversation Analytics",
      review:
        "Happy isn't strong enough—you helped us unify reviews and chatbot flows so support finally feels human.",
      author: "Sana Mungroo",
      role: "CEO",
    },
    {
      id: 7,
      title: "SoCo Market",
      subtitle: "Creator Marketplace & Secure Transactions",
      review:
        "Thrilled with how you shaped our marketplace and on-chain transactions; customers feel the polish and we do too.",
      author: "Thai Doan",
      role: "Project Lead",
    },
  ];

  const duplicatedStudies = [...caseStudies, ...caseStudies];

  const CardComponent = isMobile ? CaseStudyCardMobile : CaseStudyCard;

  return (
    <section className="bg-background ">
      <div className="px-6 lg:px-16 mt-16 lg:mt-28 mb-16 lg:mb-28">
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
