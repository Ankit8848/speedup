import { motion } from "framer-motion";

const NEWS_ITEMS = [
  { emoji: "🚀", text: "SpeedUp launches drone delivery in Orlando, FL", color: "#FF5500", bg: "rgba(255,85,0,0.08)" },
  { emoji: "📦", text: "100,000th delivery milestone reached", color: "#D97706", bg: "rgba(217,119,6,0.08)" },
  { emoji: "✈️", text: "FAA grants BVLOS certification for 12 new cities", color: "#2563EB", bg: "rgba(37,99,235,0.08)" },
  { emoji: "🌿", text: "Fleet runs 100% on renewable energy", color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
  { emoji: "🏆", text: "Best Drone Delivery Startup 2025 — TechCrunch", color: "#9333EA", bg: "rgba(147,51,234,0.08)" },
  { emoji: "📍", text: "New hub opening in Dallas, TX · Q3 2025", color: "#0891B2", bg: "rgba(8,145,178,0.08)" },
  { emoji: "💊", text: "CVS partnership: same-day pharmacy deliveries", color: "#059669", bg: "rgba(5,150,105,0.08)" },
  { emoji: "⚡", text: "$120M Series C raised to expand nationwide", color: "#D97706", bg: "rgba(217,119,6,0.08)" },
  { emoji: "🇺🇸", text: "Expanding to 25 US cities by end of 2025", color: "#2563EB", bg: "rgba(37,99,235,0.08)" },
];

const DOUBLED = [...NEWS_ITEMS, ...NEWS_ITEMS];

export function NewsTicker() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[101] h-10 overflow-hidden flex items-center"
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* LIVE badge */}
      <div
        className="shrink-0 h-full flex items-center px-4 gap-2 z-10"
        style={{
          background: "linear-gradient(90deg, #FF5500 0%, #ff7a33 100%)",
          boxShadow: "4px 0 16px rgba(255,85,0,0.25)",
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Live</span>
      </div>

      <div className="w-px h-5 mx-1 shrink-0" style={{ background: "rgba(0,0,0,0.1)" }} />

      <div className="overflow-hidden flex-1 relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #fff, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #fff, transparent)" }} />

        <motion.div
          className="flex items-center gap-4 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 60, ease: "linear" } }}
        >
          {DOUBLED.map((item, i) => (
            <div key={i} className="flex items-center gap-5 shrink-0">
              <div
                className="flex items-center gap-2 px-3 py-0.5 rounded-full shrink-0"
                style={{ background: item.bg, border: `1px solid ${item.color}20` }}
              >
                <span className="text-sm leading-none">{item.emoji}</span>
                <span className="text-[11px] font-semibold whitespace-nowrap" style={{ color: item.color }}>
                  {item.text}
                </span>
              </div>
              <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "rgba(0,0,0,0.12)" }} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
