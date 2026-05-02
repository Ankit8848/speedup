import { motion } from "framer-motion";
import { Smartphone, Zap, Package2 } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Smartphone,
    color: "#FF5500",
    title: "Place Your Order",
    desc: "Open the SpeedUp app, browse local restaurants and stores, then tap confirm. Your order is instantly routed to the nearest autonomous drone hub within seconds.",
    time: "30s",
    timeLabel: "to confirm",
  },
  {
    num: "02",
    icon: Zap,
    color: "#D97706",
    title: "Drone Dispatched",
    desc: "Your dedicated drone launches in under 60 seconds. No driver, no traffic lights, no delays — a direct autonomous flight straight to your GPS coordinates.",
    time: "<60s",
    timeLabel: "to launch",
  },
  {
    num: "03",
    icon: Package2,
    color: "#16A34A",
    title: "Backyard Drop",
    desc: "The drone descends to rooftop height and lowers your package via smart winch to your porch, backyard, or balcony. Confirmed on camera. Done.",
    time: "<10",
    timeLabel: "min total",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden"
      style={{ background: "#F7F9FC", padding: "9rem 0" }}>

      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />

      <div className="max-w-[88rem] mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px block" style={{ background: "#FF5500" }}/>
              <span style={{ color: "#FF5500", fontSize: 10, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase" }}>
                How It Works
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, textTransform: "uppercase",
              fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.9, letterSpacing: "-0.035em", color: "#0A0F1E"
            }}>
              Order to door.<br/>Three steps.
            </h2>
          </div>
          <p style={{ color: "#6B7280", fontSize: "1.1rem", lineHeight: 1.65, maxWidth: "26rem" }}
            className="lg:text-right">
            We removed every friction point between "I'm hungry" and "food in hand."
          </p>
        </div>

        {/* ── Steps — editorial rows ── */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: idx * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="group"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
            >
              <div className="grid items-center gap-6 lg:gap-12 py-10 lg:py-12"
                style={{ gridTemplateColumns: "clamp(60px, 8vw, 88px) 1fr auto" }}>

                {/* Big step number */}
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900,
                  fontSize: "clamp(3.5rem, 6vw, 5rem)", lineHeight: 1, letterSpacing: "-0.05em",
                  color: `${step.color}20`, userSelect: "none", transition: "color 0.25s",
                }}
                  className="group-hover:[color:var(--hover)] transition-colors"
                >
                  {step.num}
                </div>

                {/* Icon + content */}
                <div className="flex items-start gap-6 lg:gap-8 min-w-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${step.color}11`, border: `1.5px solid ${step.color}25` }}
                  >
                    <step.icon size={24} style={{ color: step.color }}/>
                  </div>
                  <div className="min-w-0">
                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, textTransform: "uppercase",
                      fontSize: "clamp(1.25rem, 2.5vw, 1.85rem)", letterSpacing: "-0.025em", color: "#0A0F1E",
                      marginBottom: "0.5rem", lineHeight: 1.05,
                    }}>
                      {step.title}
                    </h3>
                    <p style={{ color: "#6B7280", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "38rem" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Time metric */}
                <div className="text-right shrink-0">
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900,
                    fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 1, letterSpacing: "-0.045em",
                    color: step.color,
                  }}>
                    {step.time}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9CA3AF", marginTop: 5 }}>
                    {step.timeLabel}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Compare banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-2xl overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10">

            {/* Visual comparison */}
            <div className="flex items-center gap-6">
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9CA3AF", marginBottom: 6 }}>
                  Standard courier
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#D1D5DB",
                  textDecoration: "line-through", letterSpacing: "-0.03em", lineHeight: 1
                }}>
                  45 min
                </div>
              </div>

              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "#FFF5F0", border: "1px solid rgba(255,85,0,0.2)" }}>
                <span style={{ color: "#FF5500", fontWeight: 900, fontSize: "1rem" }}>→</span>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#FF5500", marginBottom: 6 }}>
                  SpeedUp drone
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#FF5500",
                  letterSpacing: "-0.03em", lineHeight: 1
                }}>
                  &lt; 10 min
                </div>
              </div>
            </div>

            {/* Text + badge */}
            <div className="text-center sm:text-right">
              <p style={{ color: "#6B7280", fontSize: "0.9rem", lineHeight: 1.65, maxWidth: "22rem", marginBottom: "1rem" }}>
                SpeedUp is <strong style={{ color: "#0A0F1E" }}>4× faster</strong> than the average food delivery courier in every active city we operate.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,85,0,0.09)", border: "1px solid rgba(255,85,0,0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF5500" }}/>
                <span style={{ color: "#FF5500", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Proven across 100,000+ deliveries
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
