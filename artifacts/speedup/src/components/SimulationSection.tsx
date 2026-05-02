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
    <section id="simulation" className="py-36" style={{ background: "#F5F3EF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-10 h-px" style={{ background: "#FF5500" }} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FF5500" }}>Live Simulation</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <h2 className="font-black text-[#0D0F14] leading-[1.0]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
            Watch a delivery<br />happen in real time.
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed max-w-md">
            Hit the button. Watch your order launch, fly, and land — all in under 10 simulated minutes.
          </p>
        </div>

        {/* Sim window */}
        <div className="rounded-3xl overflow-hidden" style={{ background: "#0D0F14", border: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Top bar */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/08">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {["#FF5F57","#FFBD2E","#28C840"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
              </div>
              <span className="text-xs text-white/30 font-medium">SpeedUp Delivery Simulator — Orlando, FL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: simulating ? "#28C840" : done ? "#3B82F6" : "rgba(255,255,255,0.2)", animation: simulating ? "pulse 1s infinite" : "none" }} />
              <span className="text-xs font-bold text-white/30 uppercase tracking-widest">
                {simulating ? "In Flight" : done ? "Delivered" : "Standby"}
              </span>
            </div>
          </div>

          {/* Map */}
          <div className="relative h-[400px] overflow-hidden" style={{
            background: "radial-gradient(ellipse at 30% 70%, rgba(255,85,0,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255,85,0,0.03) 0%, transparent 50%), #0D0F14"
          }}>
            {/* Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }} />

            {/* Route path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 22 74 Q 40 50 78 26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" strokeDasharray="2,2" />
              {(simulating || done) && (
                <motion.path d="M 22 74 Q 40 50 78 26" fill="none" stroke="#FF5500" strokeWidth="0.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: progress / 100 }}
                  style={{ filter: "drop-shadow(0 0 3px rgba(255,85,0,0.6))" }} />
              )}
            </svg>

            {/* Hub */}
            <div className="absolute" style={{ bottom: "24%", left: "20%" }}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-full border-2 border-white/20 shadow-lg relative" style={{ background: "#FF5500" }}>
                  {simulating && <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-30" />}
                </div>
                <div className="text-[9px] font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded-full">Hub</div>
              </div>
            </div>

            {/* Destination */}
            <div className="absolute" style={{ top: "22%", right: "20%" }}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-full border-2 border-white/20" style={{ background: done ? "#28C840" : "#1A2A4A" }}>
                  {done && <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />}
                </div>
                <div className="text-[9px] font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded-full">You</div>
              </div>
            </div>

            {/* Drone */}
            {(simulating || done) && (
              <motion.div className="absolute z-20" style={{
                top: `calc(74% - ${progress * 0.48}% - 18px)`,
                left: `calc(22% + ${progress * 0.56}% - 18px)`,
              }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#FF5500", boxShadow: "0 0 20px rgba(255,85,0,0.6)" }}>
                  <Navigation2 className="w-4 h-4 text-white rotate-45" fill="white" />
                </div>
              </motion.div>
            )}

            {/* Status panel */}
            <div className="absolute top-4 left-4 rounded-2xl p-4 min-w-[150px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
              <div className="text-[9px] font-black tracking-widest text-white/30 uppercase mb-3">Flight Status</div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs text-white/40"><Clock className="w-3 h-3" /> ETA</div>
                <span className="text-sm font-black" style={{ color: "#FF5500" }}>{eta !== null ? `${eta} min` : "—"}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs text-white/40"><Package className="w-3 h-3" /> Status</div>
                <span className="text-xs font-bold text-white/60">{done ? "✓ Done" : simulating ? "Flying" : "Standby"}</span>
              </div>
              {(simulating || done) && (
                <div>
                  <div className="flex justify-between text-[9px] text-white/30 mb-1"><span>Progress</span><span>{progress}%</span></div>
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: "#FF5500" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Done toast */}
            {done && (
              <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-2xl px-6 py-4 text-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
                <div className="text-xl mb-1">🎉</div>
                <div className="font-black text-white text-sm">Delivered in 8 minutes</div>
                <div className="text-xs text-white/30 mt-0.5">98% faster than a courier van</div>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="px-6 py-5 flex items-center justify-between gap-4 border-t border-white/08">
            <div className="text-xs text-white/30">
              Route: <span className="text-white/50 font-medium">SpeedUp Hub → 123 Lake Ave, Orlando FL</span>
            </div>
            <div className="flex gap-3">
              {(simulating || done) && (
                <button onClick={reset} className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white/50 border border-white/10 hover:border-white/20 transition-colors">
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              )}
              <button onClick={start} disabled={simulating} data-testid="btn-simulate"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "#FF5500", boxShadow: "0 4px 20px rgba(255,85,0,0.3)" }}>
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
