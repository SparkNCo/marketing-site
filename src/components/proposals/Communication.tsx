import { MessageSquare } from "lucide-react";
import { Card } from "../ui/card";

export default function Communication() {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">
          Process & Communication
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Meetings & Check-ins
          </h3>
          <ul className="space-y-3 text-sm text-foreground">
            <li className="flex items-start gap-3">
              <span className="font-semibold text-secondary min-w-[100px]">
                Weekly Status:
              </span>
              <span>
                Every Monday, 1 hour - progress review, demos, next steps
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-secondary min-w-[100px]">
                Daily Standups:
              </span>
              <span>Internal team sync (you receive summary)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-secondary min-w-[100px]">
                Ad-hoc Support:
              </span>
              <span>
                Slack channel for quick questions (4-hour response time)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-secondary min-w-[100px]">
                Milestone Reviews:
              </span>
              <span>End of each phase - formal presentation and sign-off</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Tools & Collaboration
          </h3>
          <ul className="space-y-3 text-sm text-foreground">
            <li className="flex items-start gap-3">
              <span className="font-semibold text-secondary min-w-[100px]">
                Project Mgmt:
              </span>
              <span>
                Jira for task tracking, burndown charts, sprint planning
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-secondary min-w-[100px]">
                Communication:
              </span>
              <span>Dedicated Slack channel + email for formal approvals</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-secondary min-w-[100px]">
                Design Review:
              </span>
              <span>Figma with commenting for feedback</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-secondary min-w-[100px]">
                Code Access:
              </span>
              <span>
                GitHub repository (read access during dev, full after launch)
              </span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Development Workflow
          </h3>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">→</span>
              <span>Feature branches with peer code reviews</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">→</span>
              <span>Automated testing on every commit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">→</span>
              <span>Staging environment for client preview</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">→</span>
              <span>Weekly deployments to staging for review</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Change Request Process
          </h3>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">1.</span>
              <span>
                Submit change request via Jira with detailed description
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">2.</span>
              <span>Team provides impact analysis (time, cost, timeline)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">3.</span>
              <span>
                Client approves or rejects (written approval required)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">4.</span>
              <span>If approved, work scheduled and contract amended</span>
            </li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
