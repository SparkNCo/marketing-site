"use client";

import React, { type ComponentProps } from "react";
import Header from "../Header";
import Footer from "../Footer";
import FooterSqareSection from "../landing/FooterSqareSection";
import SquaresGridLayout from "../layouts/GridLayout";
import { FooterLeftRightSquares } from "../SquareConfig";
import { useResponsiveCellSize } from "../utils/useResponsiveCellSize";
import { AppProvider } from "../../lib/AppProvider";

type EngagementScope = "Build" | "Scale";

type CaseStudyBase = {
  id: number;
  clientName: string;
  industry: string;
  scope: EngagementScope;
  stack: string;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  review: string;
  author: string;
  role: string;
};

type FeaturedCaseStudy = CaseStudyBase & {
  primaryImage: string;
  secondaryImage: string;
};

type TextCaseStudy = CaseStudyBase;

type FeaturedTextOnlyCaseStudy = Omit<
  CaseStudyBase,
  "review" | "author" | "role"
> & {
  review?: string;
  author?: string;
  role?: string;
  highlights?: readonly string[];
};

const featuredTextOnlyCaseStudies: FeaturedTextOnlyCaseStudy[] = [
  {
    id: 0,
    clientName: "Independence Pet Group",
    industry: "Employee Benefits and Technology Leadership",
    scope: "Scale",
    stack: "AWS / Java / React · Azure / C#",
    subtitle:
      "End-to-end technology leadership for IPG's employee benefits line of business, owning roadmap, architecture, delivery, and day-to-day operations across a team of 30 developers, stakeholders in Ops, Sales, Finance, and Leadership, and two major cloud stacks.",
    paragraph1:
      "At Independence Pet Group, we lead technology for the employee benefits line of business by directly supporting everything from staffing and managing engineering teams, to designing new systems, to packaging it all for stakeholders. We own the product roadmap in partnership with business leaders, set architectural direction across stacks, and run delivery for a team of 30 developers. Stakeholders span operations, sales, finance, and executive leadership, requiring continual translation between commercial priorities and technical execution so the roadmap delivers what the business actually needs.",
    paragraph2:
      "On the delivery side, the scope is deliberately full-spectrum: new development and integrations with external partners and internal software teams, plus the unglamorous work that keeps a line of business alive, including handling support requests, responding to incidents, bringing the site back up when it crashes, and owning the deployment pipelines that ship it all. This runs across two core stacks: AWS with Java and Azure with C#. We provide both technical consulting, and have deployed a lead developer from our team onto one of the projects to keep leadership decisions close to the code.",
    highlights: [
      "Managing multiple development teams",
      "Roadmap, architecture & delivery",
      "Interface with Ops, Sales, Finance, and ELT",
      "New dev, integrations, support & incidents"
    ],
  },
];

