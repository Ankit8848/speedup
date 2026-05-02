import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Package, Clock, Plane } from "lucide-react";

const LOCATIONS = [
  { id: "orlando", city: "Orlando", state: "FL", status: "Active", deliveries: "12,400+", avgTime: "7 min", zones: 8, cx: 74, cy: 68, desc: "Our flagship hub — downtown Orlando, Lake Nona, and surrounding neighborhoods." },
  { id: "miami", city: "Miami", state: "FL", status: "Active", deliveries: "9,200+", avgTime: "9 min", zones: 6, cx: 73, cy: 76, desc: "Serving South Beach, Brickell, Coral Gables and the greater Miami metro." },
  { id: "dallas", city: "Dallas", state: "TX", status: "Active", deliveries: "8,100+", avgTime: "8 min", zones: 5, cx: 44, cy: 60, desc: "Covering Uptown, Deep Ellum, Frisco, and Plano delivery corridors." },
  { id: "la", city: "Los Angeles", state: "CA", status: "Q3 2025", deliveries: "—", avgTime: "—", zones: 0, cx: 10, cy: 52, desc: "Launching Q3 2025 across West Hollywood, Santa Monica, and the LA basin." },
  { id: "nyc", city: "New York", state: "NY", status: "Pilot", deliveries: "2,300+", avgTime: "11 min", zones: 3, cx: 84, cy: 35, desc: "Active pilot in Brooklyn, Queens, and lower Manhattan." },
  { id: "atlanta", city: "Atlanta", state: "GA", status: "Active", deliveries: "5,600+", avgTime: "8 min", zones: 4, cx: 70, cy: 58, desc: "Full service across Midtown, Buckhead, and the Atlanta metro ring." },
];

const statusColor = (s: string) => s === "Active" ? "#FF5500" : s === "Pilot" ? "#3B82F6" : "rgba(255,255,255,0.3)";

function MapSVG({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="relative w-full" style={{ paddingBottom: "58%" }}>
      <svg viewBox="0 0 110 80" className="absolute inset-0 w-full h-full">
        <path d="M8,20 L10,16 L15,14 L22,12 L30,11 L38,11 L46,12 L54,11 L62,10 L70,10 L78,10 L85,12 L90,14 L94,18 L96,22 L95,28 L92,32 L88,36 L85,42 L84,48 L82,54 L80,60 L77,66 L74,70 L72,74 L70,78 L67,78 L65,74 L63,70 L60,68 L57,66 L55,68 L53,70 L51,70 L50,68 L48,66 L46,66 L44,68 L42,68 L40,66 L38,64 L36,66 L34,68 L32,68 L30,66 L28,64 L26,64 L24,66 L22,66 L20,64 L18,62 L16,60 L14,56 L12,50 L10,44 L8,38 L6,32 L6,26 Z"
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        {[20,40,60,80].map(x => <line key={x} x1={x} y1="10" x2={x} y2="78" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />)}
        {[25,50,65].map(y => <line key={y} x1="6" y1={y} x2="96" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />)}
        {LOCATIONS.map((loc) => (
          <g key={loc.id} onClick={() => onSelect(loc.id)} style={{ cursor: "pointer" }}>
            {selected === loc.id && (
              <circle cx={loc.cx} cy={loc.cy} r="5" fill="none" stroke="#FF5500" strokeWidth="0.6" opacity="0.5">
                <animate attributeName="r" from="3" to="9" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.7" to="0" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={loc.cx} cy={loc.cy} r={selected === loc.id ? 3 : 2.2}
              fill={selected === loc.id ? "#FF5500" : statusColor(loc.status)}
              stroke={selected === loc.id ? "rgba(255,255,255,0.4)" : "transparent"}
              strokeWidth="0.5"
              className="transition-all duration-200"
            />
            <text x={loc.cx + 3.5} y={loc.cy + 1.2} fontSize="2.8"
              fill={selected === loc.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)"}
              fontWeight="700"
              style={{ fontFamily: "Inter, sans-serif", pointerEvents: "none" }}>
              {loc.city}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function LocationsSection() {
  const [selected, setSelected] = useState("orlando");
  const active = LOCATIONS.find(l => l.id === selected)!;
  const sc = statusColor(active.status);

  return (
    <section id="locations" className="relative overflow-hidden"
      style={{ background: "#03113d", padding: "9rem 0" }}>

      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.05)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>Service Areas</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2
            className="font-black uppercase text-white leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Delivering<br />across<br />America.
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-sm lg:text-right">
            Active hubs in 5 cities. A new city every quarter. Click a pin to explore.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <MapSVG selected={selected} onSelect={setSelected} />
            </div>
            {/* City pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {LOCATIONS.map(loc => (
                <button key={loc.id} onClick={() => setSelected(loc.id)}
                  className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] transition-all"
                  style={selected === loc.id
                    ? { background: "#FF5500", color: "white" }
                    : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }
                  }>
                  {loc.city}
                </button>
              ))}
            </div>
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            <motion.div key={active.id}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-2 rounded-2xl p-7 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "#FF5500" }} />

              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ background: sc, animation: active.status === "Active" ? "pulse 2s infinite" : "none" }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: sc }}>{active.status}</span>
              </div>

              <h3 className="font-black uppercase text-white leading-none mb-1"
                style={{ fontSize: "2rem", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}>
                {active.city}
              </h3>
              <p className="font-bold text-xs uppercase tracking-widest mb-5" style={{ color: "#FF5500" }}>{active.state}</p>
              <p className="text-white/35 text-sm leading-relaxed mb-7">{active.desc}</p>

              <div className="grid grid-cols-3 gap-2 mb-7">
                {[
                  { icon: Package, label: "Deliveries", value: active.deliveries },
                  { icon: Clock, label: "Avg Time", value: active.avgTime },
                  { icon: Plane, label: "Zones", value: active.zones > 0 ? String(active.zones) : "Soon" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl p-3 text-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <Icon className="w-3.5 h-3.5 mx-auto mb-2" style={{ color: "#FF5500" }} />
                    <div className="font-black text-white text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
                    <div className="text-white/25 text-[10px] mt-0.5 uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>

              <button className="w-full py-3.5 rounded-full font-bold uppercase tracking-[0.1em] text-white text-xs transition-all hover:opacity-90"
                style={{ background: "#FF5500", boxShadow: "0 4px 20px rgba(255,85,0,0.3)" }}>
                Request Service in {active.city}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
