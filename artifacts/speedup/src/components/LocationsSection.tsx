import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plane, Package, Clock } from "lucide-react";

const LOCATIONS = [
  {
    id: "orlando",
    city: "Orlando",
    state: "Florida",
    abbr: "FL",
    status: "Active",
    deliveries: "12,400+",
    avgTime: "7 min",
    zones: 8,
    cx: 74, cy: 68,
    desc: "Our flagship hub covering downtown Orlando, Lake Nona, and surrounding neighborhoods.",
    color: "#FF5500",
  },
  {
    id: "miami",
    city: "Miami",
    state: "Florida",
    abbr: "FL",
    status: "Active",
    deliveries: "9,200+",
    avgTime: "9 min",
    zones: 6,
    cx: 73, cy: 76,
    desc: "Serving South Beach, Brickell, Coral Gables, and the greater Miami metro.",
    color: "#FF5500",
  },
  {
    id: "dallas",
    city: "Dallas",
    state: "Texas",
    abbr: "TX",
    status: "Active",
    deliveries: "8,100+",
    avgTime: "8 min",
    zones: 5,
    cx: 44, cy: 60,
    desc: "Covering Uptown, Deep Ellum, Frisco, and Plano delivery corridors.",
    color: "#FF5500",
  },
  {
    id: "la",
    city: "Los Angeles",
    state: "California",
    abbr: "CA",
    status: "Launching Q3",
    deliveries: "Coming Soon",
    avgTime: "TBD",
    zones: 0,
    cx: 10, cy: 52,
    desc: "Launching Q3 2025 across West Hollywood, Santa Monica, and the LA basin.",
    color: "#FF9944",
  },
  {
    id: "nyc",
    city: "New York",
    state: "New York",
    abbr: "NY",
    status: "Pilot",
    deliveries: "2,300+",
    avgTime: "11 min",
    zones: 3,
    cx: 84, cy: 35,
    desc: "Active pilot in Brooklyn, Queens, and lower Manhattan delivery zones.",
    color: "#FF7722",
  },
  {
    id: "atlanta",
    city: "Atlanta",
    state: "Georgia",
    abbr: "GA",
    status: "Active",
    deliveries: "5,600+",
    avgTime: "8 min",
    zones: 4,
    cx: 70, cy: 58,
    desc: "Full service across Midtown, Buckhead, and the Atlanta metro ring.",
    color: "#FF5500",
  },
];

function USMapSVG({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="relative w-full" style={{ paddingBottom: "60%" }}>
      <svg
        viewBox="0 0 110 80"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.5))" }}
      >
        {/* USA outline (simplified) */}
        <path
          d="M8,20 L10,16 L15,14 L22,12 L30,11 L38,11 L46,12 L54,11 L62,10 L70,10 L78,10 L85,12 L90,14 L94,18 L96,22 L95,28 L92,32 L88,36 L85,42 L84,48 L82,54 L80,60 L77,66 L74,70 L72,74 L70,78 L67,78 L65,74 L63,70 L60,68 L57,66 L55,68 L53,70 L51,70 L50,68 L48,66 L46,66 L44,68 L42,68 L40,66 L38,64 L36,66 L34,68 L32,68 L30,66 L28,64 L26,64 L24,66 L22,66 L20,64 L18,62 L16,60 L14,56 L12,50 L10,44 L8,38 L6,32 L6,26 Z"
          fill="#1a2a3a"
          stroke="#2a4060"
          strokeWidth="0.5"
        />
        {/* Alaska hint */}
        <path d="M8,62 L6,60 L5,64 L7,66 L10,66 L11,63 Z" fill="#1a2a3a" stroke="#2a4060" strokeWidth="0.5" />
        {/* Hawaii hint */}
        <path d="M24,72 L22,71 L21,73 L23,74 Z" fill="#1a2a3a" stroke="#2a4060" strokeWidth="0.5" />

        {/* State grid lines (very subtle) */}
        {[20, 30, 40, 50, 60, 70, 80].map(x => (
          <line key={x} x1={x} y1="10" x2={x} y2="78" stroke="#2a4060" strokeWidth="0.2" strokeDasharray="1,2" />
        ))}
        {[20, 30, 40, 50, 60, 70].map(y => (
          <line key={y} x1="6" y1={y} x2="96" y2={y} stroke="#2a4060" strokeWidth="0.2" strokeDasharray="1,2" />
        ))}

        {/* Location pins */}
        {LOCATIONS.map((loc) => (
          <g key={loc.id} onClick={() => onSelect(loc.id)} style={{ cursor: "pointer" }}>
            {/* Pulse ring for active */}
            {selected === loc.id && (
              <circle cx={loc.cx} cy={loc.cy} r="4" fill="none" stroke={loc.color} strokeWidth="0.6" opacity="0.5">
                <animate attributeName="r" from="3" to="7" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Dot */}
            <circle
              cx={loc.cx} cy={loc.cy} r={selected === loc.id ? 2.5 : 2}
              fill={loc.color}
              stroke="white" strokeWidth="0.6"
              className="transition-all duration-300"
            />
            {/* City label */}
            <text
              x={loc.cx + 3} y={loc.cy + 1}
              fontSize="2.5" fill="white" fontWeight="600" opacity="0.9"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {loc.city}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function LocationsSection() {
  const [selected, setSelected] = useState<string | null>("orlando");
  const active = LOCATIONS.find(l => l.id === selected) || LOCATIONS[0];

  return (
    <section className="py-24 bg-[#020611] relative" id="locations">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF5500]/30 bg-[#FF5500]/10 mb-4">
            <MapPin className="w-4 h-4 text-[#FF5500]" />
            <span className="text-sm text-[#FF5500] font-semibold">Service Areas</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
            Delivering Across <span style={{ color: "#FF5500" }}>America</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            From Florida to New York, SpeedUp hubs are operational in major cities — with more launching every quarter.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/10" style={{ background: "#0d1b2a" }}>
              <USMapSVG selected={selected} onSelect={setSelected} />
            </div>
            {/* City buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelected(loc.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    selected === loc.id
                      ? "border-[#FF5500] text-white"
                      : "border-white/20 text-gray-400 hover:border-[#FF5500]/50 hover:text-white"
                  }`}
                  style={selected === loc.id ? { background: "#FF5500" } : {}}
                >
                  {loc.city}, {loc.abbr}
                </button>
              ))}
            </div>
          </div>

          {/* City detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-8 border border-white/10"
              style={{ background: "rgba(255,85,0,0.05)" }}
            >
              {/* Status badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6"
                style={{ background: active.color + "22", color: active.color }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: active.color }} />
                {active.status}
              </div>

              <h3 className="text-3xl font-black text-white mb-1">{active.city}</h3>
              <p className="text-[#FF5500] font-semibold mb-4">{active.state}</p>
              <p className="text-gray-400 mb-8 leading-relaxed">{active.desc}</p>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Package, label: "Deliveries", value: active.deliveries },
                  { icon: Clock, label: "Avg Time", value: active.avgTime },
                  { icon: Plane, label: "Active Zones", value: active.zones > 0 ? `${active.zones} zones` : "Coming Soon" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl p-4 text-center border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: "#FF5500" }} />
                    <div className="text-white font-black text-lg leading-tight">{value}</div>
                    <div className="text-gray-500 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>

              <button
                className="mt-8 w-full py-3 rounded-full font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "#FF5500" }}
              >
                Request Service in {active.city} →
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
