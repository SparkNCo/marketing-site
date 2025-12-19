import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { Milestones, Dependency } from "./PlanTimeline";

interface Props {
  totalDuration: string;
  setTotalDuration: (v: string) => void;

  mileStones: Milestones[];
  setMileStones: React.Dispatch<React.SetStateAction<Milestones[]>>;

  dependencies: Dependency[];
  setDependencies: React.Dispatch<React.SetStateAction<Dependency[]>>;
}

export default function PlanTimelineEditor({
  totalDuration,
  setTotalDuration,
  mileStones,
  setMileStones,
  dependencies,
  setDependencies,
}: Props) {
  return (
    <div className="space-y-8">
      {/* Total duration */}
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-bold text-primary">
          Project Duration
        </h3>
        <Input
          value={totalDuration}
          placeholder="e.g. 16 weeks"
          onChange={(e) => setTotalDuration(e.target.value)}
        />
      </Card>

      {/* mileStones */}
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-bold text-primary">
          Timeline mileStones
        </h3>

        <div className="space-y-6">
          {mileStones.map((phase, phaseIndex) => (
            <div
              key={phaseIndex}
              className="rounded-md border border-border p-4 space-y-3"
            >
              <div className="flex gap-2">
                <Input
                  value={phase.phase}
                  placeholder="Phase name"
                  onChange={(e) =>
                    setMileStones((prev) =>
                      prev.map((p, i) =>
                        i === phaseIndex ? { ...p, phase: e.target.value } : p
                      )
                    )
                  }
                />
                <Input
                  value={phase.duration}
                  placeholder="Duration"
                  className="w-32"
                  onChange={(e) =>
                    setMileStones((prev) =>
                      prev.map((p, i) =>
                        i === phaseIndex
                          ? { ...p, duration: e.target.value }
                          : p
                      )
                    )
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() =>
                    setMileStones((prev) =>
                      prev.filter((_, i) => i !== phaseIndex)
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                {phase.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex gap-2">
                    <Input
                      value={task}
                      placeholder="Task"
                      onChange={(e) =>
                        setMileStones((prev) =>
                          prev.map((p, i) =>
                            i === phaseIndex
                              ? {
                                  ...p,
                                  tasks: p.tasks.map((t, ti) =>
                                    ti === taskIndex ? e.target.value : t
                                  ),
                                }
                              : p
                          )
                        )
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() =>
                        setMileStones((prev) =>
                          prev.map((p, i) =>
                            i === phaseIndex
                              ? {
                                  ...p,
                                  tasks: p.tasks.filter(
                                    (_, ti) => ti !== taskIndex
                                  ),
                                }
                              : p
                          )
                        )
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
                onClick={() =>
                  setMileStones((prev) =>
                    prev.map((p, i) =>
                      i === phaseIndex ? { ...p, tasks: [...p.tasks, ""] } : p
                    )
                  )
                }
              >
                <Plus className="h-4 w-4 mr-2" /> Add task
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() =>
            setMileStones((prev) => [
              ...prev,
              { phase: "", duration: "", tasks: [] },
            ])
          }
        >
          <Plus className="h-4 w-4 mr-2" /> Add phase
        </Button>
      </Card>

      {/* Dependencies */}
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-bold text-primary">
          Dependencies & Deadlines
        </h3>

        <div className="space-y-3">
          {dependencies.map((dep, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={dep.week}
                placeholder="Week"
                className="w-32"
                onChange={(e) =>
                  setDependencies((prev) =>
                    prev.map((d, i) =>
                      i === index ? { ...d, week: e.target.value } : d
                    )
                  )
                }
              />
              <Input
                value={dep.description}
                placeholder="Description"
                onChange={(e) =>
                  setDependencies((prev) =>
                    prev.map((d, i) =>
                      i === index ? { ...d, description: e.target.value } : d
                    )
                  )
                }
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() =>
                  setDependencies((prev) => prev.filter((_, i) => i !== index))
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
          className="mt-4"
          onClick={() =>
            setDependencies((prev) => [...prev, { week: "", description: "" }])
          }
        >
          <Plus className="h-4 w-4 mr-2" /> Add dependency
        </Button>
      </Card>
    </div>
  );
}
