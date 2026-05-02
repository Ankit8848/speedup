import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Cpu, Radio, Battery, Package, Wifi, Shield } from "lucide-react";

/* ─── Technology data ─────────────────────── */
const SLIDES = [
  {
    id: "ai", icon: Cpu, label: "AI Navigation",
    headline: "THE BRAIN BEHIND EVERY FLIGHT.",
    body: "Our proprietary AI processes 2 million sensor inputs per second — plotting, re-plotting, and optimizing routes in real time. Zero human involvement required.",
    stats: [{ v: "2M+", l: "Sensor reads/sec" }, { v: "0.3ms", l: "Reaction time" }, { v: "99.97%", l: "Route accuracy" }],
  },
  {
    id: "lidar", icon: Radio, label: "LiDAR Sensors",
    headline: "360° EYES THAT NEVER BLINK.",
    body: "Six solid-state LiDAR units map a full sphere around each drone at all times. Rain, fog, darkness — centimeter precision is guaranteed in every condition.",
    stats: [{ v: "360°", l: "Coverage" }, { v: "1 cm", l: "Precision" }, { v: "200 m", l: "Detection range" }],
  },
  {
    id: "battery", icon: Battery, label: "Power System",
    headline: "FURTHER. FASTER. GREENER.",
    body: "Our lithium-silicon cells store 40% more energy than conventional packs, enabling a 30 km range with a 22-minute fast recharge cycle.",
    stats: [{ v: "30 km", l: "Max range" }, { v: "+40%", l: "Energy density" }, { v: "22 min", l: "Recharge time" }],
  },
  {
    id: "payload", icon: Package, label: "Payload System",
    headline: "PRECISION DROP. EVERY TIME.",
    body: "A motorized winch lowers packages to ground contact — smart clamps release automatically on touchdown, whether porch, rooftop, or balcony.",
    stats: [{ v: "3.5 kg", l: "Max payload" }, { v: "±10 cm", l: "Drop accuracy" }, { v: "0", l: "Missed drops 2024" }],
  },
  {
    id: "comms", icon: Wifi, label: "Communications",
    headline: "ALWAYS CONNECTED. ALWAYS SAFE.",
    body: "Dual-band 5G plus satellite backup keeps every drone in constant contact. Any link failure triggers Autonomous Safe-Mode within 80 milliseconds.",
    stats: [{ v: "5G+SAT", l: "Dual uplink" }, { v: "<50 ms", l: "Latency" }, { v: "100%", l: "Coverage" }],
  },
  {
    id: "auto", icon: Shield, label: "Autonomy Stack",
    headline: "TRAINED ON 4.5M REAL FLIGHTS.",
    body: "From takeoff to touchdown, thousands of intelligent micro-decisions every second. Our autonomy platform continuously improves with every delivery.",
    stats: [{ v: "4.5M", l: "Training flights" }, { v: "Level 4", l: "Autonomy rating" }, { v: "24/7", l: "Operations" }],
  },
];

/* ─── Custom visualizations per tech ─────── */

function AiViz() {
  const layers = [
    [{ x: 60, y: 100 }, { x: 60, y: 145 }, { x: 60, y: 190 }],
    [{ x: 150, y: 80 }, { x: 150, y: 120 }, { x: 150, y: 160 }, { x: 150, y: 200 }],
    [{ x: 240, y: 100 }, { x: 240, y: 145 }, { x: 240, y: 190 }],
    [{ x: 320, y: 145 }],
  ];
  const edges: [number, number, number, number][] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    layers[li].forEach(a => layers[li + 1].forEach(b => edges.push([a.x, a.y, b.x, b.y])));
  }
  return (
    <svg width="380" height="290" viewBox="0 0 380 290">
      {edges.map(([x1, y1, x2, y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(255,85,0,0.18)" strokeWidth="1"
          animate={{ opacity: [0.18, 0.55, 0.18] }}
          transition={{ duration: 1.8 + (i % 5) * 0.4, repeat: Infinity, delay: (i % 7) * 0.3 }} />
      ))}
      {layers.flat().map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={8}
          fill="rgba(255,85,0,0.10)" stroke="#FF5500" strokeWidth="1.5"
          animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.4 + (i % 4) * 0.3, repeat: Infinity, delay: (i % 5) * 0.35 }} />
      ))}
      {/* Data packets traveling */}
      {[0, 1, 2].map(i => {
        const idx = i * 4;
        const edge = edges[idx < edges.length ? idx : 0];
        if (!edge) return null;
        return (
          <motion.circle key={`p${i}`} r="4" fill="#FF5500"
            initial={{ cx: edge[0], cy: edge[1] }}
            animate={{ cx: [edge[0], edge[2]], cy: [edge[1], edge[3]] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.6, repeatDelay: 1.5 }} />
        );
      })}
    </svg>
  );
}

