import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, Award, FlaskConical, Zap, Eye, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: "standards", icon: ShieldCheck, label: "Standards",
    metric: "400+", metricSub: "Testing hours per drone",
    headline: "SAFETY ISN'T A FEATURE. IT'S THE FOUNDATION.",
    body: "Every SpeedUp drone undergoes 400+ hours of ground testing and 150+ hours of flight validation before its first commercial delivery.",
    facts: ["Triple-redundant flight controllers", "Independent power rail per rotor", "Auto-land on single motor failure", "Geofenced no-fly zones in firmware"],
  },
  {
    id: "certs", icon: Award, label: "Certifications",
    metric: "FAA", metricSub: "Part 135 Air Carrier Certified",
    headline: "THE MOST COMPLETE REGULATORY PORTFOLIO IN DRONE DELIVERY.",
    body: "FAA Part 135 Air Carrier Certification, BVLOS approval in 14 US states, and ISO 9001:2015 — no other operator matches our compliance depth.",
    facts: ["FAA Part 135 Air Carrier Certificate", "BVLOS operations: 14 states", "ISO 9001:2015 quality certified", "ASTM F3411-22a compliant"],
  },
  {
    id: "testing", icon: FlaskConical, label: "Flight Testing",
    metric: "4M+", metricSub: "Total flight hours logged",
    headline: "TESTED IN EVERY CONDITION IMAGINABLE.",
    body: "Our fleet has logged millions of hours across extreme weather, EMI interference, and simulated failure scenarios. If it can happen, we've prepared for it.",
    facts: ["Wind resistance up to 65 km/h", "Rain & low-visibility rated", "EMI-hardened avionics", "Thermal tested −20°C to 55°C"],
  },
  {
    id: "emergency", icon: AlertTriangle, label: "Emergency",
    metric: "80ms", metricSub: "Safe-mode activation time",
    headline: "SAFE-MODE ACTIVATES BEFORE YOU'D NOTICE ANYTHING.",
    body: "On any critical failure, Autonomous Safe-Mode selects from 200,000+ pre-mapped landing zones and executes a safe landing in under 80 milliseconds.",
    facts: ["200K+ pre-mapped safe zones", "Auto-notifies emergency contacts", "Remote override by ops team", "On-device black-box preserved"],
  },
  {
    id: "monitoring", icon: Eye, label: "Monitoring",
    metric: "24/7", metricSub: "Live operations coverage",
    headline: "EVERY FLIGHT. EVERY SECOND. MONITORED.",
    body: "Our operations hub tracks every active flight in real time. Certified pilots can intervene remotely in under 200ms from any location worldwide.",
    facts: ["Full telemetry on all flights", "<200ms remote intervention", "3 redundant operations centers", "AI anomaly detection on all streams"],
  },
  {
    id: "power", icon: Zap, label: "Power Safety",
    metric: "45s", metricSub: "Emergency hover reserve",
    headline: "POWER FAILS. THE DRONE DOESN'T.",
    body: "Per-rotor isolated circuits and a supercapacitor backup array give 45 seconds of emergency hover — enough to reach any safe landing zone.",
    facts: ["Per-rotor isolated power circuits", "Supercapacitor emergency backup", "Self-healing battery management", "Thermal runaway prevention"],
  },
];

export function SafetySection() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const Icon = slide.icon;

  return (
    <section id="safety" className="relative overflow-hidden"
      style={{ background: "#03113d", padding: "9rem 0" }}>

      {/* Glow */}
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.06)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>Safety First</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <h2
              className="font-black uppercase text-white leading-[0.9] mb-14"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Trust built<br />into every<br />layer.
            </h2>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {SLIDES.map((s, i) => {
                const SIcon = s.icon;
                const active = i === current;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(i)}
                    className="w-full flex items-center justify-between py-5 text-left group transition-all duration-200"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0"
                        style={{ background: active ? "#FF5500" : "rgba(255,255,255,0.05)" }}
                      >
                        <SIcon className="w-4 h-4" style={{ color: active ? "white" : "rgba(255,255,255,0.35)" }} />
                      </div>
                      <span
                        className="text-sm font-bold uppercase tracking-[0.08em] transition-colors"
                        style={{ color: active ? "#FF5500" : "rgba(255,255,255,0.45)" }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: active ? "#FF5500" : "rgba(255,255,255,0.15)" }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="sticky top-32"
            >
              {/* Metric card */}
              <div
                className="rounded-2xl p-8 mb-8 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "#FF5500" }} />
                <Icon className="w-8 h-8 mb-5" style={{ color: "#FF5500" }} strokeWidth={1.5} />
                <div
                  className="font-black text-white leading-none mb-2"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {slide.metric}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/30">{slide.metricSub}</div>
              </div>

              <h3
                className="font-black uppercase text-white mb-4 leading-[0.95]"
                style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", letterSpacing: "-0.01em", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {slide.headline}
              </h3>
              <p className="text-white/40 leading-relaxed mb-8 text-sm">{slide.body}</p>

              <div className="grid grid-cols-2 gap-2">
                {slide.facts.map((f) => (
                  <div key={f}
                    className="flex items-start gap-2.5 p-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#FF5500" }} />
                    <span className="text-[11px] text-white/40 font-medium leading-relaxed">{f}</span>
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