const featuredCaseStudies: FeaturedCaseStudy[] = [
  {
    id: 1,
    clientName: "BeAssured",
    industry: "SEO & Google Business Optimization",
    scope: "Scale",
    stack: "React / Node.js / GCP / Firebase",
    subtitle:
      "A review and discovery product that evolves into a business-focused visibility platform across Google Maps and Search, with ongoing development, design, and DevOps support.",
    paragraph1:
      "BeAssured starts as a general-purpose review site, covering everything from local diners to the next presidential candidate. As the product grows up, the thesis narrows: help businesses earn measurable visibility on Google Maps and Search, rather than run another open opinions site. We partner with BeAssured to evolve the platform around that sharper positioning while keeping the system stable enough to run in production.",
    paragraph2:
      "We provide full services across the full SDLC by building out their UI, developing core AI and Google My Business servicea, and running their CI/CD pipelines on GCP and Firebase. The result is a consolidated SEO and GMB optimization platform the team can iterate on week over week, with reliable deploys, tighter feedback loops, and a UX that reflects BeAssured’s business-centric focus.",
    review:
      "It feels like a true partnership. They help us evolve the product thoughtfully and keep things solid as we scale.",
    author: "Tom Davenport",
    role: "Owner",
    primaryImage: "/screenshots/beassured-1.jpeg",
    secondaryImage: "/screenshots/beassured-2.jpeg",
  },
  {
    id: 2,
    clientName: "RentScape",
    industry: "End-to-End Rental Management",
    scope: "Build",
    stack: "React / Node.js / Vercel / Supabase",
    subtitle:
      "End-to-end rental management: listing syndication, applicant qualification, credit and background reports, automated showings, Uber-style realtor dispatch, e-sign agreements, tenant management, and LLM-powered property search.",
    paragraph1:
      "RentScape set out to unify the messy parts of residential rentals into one operator-friendly system. For most landlords and small operators, the flow meant juggling five or six tools across listing syndication, applicant qualification, credit and background reports, showings, and ongoing tenant communication. The goal was a production-ready platform that could cover the full lifecycle from discovery to post move in without making operators context switch constantly.",
    paragraph2:
      "We designed and built the end-to-end workflow: automated showing scheduling, an Uber-style realtor dispatch for live tours, generated e-sign agreements, and ongoing tenant management once a lease was active. Search was powered by an LLM-based property finder that turned plain-language renter requirements into real results. The platform reduced manual handoffs, shortened the time from interest to signed lease, and gave operators one durable surface for leasing and tenancy.",
    review:
      "Removed the usual friction between development and production. We were able to maintain high velocity and rock-solid stability.",
    author: "Gaston Jacinto",
    role: "Lead Engineer",
    primaryImage: "/screenshots/rentscape-1.jpeg",
    secondaryImage: "/screenshots/rentscape-2.jpeg",
  },
  {
    id: 4,
    clientName: "PursuitAI",
    industry: "Gym-Connected Fitness & Nutrition App",
    scope: "Build",
    stack: "React Native / Expo / Node.js",
    subtitle:
      "A mobile app distributed through client gyms: members get personalized training and nutrition plans bundled into their gym subscription, and gyms get stronger retention and better progress data.",
    paragraph1:
      "PursuitAI came to us with a membership-linked model: a mobile app offered to members of client gyms as part of what they already pay for. Instead of competing with gyms, the app acts as an added incentive. Members get personalized training and nutrition plans for free, and gyms get a differentiator that helps win and retain new members. The goal was a production-ready mobile experience that felt consistent with gym branding and ran reliably on member phones.",
    paragraph2:
      "We designed and built the app on React Native and Expo, with structured training and nutrition programs that gyms could upload and members could track progress against even when not with their coach, complete with recipe finders and automated grocery lists. Gyms get a clearer window into how engaged their members actually are, which feeds back into retention conversations and member growth. The result is a benefit gyms can layer on top of an existing subscription, without having to run a second product themselves.",

    review:
      "I knew what I wanted for gyms and members, but didn't know how to build it. You helped me turn the vision into something I could take to market.",
    author: "Sash Alagh",
    role: "CEO",
    primaryImage: "/screenshots/pursuit-1.jpeg",
    secondaryImage: "/screenshots/pursuit-2.jpeg",
  },
  {
    id: 5,
    clientName: "NextMarket",
    industry: "Vendors & Markets Marketplace",
    scope: "Build",
    stack: "React / Node.js / Vercel / Supabase",
    subtitle:
      "A two-sided marketplace for vendors looking for markets to host stalls at and markets looking for vendors, with booking and transactions handled end-to-end.",
    paragraph1:
      "NextMarket is a two-sided marketplace: vendors find markets to host stalls at, markets find vendors to fill them, and bookings and transactions are handled between the two. Before NextMarket, coordination happened over email and spreadsheets, which was hard to scale as calendars, stall inventory, and payments piled up. The team engaged us for MVP development services to move fast alongside their existing crew.",
    paragraph2:
      "We injected developers and designers into NextMarket’s existing team and helped ship the MVP on a tight timeline. Scope included vendor and market profiles, stall listings and booking flows, and a payments layer that handled transactions between both sides. The result is a workable first version of the marketplace that can run live markets today, with clean seams for iterating on pricing, availability, and matching.",
    review:
      "Impressed by the speedy delivery and online support. Couldn't have done it without you guys.",
    author: "Murtaza Saifuddin",
    role: "Engineering Lead",
    primaryImage: "/screenshots/nextmarket-1.jpeg",
    secondaryImage: "/screenshots/nextmarket-2.jpeg",
  },
];