function LidarViz() {
  return (
    <svg width="380" height="290" viewBox="0 0 380 290">
      {/* Range rings */}
      {[40, 80, 120].map((r, i) => (
        <circle key={i} cx="190" cy="145" r={r}
          fill="none" stroke="rgba(255,85,0,0.12)" strokeWidth="1"
          strokeDasharray={i === 2 ? "4 4" : "none"} />
      ))}
      {/* Sweep */}
      <motion.line x1="190" y1="145" x2="190" y2="25"
        stroke="#FF5500" strokeWidth="2" strokeLinecap="round"
        style={{ transformOrigin: "190px 145px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
      {/* Sweep arc fill */}
      <motion.path
        d={`M 190 145 L 190 25 A 120 120 0 0 1 310 145 Z`}
        fill="rgba(255,85,0,0.05)"
        style={{ transformOrigin: "190px 145px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
      {/* Center */}
      <circle cx="190" cy="145" r="10" fill="#FF5500" />
      <circle cx="190" cy="145" r="5" fill="white" />
      {/* Detection dots */}
      {[[120, 60], [260, 80], [310, 145], [280, 220], [120, 200]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={4}
          fill="#FF5500" opacity={0}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.6, repeatDelay: 3 }} />
      ))}
      {/* Distance labels */}
      {[{ r: 40, label: "40m" }, { r: 80, label: "80m" }, { r: 120, label: "120m" }].map(({ r, label }) => (
        <text key={label} x={190 + r + 6} y={148} fontSize="9" fill="rgba(255,85,0,0.5)" fontWeight="700" fontFamily="monospace">{label}</text>
      ))}
    </svg>
  );
}

function BatteryViz() {
  const bars = [0.95, 0.82, 0.71, 0.88, 0.65, 0.90];
  return (
    <svg width="380" height="290" viewBox="0 0 380 290">
      {/* Battery outline */}
      <rect x="80" y="60" width="220" height="170" rx="16" fill="none" stroke="rgba(22,163,74,0.3)" strokeWidth="2" />
      <rect x="300" y="100" width="20" height="90" rx="4" fill="rgba(22,163,74,0.25)" />
      {/* Fill bars */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.rect key={i}
          x={90 + i * 40} y="70" width="30" height={0}
          rx="4" fill="#16A34A" opacity={0.8 - i * 0.04}
          animate={{ height: [0, 150], y: [220, 70] }}
          transition={{ duration: 1.5, delay: i * 0.12, repeat: Infinity, repeatDelay: 2.5 }} />
      ))}
      {/* Percentage */}
      <motion.text x="190" y="165" textAnchor="middle"
        fontSize="42" fontWeight="900" fill="#16A34A" fontFamily="'Space Grotesk', sans-serif"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}>
        94%
      </motion.text>
      <text x="190" y="188" textAnchor="middle" fontSize="11" fill="rgba(22,163,74,0.6)" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.1em">
        CHARGED
      </text>
      {/* Bolt icon lines */}
      <motion.path d="M 196 72 L 184 92 L 190 92 L 184 112" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
        animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }} />
    </svg>
  );
}

