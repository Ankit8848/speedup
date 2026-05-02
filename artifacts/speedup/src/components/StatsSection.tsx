import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── Animated counter ───────────────────── */
function Counter({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}</span>;
}

/* ─── Stats data ─────────────────────────── */
const stats = [
  { prefix: "<", counter: 10, suffix: "", unit: "min",   label: "Average delivery time", sub: "Door to backyard", color: "#FF5500" },
  { prefix: "",  counter: 100, suffix: "K+", unit: "",   label: "Deliveries flown",       sub: "And counting daily", color: "#D97706" },
  { prefix: "",  counter: 99,  suffix: ".9%", unit: "",  label: "Fleet uptime",            sub: "Across all hubs",    color: "#16A34A" },
  { prefix: "",  counter: 0,   suffix: "",   unit: "",   label: "Incidents recorded",      sub: "Since launch 2022",  color: "#2563EB" },
];

const partners = [
  { name: "Chili's",     emoji: "🌶️" },
  { name: "CVS",         emoji: "💊" },
  { name: "Walmart",     emoji: "🛒" },
  { name: "Domino's",    emoji: "🍕" },
  { name: "Target",      emoji: "🎯" },
  { name: "Starbucks",   emoji: "☕" },
  { name: "Whole Foods", emoji: "🥗" },
  { name: "GNC",         emoji: "💪" },
];

export function StatsSection() {
  return (
    <section id="stats" className="relative overflow-hidden" style={{ background: "#FFFFFF" }}>

      {/* ── Giant stats band ── */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-[88rem] mx-auto px-6 lg:px-10 py-20">

          {/* Header label */}
          <div className="flex items-center gap-3 mb-14">
            <span className="w-8 h-px block" style={{ background: "#FF5500" }}/>
            <span style={{ color: "#FF5500", fontSize: 10, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase" }}>
              By the numbers
            </span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 lg:gap-y-0 lg:divide-x divide-black/[0.06]">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:px-10 first:pl-0 last:pr-0"
              >
                {/* The number */}
                <div
                  className="font-black leading-none mb-4"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
                    letterSpacing: "-0.05em",
                    color: s.color,
                    lineHeight: 0.9,
                  }}
                >
                  {s.prefix}<Counter to={s.counter} duration={1.6 + i * 0.1}/>{s.suffix}
                  {s.unit && (
                    <span style={{ fontSize: "0.45em", marginLeft: "0.15em", fontWeight: 900, verticalAlign: "baseline", color: s.color }}>
                      {s.unit}
                    </span>
                  )}
                </div>

                {/* Label */}
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0A0F1E", marginBottom: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Partners marquee ── */}
      <div className="relative overflow-hidden py-10"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#F7F9FC" }}>

        {/* Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #F7F9FC, transparent)" }}/>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #F7F9FC, transparent)" }}/>

        <div className="flex items-center gap-2 mb-5 justify-center">
          <span className="w-6 h-px block" style={{ background: "rgba(0,0,0,0.12)" }}/>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9CA3AF" }}>
            Delivery Partners
          </span>
          <span className="w-6 h-px block" style={{ background: "rgba(0,0,0,0.12)" }}/>
        </div>

        <motion.div
          className="flex items-center gap-4 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...partners, ...partners].map((p, i) => (
            <div key={i}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full shrink-0"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}>
              <span className="text-lg">{p.emoji}</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#6B7280" }}>{p.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