const textCaseStudies: TextCaseStudy[] = [
  {
    id: 3,
    clientName: "Bender",
    industry: "WhatsApp Influencer Assistant",
    scope: "Build",
    stack: "Python / GCP",
    subtitle:
      "A WhatsApp-integrated bot that handled conversations for influencers and, based on what fans asked, surfaced the right payment and service integrations.",
    paragraph1:
      "Bender was a WhatsApp bot for influencers: it handled common fan questions and surfaced the right links, payments, and bookings, so creators stayed responsive without living in DMs. We built it to run reliably on WhatsApp at real creator volume.",
    paragraph2:
      "We built Bender in Python on GCP with low-latency routing and integrations to payments and partner services. The planned next step was a web layer that onboarded new influencers through configuration instead of one-off builds.",
    review:
      "Collaboration felt thoughtful from the start. Helped us turn big ideas into a product. Working with you was a joy.",
    author: "Ivo Sofiganov",
    role: "Owner",
  },
  {
    id: 6,
    clientName: "Curabit",
    industry: "Customer Chat & Conversation Analytics",
    scope: "Build",
    stack: "Dialogflow / BERT / GCP / Firebase",
    subtitle:
      "A customizable chatbot for general web and Shopify, with Dialogflow-powered conversations and BERT-vectorized inputs feeding an analytics layer for frequent topics and sentiment. Built in 2020, pre-chatbase and before the LLM boom.",
    paragraph1:
      "Curabit shipped in 2020, before chatbase and the modern LLM wave. It was a customizable web and Shopify chatbot for teams that wanted stronger support chat without an ML hire—non-engineers updated intents in Excel and the bot followed.",
    paragraph2:
      "Dialogflow ran conversations; BERT-vectorized inputs powered topic and sentiment analytics beyond raw ticket counts. We hosted it on GCP and Firebase with a tight loop between support and the bot’s configuration.",
    review:
      "With your help we grew the team, and found possibilities with our product we couldn't have imagined before.",
    author: "Sana Mungroo",
    role: "CEO",
  },
  {
    id: 7,
    clientName: "SoCo Market",
    industry: "Creator Marketplace & Secure Transactions",
    scope: "Build",
    stack: "React / Solidity / Node.js",
    subtitle:
      "Part of Social Contracts, a Spark & Co initiative helping freelancers and founders build their businesses. SoCo Market focuses on a creator marketplace and secure transactions backed by Solidity smart contracts.",
    paragraph1:
      "SoCo Market sits inside Social Contracts (Spark & Co): a creator marketplace for listing and selling services, with customer–creator transactions that feel safe by default. It leans on trust mechanics that de-risk buyers and sellers, not crypto novelty for its own sake.",
    paragraph2:
      "We designed and built the marketplace and Solidity contracts that moved funds between parties. Buyers and sellers saw a normal services-style flow, with clearer payouts and disputes backed by on-chain rules than a purely off-chain setup.",
    review:
      "Just works — super smooth and solid. Love the vibe.",
    author: "Thai Doan",
    role: "Project Lead, SoCo Market",
  },
];

function SectionRule() {
  return (
    <p
      className="my-8 text-center text-body text-foreground/35 tracking-[0.2em]"
      aria-hidden
    >
      ⸻
    </p>
  );
}

