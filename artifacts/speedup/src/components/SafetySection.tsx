import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck, AlertTriangle, Award, FlaskConical, Zap, Eye } from "lucide-react";

const SLIDES = [
  {
    id: "standards",
    icon: ShieldCheck,
    tag: "Foundation",
    headline: "Safety Is Our #1 Engineering Priority",
    body: "Every SpeedUp drone undergoes 400+ hours of ground testing and 150+ hours of flight validation before a single commercial delivery. Our zero-incident record isn't luck — it's design.",
    visual: {
      metric: "400+",
      sub: "Hours of testing per drone",
      accent: "#FF5500",
    },
    facts: [
      "Triple-redundant flight controllers",
      "Independent power rail per rotor",
      "Auto-land on single motor failure",
      "Geofenced no-fly zones baked in firmware",
    ],
  },
  {
    id: "certifications",
    icon: Award,
    tag: "Certifications",
    headline: "Fully Certified. Fully Compliant.",
    body: "SpeedUp holds FAA Part 135 Air Carrier Certification, BVLOS approval in 14 US states, and ISO 9001:2015 quality certification — the most complete regulatory portfolio of any commercial drone operator.",
    visual: {
      metric: "FAA",
      sub: "Part 135 Certified",
      accent: "#00D4FF",
    },
    facts: [
      "FAA Part 135 Air Carrier Certificate",
      "BVLOS operations in 14 states",
      "ISO 9001:2015 quality certified",
      "ASTM F3411-22a compliant",
    ],
  },
  {
    id: "testing",
    icon: FlaskConical,
    tag: "Flight Testing",
    headline: "Tested in Every Condition Imaginable",
    body: "Our test fleet has logged over 4 million flight hours across extreme weather, electromagnetic interference, and simulated component failure scenarios. If it can happen, we've already faced it.",
    visual: {
      metric: "4M+",
      sub: "Test flight hours",
      accent: "#7B2FFF",
    },
    facts: [
      "Wind resistance up to 65 km/h",
      "Rain & low-visibility rated",
      "EMI hardened avionics",
      "Thermal stress tested −20°C to 55°C",
    ],
  },
  {
    id: "emergency",
    icon: AlertTriangle,
    tag: "Emergency Protocols",
    headline: "Safe-Mode: Always Ready",
    body: "If any critical system fails mid-flight, our Autonomous Safe-Mode Protocol activates in under 80 milliseconds — automatically selecting the nearest safe landing zone from a live-updated database of 200,000+ locations.",
    visual: {
      metric: "80ms",
      sub: "Safe-mode activation time",
      accent: "#FF5500",
    },
    facts: [
      "200,000+ pre-mapped safe landing zones",
      "Auto-notifies emergency contacts",
      "Remote override by ops team",
      "Black-box data preserved on-device",
    ],
  },
  {
    id: "monitoring",
    icon: Eye,
    tag: "Live Monitoring",
    headline: "Every Flight. Every Second. Monitored.",
    body: "Our 24/7 operations hub monitors every active flight in real time. Certified drone safety pilots can intervene remotely in under 200 milliseconds, with direct override capability from anywhere in the world.",
    visual: {
      metric: "24/7",
      sub: "Live operations monitoring",
      accent: "#00D4FF",
    },
    facts: [
      "Real-time telemetry for all flights",
      "<200ms remote intervention",
      "Redundant operations centers (3 sites)",
      "AI anomaly detection on all data streams",
    ],
  },
  {
    id: "power",
    icon: Zap,
    tag: "Power Safety",
    headline: "Power Failure? No Problem.",
    body: "Each rotor draws from its own isolated power circuit. If the primary battery fails, our onboard supercapacitor array provides 45 seconds of emergency hover time — enough to reach any safe landing zone.",
    visual: {
      metric: "45s",
      sub: "Emergency hover on backup",
      accent: "#7B2FFF",
    },
    facts: [
      "Per-rotor isolated power circuits",
      "Supercapacitor emergency backup",
      "Self-healing battery management",
      "Thermal runaway prevention system",
    ],
  },
];

export function SafetySection() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#040d18" }} id="safety">
      {/* Accent glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${slide.visual.accent}10 0%, transparent 65%)`,
        }}
      />

      {/* Orange top border */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#FF5500" }} />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF5500]/30 bg-[#FF5500]/10 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#FF5500]" />
            <span className="text-sm text-[#FF5500] font-semibold">Safety First</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
            Trust Built Into <span style={{ color: "#FF5500" }}>Every Layer</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Safety isn't a feature we add on — it's the foundation everything else is built upon.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-5 gap-8 items-stretch"
          >
            {/* Big visual card */}
            <div
              className="lg:col-span-2 rounded-3xl p-10 flex flex-col items-center justify-center text-center border border-white/10 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${slide.visual.accent}18 0%, rgba(255,255,255,0.02) 100%)` }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border"
                style={{ background: slide.visual.accent + "22", borderColor: slide.visual.accent + "44" }}
              >
                <slide.icon className="w-10 h-10" style={{ color: slide.visual.accent }} />
              </div>
              <div className="text-6xl font-black mb-2" style={{ color: slide.visual.accent }}>
                {slide.visual.metric}
              </div>
              <div className="text-gray-400 text-sm font-medium">{slide.visual.sub}</div>
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
                style={{ background: slide.visual.accent }}
              />
            </div>

            {/* Content */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-5 self-start border"
                style={{
                  color: slide.visual.accent,
                  borderColor: slide.visual.accent + "44",
                  background: slide.visual.accent + "15",
                }}
              >
                {slide.tag}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                {slide.headline}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                {slide.body}
              </p>

              {/* Fact list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slide.facts.map((fact) => (
                  <div key={fact} className="flex items-start gap-3 p-3 rounded-xl border border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ background: slide.visual.accent }}
                    />
                    <span className="text-sm text-gray-300 font-medium">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center gap-6 mt-10">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#FF5500] hover:text-[#FF5500] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "32px" : "8px",
                  background: i === current ? slide.visual.accent : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#FF5500] hover:text-[#FF5500] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <span className="text-gray-500 text-sm ml-auto">
            {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Slide label tabs */}
        <div className="flex gap-2 mt-6 flex-wrap">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                i === current
                  ? "text-white border-transparent"
                  : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
              }`}
              style={i === current ? { background: slide.visual.accent } : {}}
            >
              <s.icon className="w-3.5 h-3.5" />
              {s.tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
