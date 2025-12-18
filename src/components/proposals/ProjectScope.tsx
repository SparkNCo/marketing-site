import { Code } from "lucide-react";
import { Card } from "../ui/card";

export default function ProjectScope() {
  return (
    <section className="mb-16 w-[80vw]">
      <div className="flex items-center gap-3 mb-6">
        <Code className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">Project Scope</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Features & Modules
          </h3>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Real-time inventory tracking dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Automated purchase order generation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Barcode/QR scanning capabilities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Multi-warehouse management</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Advanced reporting and analytics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Role-based access control</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-semibold text-primary mb-4">
            User Types & Roles
          </h3>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>System Administrator (full access)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Warehouse Manager (location-specific)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Inventory Specialist (data entry & updates)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Purchasing Agent (PO management)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Executive (read-only analytics)</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Integrations
          </h3>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>SAP ERP system (bi-directional sync)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>QuickBooks for financial data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Shipping carrier APIs (FedEx, UPS, USPS)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Email notifications (SendGrid)</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-semibold text-primary mb-4">Platforms</h3>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Web application (Chrome, Firefox, Safari)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Mobile-responsive design (iOS & Android)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Cloud infrastructure (AWS)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>RESTful API backend</span>
            </li>
          </ul>
        </Card>
      </div>

      <Card className="p-6 bg-card border-border mt-6">
        <h3 className="text-xl font-semibold text-primary mb-4">
          In-Scope vs. Out-of-Scope
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-secondary mb-3">✓ In-Scope</h4>
            <ul className="space-y-1 text-sm text-foreground">
              <li>• Custom application development</li>
              <li>• Database design and setup</li>
              <li>• Third-party integrations</li>
              <li>• User training (3 sessions)</li>
              <li>• 90 days post-launch support</li>
              <li>• Security auditing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-muted-foreground mb-3">
              ✗ Out-of-Scope
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Hardware procurement</li>
              <li>• Legacy data migration (available as add-on)</li>
              <li>• Native mobile apps</li>
              <li>• On-premise deployment</li>
              <li>• 24/7 phone support</li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}
