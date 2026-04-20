"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Who owns the IP of the work created?",
    answer:
      "You own 100% of the intellectual property. Upon payment, all code, infrastructure, and deliverables are fully transferred to you. There is no lock-in.",
  },
  {
    id: 2,
    question: "Where are your developers located?",
    answer:
      "We are a Canadian-based agency working with a vetted global team. We ensure strong timezone overlap, clear communication, and consistent delivery standards across all contributors.",
  },
  {
    id: 3,
    question: "What security policies do you follow?",
    answer:
      "We follow industry-standard practices including access control, least-privilege permissions, secure credential management, and monitored environments. Our processes align with SOC 2–style controls, even where formal certification is not required.",
  },
  {
    id: 4,
    question: "What commitments and risk mitigations are in place?",
    answer:
      "We define clear scope and deliverables upfront, provide continuous visibility into progress, and structure work in a way that allows early feedback and course correction. Risk is reduced through transparency and systematized delivery.",
  },
  {
    id: 5,
    question: "What happens if something goes wrong?",
    answer:
      "We build systems with monitoring, alerting, and rollback capabilities. Issues are detected quickly, contained, and resolved with minimal disruption.",
  },
  {
    id: 6,
    question: "What does working with you look like?",
    answer:
      "We start by defining the problem and solution, build and validate the product, launch with production-ready systems, and continue supporting with monitoring and iteration. You stay informed without needing to manage day-to-day development.",
  },
  {
    id: 7,
    question: "What do I actually receive at the end?",
    answer:
      "You receive more than code: a deployed product, CI/CD pipeline, test coverage, monitoring and alerts, reporting visibility, and a clean, maintainable codebase.",
  },
  {
    id: 8,
    question: "Do you work with existing systems or only new products?",
    answer:
      "Both. We work with early-stage ideas, post-MVP products, and production systems. We can build from scratch or improve and scale what you already have.",
  },
  {
    id: 9,
    question: "Can you work alongside my internal team?",
    answer:
      "Yes. We can integrate with your existing team, support them, or take ownership of specific areas. Our systems are designed to work collaboratively.",
  },
  {
    id: 10,
    question: "How are you different from AI tools like Cursor or ChatGPT?",
    answer:
      "AI tools generate code. We build the system around that code, including validation, deployment, monitoring, and reporting, so it can operate reliably in production.",
  },
  {
    id: 11,
    question: "Do you use AI in your development process?",
    answer:
      "Yes, extensively. We use AI to accelerate development, but always within structured workflows that ensure quality, consistency, and maintainability.",
  },
  {
    id: 12,
    question: "How do you ensure quality when using AI?",
    answer:
      "We apply quality gates such as testing, code standards, validation pipelines, and production monitoring. AI output is never shipped without verification.",
  },
  {
    id: 13,
    question: "How do you price your services?",
    answer:
      "We typically work on a per-developer basis, allowing you to scale the team up or down as needed. This keeps pricing flexible and aligned with your goals.",
  },
  {
    id: 14,
    question: "How fast can you build?",
    answer:
      "We move quickly, but prioritize building systems that don't break after launch. Speed is valuable only when paired with stability and structure.",
  },
  {
    id: 15,
    question: "What happens after launch?",
    answer:
      "We continue with monitoring, iteration, and performance visibility. Launch is not the end. It is the start of a system that needs to evolve.",
  },
  {
    id: 16,
    question: 'Why isn\'t a deployed app "done"?',
    answer:
      "Because without monitoring, feedback loops, and structured iteration, issues go unnoticed and progress stalls. A deployed app is just the starting point.",
  },
  {
    id: 17,
    question: 'What does "production-ready" actually mean?',
    answer:
      "Production-ready means tested, deployable, observable, and maintainable, not just functional. It is software that can run, adapt, and scale reliably.",
  },
];

function FAQSection() {
  return (
    <section className="w-full bg-background py-20 ">
      <div className="max-w-[850px] mx-auto px-4 md:px-8 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-largeBody md:text-heading1 text-foreground mb-4 text-center font-title">
            Frequently Asked Questions
          </h2>
          <p className="text-body text-foreground mb-12 text-center leading-relaxed max-w-[650px] mx-auto">
            Everything you need to know about working with us, from ownership
            and security to delivery and pricing.
          </p>
        </motion.div>

        <Accordion.Root
          type="single"
          collapsible
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Accordion.Item
                value={`item-${faq.id}`}
                className="group border border-foreground/20 bg-background text-foreground overflow-hidden transition-colors duration-300 hover:bg-secondary hover:text-background data-[state=open]:bg-secondary data-[state=open]:text-background"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between px-6 py-5 text-left">
                    <span className="text-body md:text-heading2 pr-4 text-inherit [font-family:var(--font-title)]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-inherit transition-transform duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-6 pb-5 pt-1">
                    <p className="text-body leading-relaxed text-inherit [font-family:var(--font-body)]">
                      {faq.answer}
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}

export default FAQSection;
