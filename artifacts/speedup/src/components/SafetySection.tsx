import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, Award, FlaskConical, Zap, Eye, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: "standards", icon: ShieldCheck, label: "Standards",
    metric: "400+", metricUnit: "hrs", metricLabel: "testing per drone",
    headline: "Safety isn't a feature. It's the foundation.",
    body: "Every SpeedUp drone undergoes 400+ hours of ground testing and 150+ hours of flight validation before its first commercial delivery. Our zero-incident record is by design.",
    facts: ["Triple-redundant flight controllers", "Independent power rail per rotor", "Auto-land on single motor failure", "Geofenced no-fly zones in firmware"],
  },
  {
    id: "certs", icon: Award, label: "Certifications",
    metric: "FAA", metricUnit: "", metricLabel: "Part 135 Certified",
    headline: "The most complete regulatory portfolio in drone delivery.",
    body: "FAA Part 135 Air Carrier Certification, BVLOS approval in 14 US states, and ISO 9001:2015 — no other operator can match our compliance depth.",
    facts: ["FAA Part 135 Air Carrier Certificate", "BVLOS operations: 14 states", "ISO 9001:2015 quality certified", "ASTM F3411-22a compliant"],
  },
  {
    id: "testing", icon: FlaskConical, label: "Flight Testing",
    metric: "4M+", metricUnit: "", metricLabel: "flight hours logged",
    headline: "Tested in every condition imaginable.",
    body: "Our fleet has logged millions of hours across extreme weather, EMI interference, and simulated failure scenarios. If it can happen, we've already prepared for it.",
    facts: ["Wind resistance up to 65 km/h", "Rain & low-visibility rated", "EMI-hardened avionics", "Thermal tested −20°C to 55°C"],
  },
  {
    id: "emergency", icon: AlertTriangle, label: "Emergency",
    metric: "80ms", metricUnit: "", metricLabel: "safe-mode activation",
    headline: "Safe-mode activates before you'd notice anything.",
    body: "On any critical failure, Autonomous Safe-Mode selects from 200,000+ pre-mapped landing zones and executes a safe landing — in under 80 milliseconds.",
    facts: ["200K+ pre-mapped safe zones", "Auto-notifies emergency contacts", "Remote override by ops team", "On-device black-box preserved"],
  },
  {
    id: "monitoring", icon: Eye, label: "Monitoring",
    metric: "24/7", metricUnit: "", metricLabel: "live operations",
    headline: "Every flight. Every second. Monitored.",
    body: "Our operations hub tracks every active flight in real time. Certified pilots can intervene remotely in under 200ms from any location in the world.",
    facts: ["Full telemetry on all flights", "<200ms remote intervention", "3 redundant operations centers", "AI anomaly detection on all streams"],
  },
  {
    id: "power", icon: Zap, label: "Power Safety",
    metric: "45s", metricUnit: "", metricLabel: "emergency hover time",
    headline: "Power fails. The drone doesn't.",
    body: "Per-rotor isolated circuits + a supercapacitor backup array give 45 seconds of emergency hover — more than enough to reach any safe landing zone.",
    facts: ["Per-rotor isolated power circuits", "Supercapacitor emergency backup", "Self-healing battery management", "Thermal runaway prevention"],
  },
];

export function SafetySection() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const Icon = slide.icon;

  return (
    <section id="safety" className="py-36" style={{ background: "#0D0F14" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-10 h-px" style={{ background: "#FF5500" }} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FF5500" }}>Safety First</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: headline + nav list */}
          <div>
            <h2 className="font-black text-white mb-12 leading-[1.0]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
              Trust built into<br />every layer.
            </h2>

            <div className="space-y-0 border-t border-white/10">
              {SLIDES.map((s, i) => {
                const SIcon = s.icon;
                const active = i === current;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(i)}
                    className="w-full flex items-center justify-between py-5 border-b border-white/10 transition-all duration-200 group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{ background: active ? "#FF5500" : "rgba(255,255,255,0.05)" }}
                      >
                        <SIcon className="w-4 h-4" style={{ color: active ? "white" : "rgba(255,255,255,0.4)" }} />
                      </div>
                      <span className={`font-bold text-[0.95rem] transition-colors ${active ? "text-[#FF5500]" : "text-white/50 group-hover:text-white"}`}>
                        {s.label}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-all ${active ? "text-[#FF5500]" : "text-white/15"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: active slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="sticky top-32"
            >
              {/* Metric card */}
              <div
                className="w-full rounded-3xl p-10 flex flex-col items-start mb-10 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "#FF5500" }} />
                <Icon className="w-10 h-10 mb-6" style={{ color: "#FF5500" }} strokeWidth={1.5} />
                <div className="font-black text-white leading-none mb-1" style={{ fontSize: "clamp(3rem, 7vw, 5rem)", letterSpacing: "-0.04em" }}>
                  {slide.metric}<span className="text-2xl ml-1" style={{ color: "#FF5500" }}>{slide.metricUnit}</span>
                </div>
                <div className="text-sm text-white/40 font-medium">{slide.metricLabel}</div>
              </div>

              <h3 className="text-xl font-black text-white mb-4 leading-tight">{slide.headline}</h3>
              <p className="text-white/50 leading-relaxed mb-8">{slide.body}</p>

              <div className="grid grid-cols-2 gap-3">
                {slide.facts.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#FF5500" }} />
                    <span className="text-xs text-white/50 font-medium leading-relaxed">{f}</span>
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
