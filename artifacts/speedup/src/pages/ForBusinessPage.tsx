import { PageLayout } from "@/components/PageLayout";
import { UseCases } from "@/components/UseCases";
import { SimulationSection } from "@/components/SimulationSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function ForBusinessPage() {
  return (
    <PageLayout>
      <UseCases />
      <SimulationSection />
      <FinalCTA />
    </PageLayout>
  );
}