function PayloadViz() {
  return (
    <svg width="380" height="290" viewBox="0 0 380 290">
      {/* Drone body */}
      <rect x="150" y="30" width="80" height="55" rx="12" fill="#F1F4FA" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
      <circle cx="190" cy="58" r="10" fill="#FF5500" />
      {/* Rotor arms */}
      {[[150, 40, 110, 20], [230, 40, 270, 20], [150, 75, 110, 95], [230, 75, 270, 95]].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,0,0,0.18)" strokeWidth="2.5" strokeLinecap="round" />
          <motion.ellipse cx={x2} cy={y2} rx="18" ry="4" fill="rgba(255,85,0,0.15)"
            animate={{ scaleX: [1, 0.3, 1] }} transition={{ duration: 0.1, repeat: Infinity }} />
        </g>
      ))}
      {/* Winch line */}
      <motion.line x1="190" y1="85" x2="190" y2={0}
        stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeDasharray="3 3"
        animate={{ y2: [85, 200, 85] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      {/* Package */}
      <motion.g animate={{ y: [0, 115, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <rect x="168" y="87" width="44" height="36" rx="6" fill="#FF5500" />
        <line x1="168" y1="105" x2="212" y2="105" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <line x1="190" y1="87" x2="190" y2="123" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      </motion.g>
      {/* Landing zone */}
      <ellipse cx="190" cy="250" rx="40" ry="12" fill="rgba(22,163,74,0.12)" stroke="rgba(22,163,74,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="190" y="255" textAnchor="middle" fontSize="8" fill="#16A34A" fontWeight="800" fontFamily="sans-serif">LANDING ZONE</text>
    </svg>
  );
}

function CommsViz() {
  return (
    <svg width="380" height="290" viewBox="0 0 380 290">
      {/* Signal rings */}
      {[40, 80, 120].map((r, i) => (
        <motion.circle key={i} cx="190" cy="145" r={r}
          fill="none" stroke="#2563EB" strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: [0.5, 1.5], opacity: [0.7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
          style={{ transformOrigin: "190px 145px" }} />
      ))}
      {/* Center node */}
      <circle cx="190" cy="145" r="24" fill="rgba(37,99,235,0.12)" stroke="#2563EB" strokeWidth="1.5" />
      <circle cx="190" cy="145" r="12" fill="#2563EB" />
      <circle cx="190" cy="145" r="5" fill="white" />
      {/* Data points */}
      {[[110, 80], [270, 80], [310, 180], [80, 190], [190, 40]].map(([x, y], i) => (
        <g key={i}>
          <motion.line x1="190" y1="145" x2={x} y2={y}
            stroke="rgba(37,99,235,0.25)" strokeWidth="1"
            animate={{ opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
          <motion.circle cx={x} cy={y} r={6}
            fill="rgba(37,99,235,0.15)" stroke="#2563EB" strokeWidth="1.5"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
        </g>
      ))}
      {/* Labels */}
      <text x="190" y="250" textAnchor="middle" fontSize="9" fill="rgba(37,99,235,0.5)" fontWeight="700" fontFamily="monospace" letterSpacing="0.15em">5G + SATELLITE UPLINK</text>
    </svg>
  );
}

function AutonomyViz() {
  const nodes = [
    { x: 50, y: 145, label: "INPUT" },
    { x: 150, y: 90, label: "LIDAR" },
    { x: 150, y: 145, label: "GPS" },
    { x: 150, y: 200, label: "WIND" },
    { x: 250, y: 120, label: "ROUTE" },
    { x: 250, y: 170, label: "AVOID" },
    { x: 330, y: 145, label: "OUTPUT" },
  ];
  const edges: [number, number][] = [[0,1],[0,2],[0,3],[1,4],[2,4],[2,5],[3,5],[4,6],[5,6]];
  return (
    <svg width="380" height="290" viewBox="0 0 380 290">
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(124,58,237,0.25)" strokeWidth="1.5"
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 1.6 + (i % 3) * 0.4, repeat: Infinity, delay: i * 0.2 }} />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle cx={n.x} cy={n.y} r={i === 0 || i === 6 ? 14 : 10}
            fill={i === 6 ? "#7C3AED" : "rgba(124,58,237,0.12)"} stroke="#7C3AED" strokeWidth="1.5"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5 + i * 0.2, repeat: Infinity }} />
          <text x={n.x} y={n.y - 18} textAnchor="middle" fontSize="8" fill="rgba(124,58,237,0.6)" fontWeight="800" fontFamily="sans-serif">{n.label}</text>
        </g>
      ))}
      {/* Moving decision packets */}
      {[[0, 1], [1, 4], [4, 6]].map(([ai, bi], i) => {
        const a = nodes[ai], b = nodes[bi];
        return (
          <motion.circle key={`pk${i}`} r="4" fill="#7C3AED"
            initial={{ cx: a.x, cy: a.y }}
            animate={{ cx: [a.x, b.x], cy: [a.y, b.y] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.5, repeatDelay: 1.8 }} />
        );
      })}
    </svg>
  );
}

