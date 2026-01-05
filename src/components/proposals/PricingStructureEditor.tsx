import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash2, Plus } from "lucide-react";
import type {
  CostBreakdownItem,
  PaymentMilestone,
  Assumption,
  TotalInvestment,
} from "./PricingStructure";

interface Props {
  totalInvestment: TotalInvestment;
  setTotalInvestment: React.Dispatch<React.SetStateAction<TotalInvestment>>;

  costBreakdown: CostBreakdownItem[];
  setCostBreakdown: React.Dispatch<React.SetStateAction<CostBreakdownItem[]>>;

  paymentMilestones: PaymentMilestone[];
  setPaymentMilestones: React.Dispatch<
    React.SetStateAction<PaymentMilestone[]>
  >;

  assumptions: Assumption[];
  setAssumptions: React.Dispatch<React.SetStateAction<Assumption[]>>;
}

export default function PricingStructureEditor({
  totalInvestment,
  setTotalInvestment,
  costBreakdown,
  setCostBreakdown,
  paymentMilestones,
  setPaymentMilestones,
  assumptions,
  setAssumptions,
}: Props) {
  return (
    <div className="space-y-8 bg-background ">
      {/* Total investment */}
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-bold text-primary">
          Total Investment
        </h3>

        <div className="space-y-3">
          <Input
            value={totalInvestment.amount}
            placeholder="Total amount"
            onChange={(e) =>
              setTotalInvestment((prev) => ({
                ...prev,
                amount: e.target.value,
              }))
            }
          />
          <Input
            value={totalInvestment.note}
            placeholder="Note"
            onChange={(e) =>
              setTotalInvestment((prev) => ({
                ...prev,
                note: e.target.value,
              }))
            }
          />
        </div>
      </Card>

      {/* Cost Breakdown */}
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-bold text-primary">Cost Breakdown</h3>

        <div className="space-y-2">
          {costBreakdown.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item.label}
                placeholder="Label"
                onChange={(e) =>
                  setCostBreakdown((prev) =>
                    prev.map((c, i) =>
                      i === index ? { ...c, label: e.target.value } : c
                    )
                  )
                }
              />
              <Input
                value={item.amount}
                placeholder="$0"
                className="w-32"
                onChange={(e) =>
                  setCostBreakdown((prev) =>
                    prev.map((c, i) =>
                      i === index ? { ...c, amount: e.target.value } : c
                    )
                  )
                }
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() =>
                  setCostBreakdown((prev) => prev.filter((_, i) => i !== index))
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-4 flex gap-2"
          onClick={() =>
            setCostBreakdown((prev) => [...prev, { label: "", amount: "" }])
          }
        >
          <Plus className="h-4 w-4" /> Add cost
        </Button>
      </Card>

      {/* Payment Milestones */}
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-bold text-primary">
          Payment Milestones
        </h3>

        <div className="space-y-4">
          {paymentMilestones.map((m, index) => (
            <div key={index} className="space-y-2 border p-4 rounded-md">
              <Input
                value={m.milestone}
                placeholder="Milestone"
                onChange={(e) =>
                  setPaymentMilestones((prev) =>
                    prev.map((p, i) =>
                      i === index ? { ...p, milestone: e.target.value } : p
                    )
                  )
                }
              />

              <div className="flex gap-2">
                <Input
                  value={m.amount}
                  placeholder="$0"
                  onChange={(e) =>
                    setPaymentMilestones((prev) =>
                      prev.map((p, i) =>
                        i === index ? { ...p, amount: e.target.value } : p
                      )
                    )
                  }
                />
                <Input
                  value={m.percentage}
                  placeholder="0%"
                  onChange={(e) =>
                    setPaymentMilestones((prev) =>
                      prev.map((p, i) =>
                        i === index ? { ...p, percentage: e.target.value } : p
                      )
                    )
                  }
                />
              </div>

              <Input
                value={m.trigger}
                placeholder="Trigger"
                onChange={(e) =>
                  setPaymentMilestones((prev) =>
                    prev.map((p, i) =>
                      i === index ? { ...p, trigger: e.target.value } : p
                    )
                  )
                }
              />

              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() =>
                  setPaymentMilestones((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              >
                Remove milestone
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-4 flex gap-2"
          onClick={() =>
            setPaymentMilestones((prev) => [
              ...prev,
              { milestone: "", percentage: "", amount: "", trigger: "" },
            ])
          }
        >
          <Plus className="h-4 w-4" /> Add milestone
        </Button>
      </Card>

      {/* Assumptions */}
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-bold text-primary">Assumptions</h3>

        <div className="space-y-3">
          {assumptions.map((a, index) => (
            <div key={index} className="space-y-2">
              <Input
                value={a.title}
                placeholder="Title"
                onChange={(e) =>
                  setAssumptions((prev) =>
                    prev.map((x, i) =>
                      i === index ? { ...x, title: e.target.value } : x
                    )
                  )
                }
              />
              <Input
                value={a.description}
                placeholder="Description"
                onChange={(e) =>
                  setAssumptions((prev) =>
                    prev.map((x, i) =>
                      i === index ? { ...x, description: e.target.value } : x
                    )
                  )
                }
              />

              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() =>
                  setAssumptions((prev) => prev.filter((_, i) => i !== index))
                }
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-4 flex gap-2"
          onClick={() =>
            setAssumptions((prev) => [...prev, { title: "", description: "" }])
          }
        >
          <Plus className="h-4 w-4" /> Add assumption
        </Button>
      </Card>
    </div>
  );
}
