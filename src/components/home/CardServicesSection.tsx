import { Link } from "react-router-dom";
import { CreditCard, Smartphone, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cardFeatures = [
  {
    icon: Zap,
    title: "Instant Issuance",
    description: "Get your debit card instantly at any of our branches",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Enhanced security with PIN and chip technology",
  },
  {
    icon: Smartphone,
    title: "Mobile Wallet",
    description: "Link your card to mobile payment apps",
  },
];

export function CardServicesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Card Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-w-md mx-auto">
              <div className="relative z-20 transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/images/atm-card.png"
                  alt="Rivers MFB ATM Card"
                  className="w-full h-auto drop-shadow-2xl rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary/10 rounded-2xl -z-10 blur-2xl" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Card Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Your Card,{" "}
              <span className="text-primary">Your Way</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Experience the convenience of modern card services with Rivers MFB debit cards.
              Shop online, pay at POS terminals, and withdraw cash from ATMs nationwide.
            </p>

            <div className="space-y-6 mb-10">
              {cardFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="default" size="lg" asChild>
              <Link to="/products">
                Request Your Card
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
