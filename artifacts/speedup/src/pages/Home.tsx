import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SpeedUpLogo } from "@/components/SpeedUpLogo";
import { NewsTicker } from "@/components/NewsTicker";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { FinalCTA } from "@/components/FinalCTA";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";

const PAGE_CARDS = [
  {
    label: "How It Works",
    headline: "Order to door.\nThree steps.",
    desc: "See exactly how a delivery goes from tap to backyard in under 10 minutes.",
    href: "/how-it-works",
    accent: "#FF5500",
    bg: "#FFF5F0",
    border: "rgba(255,85,0,0.15)",
    num: "01",
  },
  {
    label: "Technology",
    headline: "Built for\nthe future.",
    desc: "AI navigation, solid-state LiDAR, dual 5G+satellite comms — explore the hardware.",
    href: "/technology",
    accent: "#2563EB",
    bg: "#EFF6FF",
    border: "rgba(37,99,235,0.15)",
    num: "02",
  },
  {
    label: "Safety",
    headline: "Zero\nincidents.",
    desc: "FAA Part 135 certified. 4M+ hours flown. Every safety layer, explained.",
    href: "/safety",
    accent: "#16A34A",
    bg: "#F0FDF4",
    border: "rgba(22,163,74,0.15)",
    num: "03",
  },
  {
    label: "Locations",
    headline: "Live in\n6 cities.",
    desc: "Explore active zones, watch a live drone flight, and check your address.",
    href: "/locations",
    accent: "#7C3AED",
    bg: "#F5F3FF",
    border: "rgba(124,58,237,0.15)",
    num: "04",
  },
  {
    label: "For Business",
    headline: "Cut delivery\ncosts in half.",
    desc: "No driver fleet, no tips — a flat fee per delivery. See plans for every industry.",
    href: "/for-business",
    accent: "#D97706",
    bg: "#FFFBEB",
    border: "rgba(217,119,6,0.15)",
    num: "05",
  },
];

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div style={{ background: "#FFFFFF" }}>
      <CustomCursor />
      <NewsTicker />
      <Navbar />
      <main style={{ paddingTop: "40px" }}>
        <HeroSection />
        <StatsSection />

        {/* ── Page navigation cards ── */}
        <section style={{ background: "#F7F9FC", padding: "9rem 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px" style={{ background: "#FF5500" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>
                Explore SpeedUp
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <h2
                className="font-black uppercase leading-[0.9]"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  letterSpacing: "-0.035em",
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#0A0F1E",
                }}
              >
                Everything<br />you need<br />to know.
              </h2>
              <p className="text-lg leading-relaxed max-w-sm lg:text-right" style={{ color: "#6B7280" }}>
                Dive into any section — each page is packed with details, demos, and data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PAGE_CARDS.map((card, idx) => (
                <motion.button
                  key={card.href}
                  onClick={() => navigate(card.href)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07, duration: 0.55 }}
                  className={`group text-left rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${idx === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                  style={{
                    background: card.bg,
                    border: `1px solid ${card.border}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    minHeight: idx === 0 ? "280px" : "220px",
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: card.accent }}
                  />

                  {/* Corner number */}
                  <div
                    className="absolute top-5 right-6 font-black select-none"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "4.5rem",
                      letterSpacing: "-0.05em",
                      lineHeight: 1,
                      color: `${card.accent}12`,
                    }}
                  >
                    {card.num}
                  </div>

                  <div>
                    <div
                      className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4"
                      style={{ color: `${card.accent}bb` }}
                    >
                      {card.label}
                    </div>
                    <h3
                      className="font-black uppercase whitespace-pre-line leading-[0.92] mb-4"
                      style={{
                        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                        letterSpacing: "-0.025em",
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#0A0F1E",
                      }}
                    >
                      {card.headline}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7280", maxWidth: "28rem" }}>
                      {card.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-8 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group-hover:gap-3"
                    style={{ color: card.accent }}>
                    Explore <ArrowRight className="w-3.5 h-3.5 transition-all" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
