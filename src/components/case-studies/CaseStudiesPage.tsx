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
    industry: "Employee Benefits — Technology Leadership",
    scope: "Scale",
    stack: "AWS / Java / React · Azure / C#",
    subtitle:
      "End-to-end technology leadership for IPG's employee benefits line of business—owning roadmap, architecture, delivery, and day-to-day operations across a team of 30 developers, stakeholders in Ops, Sales, Finance, and Leadership, and two major cloud stacks.",
    paragraph1:
      "At Independence Pet Group, we lead technology for the employee benefits line of business—effectively wearing the hats of engineering manager, architect, director of technology, product owner, and project manager under one engagement. That means owning the product roadmap alongside business leaders, setting the architectural direction across stacks, running delivery for a team of 30 developers, and staying close to individual contributors through coaching, code review, and team training. Stakeholders span operations, sales, finance, and leadership, and a core part of the job is translating between commercial priorities and technical execution so the roadmap reflects what the business actually needs.",
    paragraph2:
      "On the delivery side, the scope is deliberately full-spectrum: new development and integrations with external partners and internal software teams, but also the unglamorous work that keeps a line of business alive—handling support requests, responding to incidents and bringing the site back up when it crashes, and owning the DevOps pipelines that ship it all. This runs across two core stacks: AWS with Java and Azure with C#. It's a scale engagement, with a lead developer from our team deployed onto one of the projects to keep leadership decisions close to the code.",
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
      "A review and discovery product that evolved into a business-focused visibility platform across Google Maps and Search, with ongoing development, design, and DevOps support.",
    paragraph1:
      "BeAssured started as a general-purpose review site, covering everything from local diners to the next presidential candidate. As the product grew up, the thesis narrowed: help businesses earn measurable visibility on Google Maps and Search, rather than run another open opinions site. We partnered with BeAssured to evolve the platform around that sharper positioning while keeping the system stable enough to run in production.",
    paragraph2:
      "We provide development, design, and DevOps services—building out the UI system, implementing core services, and running the CI/CD pipelines on GCP and Firebase. The result is a consolidated SEO and GMB optimization platform the team can iterate on week over week, with reliable deploys, tighter feedback loops, and a UX that reflects BeAssured’s business-centric focus.",
    review:
      "Couldn't be happier—the team turned our SEO and GMB goals into a product we trust and enjoy shipping.",
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
      "RentScape set out to unify the messy parts of residential rentals into one operator-friendly system. For most landlords and small operators, the flow meant juggling five or six tools across listing syndication, applicant qualification, credit and background reports, showings, and ongoing tenant communication. The goal was a production-ready platform that could cover the full lifecycle—from discovery to post-move-in—without making operators context-switch constantly.",
    paragraph2:
      "We designed and built the end-to-end workflow: automated showing scheduling, an Uber-style realtor dispatch for live tours, generated e-sign agreements, and ongoing tenant management once a lease is active. Search is powered by an LLM-based property finder that turns plain-language renter requirements into real results. The platform reduces manual handoffs, shortens the time from interest to signed lease, and gives operators one durable surface for leasing and tenancy.",
    review:
      "Your crew made building our rental agent feel effortless; we're grateful for the speed, care, and partnership.",
    author: "Nicolaus Wong",
    role: "CEO",
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
      "PursuitAI came to us with a membership-linked model: a mobile app offered to members of client gyms as part of what they already pay for. Instead of competing with gyms, the app acts as an added incentive—members get personalized training and nutrition plans for free, and gyms get a differentiator that helps win and retain new members. The goal was a production-ready mobile experience that felt consistent with gym branding and ran reliably on member phones.",
    paragraph2:
      "We designed and built the app on React Native and Expo, with structured training and nutrition programs, a messaging-style coaching flow, and instrumentation for retention and progress. Gyms get a clearer window into how engaged their members actually are, which feeds back into retention conversations and member growth. The result is a benefit gyms can layer on top of an existing subscription, without having to run a second product themselves.",
    review:
      "Delighted you steered our fitness app from fuzzy idea to launch; the collaboration felt supportive every week.",
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
      "NextMarket is a two-sided marketplace: vendors find markets to host stalls at, markets find vendors to fill them, and bookings and transactions are handled between the two. Before NextMarket, coordination happened over email and spreadsheets—hard to scale as calendars, stall inventory, and payments piled up. The team engaged us for MVP development services to move fast alongside their existing crew.",
    paragraph2:
      "We injected developers and designers into NextMarket’s existing team and helped ship the MVP on a tight timeline. Scope included vendor and market profiles, stall listings and booking flows, and a payments layer that handles transactions between both sides. The result is a workable first version of the marketplace that can run live markets today, with clean seams for iterating on pricing, availability, and matching.",
    review:
      "Incredibly thankful for how you walked us through marketplace complexity and helped us ship with confidence.",
    author: "Alkyhan Sehra",
    role: "CEO",
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
      "A WhatsApp-integrated bot that handles conversations for influencers and, based on what fans ask, surfaces the right payment and service integrations.",
    paragraph1:
      "Bender is a WhatsApp-integrated conversational bot built for influencers. Based on the incoming chat, the bot handles common questions and drops in the right links—payment flows, booking options, and third-party service integrations—so influencers stay responsive without living in DMs. The goal was a production system that could run reliably on WhatsApp at the volume a large creator actually sees.",
    paragraph2:
      "We designed and built Bender in Python on GCP, focused on reliable message handling, low-latency routing, and integrations with payment and service providers. The next step is a web platform that can deploy instances quickly to new influencers at scale, turning onboarding into configuration rather than a custom build. The result is an experience fans can genuinely converse with, while still converting into payments, bookings, and services behind the scenes.",
    review:
      "Working with you was a joy—you helped us ship a social chat product that finally matches our brand and pace.",
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
      "Curabit was built in 2020, well before chatbase and the modern LLM boom. The product is a customizable chatbot with drop-in integrations for general websites and Shopify stores, aimed at support and storefront teams that needed better chat without investing in a full ML team. Training and intent updates were deliberately simple: teams edited an Excel file, and the bot’s conversations updated accordingly—so non-engineers could own the content side of the product.",
    paragraph2:
      "Under the hood, conversations ran through Dialogflow, while BERT vectorized chat inputs to power an analytics layer that clustered messages into frequent topics and scored their sentiment. Teams got a view of what customers were actually talking about and how they felt about it, not just ticket volume. We built the platform on GCP and Firebase, with a pragmatic feedback loop between the support team and the underlying bot configuration.",
    review:
      "Happy isn't strong enough—you helped us unify reviews and chatbot flows so support finally feels human.",
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
      "SoCo Market is part of Social Contracts, a Spark & Co initiative focused on helping freelancers and founders build their businesses. Within that, SoCo Market’s job is specific: give creators a marketplace to list and sell services, and make transactions between customers and creators feel safe by default. The target experience avoids crypto novelty for its own sake and leans on the parts that actually de-risk the relationship between buyer and seller.",
    paragraph2:
      "We designed and built the creator marketplace alongside Solidity smart contracts that govern how funds move between parties. The resulting customer flow feels like a normal services marketplace, with on-chain guarantees doing the heavy lifting underneath—making payouts and disputes more predictable than a pure off-chain model. Thai Doan leads SoCo Market as project lead within Social Contracts.",
    review:
      "Thrilled with how you shaped our marketplace and on-chain transactions; customers feel the polish and we do too.",
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
                what we built together—scope, stack, and the outcomes that
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
