import { Navbar } from "@/components/Navbar";
import { NewsTicker } from "@/components/NewsTicker";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { StatsSection } from "@/components/StatsSection";
import { TechnologySection } from "@/components/TechnologySection";
import { SafetySection } from "@/components/SafetySection";
import { LocationsSection } from "@/components/LocationsSection";
import { UseCases } from "@/components/UseCases";
import { SimulationSection } from "@/components/SimulationSection";
import { FinalCTA } from "@/components/FinalCTA";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0D0F14" }}>
      <CustomCursor />
      <NewsTicker />
      <Navbar />
      {/* No top padding — hero sits flush behind transparent navbar */}
      <main style={{ paddingTop: "40px" }}>
        <HeroSection />
        <HowItWorks />
        <StatsSection />
        <TechnologySection />
        <SafetySection />
        <LocationsSection />
        <UseCases />
        <SimulationSection />
        <FinalCTA />
      </main>
      <footer style={{ background: "#0D0F14", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#FF5500" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 2L3 8v14h7v-8h4v8h7V8L12 2z" fill="white" />
              </svg>
            </div>
            <span className="font-black text-white tracking-widest text-sm uppercase">SpeedUp</span>
          </div>
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.2)" }}>
            &copy; {new Date().getFullYear()} SpeedUp Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map(l => (
              <a key={l} href="#" className="text-xs font-medium transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.25)" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
