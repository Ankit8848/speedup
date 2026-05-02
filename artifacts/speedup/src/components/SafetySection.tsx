import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck, AlertTriangle, Award, FlaskConical, Zap, Eye } from "lucide-react";

const SLIDES = [
  {
    id: "standards", icon: ShieldCheck, tag: "Foundation",
    headline: "Safety Is Our #1 Engineering Priority",
    body: "Every SpeedUp drone undergoes 400+ hours of ground testing and 150+ hours of flight validation before a single commercial delivery. Our zero-incident record isn't luck — it's design.",
    metric: "400+", metricSub: "Testing hours per drone",
    facts: ["Triple-redundant flight controllers", "Independent power rail per rotor", "Auto-land on single motor failure", "Geofenced no-fly zones in firmware"],
  },
  {
    id: "certifications", icon: Award, tag: "Certifications",
    headline: "Fully Certified. Fully Compliant.",
    body: "SpeedUp holds FAA Part 135 Air Carrier Certification, BVLOS approval in 14 US states, and ISO 9001:2015 quality certification — the most complete regulatory portfolio of any drone operator.",
    metric: "FAA", metricSub: "Part 135 Certified",
    facts: ["FAA Part 135 Air Carrier Certificate", "BVLOS operations in 14 states", "ISO 9001:2015 quality certified", "ASTM F3411-22a compliant"],
  },
  {
    id: "testing", icon: FlaskConical, tag: "Flight Testing",
    headline: "Tested in Every Condition Imaginable",
    body: "Our test fleet has logged over 4 million flight hours across extreme weather, electromagnetic interference, and simulated component failure scenarios.",
    metric: "4M+", metricSub: "Test flight hours",
    facts: ["Wind resistance up to 65 km/h", "Rain & low-visibility rated", "EMI hardened avionics", "Thermal tested −20°C to 55°C"],
  },
  {
    id: "emergency", icon: AlertTriangle, tag: "Emergency Protocols",
    headline: "Safe-Mode: Always Ready",
    body: "If any critical system fails, our Autonomous Safe-Mode Protocol activates in under 80ms — automatically selecting the nearest safe landing zone from 200,000+ pre-mapped locations.",
    metric: "80ms", metricSub: "Safe-mode activation",
    facts: ["200K+ safe landing zones", "Auto-notifies emergency contacts", "Remote override by ops team", "On-device black-box data"],
  },
  {
    id: "monitoring", icon: Eye, tag: "Live Monitoring",
    headline: "Every Flight. Every Second. Monitored.",
    body: "Our 24/7 operations hub monitors every active flight in real time. Certified pilots can intervene remotely in under 200ms with direct override capability from anywhere in the world.",
    metric: "24/7", metricSub: "Live operations monitoring",
    facts: ["Real-time telemetry all flights", "<200ms remote intervention", "3 redundant operations centers", "AI anomaly detection"],
  },
  {
    id: "power", icon: Zap, tag: "Power Safety",
    headline: "Power Failure? No Problem.",
    body: "Each rotor draws from its own isolated power circuit. Our onboard supercapacitor array provides 45 seconds of emergency hover time — enough to reach any safe landing zone.",
    metric: "45s", metricSub: "Emergency hover backup",
    facts: ["Per-rotor isolated circuits", "Supercapacitor emergency backup", "Self-healing battery management", "Thermal runaway prevention"],
  },
];

export function SafetySection() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const Icon = slide.icon;

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <section className="py-28 section-gray" id="safety">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4"
            style={{ background: "#FF550012", color: "#FF5500", border: "1px solid #FF550025" }}>
            <ShieldCheck className="w-4 h-4" /> Safety First
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                Trust Built Into <span style={{ color: "#FF5500" }}>Every Layer</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-xl">
                Safety isn't a feature we add — it's the foundation everything else is built upon.
              </p>
            </div>
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
                style={i === current ? { background: "#FF5500" } : {}}>
                <SIcon className="w-3.5 h-3.5" /> {s.tag}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={slide.id}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-5 gap-8 items-stretch">

            {/* Metric card */}
            <div className="lg:col-span-2 rounded-3xl p-10 flex flex-col items-center justify-center text-center card-shadow bg-white relative overflow-hidden"
              style={{ border: "1px solid #FF550018" }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: "#FF5500" }} />
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "#FF550012", border: "1px solid #FF550025" }}>
                <Icon className="w-10 h-10" style={{ color: "#FF5500" }} />
              </div>
              <div className="text-6xl font-black mb-2" style={{ color: "#FF5500" }}>{slide.metric}</div>
              <div className="text-gray-500 font-medium">{slide.metricSub}</div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5 self-start"
                style={{ color: "#FF5500", background: "#FF550012", border: "1px solid #FF550025" }}>
                {slide.tag}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">{slide.headline}</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-8">{slide.body}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slide.facts.map((fact) => (
                  <div key={fact} className="flex items-start gap-3 p-4 rounded-xl bg-white card-shadow border border-gray-50">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: "#FF5500" }} />
                    <span className="text-sm text-gray-700 font-medium">{fact}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-8">
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{ width: i === current ? "28px" : "8px", background: i === current ? "#FF5500" : "#E5E7EB" }} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