function CaseStudyMeta({
  clientName,
  industry,
  scope,
  stack,
  dense,
}: Readonly<{
  clientName: string;
  industry: string;
  scope: EngagementScope;
  stack: string;
  dense?: boolean;
}>) {
  const labelClass = dense
    ? "text-smalltext text-primary font-semibold uppercase tracking-wide"
    : "text-smalltext md:text-body text-primary font-semibold uppercase tracking-wide";
  const valueClass = dense
    ? "text-smalltext text-foreground/90"
    : "text-body text-foreground/90";

  return (
    <div className="space-y-6">
      <div>
        <h2
          className={
            dense
              ? "font-title text-heading2 font-bold leading-tight text-foreground"
              : "font-title text-heading2 font-bold leading-tight text-foreground md:text-largeBody"
          }
        >
          {clientName}
        </h2>
        <p
          className={
            dense
              ? "mt-1 text-smalltext leading-snug text-foreground/75"
              : "mt-2 text-body leading-snug text-foreground/75"
          }
        >
          {industry}
        </p>
      </div>

      <dl className="space-y-3">
        <div>
          <dt className={labelClass}>Scope</dt>
          <dd className={`${valueClass} mt-1`}>{scope}</dd>
        </div>
        <div>
          <dt className={labelClass}>Stack</dt>
          <dd className={`${valueClass} mt-1`}>{stack}</dd>
        </div>
      </dl>
    </div>
  );
}

function Testimonial({
  review,
  author,
  role,
  compact,
}: Readonly<{
  review: string;
  author: string;
  role: string;
  compact?: boolean;
}>) {
  return (
    <figure
      className={
        compact
          ? "mt-8 border-l-4 border-primary pl-5"
          : "mt-10 border-l-4 border-primary pl-6"
      }
    >
      <blockquote
        className={
          compact
            ? "text-smalltext italic text-foreground/80 leading-relaxed"
            : "text-body italic text-foreground/85 leading-relaxed"
        }
      >
        &ldquo;{review}&rdquo;
      </blockquote>
      <figcaption
        className={`mt-3 text-smalltext font-semibold text-foreground ${compact ? "" : "md:text-body"}`}
      >
        {author},{" "}
        <span className="text-primary font-semibold">{role}</span>
      </figcaption>
    </figure>
  );
}