function TechViz({ id }: { id: string }) {
  switch (id) {
    case "ai":      return <AiViz />;
    case "lidar":   return <LidarViz />;
    case "battery": return <BatteryViz />;
    case "payload": return <PayloadViz />;
    case "comms":   return <CommsViz />;
    case "auto":    return <AutonomyViz />;
    default:        return <AiViz />;
  }
}

/* ─── Main section ─────────────────────────── */
export function TechnologySection() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];

  return (
    <section id="technology" className="relative overflow-hidden"
      style={{ background: "#FFFFFF", padding: "9rem 0" }}>

      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "rgba(0,0,0,0.06)" }}/>

      <div className="max-w-[88rem] mx-auto px-6 lg:px-10">

        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px block" style={{ background: "#FF5500" }}/>
          <span style={{ color: "#FF5500", fontSize: 10, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase" }}>Core Technology</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — nav */}
          <div>
            <h2 className="font-black uppercase leading-[0.9] mb-14"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)", letterSpacing: "-0.035em", fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>
              Built for<br/>the future<br/>of flight.
            </h2>

            <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              {SLIDES.map((s, i) => {
                const Icon = s.icon;
                const active = i === current;
                return (
                  <button key={s.id} onClick={() => setCurrent(i)}
                    className="w-full flex items-center justify-between py-4 text-left group transition-all duration-200"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                        style={{ background: active ? "#FF5500" : "rgba(0,0,0,0.04)" }}>
                        <Icon size={16} style={{ color: active ? "white" : "#8892A4" }}/>
                      </div>
                      <span className="text-sm font-bold uppercase tracking-[0.08em] transition-colors"
                        style={{ color: active ? "#FF5500" : "#4B5675" }}>
                        {s.label}
                      </span>
                    </div>
                    <ChevronRight size={16} className="transition-transform duration-200"
                      style={{ color: active ? "#FF5500" : "rgba(0,0,0,0.15)", transform: active ? "translateX(2px)" : "none" }}/>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — detail */}
          <AnimatePresence mode="wait">
            <motion.div key={slide.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-28">

              {/* Visualization */}
              <div className="w-full rounded-2xl overflow-hidden relative flex items-center justify-center mb-8"
                style={{ height: "300px", background: "#F7F9FC", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: "#FF5500", opacity: 0.6 }}/>
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse at 50% 50%, rgba(255,85,0,0.05) 0%, transparent 65%)"
                }}/>
                <TechViz id={slide.id}/>
              </div>

              <h3 className="font-black uppercase mb-4 leading-tight"
                style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)", letterSpacing: "-0.015em", fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>
                {slide.headline}
              </h3>
              <p className="leading-relaxed mb-10 text-sm" style={{ color: "#6B7280" }}>{slide.body}</p>

              <div className="grid grid-cols-3 gap-4 pt-8" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                {slide.stats.map(s => (
                  <div key={s.l}>
                    <div className="font-black mb-1.5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem", color: "#0A0F1E", letterSpacing: "-0.02em" }}>{s.v}</div>
                    <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, color: "#9CA3AF" }}>{s.l}</div>
                  </div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
