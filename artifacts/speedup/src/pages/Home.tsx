import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TechnologySection } from "@/components/TechnologySection";
import { UseCases } from "@/components/UseCases";
import { StatsSection } from "@/components/StatsSection";
import { SimulationSection } from "@/components/SimulationSection";
import { VisionSection } from "@/components/VisionSection";
import { FinalCTA } from "@/components/FinalCTA";
import { CustomCursor } from "@/components/CustomCursor";
import { useEffect } from "react";

export default function Home() {
  // Ensure dark mode is active on load
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <TechnologySection />
        <UseCases />
        <StatsSection />
        <SimulationSection />
        <VisionSection />
        <FinalCTA />
      </main>
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border/10">
        <p>&copy; {new Date().getFullYear()} SpeedUp Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
