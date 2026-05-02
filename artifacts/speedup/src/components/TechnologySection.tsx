import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Cpu, Radio, Battery, Package, Wifi, Shield } from "lucide-react";

const SLIDES = [
  {
    id: "ai", icon: Cpu, label: "AI Navigation",
    headline: "The brain behind the flight.",
    body: "Our proprietary AI processes 2 million sensor inputs per second — plotting, re-plotting, and optimizing routes in real time with zero human involvement.",
    stats: [{ v: "2M+", l: "Sensor reads/sec" }, { v: "0.3ms", l: "Reaction time" }, { v: "99.97%", l: "Route accuracy" }],
  },
  {
    id: "lidar", icon: Radio, label: "LiDAR Sensors",
    headline: "360° eyes that never blink.",
    body: "Six solid-state LiDAR units map a full sphere around each drone at all times. In rain, fog, or darkness — centimeter precision, always.",
    stats: [{ v: "360°", l: "Coverage" }, { v: "1cm", l: "Precision" }, { v: "200m", l: "Detection range" }],
  },
  {
    id: "battery", icon: Battery, label: "Power System",
    headline: "Further. Faster. Greener.",
    body: "Our lithium-silicon cells store 40% more energy than conventional packs, powering a 30km range with a 22-minute fast recharge.",
    stats: [{ v: "30km", l: "Max range" }, { v: "+40%", l: "Energy density" }, { v: "22 min", l: "Recharge time" }],
  },
  {
    id: "payload", icon: Package, label: "Payload System",
    headline: "Precision drop. Every time.",
    body: "A motorized winch lowers packages to ground contact — smart clamps release automatically on touchdown, whether porch, rooftop, or balcony.",
    stats: [{ v: "3.5kg", l: "Max payload" }, { v: "±10cm", l: "Drop accuracy" }, { v: "0", l: "Missed drops (2024)" }],
  },
  {
    id: "comms", icon: Wifi, label: "Communications",
    headline: "Always connected. Always safe.",
    body: "Dual-band 5G plus satellite backup keeps every drone in constant contact. On any link loss, Autonomous Safe-Mode brings it home immediately.",
    stats: [{ v: "5G+SAT", l: "Dual uplink" }, { v: "<50ms", l: "Latency" }, { v: "100%", l: "Coverage" }],
  },
  {
    id: "auto", icon: Shield, label: "Autonomy Stack",
    headline: "Trained on 4.5M real flights.",
    body: "From takeoff to touchdown, thousands of intelligent micro-decisions every second. Our autonomy platform improves with every delivery.",
    stats: [{ v: "4.5M", l: "Training flights" }, { v: "Level 4", l: "Autonomy rating" }, { v: "24/7", l: "Operations" }],
  },
];

export function TechnologySection() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];

  return (
    <section id="technology" className="py-36" style={{ background: "#F5F3EF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-10 h-px" style={{ background: "#FF5500" }} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FF5500" }}>Core Technology</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: headline + slide list */}
          <div>
            <h2 className="font-black text-[#0D0F14] mb-12 leading-[1.0]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
              Built for the<br />future of flight.
            </h2>

            <div className="space-y-0 border-t border-[#0D0F14]/10">
              {SLIDES.map((s, i) => {
                const Icon = s.icon;
                const active = i === current;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(i)}
                    className="w-full flex items-center justify-between py-5 border-b border-[#0D0F14]/10 transition-all duration-200 group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{ background: active ? "#FF5500" : "#0D0F1408" }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: active ? "white" : "#0D0F14" }} />
                      </div>
                      <span className={`font-bold text-[0.95rem] transition-colors ${active ? "text-[#FF5500]" : "text-[#0D0F14] group-hover:text-[#FF5500]"}`}>
                        {s.label}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-all duration-200 ${active ? "text-[#FF5500]" : "text-[#0D0F14]/20"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: active slide detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="sticky top-32"
            >
              {/* Big visual */}
              <div
                className="w-full rounded-3xl flex items-center justify-center mb-10 overflow-hidden"
                style={{ height: "280px", background: "#0D0F14" }}
              >
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <slide.icon className="w-24 h-24" style={{ color: "#FF5500", opacity: 0.9 }} strokeWidth={1.2} />
                </motion.div>
              </div>

              <h3
                className="font-black text-[#0D0F14] mb-4 leading-[1.1]"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.03em" }}
              >
                {slide.headline}
              </h3>
              <p className="text-[#6B7280] text-lg leading-relaxed mb-10">{slide.body}</p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#0D0F14]/10">
                {slide.stats.map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-black text-[#0D0F14] mb-1">{s.v}</div>
                    <div className="text-xs text-[#6B7280] font-medium">{s.l}</div>
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
