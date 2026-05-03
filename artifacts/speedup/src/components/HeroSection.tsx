import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

/* ─── Bezier math ─────────────────────────── */
function bez(t: number, p0: [number, number], p1: [number, number], p2: [number, number]): [number, number] {
  const m = 1 - t;
  return [m*m*p0[0]+2*m*t*p1[0]+t*t*p2[0], m*m*p0[1]+2*m*t*p1[1]+t*t*p2[1]];
}

const HUB:  [number,number] = [44, 172];
const CTRL: [number,number] = [172, 50];
const DEST: [number,number] = [296, 138];

/* ─── Live Delivery Tracker ───────────────── */
function FlightTracker() {
  const [t, setT] = useState(0.28);
  const rafRef = useRef<number>(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const tick = (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      setT(p => { const n = p + dt * 0.055; return n >= 1 ? 0.02 : n; });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const [dx, dy] = bez(t, HUB, CTRL, DEST);

  /* trail polyline */
  const TRAIL_STEPS = 30;
  const numPts = Math.max(2, Math.round(t * TRAIL_STEPS));
  const trailD = Array.from({ length: numPts }, (_, i) => {
    const s = (i / (numPts - 1)) * t;
    const [x, y] = bez(s, HUB, CTRL, DEST);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

  const eta  = Math.max(0, Math.round((1 - t) * 9));
  const spd  = 112 + Math.round(Math.sin(t * 60) * 6);
  const pct  = Math.round(t * 100);

  return (
    <div style={{
      borderRadius: 24, background: "#fff", overflow: "hidden", width: 340, flexShrink: 0,
      boxShadow: "0 32px 80px rgba(0,0,0,0.13), 0 8px 24px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)",
    }}>
      {/* Header */}
      <div style={{ background: "#FF5500", padding: "13px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} className="animate-pulse" />
          <span style={{ color: "white", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>Live Delivery</span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 700, fontFamily: "monospace" }}>SU-4829</span>
      </div>

      {/* Map */}
      <div style={{ background: "#F7F9FC" }}>
        <svg width="340" height="188" viewBox="0 0 340 188" style={{ display: "block" }}>
          {/* Street grid */}
          {[50,100,150,200,250,300].map(x => <line key={`v${x}`} x1={x} y1={0} x2={x} y2={188} stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>)}
          {[40,80,120,160].map(y => <line key={`h${y}`} x1={0} y1={y} x2={340} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>)}
          {/* City blocks */}
          <rect x="58"  y="48"  width="32" height="18" rx="3" fill="rgba(0,0,0,0.05)"/>
          <rect x="108" y="28"  width="42" height="24" rx="3" fill="rgba(0,0,0,0.04)"/>
          <rect x="168" y="88"  width="36" height="20" rx="3" fill="rgba(0,0,0,0.05)"/>
          <rect x="218" y="48"  width="28" height="32" rx="3" fill="rgba(0,0,0,0.04)"/>
          <rect x="138" y="128" width="32" height="20" rx="3" fill="rgba(0,0,0,0.05)"/>
          <rect x="68"  y="118" width="36" height="16" rx="3" fill="rgba(0,0,0,0.04)"/>
          <rect x="248" y="98"  width="28" height="24" rx="3" fill="rgba(0,0,0,0.05)"/>
          <rect x="88"  y="78"  width="20" height="28" rx="3" fill="rgba(0,0,0,0.04)"/>
          <rect x="185" y="130" width="40" height="18" rx="3" fill="rgba(0,0,0,0.04)"/>
          {/* Planned route */}
          <path d="M 44 172 Q 172 50 296 138" fill="none" stroke="rgba(255,85,0,0.18)" strokeWidth="2" strokeDasharray="5 4"/>
          {/* Flown trail */}
          {numPts > 1 && <path d={trailD} fill="none" stroke="#FF5500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
          {/* Hub */}
          <circle cx={44}  cy={172} r={14} fill="rgba(255,85,0,0.12)"/>
          <circle cx={44}  cy={172} r={6}  fill="#FF5500"/>
          <circle cx={44}  cy={172} r={2.5} fill="white"/>
          <text x={44} y={162} textAnchor="middle" fill="#FF5500" fontSize="7" fontWeight="800" fontFamily="sans-serif">HUB</text>
          {/* Destination */}
          <circle cx={296} cy={138} r={14} fill="rgba(22,163,74,0.12)"/>
          <circle cx={296} cy={138} r={6}  fill="#16A34A"/>
          <circle cx={296} cy={138} r={2.5} fill="white"/>
          <text x={296} y={128} textAnchor="middle" fill="#16A34A" fontSize="7" fontWeight="800" fontFamily="sans-serif">YOU</text>
          {/* Drone glow */}
          <circle cx={dx} cy={dy} r={16} fill="rgba(255,85,0,0.18)"/>
          <circle cx={dx} cy={dy} r={8}  fill="#FF5500"/>
          <circle cx={dx} cy={dy} r={3}  fill="white"/>
        </svg>
      </div>

      {/* Telemetry row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {[
          { l: "ETA",      v: eta === 0 ? "Arrived!" : `${eta} min`, hi: true },
          { l: "Speed",    v: `${spd} km/h`, hi: false },
          { l: "Progress", v: `${pct}%`,     hi: false },
        ].map((item, i) => (
          <div key={i} style={{ padding: "10px 0", textAlign: "center", borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
            <div style={{ fontSize: 9, color: "#9CA3AF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{item.l}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.hi ? "#FF5500" : "#0A0F1E", fontFamily: "'Space Grotesk', sans-serif" }}>{item.v}</div>
          </div>
        ))}
      </div>

      {/* Order card */}
      <div style={{ padding: "12px 16px 16px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FFF5F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🍕</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0A0F1E", marginBottom: 6 }}>Marco's Pizzeria</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "#FF5500", borderRadius: 2, transition: "width 0.08s linear" }}/>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#FF5500", flexShrink: 0 }}>{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────── */
export function HeroSection() {
  const [, navigate] = useLocation();

  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ minHeight: "100dvh", background: "#FFFFFF" }}>

      {/* Background: fine city-grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hg" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(10,15,30,0.04)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hg)"/>
        </svg>
      </div>

      {/* Warm glow — right */}
      <div className="absolute top-0 right-0 pointer-events-none" style={{
        width: "55%", height: "90%",
        background: "radial-gradient(ellipse at 65% 25%, rgba(255,85,0,0.055) 0%, transparent 60%)",
      }}/>
      {/* Cool glow — left bottom */}
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{
        width: "35%", height: "50%",
        background: "radial-gradient(ellipse at 20% 80%, rgba(37,99,235,0.04) 0%, transparent 65%)",
      }}/>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-[88rem] mx-auto px-6 lg:px-10 w-full min-h-dvh flex items-center">
        <div className="w-full grid lg:grid-cols-[1fr_auto] gap-16 items-center pt-36 pb-24">

          {/* ── LEFT — Copy ──────────────────── */}
          <div className="min-w-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-10"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: "rgba(255,85,0,0.09)", border: "1px solid rgba(255,85,0,0.22)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FF5500" }}/>
                <span style={{ color: "#FF5500", fontSize: 10, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                  Now Operational · 6 US Cities
                </span>
              </div>
            </motion.div>

            {/* ── Headline ── */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900,
                fontSize: "clamp(4rem, 10vw, 10.5rem)", lineHeight: 0.88,
                letterSpacing: "-0.04em", textTransform: "uppercase", color: "#0A0F1E",
                marginBottom: "1.75rem",
              }}
            >
              Backyard<br/>
              <span style={{ color: "#FF5500", display: "inline-block" }}>Delivery.</span><br/>
              Reinvented.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{ color: "#6B7280", fontSize: "1.125rem", lineHeight: 1.7, maxWidth: "34rem", marginBottom: "2.5rem" }}
            >
              Fully autonomous drones deliver from your favorite restaurants and stores to your exact backyard —
              under 10 minutes, zero traffic, every time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => navigate("/for-business")}
                className="inline-flex items-center gap-2 text-white font-black uppercase transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  padding: "1rem 2.25rem", borderRadius: 100, border: "none", cursor: "pointer",
                  fontSize: "0.78rem", letterSpacing: "0.14em",
                  background: "#FF5500",
                  boxShadow: "0 8px 32px rgba(255,85,0,0.38), 0 2px 8px rgba(255,85,0,0.20)",
                }}
              >
                Get Early Access <ArrowRight size={15}/>
              </button>
              <button
                onClick={() => navigate("/how-it-works")}
                className="inline-flex items-center gap-2 font-bold uppercase transition-all hover:border-black/30 hover:text-[#0A0F1E]"
                style={{
                  padding: "1rem 2.25rem", borderRadius: 100, border: "1.5px solid rgba(0,0,0,0.14)", cursor: "pointer",
                  fontSize: "0.78rem", letterSpacing: "0.12em", color: "#4B5675", background: "transparent",
                }}
              >
                How It Works
              </button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
              className="flex flex-wrap gap-x-10 gap-y-4 mt-12 pt-10"
              style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
            >
              {[
                { val: "<10", suf: "min", label: "Avg delivery time" },
                { val: "100K+", suf: "", label: "Deliveries flown" },
                { val: "0",    suf: "", label: "Incidents to date" },
                { val: "FAA",  suf: "", label: "Part 135 certified" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900,
                    fontSize: "1.65rem", lineHeight: 1, letterSpacing: "-0.03em", color: "#0A0F1E"
                  }}>
                    {s.val}<span style={{ color: "#FF5500" }}>{s.suf}</span>
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.16em", color: "#9CA3AF", marginTop: 5 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Live tracker ─────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex flex-col items-center gap-4"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-12 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(255,85,0,0.07) 0%, transparent 60%)",
            }}/>

            {/* Top chip */}
            <motion.div
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
              className="self-start ml-8 flex items-center gap-2.5 px-4 py-2.5 rounded-full"
              style={{ background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.09)", border: "1px solid rgba(0,0,0,0.06)", fontSize: 11, fontWeight: 700, color: "#0A0F1E" }}
            >
              ⚡ <span>Cruise speed: 120 km/h</span>
            </motion.div>

            <FlightTracker />

            {/* Bottom chips */}
            <div className="flex gap-2">
              {[
                "🛡 FAA Part 135",
                "📍 ±10 cm precision",
                "🔋 100% renewable",
              ].map(chip => (
                <motion.div
                  key={chip}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }}
                  className="px-3.5 py-2 rounded-full text-xs font-bold"
                  style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)", color: "#4B5675" }}
                >
                  {chip}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C4CBD8" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 40, background: "linear-gradient(180deg, #FF5500 0%, transparent 100%)", opacity: 0.55 }}
        />
      </motion.div>
    </section>
  );
}
