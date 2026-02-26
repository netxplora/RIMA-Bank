import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Wallet, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Wallet,
    title: "Zero Account Fees",
    description: "No monthly maintenance charges",
  },
  {
    icon: BookOpen,
    title: "Study Loans",
    description: "Low-interest education financing",
  },
  {
    icon: CreditCard,
    title: "Campus Card",
    description: "Special student debit cards",
  },
];

export function StudentBankingSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Student Banking
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Banking Made for{" "}
              <span className="text-primary">Students</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Special banking packages designed for students at all levels.
              Manage your finances, receive allowances, and access education
              loans with ease. Start building your financial future today.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="text-center p-6 bg-muted/50 rounded-xl animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/open-account">
                  Open Student Account
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/products/student">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-secondary rounded-2xl p-8 text-secondary-foreground">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-secondary-foreground/10 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">Rivers MFB Student Account</h3>
                  <p className="text-secondary-foreground/70">For students aged 16+</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-secondary-foreground/10 rounded-lg">
                  <span>Account Opening</span>
                  <span className="font-bold text-accent">FREE</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary-foreground/10 rounded-lg">
                  <span>Monthly Maintenance</span>
                  <span className="font-bold text-accent">₦0</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary-foreground/10 rounded-lg">
                  <span>Study Loan Rate</span>
                  <span className="font-bold text-accent">From 5% p.a.</span>
                </div>
              </div>

              <p className="text-sm text-secondary-foreground/60 mt-6">
                * Valid student ID required. Terms and conditions apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
