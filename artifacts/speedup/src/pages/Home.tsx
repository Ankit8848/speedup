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
    <div style={{ background: "#010b19" }}>
      <CustomCursor />
      <NewsTicker />
      <Navbar />
      {/* No padding — hero starts immediately behind transparent nav */}
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

      {/* Footer */}
      <footer style={{ background: "#010b19", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#FF5500" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 2L3 8v14h7v-8h4v8h7V8L12 2z" fill="white" />
              </svg>
            </div>
            <span className="font-black text-white text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              SpeedUp
            </span>
          </div>
          <p className="text-[11px] font-medium text-white/20 uppercase tracking-widest">
            © {new Date().getFullYear()} SpeedUp Inc. Revolutionizing last-mile delivery.
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Contact"].map(l => (
              <a key={l} href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-white/60"
                style={{ color: "rgba(255,255,255,0.2)" }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
