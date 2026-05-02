import { Navbar } from "@/components/Navbar";
import { NewsTicker } from "@/components/NewsTicker";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TechnologySection } from "@/components/TechnologySection";
import { SafetySection } from "@/components/SafetySection";
import { LocationsSection } from "@/components/LocationsSection";
import { UseCases } from "@/components/UseCases";
import { StatsSection } from "@/components/StatsSection";
import { SimulationSection } from "@/components/SimulationSection";
import { FinalCTA } from "@/components/FinalCTA";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <CustomCursor />
      <NewsTicker />
      <Navbar />
      <main style={{ paddingTop: "96px" }}>
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
      <footer className="bg-[#071428] py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#FF5500" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 3L4 9v12h6v-7h4v7h6V9L12 3z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-wide text-white">SPEEDUP</span>
          </div>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} SpeedUp Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
