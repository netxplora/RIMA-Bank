import { Layout } from "@/components/layout/Layout";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  TrendingUp,
  Shield,
  Handshake,
  Lightbulb,
  CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold the highest standards of honesty and transparency in all our dealings."
  },
  {
    icon: Handshake,
    title: "Customer Focus",
    description: "Our customers are at the heart of everything we do. We strive to exceed expectations."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace technology and new ideas to deliver cutting-edge banking solutions."
  },
  {
    icon: Users,
    title: "Community",
    description: "We are committed to the economic empowerment of Rivers State communities."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We pursue excellence in service delivery and operational efficiency."
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "We understand and respond to the unique needs of our diverse customers."
  }
];

const managementTeam = [
  {
    name: "Pastore Jonathan Tobin",
    role: "Managing Director/CEO",
    image: "/images/team-ceo.jpg"
  },
  {
    name: "Otonye Mac-Barango",
    role: "Group Company Secretary/Legal Adviser",
    image: "/images/secretary.jpg"
  },
  {
    name: "Sokari Josiah Monday",
    role: "Head Internal Control/Audit",
    image: "/images/Sokari.jpg"
  }
];

const milestones = [
  { year: "2009", event: "Rivers MFB founded in Port Harcourt" },
  { year: "2012", event: "Expanded to 3 branches across Rivers State" },
  { year: "2015", event: "Launched SME banking division" },
  { year: "2018", event: "Introduced digital banking platform" },
  { year: "2021", event: "Reached 50,000+ active customers milestone" },
  { year: "2024", event: "Launched mobile banking app and agent network" }
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-about.png"
            alt="About Rivers MFB"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Rivers MFB
            </h1>
            <p className="text-xl text-primary-foreground/80">
              For over 15 years, we've been empowering individuals, businesses, and communities
              across Rivers State with accessible, reliable, and innovative financial solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-secondary">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Target className="h-8 w-8 text-secondary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  To provide accessible, innovative, and sustainable financial services that empower
                  individuals, small businesses, and communities across Rivers State to achieve their
                  economic aspirations and improve their quality of life.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Eye className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  To be the leading microfinance bank in Nigeria, recognized for our commitment to
                  financial inclusion, technological innovation, and transformative impact on the
                  lives of our customers and communities we serve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These values guide everything we do and define who we are as an institution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value) => (
              <Card key={value.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Management Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced leadership team brings decades of banking expertise to serve you better.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {managementTeam.map((member) => (
              <Card key={member.name} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center p-2">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-secondary/10 text-secondary">
                      <Users className="h-20 w-20" />
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Key milestones in our journey of serving Rivers State communities.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <CheckCircle className="h-6 w-6 text-accent-foreground" />
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-primary-foreground/20 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-accent font-bold text-lg">{milestone.year}</span>
                  <p className="text-primary-foreground/80 mt-1">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-4xl md:text-5xl font-bold text-primary">50K+</span>
              </div>
              <p className="text-muted-foreground">Active Customers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-8 w-8 text-secondary" />
                <span className="text-4xl md:text-5xl font-bold text-secondary">₦5B+</span>
              </div>
              <p className="text-muted-foreground">Loans Disbursed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="h-8 w-8 text-accent" />
                <span className="text-4xl md:text-5xl font-bold text-accent">15+</span>
              </div>
              <p className="text-muted-foreground">Years of Service</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-4xl md:text-5xl font-bold text-primary">5</span>
              </div>
              <p className="text-muted-foreground">Branch Locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Licensing & Compliance */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Licensed & Regulated
            </h2>
            <p className="text-muted-foreground mb-8">
              Rivers MFB is fully licensed by the Central Bank of Nigeria (CBN) and insured by the Nigeria Deposit Insurance Corporation (NDIC). We adhere to the highest standards of corporate governance and financial compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/media">Read Annual Reports</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
