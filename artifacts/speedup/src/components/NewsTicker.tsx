import { motion } from "framer-motion";

const NEWS_ITEMS = [
  { emoji: "🚀", text: "SpeedUp launches drone delivery in Orlando, FL", color: "#FF5500", bg: "rgba(255,85,0,0.25)" },
  { emoji: "📦", text: "100,000th delivery milestone reached", color: "#FACC15", bg: "rgba(250,204,21,0.2)" },
  { emoji: "✈️", text: "FAA grants BVLOS certification for 12 new cities", color: "#38BDF8", bg: "rgba(56,189,248,0.2)" },
  { emoji: "🌿", text: "Fleet runs 100% on renewable energy", color: "#4ADE80", bg: "rgba(74,222,128,0.2)" },
  { emoji: "🏆", text: "Best Drone Delivery Startup 2025 — TechCrunch", color: "#F472B6", bg: "rgba(244,114,182,0.2)" },
  { emoji: "📍", text: "New hub opening in Dallas, TX · Q3 2025", color: "#A78BFA", bg: "rgba(167,139,250,0.2)" },
  { emoji: "💊", text: "CVS partnership: same-day pharmacy deliveries", color: "#34D399", bg: "rgba(52,211,153,0.2)" },
  { emoji: "⚡", text: "$120M Series C raised to expand nationwide", color: "#FACC15", bg: "rgba(250,204,21,0.2)" },
  { emoji: "🇺🇸", text: "Expanding to 25 US cities by end of 2025", color: "#60A5FA", bg: "rgba(96,165,250,0.2)" },
];

const DOUBLED = [...NEWS_ITEMS, ...NEWS_ITEMS];

export function NewsTicker() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[101] h-10 overflow-hidden flex items-center"
      style={{
        background: "linear-gradient(90deg, #0a0f1e 0%, #0d1628 40%, #0a1020 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Label badge */}
      <div
        className="shrink-0 h-full flex items-center px-4 gap-2 z-10"
        style={{
          background: "linear-gradient(90deg, #FF5500 0%, #ff7a33 100%)",
          boxShadow: "4px 0 20px rgba(255,85,0,0.4)",
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Live</span>
      </div>

      {/* Separator */}
      <div className="w-px h-5 mx-1 shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />

      {/* Scrolling ticker */}
      <div className="overflow-hidden flex-1 relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #0a0f1e, transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #0a0f1e, transparent)" }} />

        <motion.div
          className="flex items-center gap-4 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 60, ease: "linear" } }}
        >
          {DOUBLED.map((item, i) => (
            <div key={i} className="flex items-center gap-5 shrink-0">
              {/* Pill */}
              <div
                className="flex items-center gap-2 px-3 py-0.5 rounded-full shrink-0"
                style={{ background: item.bg, border: `1px solid ${item.color}30` }}
              >
                <span className="text-sm leading-none">{item.emoji}</span>
                <span
                  className="text-[11px] font-semibold whitespace-nowrap"
                  style={{ color: item.color }}
                >
                  {item.text}
                </span>
              </div>
              {/* Dot separator */}
              <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.12)" }} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
