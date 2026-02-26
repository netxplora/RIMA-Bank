import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "CBN Licensed Microfinance Bank",
  "15+ Years of Trusted Service",
  "Dedicated to Financial Inclusion",
  "Modern Digital Banking Solutions",
  "Community-Focused Approach",
  "Transparent & Ethical Banking",
];

export function AboutSnapshot() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              About Rivers MFB
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Your Trusted Partner in{" "}
              <span className="text-primary">Financial Growth</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Rivers MFB is a CBN-licensed microfinance institution
              dedicated to empowering individuals, students, traders, SMEs, and communities
              across Rivers State. We believe in making banking accessible, simple, and
              beneficial for everyone.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button variant="default" size="lg" asChild>
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <img
                  src="/images/hero-about.png"
                  alt="Rivers MFB Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs hidden md:block animate-fade-in">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Verified & Trusted</p>
                  <p className="text-sm text-muted-foreground">CBN License No: MF-123456</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
