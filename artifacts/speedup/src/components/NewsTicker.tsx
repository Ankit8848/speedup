import { motion } from "framer-motion";

const NEWS_ITEMS = [
  "🚀  SpeedUp launches 30-minute drone delivery in Orlando, FL",
  "📦  SpeedUp completes 100,000th delivery milestone",
  "✈️  FAA grants SpeedUp BVLOS certification for 12 new cities",
  "🌿  SpeedUp fleet runs 100% on renewable energy",
  "🏆  SpeedUp named Best Drone Delivery Startup 2025 by TechCrunch",
  "📍  New hub opening in Dallas, TX — Q3 2025",
  "💊  SpeedUp partners with CVS for same-day pharmacy deliveries",
  "🤝  SpeedUp raises $120M Series C to expand nationwide",
  "⚡  Average delivery time slashed to under 8 minutes in pilot cities",
  "🇺🇸  SpeedUp expands to 25 US cities by end of 2025",
];

const TICKER_TEXT = NEWS_ITEMS.join("     •     ");
const DOUBLED = TICKER_TEXT + "     •     " + TICKER_TEXT;

export function NewsTicker() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[101] h-10 overflow-hidden flex items-center"
      style={{ background: "#FF5500" }}
    >
      {/* Label badge */}
      <div className="shrink-0 bg-white text-[#FF5500] text-xs font-black uppercase tracking-widest px-4 h-full flex items-center z-10 shadow-md">
        LIVE NEWS
      </div>

      {/* Scrolling ticker */}
      <div className="overflow-hidden flex-1 relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 55,
              ease: "linear",
            },
          }}
        >
          <span className="text-white text-sm font-medium pr-8">{DOUBLED}</span>
        </motion.div>
      </div>
    </div>
  );
}
