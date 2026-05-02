import { motion } from "framer-motion";
import { Smartphone, Zap, Package2 } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Smartphone,
    color: "#FF5500",
    title: "Place Your Order",
    desc: "Open the SpeedUp app, browse local restaurants and stores, tap confirm. Your order is instantly routed to the nearest drone hub.",
    time: "30 sec",
    timeLabel: "to confirm",
  },
  {
    num: "02",
    icon: Zap,
    color: "#FACC15",
    title: "Drone Dispatched",
    desc: "Your dedicated drone launches in under 60 seconds. No driver, no traffic jam, no red lights — a straight flight path directly to you.",
    time: "< 60s",
    timeLabel: "to launch",
  },
  {
    num: "03",
    icon: Package2,
    color: "#4ADE80",
    title: "Backyard Drop",
    desc: "The drone descends and gently lowers your package via smart winch to your porch, backyard, or balcony. Done in under 10 minutes total.",
    time: "< 10",
    timeLabel: "min total",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden"
      style={{ background: "#010b19", padding: "9rem 0" }}>

      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(255,85,0,0.05) 0%, transparent 60%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px" style={{ background: "#FF5500" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>
                How It Works
              </span>
            </div>
            <h2 className="font-black uppercase text-white leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}>
              Order to door<br />in 3 steps.
            </h2>
          </div>
          <p className="text-white/40 text-lg leading-relaxed max-w-sm lg:text-right">
            Every friction point removed. 45 minutes became under 10.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[3.5rem] left-[33%] right-[33%] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,85,0,0.3), transparent)" }} />

          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className="group"
            >
              {/* Icon row */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                    style={{ background: step.color }}>
                    {idx + 1}
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-px hidden md:block"
                    style={{ background: "rgba(255,255,255,0.06)" }} />
                )}
              </div>

              {/* Card */}
              <div className="rounded-2xl p-7 h-full relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {/* Hover top glow */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: step.color }} />

                {/* Big number */}
                <div className="text-[5rem] font-black leading-none mb-5 select-none"
                  style={{ color: `${step.color}12`, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.05em" }}>
                  {step.num}
                </div>

                <h3 className="text-xl font-black text-white mb-3 leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-white/40 leading-relaxed text-sm mb-6">{step.desc}</p>

                {/* Time badge */}
                <div className="inline-flex items-baseline gap-1 px-3 py-1.5 rounded-full"
                  style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}>
                  <span className="text-sm font-black" style={{ color: step.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {step.time}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: `${step.color}99` }}>
                    {step.timeLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom compare banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
          style={{ background: "rgba(255,85,0,0.06)", border: "1px solid rgba(255,85,0,0.15)" }}
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black text-white/15 line-through"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>45 min</div>
            <div className="text-2xl text-white/20">→</div>
            <div className="text-4xl font-black" style={{ color: "#FF5500", fontFamily: "'Space Grotesk', sans-serif" }}>
              &lt; 10 min
            </div>
          </div>
          <p className="text-white/40 text-sm max-w-xs text-center sm:text-right">
            SpeedUp is <strong className="text-white/60">4× faster</strong> than the average food delivery courier in our active cities.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
