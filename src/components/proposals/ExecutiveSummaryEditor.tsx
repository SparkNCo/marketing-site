import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import type { SummaryItem } from "./ExecutiveSummary";

interface Props {
  items: SummaryItem[];
  onChange: (index: number, field: keyof SummaryItem, value: string) => void;
}

export default function ExecutiveSummaryEditor({ items, onChange }: Props) {
  return (
    <Card className="border-border bg-card p-8">
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <Input
              value={item.title}
              onChange={(e) =>
                onChange(index, "title", e.target.value)
              }
              className="font-semibold text-primary "
            />

            <Textarea
              value={item.content}
              onChange={(e) =>
                onChange(index, "content", e.target.value)
              }
              rows={4}
              className="text-sm"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
