import { PageLayout } from "@/components/PageLayout";
import { HowItWorks } from "@/components/HowItWorks";
import { StatsSection } from "@/components/StatsSection";

export default function HowItWorksPage() {
  return (
    <PageLayout>
      <HowItWorks />
      <StatsSection />
    </PageLayout>
  );
}
