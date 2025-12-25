import { Scale } from "lucide-react";
import { Card } from "../ui/card";

interface LegalSection {
  title: string;
  paragraphs: string[];
}

export default function LegalTerms() {
  const legalSections: LegalSection[] = [
    {
      title: "Confidentiality",
      paragraphs: [
        "Both parties agree to maintain confidentiality of proprietary information. All project details, business data, and technical specifications are covered under mutual NDA. Team members sign individual confidentiality agreements.",
      ],
    },
    {
      title: "Intellectual Property Ownership",
      paragraphs: [
        "Upon final payment, all custom code, design assets, and documentation created specifically for this project become the exclusive property of Acme Corp.",
        "Pre-existing frameworks, libraries, and our proprietary development tools remain our property but you receive perpetual license for use with this application.",
      ],
    },
    {
      title: "Warranty & Support",
      paragraphs: [
        "We warrant that the delivered software will perform substantially in accordance with agreed specifications for 90 days post-launch. During this period, we will fix bugs and defects at no additional cost.",
        "90-Day Support Includes: Bug fixes, performance optimization, minor adjustments, security patches, and email/Slack support (response within 24 hours for critical issues, 48 hours for non-critical).",
      ],
    },
    {
      title: "Post-Launch Billing",
      paragraphs: [
        "After 90-day warranty period, ongoing support available at $3,500/month (includes up to 15 hours of maintenance/enhancements) or time & materials at $250/hour.",
        "Hosting and infrastructure costs (AWS) are billed separately at cost + 10% management fee.",
      ],
    },
    {
      title: "Cancellation & Termination",
      paragraphs: [
        "Either party may terminate with 30 days written notice. Client pays for all work completed to date plus non-refundable costs incurred.",
        "If termination occurs after Week 8, minimum 60% of total contract value is due. All deliverables completed through the termination date will be provided to client.",
      ],
    },
    {
      title: "Limitations of Liability",
      paragraphs: [
        "TechForge Solutions' liability is limited to the total contract value ($185,000).",
        "We are not liable for indirect, consequential, or punitive damages. Client responsible for data backup and business continuity planning.",
        "Service level targets are estimates, not guarantees. Force majeure events excuse performance delays.",
      ],
    },
  ];

  return (
    <section className="mb-16 w-[80vw]">
      <div className="mb-6 flex items-center gap-3">
        <Scale className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">Legal & Terms</h2>
      </div>

      <Card className="border-border bg-card p-8">
        <div className="space-y-8">
          {legalSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-lg font-semibold text-primary">
                {section.title}
              </h3>

              {section.paragraphs.map((text, index) => (
                <p
                  key={index + 1}
                  className="mb-2 text-sm leading-relaxed text-foreground"
                >
                  {text}
                </p>
              ))}
            </div>
          ))}

          <div className="border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">
              This proposal is valid for 30 days from the date issued. Terms
              subject to formal contract agreement. Governing law: State of
              California. Disputes resolved through binding arbitration in San
              Francisco, CA.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
