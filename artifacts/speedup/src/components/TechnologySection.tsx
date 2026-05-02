import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Cpu, Radio, Battery, Package, Wifi, Shield } from "lucide-react";

const SLIDES = [
  {
    id: "ai-nav",
    icon: Cpu,
    label: "AI Navigation",
    tag: "Core System",
    headline: "Sees, Thinks, Flies",
    body: "Our proprietary AI navigation stack processes over 2 million sensor data points per second, enabling real-time pathfinding around obstacles, pedestrians, and other aircraft — with zero human intervention.",
    stats: [{ value: "2M+", label: "Data points/sec" }, { value: "0.3ms", label: "Reaction time" }, { value: "99.97%", label: "Route accuracy" }],
    accent: "#FF5500",
  },
  {
    id: "lidar",
    icon: Radio,
    label: "LiDAR Sensors",
    tag: "Spatial Awareness",
    headline: "360° Situational Awareness",
    body: "Six solid-state LiDAR units give each SpeedUp drone a precise 3D map of its surroundings at all times. Even in rain, fog, or low-light conditions, our drones maintain centimeter-level precision.",
    stats: [{ value: "360°", label: "Coverage" }, { value: "1cm", label: "Precision" }, { value: "200m", label: "Detection range" }],
    accent: "#FF7722",
  },
  {
    id: "battery",
    icon: Battery,
    label: "High-Density Battery",
    tag: "Power System",
    headline: "Fly Further, Deliver Faster",
    body: "Our custom lithium-silicon battery cells deliver 40% more energy density than conventional packs. A full charge powers 30 km of range — enough for multiple back-to-back deliveries on a single cycle.",
    stats: [{ value: "30km", label: "Max range" }, { value: "40%", label: "Energy boost" }, { value: "22 min", label: "Fast recharge" }],
    accent: "#FF9944",
  },
  {
    id: "payload",
    icon: Package,
    label: "Payload System",
    tag: "Delivery Mechanism",
    headline: "Precision Drop, Every Time",
    body: "A motorized winch lowers packages to exactly ground level — no crashes, no mess. The smart clamp releases automatically when it senses ground contact, whether that's a porch, rooftop, or urban balcony.",
    stats: [{ value: "3.5kg", label: "Max payload" }, { value: "±10cm", label: "Drop accuracy" }, { value: "0", label: "Missed drops (2024)" }],
    accent: "#FF5500",
  },
  {
    id: "comms",
    icon: Wifi,
    label: "Communications",
    tag: "Connectivity",
    headline: "Always Connected, Always Safe",
    body: "Dual-band 5G + satellite backup keeps every drone in constant contact with our operations hub. If any link is lost, our Autonomous Safe-Mode Protocol brings the drone to a safe landing immediately.",
    stats: [{ value: "5G+SAT", label: "Dual uplink" }, { value: "<50ms", label: "Latency" }, { value: "100%", label: "Safe-mode coverage" }],
    accent: "#FF7722",
  },
  {
    id: "autonomy",
    icon: Shield,
    label: "Autonomy Stack",
    tag: "Intelligence",
    headline: "Fully Autonomous. Fully Accountable.",
    body: "From takeoff to touchdown, SpeedUp drones make thousands of intelligent decisions per second. Our full-stack autonomy platform is trained on 4.5 million real-world delivery flights and improving daily.",
    stats: [{ value: "4.5M", label: "Training flights" }, { value: "Level 4", label: "Autonomy rating" }, { value: "24/7", label: "Operations" }],
    accent: "#FF9944",
  },
];

export function TechnologySection() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const Icon = slide.icon;

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <section className="py-28 section-light" id="technology">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4"
            style={{ background: "#FF550012", color: "#FF5500", border: "1px solid #FF550025" }}>
            <Cpu className="w-4 h-4" /> Core Technology
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                Built for the <span style={{ color: "#FF5500" }}>Future</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-xl">
                Six breakthrough systems — engineered from scratch for precision, safety, and speed.
              </p>
            </div>
            {/* Arrow nav */}
            <div className="flex items-center gap-3">
              <button onClick={prev}
                className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FF5500] hover:text-[#FF5500] transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-semibold text-gray-400 w-16 text-center">
                {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
              <button onClick={next}
                className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FF5500] hover:text-[#FF5500] transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab pills */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {SLIDES.map((s, i) => {
            const SIcon = s.icon;
            return (
              <button key={s.id} onClick={() => setCurrent(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  i === current ? "text-white border-transparent" : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                style={i === current ? { background: s.accent } : {}}>
                <SIcon className="w-3.5 h-3.5" /> {s.label}
              </button>
            );
          })}
        </div>

        {/* Slide */}
        <AnimatePresence mode="wait">
          <motion.div key={slide.id}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8 items-stretch">

            {/* Visual card */}
            <div className="rounded-3xl h-[340px] lg:h-[420px] flex flex-col items-center justify-center relative overflow-hidden card-shadow"
              style={{ background: `linear-gradient(135deg, ${slide.accent}10 0%, #FFF7F3 100%)`, border: `1px solid ${slide.accent}20` }}>
              <motion.div animate={{ scale: [1, 1.06, 1], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6"
                style={{ background: slide.accent + "15", border: `2px solid ${slide.accent}25` }}>
                <Icon className="w-14 h-14" style={{ color: slide.accent }} />
              </motion.div>
              {/* Rings */}
              {[120, 200, 280].map((size, n) => (
                <div key={n} className="absolute rounded-full border opacity-[0.08]"
                  style={{ width: size, height: size, borderColor: slide.accent, top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    animation: `spin ${(n + 1) * 8}s linear infinite` }} />
              ))}
              <div className="text-center z-10">
                <div className="font-black text-gray-900 text-xl">{slide.label}</div>
                <div className="text-gray-400 text-sm mt-1">{slide.tag}</div>
              </div>
            </div>

            {/* Text + stats */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5 self-start"
                style={{ color: slide.accent, background: slide.accent + "12", border: `1px solid ${slide.accent}25` }}>
                {slide.tag}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">{slide.headline}</h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">{slide.body}</p>
              <div className="grid grid-cols-3 gap-4">
                {slide.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl p-5 text-center card-shadow bg-white border border-gray-50">
                    <div className="text-2xl font-black mb-1" style={{ color: slide.accent }}>{stat.value}</div>
                    <div className="text-gray-400 text-xs font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              {/* Progress dots */}
              <div className="flex gap-2 mt-8">
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{ width: i === current ? "28px" : "8px", background: i === current ? slide.accent : "#E5E7EB" }} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <style>{`@keyframes spin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }`}</style>
    </section>
  );
}
