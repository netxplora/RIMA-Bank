import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Wallet,
  Building2,
  CreditCard,
  TrendingUp,
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle,
  Percent,
  Clock,
  Shield,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const savingsProducts = [
  {
    name: "Regular Savings",
    description: "Build your savings with competitive interest rates",
    features: ["No minimum balance", "Free debit card", "Mobile banking access", "Interest paid quarterly"],
    rate: "4% p.a.",
    icon: Wallet
  },
  {
    name: "Fixed Deposit",
    description: "Lock in higher returns on your savings",
    features: ["Higher interest rates", "Flexible tenors (30-365 days)", "Principal guaranteed", "Interest at maturity"],
    rate: "Up to 12% p.a.",
    icon: TrendingUp
  },
  {
    name: "Target Savings",
    description: "Save towards specific goals with discipline",
    features: ["Set your target amount", "Automated deductions", "Bonus interest on completion", "Early withdrawal penalty"],
    rate: "6% p.a.",
    icon: Shield
  }
];

const loanProducts = [
  {
    name: "Personal Loan",
    description: "Quick loans for personal needs",
    features: ["Up to ₦2 million", "12-month repayment", "Minimal documentation", "Fast approval (24-48hrs)"],
    rate: "From 2.5% monthly",
    icon: CreditCard
  },
  {
    name: "SME Business Loan",
    description: "Grow your business with flexible financing",
    features: ["Up to ₦10 million", "24-month repayment", "Asset financing option", "Business advisory support"],
    rate: "From 2% monthly",
    icon: Building2
  },
  {
    name: "Salary Advance",
    description: "Bridge the gap before payday",
    features: ["Up to 50% of salary", "Auto-deduction from salary", "No collateral required", "Same-day disbursement"],
    rate: "From 3% flat",
    icon: Clock
  }
];

const accountTypes = [
  {
    name: "Current Account",
    description: "For everyday business transactions",
    features: ["Unlimited transactions", "Cheque book facility", "Overdraft eligible", "Free online banking"],
    minBalance: "₦10,000",
    icon: Building2
  },
  {
    name: "Student Account",
    description: "Banking made easy for students",
    features: ["Zero maintenance fee", "Free transfers to parents", "Campus discounts", "Financial literacy resources"],
    minBalance: "₦0",
    icon: GraduationCap
  }
];

export default function Products() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/media-sme.png"
            alt="Rivers MFB Products"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Products & Services
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Discover our range of banking products designed to meet your personal and business
              financial needs. From savings to loans, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Products Tabs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="savings" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="loans">Loans</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="agent">Agent Banking</TabsTrigger>
            </TabsList>

            <TabsContent value="savings">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savingsProducts.map((product) => (
                  <Card key={product.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-secondary/10">
                          <product.icon className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <CardTitle className="font-display">{product.name}</CardTitle>
                          <div className="flex items-center gap-1 text-secondary font-semibold">
                            <Percent className="h-4 w-4" />
                            {product.rate}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-secondary shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/open-account">
                          Open Account
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="loans">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loanProducts.map((product) => (
                  <Card key={product.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-accent/10">
                          <product.icon className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <CardTitle className="font-display">{product.name}</CardTitle>
                          <div className="flex items-center gap-1 text-accent font-semibold">
                            <Percent className="h-4 w-4" />
                            {product.rate}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="hero" className="w-full" asChild>
                        <Link to="/open-account">
                          Apply Now
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accounts">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accountTypes.map((product) => (
                  <Card key={product.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <product.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="font-display">{product.name}</CardTitle>
                          <div className="text-primary font-semibold text-sm">
                            Min. Balance: {product.minBalance}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/open-account">
                          Open Account
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="agent">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "POS Terminal",
                    description: "Start your own agency banking business",
                    features: ["Instant commissions", "High transaction limits", "Robust network reliability", "24/7 support"],
                    rate: "Competitive Commissions",
                    icon: Store
                  },
                  {
                    name: "Agent Aggregator",
                    description: "Manage a network of agents",
                    features: ["Override commissions", "Performance dashboard", "Training support", "Branding materials"],
                    rate: "Volume Based",
                    icon: Users
                  }
                ].map((product) => (
                  <Card key={product.name} className="hover:shadow-lg transition-shadow overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-secondary/10">
                          <product.icon className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <CardTitle className="font-display">{product.name}</CardTitle>
                          <div className="text-secondary font-semibold text-sm">
                            {product.rate}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-secondary shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="hero" className="w-full" asChild>
                        <Link to="/contact">
                          Apply Now
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Not Sure Which Product is Right for You?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our customer service team is here to help you find the perfect banking solution
            for your needs. Visit any of our branches or contact us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/open-account">Open Account Online</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
