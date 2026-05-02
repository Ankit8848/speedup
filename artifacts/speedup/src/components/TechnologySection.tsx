import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Cpu, Radio, Battery, Package, Wifi, Shield } from "lucide-react";

const SLIDES = [
  {
    id: "ai", icon: Cpu, label: "AI Navigation",
    headline: "THE BRAIN BEHIND THE FLIGHT.",
    body: "Our proprietary AI processes 2 million sensor inputs per second — plotting, re-plotting, and optimizing routes in real time with zero human involvement.",
    stats: [{ v: "2M+", l: "Sensor reads/sec" }, { v: "0.3ms", l: "Reaction time" }, { v: "99.97%", l: "Route accuracy" }],
  },
  {
    id: "lidar", icon: Radio, label: "LiDAR Sensors",
    headline: "360° EYES THAT NEVER BLINK.",
    body: "Six solid-state LiDAR units map a full sphere around each drone at all times. In rain, fog, or darkness — centimeter precision, always.",
    stats: [{ v: "360°", l: "Coverage" }, { v: "1cm", l: "Precision" }, { v: "200m", l: "Detection range" }],
  },
  {
    id: "battery", icon: Battery, label: "Power System",
    headline: "FURTHER. FASTER. GREENER.",
    body: "Our lithium-silicon cells store 40% more energy than conventional packs, powering a 30km range with a 22-minute fast recharge.",
    stats: [{ v: "30km", l: "Max range" }, { v: "+40%", l: "Energy density" }, { v: "22min", l: "Recharge time" }],
  },
  {
    id: "payload", icon: Package, label: "Payload System",
    headline: "PRECISION DROP. EVERY TIME.",
    body: "A motorized winch lowers packages to ground contact — smart clamps release automatically on touchdown, whether porch, rooftop, or balcony.",
    stats: [{ v: "3.5kg", l: "Max payload" }, { v: "±10cm", l: "Drop accuracy" }, { v: "0", l: "Missed drops '24" }],
  },
  {
    id: "comms", icon: Wifi, label: "Communications",
    headline: "ALWAYS CONNECTED. ALWAYS SAFE.",
    body: "Dual-band 5G plus satellite backup keeps every drone in constant contact. On any link loss, Autonomous Safe-Mode brings it home immediately.",
    stats: [{ v: "5G+SAT", l: "Dual uplink" }, { v: "<50ms", l: "Latency" }, { v: "100%", l: "Coverage" }],
  },
  {
    id: "auto", icon: Shield, label: "Autonomy Stack",
    headline: "TRAINED ON 4.5M REAL FLIGHTS.",
    body: "From takeoff to touchdown, thousands of intelligent micro-decisions every second. Our autonomy platform improves with every delivery.",
    stats: [{ v: "4.5M", l: "Training flights" }, { v: "Level 4", l: "Autonomy rating" }, { v: "24/7", l: "Operations" }],
  },
];

export function TechnologySection() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];

  return (
    <section id="technology" className="relative overflow-hidden"
      style={{ background: "#FFFFFF", padding: "9rem 0" }}>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>Core Technology</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <h2
              className="font-black uppercase leading-[0.9] mb-14"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}
            >
              Built for<br />the future<br />of flight.
            </h2>

            <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              {SLIDES.map((s, i) => {
                const Icon = s.icon;
                const active = i === current;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(i)}
                    className="w-full flex items-center justify-between py-5 text-left group transition-all duration-200"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0"
                        style={{ background: active ? "#FF5500" : "rgba(0,0,0,0.04)" }}
                      >
                        <Icon className="w-4 h-4" style={{ color: active ? "white" : "#8892A4" }} />
                      </div>
                      <span
                        className="text-sm font-bold uppercase tracking-[0.08em] transition-colors"
                        style={{ color: active ? "#FF5500" : "#4B5675" }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <ChevronRight
                      className="w-4 h-4 transition-all"
                      style={{ color: active ? "#FF5500" : "rgba(0,0,0,0.15)" }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="sticky top-32"
            >
              {/* Visual card */}
              <div
                className="w-full rounded-2xl flex items-center justify-center mb-8 overflow-hidden relative"
                style={{
                  height: "280px",
                  background: "#F7F9FC",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div className="absolute inset-0" style={{
                  background: "radial-gradient(ellipse at 50% 50%, rgba(255,85,0,0.06) 0%, transparent 65%)"
                }} />
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "#FF5500", opacity: 0.6 }} />
                <div className="absolute inset-0 pointer-events-none opacity-50" style={{
                  backgroundImage: "linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px)",
                  backgroundSize: "32px 32px"
                }} />
                <div className="absolute w-48 h-48 rounded-full" style={{ border: "1px solid rgba(255,85,0,0.12)" }} />
                <div className="absolute w-64 h-64 rounded-full" style={{ border: "1px solid rgba(255,85,0,0.07)" }} />
                <motion.div
                  animate={{ y: [-8, 8, -8], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
                    style={{ background: "rgba(255,85,0,0.10)", border: "1px solid rgba(255,85,0,0.20)" }}>
                    <slide.icon className="w-12 h-12" style={{ color: "#FF5500" }} strokeWidth={1.2} />
                  </div>
                </motion.div>
              </div>

              <h3
                className="font-black uppercase mb-4 leading-[0.95]"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}
              >
                {slide.headline}
              </h3>
              <p className="leading-relaxed mb-10 text-[0.95rem]" style={{ color: "#6B7280" }}>{slide.body}</p>

              <div className="grid grid-cols-3 gap-4 pt-8" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                {slide.stats.map((s) => (
                  <div key={s.l}>
                    <div className="text-xl font-black mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>{s.v}</div>
                    <div className="text-[10px] uppercase tracking-[0.15em] font-semibold" style={{ color: "#9CA3AF" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
