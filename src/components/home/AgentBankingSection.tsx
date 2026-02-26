import { Link } from "react-router-dom";
import { MapPin, Users, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AgentBankingSection() {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Agent & POS Banking
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Banking Services{" "}
              <span className="text-accent">Near You</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              Access essential banking services through our network of trusted agents 
              and POS terminals across Rivers State. Deposit, withdraw, transfer, and 
              pay bills right in your neighborhood.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="text-center p-4 rounded-xl bg-primary-foreground/10">
                <MapPin className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold">200+</p>
                <p className="text-sm text-primary-foreground/70">Agent Locations</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-primary-foreground/10">
                <CreditCard className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-primary-foreground/70">POS Terminals</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-primary-foreground/10">
                <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-primary-foreground/70">Service Availability</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contact">
                  Find Nearest Agent
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/products">
                  Become an Agent
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-6">
                Agent Services
              </h3>
              <ul className="space-y-4">
                {[
                  "Cash Deposits & Withdrawals",
                  "Fund Transfers",
                  "Bill Payments (Electricity, Water, etc.)",
                  "Airtime & Data Top-up",
                  "Account Opening Assistance",
                  "Balance Enquiries",
                ].map((service) => (
                  <li key={service} className="flex items-center gap-3 text-primary-foreground/90">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
