import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "CBN Licensed",
    description: "Fully licensed and regulated by the Central Bank of Nigeria",
  },
  {
    icon: Lock,
    title: "Data Encryption",
    description: "Bank-grade encryption protects all your transactions",
  },
  {
    icon: Eye,
    title: "Fraud Monitoring",
    description: "24/7 monitoring to detect and prevent suspicious activities",
  },
  {
    icon: FileCheck,
    title: "NDIC Insured",
    description: "Your deposits are insured up to ₦500,000 by NDIC",
  },
];

export function SecuritySection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Security & Trust
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Your Security is Our Priority
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We employ industry-leading security measures to protect your money 
            and personal information at all times.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Compliance Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
              <span className="font-bold text-primary text-sm">CBN</span>
            </div>
            <p className="text-xs text-muted-foreground">Licensed</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
              <span className="font-bold text-primary text-sm">NDIC</span>
            </div>
            <p className="text-xs text-muted-foreground">Insured</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
              <span className="font-bold text-primary text-sm">PCI</span>
            </div>
            <p className="text-xs text-muted-foreground">Compliant</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
              <span className="font-bold text-primary text-sm">ISO</span>
            </div>
            <p className="text-xs text-muted-foreground">Certified</p>
          </div>
        </div>
      </div>
    </section>
  );
}
