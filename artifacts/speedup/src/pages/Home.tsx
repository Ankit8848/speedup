import { Navbar } from "@/components/Navbar";
import { SpeedUpLogo } from "@/components/SpeedUpLogo";
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
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
          {/* Top row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-1">
              <SpeedUpLogo size={28} />
              <p className="mt-4 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.25)", maxWidth: "200px" }}>
                Autonomous drone delivery — from hub to backyard in under 10 minutes.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FF5500" }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,85,0,0.7)" }}>
                  Now live in 6 cities
                </span>
              </div>
            </div>

            {/* Product */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-5"
                style={{ color: "rgba(255,255,255,0.2)" }}>Product</div>
              {["How It Works", "Technology", "Safety Record", "Service Areas", "For Business"].map(l => (
                <a key={l} href="#" className="block text-xs font-medium mb-3 transition-colors hover:text-white/60"
                  style={{ color: "rgba(255,255,255,0.3)" }}>{l}</a>
              ))}
            </div>

            {/* Company */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-5"
                style={{ color: "rgba(255,255,255,0.2)" }}>Company</div>
              {["About Us", "Newsroom", "Careers", "Investor Relations", "Contact"].map(l => (
                <a key={l} href="#" className="block text-xs font-medium mb-3 transition-colors hover:text-white/60"
                  style={{ color: "rgba(255,255,255,0.3)" }}>{l}</a>
              ))}
            </div>

            {/* Get started */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-5"
                style={{ color: "rgba(255,255,255,0.2)" }}>Get Started</div>
              <button className="w-full py-3 rounded-full text-white font-bold uppercase tracking-[0.1em] text-[11px] mb-3 transition-all hover:opacity-90"
                style={{ background: "#FF5500", boxShadow: "0 4px 20px rgba(255,85,0,0.3)" }}>
                Request Demo
              </button>
              <button className="w-full py-3 rounded-full font-bold uppercase tracking-[0.1em] text-[11px] transition-all hover:border-white/20"
                style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>
                Find My City
              </button>
              <p className="mt-5 text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.2)" }}>
                FAA Part 135 Certified · Zero Incidents
              </p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.15)" }}>
              © {new Date().getFullYear()} SpeedUp Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(l => (
                <a key={l} href="#" className="text-[10px] font-bold uppercase tracking-[0.12em] transition-colors hover:text-white/40"
                  style={{ color: "rgba(255,255,255,0.18)" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
