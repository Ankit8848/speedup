import { motion } from "framer-motion";

const stats = [
  { value: "<10", label: "Min avg delivery", sub: "Door to backyard", color: "#FF5500" },
  { value: "100K+", label: "Deliveries flown", sub: "And counting", color: "#FACC15" },
  { value: "99.9%", label: "Fleet uptime", sub: "Across all hubs", color: "#4ADE80" },
  { value: "0", label: "Incidents recorded", sub: "Since launch 2022", color: "#60A5FA" },
];

const partners = [
  { name: "Chili's", emoji: "🌶️" },
  { name: "CVS", emoji: "💊" },
  { name: "Walmart", emoji: "🛒" },
  { name: "Domino's", emoji: "🍕" },
  { name: "Target", emoji: "🎯" },
  { name: "Starbucks", emoji: "☕" },
  { name: "Whole Foods", emoji: "🥗" },
  { name: "GNC", emoji: "💪" },
];

export function StatsSection() {
  return (
    <section id="stats" className="relative overflow-hidden"
      style={{ background: "#010b19" }}>

      {/* Stats band */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x"
            style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-start lg:px-10 first:pl-0"
              >
                <div
                  className="font-black leading-none mb-3"
                  style={{
                    fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                    letterSpacing: "-0.04em",
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white/70">{stat.label}</div>
                <div className="text-xs text-white/25 mt-1">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners marquee */}
      <div className="relative overflow-hidden py-10"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {/* Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #010b19, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #010b19, transparent)" }} />

        <div className="flex items-center gap-3 mb-4 justify-center">
          <span className="w-6 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/20">
            Delivery Partners
          </span>
          <span className="w-6 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
        </div>

        <motion.div
          className="flex items-center gap-6 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...partners, ...partners].map((p, i) => (
            <div key={i}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full shrink-0"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-lg">{p.emoji}</span>
              <span className="text-sm font-semibold text-white/40">{p.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
