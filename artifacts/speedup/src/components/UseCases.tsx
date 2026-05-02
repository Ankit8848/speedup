import { motion } from "framer-motion";
import { Utensils, Stethoscope, Package, ShieldAlert } from "lucide-react";

const cases = [
  {
    icon: Utensils,
    tag: "Food & Restaurants",
    headline: "HOT FOOD.\nUNDER 8 MINUTES.",
    desc: "SpeedUp bypasses every stoplight, traffic jam, and parking lot. Meals arrive at the right temperature — every time.",
    stat: "< 8 min avg",
  },
  {
    icon: Stethoscope,
    tag: "Medical & Healthcare",
    headline: "LIFE-SAVING\nSPEED.",
    desc: "Blood, medication, AEDs, and critical supplies delivered at drone speed to hospitals, clinics, and remote areas.",
    stat: "FDA compliant",
  },
  {
    icon: Package,
    tag: "E-Commerce",
    headline: "SAME-HOUR\nDELIVERY.",
    desc: "Last-mile logistics reimagined. No truck, no driver — a direct flight from warehouse to doorstep.",
    stat: "30km range",
  },
  {
    icon: ShieldAlert,
    tag: "Emergency Response",
    headline: "SECONDS\nSAVE LIVES.",
    desc: "AEDs, fire suppression gear, and first-aid kits deployed in under 2 minutes anywhere in our service zones.",
    stat: "< 2 min deploy",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="relative overflow-hidden"
      style={{ background: "#010b19", padding: "9rem 0" }}>

      <div className="absolute -bottom-40 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.05)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>Use Cases</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2
            className="font-black uppercase text-white leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Limitless<br />applications.
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-sm lg:text-right">
            SpeedUp serves every industry that demands speed, reliability, and precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              className="group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "#FF5500" }} />

              <div className="flex items-start justify-between mb-8">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,85,0,0.1)" }}>
                  <item.icon className="w-5 h-5" style={{ color: "#FF5500" }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(255,85,0,0.1)", color: "#FF5500" }}>
                  {item.stat}
                </span>
              </div>

              <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 text-white/25">{item.tag}</div>
              <h3
                className="font-black uppercase text-white mb-4 leading-[0.9] whitespace-pre-line"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item.headline}
              </h3>
              <p className="text-white/40 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
