import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  Building2,
  GraduationCap,
  Users,
  Briefcase,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Wallet,
    title: "Savings Accounts",
    description: "Grow your wealth with competitive interest rates and flexible savings options tailored to your goals.",
    href: "/products/savings",
    features: ["High Interest Rates", "No Minimum Balance", "Easy Withdrawals"],
  },
  {
    icon: TrendingUp,
    title: "Personal Loans",
    description: "Quick access to funds for personal needs, emergencies, or investments with flexible repayment terms.",
    href: "/products/loans",
    features: ["Low Interest Rates", "Quick Approval", "Flexible Terms"],
  },
  {
    icon: Briefcase,
    title: "SME Banking",
    description: "Comprehensive banking solutions designed to help your business grow and thrive in today's market.",
    href: "/products/sme",
    features: ["Business Accounts", "Trade Finance", "Working Capital"],
  },
  {
    icon: GraduationCap,
    title: "Student Banking",
    description: "Special accounts and loans for students to manage their finances while pursuing education.",
    href: "/products/student",
    features: ["Zero Fees", "Study Loans", "Campus Cards"],
  },

  {
    icon: Building2,
    title: "Current Accounts",
    description: "Seamless daily banking with unlimited transactions and digital banking access.",
    href: "/products/current",
    features: ["Unlimited Transactions", "Debit Cards", "Cheque Books"],
  },
];

export function ServicesOverview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Banking Solutions for Everyone
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            From personal savings to business financing, we offer comprehensive banking
            services designed to meet the diverse needs of our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="h-7 w-7 text-primary-foreground" />
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={service.href}
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
