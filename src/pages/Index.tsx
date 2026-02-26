import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { AboutSnapshot } from "@/components/home/AboutSnapshot";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { AgentBankingSection } from "@/components/home/AgentBankingSection";
import { CardServicesSection } from "@/components/home/CardServicesSection";
import { StudentBankingSection } from "@/components/home/StudentBankingSection";
import { SMEBankingSection } from "@/components/home/SMEBankingSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { MobileAppCTA } from "@/components/home/MobileAppCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <QuickActions />
      <AboutSnapshot />
      <ServicesOverview />
      <AgentBankingSection />
      <CardServicesSection />
      <StudentBankingSection />
      <SMEBankingSection />
      <SecuritySection />
      <MobileAppCTA />
    </Layout>
  );
};

export default Index;
