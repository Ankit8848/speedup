import { motion } from "framer-motion";
import { useSection } from "@/content/ContentProvider";

interface TickerItem { emoji: string; text: string; color: string }

export function NewsTicker() {
  const { items } = useSection<{ items: TickerItem[] }>("global.ticker");
  const DOUBLED = [...items, ...items];

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
                style={{ background: `${item.color}14`, border: `1px solid ${item.color}20` }}
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
