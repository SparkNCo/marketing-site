import { DollarSign } from "lucide-react";
import { Card } from "../ui/card";

interface CostBreakdownItem {
  label: string;
  amount: string;
}

interface PaymentMilestone {
  milestone: string;
  percentage: string;
  amount: string;
  trigger: string;
}

export default function PricingStructure() {
  const totalInvestment = {
    amount: "$185,000",
    note: "Fixed-price, milestone-based",
  };

  const costBreakdown: CostBreakdownItem[] = [
    {
      label: "Development (640 hours @ $250/hr)",
      amount: "$160,000",
    },
    {
      label: "Design (80 hours @ $200/hr)",
      amount: "$16,000",
    },
    {
      label: "Project Management",
      amount: "$9,000",
    },
  ];

  const paymentMilestones: PaymentMilestone[] = [
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
  ];

  const assumptions = [
    {
      title: "Included",
      description:
        "Up to 3 rounds of design revisions, standard features as scoped, 90-day support",
    },
    {
      title: "Additional Costs",
      description:
        "Features beyond agreed scope ($250/hr), legacy data migration ($15,000), extended support after 90 days ($3,500/month)",
    },
    {
      title: "Timeline Changes",
      description:
        "Client delays beyond 5 business days may result in schedule adjustment and potential additional PM costs",
    },
  ];

  const midpoint = Math.ceil(paymentMilestones.length / 2);

  const firstColumn = paymentMilestones.slice(0, midpoint);
  const secondColumn = paymentMilestones.slice(midpoint);

  return (
    <section className="mb-16 w-[80vw]">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <DollarSign className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">
          Pricing & Payment Structure
        </h2>
      </div>

      <Card className="border-border bg-card p-8">
        {/* Total + Breakdown */}
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-primary">
              Total Investment
            </h3>
            <p className="mb-2 text-5xl font-bold text-foreground">
              {totalInvestment.amount}
            </p>
            <p className="text-sm text-muted-foreground">
              {totalInvestment.note}
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-2 text-sm">
              {costBreakdown.map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-foreground">{item.label}</span>
                  <span className="font-semibold text-foreground">
                    {item.amount}
                  </span>
                </div>
              ))}

              <div className="mt-2 flex justify-between border-t border-border pt-2">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-primary">
                  {totalInvestment.amount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Milestones */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Payment Milestones
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Column 1 */}
            <div className="space-y-4">
              {firstColumn.map((payment) => (
                <div
                  key={payment.milestone}
                  className="rounded-md border border-border bg-background p-4"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-semibold text-foreground">
                      {payment.milestone}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {payment.amount}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{payment.trigger}</span>
                    <span>{payment.percentage}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              {secondColumn.map((payment) => (
                <div
                  key={payment.milestone}
                  className="rounded-md border border-border bg-background p-4"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-semibold text-foreground">
                      {payment.milestone}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {payment.amount}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{payment.trigger}</span>
                    <span>{payment.percentage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assumptions */}
        <div className="rounded-md border border-border bg-background p-6">
          <h3 className="mb-3 text-lg font-semibold text-primary">
            Assumptions & What Changes Cost
          </h3>

          <div className="space-y-2 text-sm text-foreground">
            {assumptions.map((item) => (
              <p key={item.title}>
                <span className="font-semibold text-secondary">
                  {item.title}:
                </span>{" "}
                {item.description}
              </p>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
