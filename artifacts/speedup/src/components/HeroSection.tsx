import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, MapPin } from "lucide-react";

function DroneSVG() {
  return (
    <motion.svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer glow ring */}
      <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(255,85,0,0.08)" strokeWidth="1" />
      <circle cx="160" cy="160" r="115" fill="none" stroke="rgba(255,85,0,0.05)" strokeWidth="1" />
      <circle cx="160" cy="160" r="90" fill="none" stroke="rgba(255,85,0,0.10)" strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Rotor arms */}
      <line x1="160" y1="160" x2="82" y2="82" stroke="rgba(10,15,30,0.18)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="160" y1="160" x2="238" y2="82" stroke="rgba(10,15,30,0.18)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="160" y1="160" x2="82" y2="238" stroke="rgba(10,15,30,0.18)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="160" y1="160" x2="238" y2="238" stroke="rgba(10,15,30,0.18)" strokeWidth="3" strokeLinecap="round"/>

      {/* Rotor hubs */}
      {[{cx:82,cy:82},{cx:238,cy:82},{cx:82,cy:238},{cx:238,cy:238}].map((pos, i) => (
        <g key={i}>
          <circle cx={pos.cx} cy={pos.cy} r="22" fill="rgba(255,85,0,0.05)" stroke="rgba(255,85,0,0.20)" strokeWidth="1"/>
          <circle cx={pos.cx} cy={pos.cy} r="6" fill="#FF5500" opacity="0.9"/>
          <motion.g
            style={{ originX: `${pos.cx}px`, originY: `${pos.cy}px` }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          >
            <ellipse cx={pos.cx} cy={pos.cy} rx="18" ry="4" fill="rgba(10,15,30,0.12)" />
          </motion.g>
        </g>
      ))}

      {/* Main body */}
      <rect x="130" y="130" width="60" height="60" rx="12" fill="#F1F4FA" stroke="rgba(10,15,30,0.12)" strokeWidth="1.5"/>
      <rect x="138" y="138" width="44" height="44" rx="8" fill="#FF5500" opacity="0.10"/>

      {/* Center LED */}
      <circle cx="160" cy="160" r="12" fill="#FF5500" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="160" cy="160" r="5" fill="white"/>

      {/* Camera gimbal */}
      <rect x="148" y="178" width="24" height="14" rx="6" fill="rgba(10,15,30,0.06)" stroke="rgba(10,15,30,0.12)" strokeWidth="1"/>
      <circle cx="160" cy="185" r="4" fill="rgba(10,15,30,0.10)" stroke="rgba(10,15,30,0.15)" strokeWidth="0.8"/>

      {/* Landing legs */}
      <line x1="142" y1="190" x2="136" y2="206" stroke="rgba(10,15,30,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="178" y1="190" x2="184" y2="206" stroke="rgba(10,15,30,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="130" y1="206" x2="142" y2="206" stroke="rgba(10,15,30,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="178" y1="206" x2="190" y2="206" stroke="rgba(10,15,30,0.15)" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Signal rings */}
      <motion.circle cx="160" cy="160" r="70" fill="none" stroke="#FF5500" strokeWidth="0.8"
        animate={{ scale: [1, 1.7], opacity: [0.25, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        style={{ originX: "160px", originY: "160px" }}
      />
      <motion.circle cx="160" cy="160" r="70" fill="none" stroke="#FF5500" strokeWidth="0.8"
        animate={{ scale: [1, 1.7], opacity: [0.15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
        style={{ originX: "160px", originY: "160px" }}
      />

      {/* Speed lines */}
      <motion.g animate={{ opacity: [0.25, 0.06, 0.25] }} transition={{ duration: 2, repeat: Infinity }}>
        <line x1="100" y1="270" x2="220" y2="270" stroke="#FF5500" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
        <line x1="110" y1="278" x2="210" y2="278" strokeWidth="1" stroke="#FF5500" strokeLinecap="round" opacity="0.15"/>
      </motion.g>
    </motion.svg>
  );
}

function FloatingCard({ icon: Icon, label, value, color, delay, style }: {
  icon: React.FC<any>; label: string; value: string; color: string; delay: number; style: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="absolute flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-sm pointer-events-none"
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        ...style,
      }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div>
        <div className="text-xs font-bold leading-none" style={{ color: "#0A0F1E" }}>{value}</div>
        <div className="text-[10px] mt-0.5 font-medium" style={{ color: "#8892A4" }}>{label}</div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100dvh", background: "#FFFFFF" }}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(10,15,30,0.06) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />

      {/* Soft orange glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,85,0,0.04) 0%, transparent 65%)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full min-h-dvh flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center w-full pt-36 pb-24">

          {/* LEFT — copy */}
          <div>
            {/* Eyebrow pill */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ background: "rgba(255,85,0,0.10)", border: "1px solid rgba(255,85,0,0.25)", color: "#FF5500" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FF5500" }} />
                Now Operational · 6 US Cities
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-black uppercase leading-[0.88]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8.5rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}
            >
              Backyard<br />
              <span style={{ color: "#FF5500" }}>Delivery.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: "#6B7280" }}>
              From your favorite restaurants and stores to your exact backyard — fully autonomous, under 10 minutes, zero traffic.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-3 mt-10">
              <button onClick={() => scrollTo("simulation")}
                className="flex items-center justify-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ padding: "0.9rem 2rem", fontSize: "0.8rem", background: "#FF5500", boxShadow: "0 8px 32px rgba(255,85,0,0.30)" }}>
                Get Early Access <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo("how-it-works")}
                className="flex items-center justify-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full transition-all"
                style={{ padding: "0.9rem 2rem", fontSize: "0.8rem", color: "#4B5675", border: "1px solid rgba(0,0,0,0.15)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.3)"; (e.currentTarget as HTMLElement).style.color = "#0A0F1E"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)"; (e.currentTarget as HTMLElement).style.color = "#4B5675"; }}
              >
                See How It Works
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              className="mt-10 pt-8 flex flex-wrap gap-x-8 gap-y-4"
              style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              {[
                { num: "<10", unit: "min", label: "Avg delivery" },
                { num: "100K+", unit: "", label: "Deliveries flown" },
                { num: "0", unit: "", label: "Incidents to date" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <div className="text-2xl font-black leading-none"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>
                    {s.num}<span style={{ color: "#FF5500" }}>{s.unit}</span>
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest mt-1"
                    style={{ color: "#9CA3AF" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — drone visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ height: "520px" }}
          >
            <div className="w-[380px] h-[380px]">
              <DroneSVG />
            </div>

            {/* Floating data cards */}
            <FloatingCard icon={Zap} label="Flight speed" value="120 km/h" color="#FF5500" delay={0.9}
              style={{ top: "8%", left: "-5%" }} />
            <FloatingCard icon={Shield} label="Safety record" value="100% Safe" color="#16A34A" delay={1.1}
              style={{ top: "20%", right: "-2%" }} />
            <FloatingCard icon={MapPin} label="Precision drop" value="±10 cm" color="#2563EB" delay={1.3}
              style={{ bottom: "18%", left: "-4%" }} />

            {/* Live delivery card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 right-0 rounded-2xl p-4"
              style={{
                background: "rgba(255,255,255,0.97)",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                minWidth: "190px",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#16A34A" }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#16A34A" }}>Live Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: "rgba(255,85,0,0.10)" }}>🍕</div>
                <div>
                  <div className="text-xs font-bold" style={{ color: "#0A0F1E" }}>Marco's Pizza</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="h-1 rounded-full overflow-hidden flex-1"
                      style={{ background: "rgba(0,0,0,0.08)", minWidth: "80px" }}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: "#FF5500" }}
                        animate={{ width: ["20%", "80%"] }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }} />
                    </div>
                    <span className="text-[10px] shrink-0" style={{ color: "#9CA3AF" }}>~4 min</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase"
          style={{ color: "#C4CBD8" }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 rounded-full"
          style={{ background: "linear-gradient(180deg, #FF5500 0%, transparent 100%)", opacity: 0.6 }} />
      </motion.div>
    </section>
  );
}
