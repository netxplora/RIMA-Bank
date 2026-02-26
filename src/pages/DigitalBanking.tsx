import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Smartphone,
  Shield,
  Zap,
  Clock,
  Download,
  CheckCircle2,
  WalletCards,
  ReceiptText,
  HandCoins,
  ArrowRight,
  ShieldCheck,
  SmartphoneNfc,
  Apple
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PlayStoreIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.18.18-.313.407-.384.656L14.94 12.35 15.908 11.382l4.475-2.557c.75-.429.75-1.221 0-1.65L15.908 4.618l-.968-.968L3.226 1.158c.071.25.204.477.383.656z" />
  </svg>
);

export default function DigitalBanking() {
  return (
    <Layout>
      {/* Hero Section - Consistent with About Page */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-digital.png"
            alt="Digital Banking Experience"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Digital Banking Redefined
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Experience the future of finance with Rivers Microfinance Bank. Our digital-first
              approach brings seamless, secure, and instant banking services right to your pocket.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="accent" size="lg" className="h-14 px-8 text-lg" asChild>
                <a href="#download" className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Get the App Now
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="h-14 px-8 text-lg" asChild>
                <Link to="/open-account">Start Setup Online</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section - Professional App Placement */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Context Side */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <Smartphone className="h-4 w-4" />
                Available on iOS & Android
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Banking in Your Pocket, <br />
                <span className="text-primary italic">Always and Forever</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We've designed our mobile experience to be more than just a tool—it's your private
                financial hub. Secure, fast, and remarkably easy to use, the Rivers MFB app is
                built for the rhythms of your daily life.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    Zero Maintenance
                  </h4>
                  <p className="text-sm text-muted-foreground">No hidden charges for digital transactions.</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    Instant Support
                  </h4>
                  <p className="text-sm text-muted-foreground">In-app customer service available 24/7.</p>
                </div>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative z-10 animate-fade-in">
                <img
                  src="/images/Mobile-App.png"
                  alt="Rivers MFB Mobile App"
                  className="w-full max-w-[550px] h-auto drop-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transform lg:rotate-2 hover:rotate-0 transition-transform duration-700"
                />
              </div>
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Clean & Professional */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Powerful Features for Your <span className="text-primary">Financial Freedom</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to manage, save, and grow your money is just a tap away.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: WalletCards,
                title: "Instant Transfers",
                description: "Send money instantly to any commercial or microfinance bank in Nigeria.",
                color: "bg-blue-600/10 text-blue-600"
              },
              {
                icon: ReceiptText,
                title: "Utility Payments",
                description: "Manage all your bills—electricity, data, cable, and more—from one place.",
                color: "bg-purple-600/10 text-purple-600"
              },
              {
                icon: HandCoins,
                title: "App-Based Loans",
                description: "Access quick loans based on your transaction history with zero paperwork.",
                color: "bg-emerald-600/10 text-emerald-600"
              },
              {
                icon: SmartphoneNfc,
                title: "Card Management",
                description: "Request, activate, or freeze your debit cards instantly through your phone.",
                color: "bg-orange-600/10 text-orange-600"
              },
              {
                icon: ShieldCheck,
                title: "Biometric Security",
                description: "Secure your funds with multi-factor authentication and biometric verification.",
                color: "bg-red-600/10 text-red-600"
              },
              {
                icon: Zap,
                title: "Smart Spending",
                description: "Get real-time insights into your spending habits with automated categorization.",
                color: "bg-amber-600/10 text-amber-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none bg-background">
                <CardContent className="pt-8">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Banner */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest mb-8">
              <Shield className="h-4 w-4" />
              World Class Protection
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-8">
              Bank with Absolute <span className="text-accent italic">Peace of Mind</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-bold">NDIC Insured</h4>
                <p className="text-sm text-primary-foreground/60">Your funds are protected by the NDIC.</p>
              </div>
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-bold">AES-256 Security</h4>
                <p className="text-sm text-primary-foreground/60">Top-tier encryption for your data.</p>
              </div>
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-bold">2-Factor Auth</h4>
                <p className="text-sm text-primary-foreground/60">Robust double-layer security.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section - Professional Centered CTA */}
      <section id="download" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-hero rounded-[2.5rem] p-12 lg:p-16 relative overflow-hidden shadow-2xl text-primary-foreground text-center">
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to Upgrade Your Life?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of customers banking with Rivers MFB. Download our app today
                and take full control of your financial future.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button variant="accent" size="xl" className="h-16 px-10 shadow-lg" asChild>
                  <a href="#" className="flex items-center gap-3">
                    <PlayStoreIcon />
                    <div className="text-left">
                      <p className="text-[10px] uppercase leading-none opacity-80 font-medium">Get it on</p>
                      <p className="text-xl font-bold leading-tight">Google Play</p>
                    </div>
                  </a>
                </Button>
                <Button variant="heroOutline" size="xl" className="h-16 px-10 border-white/40" asChild>
                  <a href="#" className="flex items-center gap-3">
                    <Apple className="h-8 w-8" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase leading-none opacity-80 font-medium">Download on the</p>
                      <p className="text-xl font-bold leading-tight">App Store</p>
                    </div>
                  </a>
                </Button>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8 text-primary-foreground/60">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">4.8 App Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">100k+ Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