function DualImageCollage({
  primaryImage,
  secondaryImage,
  title,
}: Readonly<{
  primaryImage: string;
  secondaryImage: string;
  title: string;
}>) {
  return (
    <>
      {/* Mobile: primary 4/5 width (flush right), 16:9 frame; parent height follows primary */}
      <div className="relative mt-10 w-full lg:hidden">
        <div className="relative ml-auto w-4/5 aspect-[16/9] overflow-hidden shadow-xl">
          <img
            src={primaryImage}
            alt={`${title} product showcase`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-0 left-0 z-10 h-3/5 w-auto aspect-[16/9] overflow-hidden shadow-lg">
          <img
            src={secondaryImage}
            alt={`${title} secondary showcase`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Desktop: offset collage matching CaseStudyCard proportions */}
      <div className="relative hidden min-h-[360px] w-full lg:block mt-10">
        <div className="absolute right-0 bottom-0 h-full w-auto aspect-[16/9] overflow-hidden shadow-xl">
          <img
            src={primaryImage}
            alt={`${title} product showcase`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-0 right-[calc(100%-300px*16/9)] h-3/5 w-auto aspect-[16/9] overflow-hidden shadow-xl">
          <img
            src={secondaryImage}
            alt={`${title} secondary showcase`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

function FeaturedSection({ study }: Readonly<{ study: FeaturedCaseStudy }>) {
  return (
    <section className="border-b border-foreground/10 py-16 lg:py-24 first:border-t first:border-foreground/10 last:border-b-0">
      <div >
        <CaseStudyMeta
          clientName={study.clientName}
          industry={study.industry}
          scope={study.scope}
          stack={study.stack}
        />

        <p className="mt-6 text-body md:text-heading2 leading-relaxed text-foreground/95">
          {study.subtitle}
        </p>

        <SectionRule />

        <p className="text-body leading-relaxed text-foreground/90">
          {study.paragraph1}
        </p>

        <SectionRule />

        <p className="text-body leading-relaxed text-foreground/90">
          {study.paragraph2}
        </p>

        <Testimonial review={study.review} author={study.author} role={study.role} />

        <DualImageCollage
          primaryImage={study.primaryImage}
          secondaryImage={study.secondaryImage}
          title={study.clientName}
        />
      </div>
    </section>
  );
}

function FeaturedTextOnlySection({
  study,
}: Readonly<{ study: FeaturedTextOnlyCaseStudy }>) {
  return (
    <section className="border-b border-foreground/10 py-16 lg:py-24 first:border-t first:border-foreground/10 last:border-b-0">
      <div>
        <CaseStudyMeta
          clientName={study.clientName}
          industry={study.industry}
          scope={study.scope}
          stack={study.stack}
        />

        <p className="mt-6 text-body md:text-heading2 leading-relaxed text-foreground/95">
          {study.subtitle}
        </p>

        <SectionRule />

        <p className="text-body leading-relaxed text-foreground/90">
          {study.paragraph1}
        </p>

        <SectionRule />

        <p className="text-body leading-relaxed text-foreground/90">
          {study.paragraph2}
        </p>

        {study.highlights && study.highlights.length > 0 && (
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {study.highlights.map((item) => (
              <li
                key={item}
                className="border-l-2 border-primary pl-4 text-smalltext font-semibold uppercase tracking-wide text-foreground/85 md:text-body"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {study.review && study.author && study.role && (
          <Testimonial
            review={study.review}
            author={study.author}
            role={study.role}
          />
        )}
      </div>
    </section>
  );
}

function TextOnlyCard({ study }: Readonly<{ study: TextCaseStudy }>) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-foreground/12 bg-foreground/[0.04] p-6 shadow-sm lg:p-8">
      <CaseStudyMeta
        clientName={study.clientName}
        industry={study.industry}
        scope={study.scope}
        stack={study.stack}
        dense
      />

      <p className="mt-6 text-smalltext leading-relaxed text-foreground/90 sm:text-body">
        {study.subtitle}
      </p>

      <SectionRule />

      <p className="text-smalltext leading-relaxed text-foreground/85 sm:text-body">
        {study.paragraph1} {study.paragraph2}
      </p>

      <Testimonial
        review={study.review}
        author={study.author}
        role={study.role}
        compact
      />
    </article>
  );
}

const CaseStudiesPage: React.FC = () => {
  const cellSize = useResponsiveCellSize();

  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header headerMode="index" />

        <main className="mt-10 pb-24 pt-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-12">
            <header className="mb-10 lg:mb-20">
              <h1 className="mb-6 text-heading1 font-bold leading-tight text-foreground md:text-[56px]">
                Case studies
              </h1>
              <p className="max-w-3xl text-largeBody leading-relaxed text-foreground md:text-heading2">
                We partner with teams to ship software that holds up in
                production, not just on a roadmap. Here&rsquo;s a deeper look at
                what we built together, scope, stack, and the outcomes that
                mattered.
              </p>
            </header>

            <div>
              {featuredTextOnlyCaseStudies.map((study) => (
                <FeaturedTextOnlySection key={study.id} study={study} />
              ))}
              {featuredCaseStudies.map((study) => (
                <FeaturedSection key={study.id} study={study} />
              ))}
            </div>



            <div className="flex flex-col gap-10 lg:gap-12">
              {textCaseStudies.map((study) => (
                <TextOnlyCard key={study.id} study={study} />
              ))}
            </div>

          </div>
        </main>

        <SquaresGridLayout
          squares={
            FooterLeftRightSquares as NonNullable<
              ComponentProps<typeof SquaresGridLayout>["squares"]
            >
          }
          background="#111111"
          width="100%"
          cellSize={cellSize}
          className="h-[350px] md:h-[350px] lg:h-auto"
          indexLayout={0}
          indexComponent={1}
        >
          <FooterSqareSection />
        </SquaresGridLayout>

        <Footer mode="index" />
      </div>
    </AppProvider>
  );
};

export default CaseStudiesPage;
