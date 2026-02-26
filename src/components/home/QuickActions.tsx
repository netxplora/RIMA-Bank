import { Link } from "react-router-dom";
import {
  Wallet,
  Building2,
  Smartphone,
  Download,
  ShieldAlert
} from "lucide-react";

const actions = [
  {
    icon: Wallet,
    title: "Quick Loan",
    description: "Instant financing options",
    href: "/open-account", // Routing to Open Account as it's the gateway to applying
    color: "bg-success/10 text-success",
  },
  {
    icon: Building2,
    title: "Locate Branch",
    description: "Find nearest branch",
    href: "/branches",
    color: "bg-warning/20 text-warning-foreground",
  },
  {
    icon: Smartphone,
    title: "Digital Banking",
    description: "Bank from anywhere",
    href: "/digital-banking",
    color: "bg-info/10 text-info",
  },
  {
    icon: Download,
    title: "Downloads",
    description: "Apps & Forms",
    href: "/downloads",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ShieldAlert,
    title: "Whistle Blowing",
    description: "Report safely",
    href: "/whistle-blowing",
    color: "bg-destructive/10 text-destructive",
  },
];

export function QuickActions() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quick Actions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access our most popular services with just one click
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {actions.map((action, index) => (
            <Link
              key={action.title}
              to={action.href}
              className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 mx-auto rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {action.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
