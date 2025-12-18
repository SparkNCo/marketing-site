import { DollarSign } from "lucide-react";
import { Card } from "../ui/card";

export default function PricingStructure() {
  return (
    <section className="mb-16 w-[80vw]">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">
          Pricing & Payment Structure
        </h2>
      </div>
      <Card className="p-8 bg-card border-border">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              Total Investment
            </h3>
            <p className="text-5xl font-bold text-foreground mb-2">$185,000</p>
            <p className="text-muted-foreground text-sm">
              Fixed-price, milestone-based
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground">
                  Development (640 hours @ $250/hr)
                </span>
                <span className="font-semibold text-foreground">$160,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground">
                  Design (80 hours @ $200/hr)
                </span>
                <span className="font-semibold text-foreground">$16,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground">Project Management</span>
                <span className="font-semibold text-foreground">$9,000</span>
              </div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between">
                <span className="text-foreground font-semibold">Total</span>
                <span className="font-bold text-primary">$185,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Payment Milestones
          </h3>
          <div className="space-y-3">
            {[
              {
                milestone: "Contract Signing",
                percentage: "30%",
                amount: "$55,500",
                trigger: "Upon agreement execution",
              },
              {
                milestone: "Design Approval",
                percentage: "20%",
                amount: "$37,000",
                trigger: "Week 3 - design sign-off",
              },
              {
                milestone: "Development Phase 1 Complete",
                percentage: "20%",
                amount: "$37,000",
                trigger: "Week 7 - core features deployed to staging",
              },
              {
                milestone: "QA & UAT Complete",
                percentage: "20%",
                amount: "$37,000",
                trigger: "Week 15 - UAT sign-off",
              },
              {
                milestone: "Production Launch",
                percentage: "10%",
                amount: "$18,500",
                trigger: "Week 16 - live deployment",
              },
            ].map((payment, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-background rounded-md border border-border"
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {payment.milestone}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {payment.trigger}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    {payment.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.percentage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-background rounded-md border border-border">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Assumptions & What Changes Cost
          </h3>
          <div className="space-y-2 text-sm text-foreground">
            <p>
              <span className="text-secondary font-semibold">Included:</span> Up
              to 3 rounds of design revisions, standard features as scoped,
              90-day support
            </p>
            <p>
              <span className="text-secondary font-semibold">
                Additional Costs:
              </span>{" "}
              Features beyond agreed scope ($250/hr), legacy data migration
              ($15,000), extended support after 90 days ($3,500/month)
            </p>
            <p>
              <span className="text-secondary font-semibold">
                Timeline Changes:
              </span>{" "}
              Client delays beyond 5 business days may result in schedule
              adjustment and potential additional PM costs
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
