import { CaseStudyCard } from "./components/CaseStudyCard";
import { CaseStudyCardMobile } from "./components/CaseStudyCardMobile";

function CaseStudiesSection({ isMobile }: Readonly<{ isMobile: boolean }>) {
  const caseStudies = [
    {
      id: 1,
      title: "BeAssured",
      subtitle: "SEO & Google Business Optimization Platform",
      review:
        "It feels like a true partnership. They help us evolve the product thoughtfully and keep things solid as we scale.",
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
        "Removed the usual friction between development and production. We were able to maintain high velocity and rock-solid stability.",
      author: "Gaston Jacinto",
      role: "Lead Engineer",
      primaryImage: "/screenshots/rentscape-1.jpeg",
      secondaryImage: "/screenshots/rentscape-2.jpeg",
    },
    {
      id: 3,
      title: "Bender",
      subtitle: "WhatsApp Influencer Assistant",
      review:
        "Collaboration felt thoughtful from the start. Helped us turn big ideas into a product. Working with you was a joy.",
      author: "Ivo Sofiganov",
      role: "Owner",
    },
    {
      id: 4,
      title: "PursuitAI",
      subtitle: "Gym-Connected Fitness & Nutrition App",
      review:
        "I knew what I wanted for gyms and members, but didn't know how to build it. You helped me turn the vision into something I could take to market.",
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
        "Impressed by the speedy delivery and online support. Couldn't have done it without you guys.",
      author: "Murtaza Saifuddin",
      role: "Engineering Lead",
      primaryImage: "/screenshots/nextmarket-1.jpeg",
      secondaryImage: "/screenshots/nextmarket-2.jpeg",
    },
    {
      id: 6,
      title: "Curabit",
      subtitle: "Customizable Chatbot & Conversation Analytics",
      review:
        "With your help we grew the team, and found possibilities with our product we couldn't have imagined before.",
      author: "Sana Mungroo",
      role: "CEO",
    },
    {
      id: 7,
      title: "SoCo Market",
      subtitle: "Creator Marketplace & Secure Transactions",
      review:
        "Just works — super smooth and solid. Love the vibe.",

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
          describe working with us, and what it unlocked for their businesses.
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
