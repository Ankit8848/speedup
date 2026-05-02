import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation2, Clock, Package, Play, RotateCcw } from "lucide-react";

export function SimulationSection() {
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const start = () => { if (simulating) return; setDone(false); setProgress(0); setSimulating(true); };
  const reset = () => { setSimulating(false); setProgress(0); setDone(false); };

  useEffect(() => {
    if (!simulating) return;
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setSimulating(false); setDone(true); return 100; }
        return p + 1;
      });
    }, 55);
    return () => clearInterval(t);
  }, [simulating]);

  const eta = simulating ? Math.max(0, 9 - Math.floor(progress / 12)) : done ? 0 : null;

  return (
    <section id="simulation" className="relative overflow-hidden"
      style={{ background: "#010b19", padding: "9rem 0" }}>

      <div className="absolute -top-40 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.05)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>Live Simulation</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
          <h2
            className="font-black uppercase text-white leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Watch a delivery<br />happen live.
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-sm">
            Hit the button. Watch your order launch, fly, and land — all in under 10 simulated minutes.
          </p>
        </div>

        {/* Sim window — Flytrex glass card style */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>

          {/* Window bar */}
          <div className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {["#FF5F57","#FFBD2E","#28C840"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
              </div>
              <span className="text-xs text-white/25 font-medium">SpeedUp Flight Simulator — Orlando, FL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full"
                style={{ background: simulating ? "#28C840" : done ? "#FF5500" : "rgba(255,255,255,0.2)" }} />
              <span className="text-[10px] font-bold text-white/25 uppercase tracking-widest">
                {simulating ? "In Flight" : done ? "Delivered" : "Standby"}
              </span>
            </div>
          </div>

          {/* Map viewport */}
          <div className="relative overflow-hidden" style={{ height: "420px", background: "#010b19" }}>
            {/* Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }} />
            {/* Radial glow at center */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(255,85,0,0.03) 0%, transparent 60%)"
            }} />

            {/* Route SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 22 74 Q 40 50 78 26" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" strokeDasharray="2,2" />
              {(simulating || done) && (
                <motion.path d="M 22 74 Q 40 50 78 26" fill="none" stroke="#FF5500" strokeWidth="0.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: progress / 100 }}
                  style={{ filter: "drop-shadow(0 0 4px rgba(255,85,0,0.7))" }} />
              )}
            </svg>

            {/* Hub pin */}
            <div className="absolute" style={{ bottom: "24%", left: "20%" }}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full relative" style={{ background: "#FF5500", boxShadow: "0 0 12px rgba(255,85,0,0.5)" }}>
                  {simulating && <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-40" />}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Hub</span>
              </div>
            </div>

            {/* Dest pin */}
            <div className="absolute" style={{ top: "22%", right: "20%" }}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full border border-white/20 transition-all duration-500"
                  style={{ background: done ? "#28C840" : "rgba(255,255,255,0.1)", boxShadow: done ? "0 0 12px rgba(40,200,64,0.5)" : "none" }} />
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">You</span>
              </div>
            </div>

            {/* Drone dot */}
            {(simulating || done) && (
              <div className="absolute z-20 transition-all duration-100" style={{
                top: `calc(74% - ${progress * 0.48}% - 16px)`,
                left: `calc(22% + ${progress * 0.56}% - 16px)`,
              }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "#FF5500", boxShadow: "0 0 24px rgba(255,85,0,0.7)" }}>
                  <Navigation2 className="w-3.5 h-3.5 text-white rotate-45" fill="white" />
                </div>
              </div>
            )}

            {/* HUD panel */}
            <div className="absolute top-4 left-4 rounded-xl p-4 min-w-[140px]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
              <div className="text-[9px] font-black tracking-widest text-white/25 uppercase mb-3">Flight HUD</div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-[11px] text-white/35"><Clock className="w-3 h-3" /> ETA</div>
                <span className="text-sm font-black" style={{ color: "#FF5500", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {eta !== null ? `${eta}m` : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-[11px] text-white/35"><Package className="w-3 h-3" /> Status</div>
                <span className="text-[11px] font-bold text-white/50">{done ? "✓ Done" : simulating ? "Flying" : "Standby"}</span>
              </div>
              {(simulating || done) && (
                <div>
                  <div className="flex justify-between text-[9px] text-white/25 mb-1"><span>Progress</span><span>{progress}%</span></div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: "#FF5500" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Done toast */}
            {done && (
              <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-2xl px-8 py-4 text-center whitespace-nowrap"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
                <div className="text-2xl mb-1">🎉</div>
                <div className="font-black text-white text-sm uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Delivered in 8 minutes</div>
                <div className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">98% faster than a courier</div>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="px-6 py-4 flex items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            <span className="text-[11px] text-white/25">
              Route: <span className="text-white/40 font-medium">SpeedUp Hub → 123 Lake Ave, Orlando FL</span>
            </span>
            <div className="flex gap-3">
              {(simulating || done) && (
                <button onClick={reset}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] transition-colors"
                  style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
              <button onClick={start} disabled={simulating} data-testid="btn-simulate"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-[0.1em] text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "#FF5500", boxShadow: "0 4px 16px rgba(255,85,0,0.3)" }}>
                <Play className="w-3.5 h-3.5 fill-white" />
                {done ? "Run Again" : simulating ? "Simulating…" : "Simulate Delivery"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
