import { Scale } from "lucide-react";
import { Card } from "../ui/card";

export default function LegalTerms() {
  return (
    <section className="mb-16 w-[80vw]">
      <div className="flex items-center gap-3 mb-6">
        <Scale className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">Legal & Terms</h2>
      </div>
      <Card className="p-8 bg-card border-border">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Confidentiality
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              Both parties agree to maintain confidentiality of proprietary
              information. All project details, business data, and technical
              specifications are covered under mutual NDA. Team members sign
              individual confidentiality agreements.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Intellectual Property Ownership
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              Upon final payment, all custom code, design assets, and
              documentation created specifically for this project become the
              exclusive property of Acme Corp. Pre-existing frameworks,
              libraries, and our proprietary development tools remain our
              property but you receive perpetual license for use with this
              application.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Warranty & Support
            </h3>
            <p className="text-sm text-foreground leading-relaxed mb-2">
              We warrant that the delivered software will perform substantially
              in accordance with agreed specifications for 90 days post-launch.
              During this period, we will fix bugs and defects at no additional
              cost.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">90-Day Support Includes:</span>{" "}
              Bug fixes, performance optimization, minor adjustments, security
              patches, and email/Slack support (response within 24 hours for
              critical issues, 48 hours for non-critical).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Post-Launch Billing
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              After 90-day warranty period, ongoing support available at
              $3,500/month (includes up to 15 hours of maintenance/enhancements)
              or time & materials at $250/hour. Hosting and infrastructure costs
              (AWS) are billed separately at cost + 10% management fee.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Cancellation & Termination
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              Either party may terminate with 30 days written notice. Client
              pays for all work completed to date plus non-refundable costs
              incurred. If termination occurs after Week 8, minimum 60% of total
              contract value is due. All deliverables completed through the
              termination date will be provided to client.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Limitations of Liability
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              TechForge Solutions' liability is limited to the total contract
              value ($185,000). We are not liable for indirect, consequential,
              or punitive damages. Client responsible for data backup and
              business continuity planning. Service level targets are estimates,
              not guarantees. Force majeure events excuse performance delays.
            </p>
          </div>

          <div className="pt-6 border-t border-border">
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
