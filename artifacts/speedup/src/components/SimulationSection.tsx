import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation2, Clock, Package, Play, RotateCcw, Zap, Wind, Battery } from "lucide-react";

const STAGES = [
  { label: "Order Confirmed", icon: Package, color: "#FF5500", pct: 0 },
  { label: "Drone Launching", icon: Zap, color: "#FACC15", pct: 15 },
  { label: "In Flight", icon: Navigation2, color: "#60A5FA", pct: 50 },
  { label: "Final Approach", icon: Wind, color: "#4ADE80", pct: 85 },
  { label: "Delivered ✓", icon: Battery, color: "#4ADE80", pct: 100 },
];

export function SimulationSection() {
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const activeStage = STAGES.findIndex((s, i) =>
    progress >= s.pct && (STAGES[i + 1] ? progress < STAGES[i + 1].pct : true)
  );

  const start = () => { if (simulating) return; setDone(false); setProgress(0); setSimulating(true); };
  const reset = () => { setSimulating(false); setProgress(0); setDone(false); };

  useEffect(() => {
    if (!simulating) return;
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setSimulating(false); setDone(true); return 100; }
        return p + 0.6;
      });
    }, 35);
    return () => clearInterval(t);
  }, [simulating]);

  const eta = done ? 0 : simulating ? Math.max(0, Math.round(9 - (progress / 100) * 9)) : null;

  return (
    <section id="simulation" className="relative overflow-hidden"
      style={{ background: "#010b19", padding: "9rem 0" }}>

      <div className="absolute -top-40 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.05)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>Interactive Demo</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
          <h2 className="font-black uppercase text-white leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}>
            Watch a delivery<br />happen live.
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-sm">
            Hit the button and watch your order go from hub to doorstep in real time.
          </p>
        </div>

        {/* Sim window */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>

          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3.5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {["#FF5F57", "#FFBD2E", "#28C840"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
              </div>
              <span className="text-[11px] text-white/20 font-medium tracking-wider">SpeedUp Flight Simulator · Orlando, FL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full"
                style={{ background: simulating ? "#28C840" : done ? "#FF5500" : "rgba(255,255,255,0.15)" }} />
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                {simulating ? "In Flight" : done ? "Delivered" : "Standby"}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px]">
            {/* Map viewport */}
            <div className="relative overflow-hidden" style={{ height: "440px", background: "#010b19" }}>
              {/* Grid */}
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
                backgroundSize: "50px 50px"
              }} />
              {/* Ambient glow center */}
              <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse at 50% 50%, rgba(255,85,0,0.03) 0%, transparent 65%)"
              }} />

              {/* Route path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Dashed route */}
                <path d="M 20 76 Q 38 52 78 24" fill="none" stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.5" strokeDasharray="1.5 2" />
                {/* Live progress */}
                {(simulating || done) && (
                  <motion.path d="M 20 76 Q 38 52 78 24" fill="none" stroke="#FF5500" strokeWidth="0.8"
                    initial={{ pathLength: 0 }} animate={{ pathLength: progress / 100 }}
                    style={{ filter: "drop-shadow(0 0 4px rgba(255,85,0,0.8))" }} />
                )}
              </svg>

              {/* Hub */}
              <div className="absolute flex flex-col items-center gap-1.5" style={{ bottom: "22%", left: "18%" }}>
                <div className="relative">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center z-10 relative"
                    style={{ background: "#FF5500", boxShadow: "0 0 16px rgba(255,85,0,0.6)" }}>
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  {simulating && <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,85,0,0.35)" }} />}
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.25)" }}>Hub</span>
              </div>

              {/* Destination */}
              <div className="absolute flex flex-col items-center gap-1.5" style={{ top: "18%", right: "19%" }}>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                  style={{
                    background: done ? "#4ADE80" : "rgba(255,255,255,0.06)",
                    borderColor: done ? "#4ADE80" : "rgba(255,255,255,0.2)",
                    boxShadow: done ? "0 0 16px rgba(74,222,128,0.5)" : "none",
                  }}>
                  {done && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.25)" }}>You</span>
              </div>

              {/* Drone dot */}
              {(simulating || done) && (
                <div className="absolute z-20" style={{
                  top: `calc(76% - ${progress * 0.52}% - 18px)`,
                  left: `calc(20% + ${progress * 0.58}% - 18px)`,
                }}>
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "#FF5500", boxShadow: "0 0 28px rgba(255,85,0,0.8)" }}>
                      <Navigation2 className="w-4 h-4 text-white rotate-45" fill="white" />
                    </div>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ background: "#FF5500" }} />
                  </div>
                </div>
              )}

              {/* HUD overlay */}
              <div className="absolute top-4 left-4 rounded-2xl p-4"
                style={{ background: "rgba(1,11,25,0.85)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", minWidth: "160px" }}>
                <div className="text-[8px] font-black tracking-widest uppercase mb-4"
                  style={{ color: "rgba(255,255,255,0.2)" }}>Flight Data</div>
                {[
                  { icon: Clock, label: "ETA", value: eta !== null ? `${eta} min` : "—", color: "#FF5500" },
                  { icon: Navigation2, label: "Speed", value: simulating ? "120 km/h" : "—", color: "#60A5FA" },
                  { icon: Battery, label: "Battery", value: simulating ? `${Math.round(100 - progress * 0.3)}%` : done ? "72%" : "—", color: "#4ADE80" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-center justify-between mb-2.5 last:mb-0">
                    <div className="flex items-center gap-2 text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                      <Icon className="w-3 h-3" style={{ color }} /> {label}
                    </div>
                    <span className="text-xs font-black" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {value}
                    </span>
                  </div>
                ))}
                {(simulating || done) && (
                  <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex justify-between text-[9px] mb-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>
                      <span>Route progress</span><span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: "#FF5500" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Delivered toast */}
              <AnimatePresence>
                {done && (
                  <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-2xl px-8 py-5 text-center whitespace-nowrap"
                    style={{ background: "rgba(4,17,36,0.95)", border: "1px solid rgba(74,222,128,0.3)", backdropFilter: "blur(20px)" }}>
                    <div className="text-2xl mb-1">🎉</div>
                    <div className="font-black text-white text-sm uppercase tracking-wide mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Delivered in 9 minutes
                    </div>
                    <div className="text-[10px] uppercase tracking-widest" style={{ color: "#4ADE80" }}>
                      98% faster than standard courier
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right panel — stages */}
            <div className="p-6 flex flex-col gap-2"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
              <div className="text-[9px] font-black tracking-widest uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.2)" }}>Flight Stages</div>
              {STAGES.map((stage, i) => {
                const active = i === activeStage && (simulating || done);
                const complete = progress >= stage.pct && (i < activeStage || done);
                const Icon = stage.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300"
                    style={{
                      background: active ? `${stage.color}12` : "transparent",
                      border: `1px solid ${active ? `${stage.color}30` : "transparent"}`
                    }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: complete || active ? `${stage.color}20` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${complete || active ? `${stage.color}40` : "rgba(255,255,255,0.06)"}`
                      }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: complete || active ? stage.color : "rgba(255,255,255,0.2)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold transition-colors duration-300"
                        style={{ color: active ? stage.color : complete ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }}>
                        {stage.label}
                      </div>
                      <div className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.15)" }}>
                        {stage.pct}% route
                      </div>
                    </div>
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: stage.color }} />
                    )}
                  </div>
                );
              })}

              <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="text-[9px] uppercase tracking-widest mb-2"
                  style={{ color: "rgba(255,255,255,0.15)" }}>
                  Route: Hub → 123 Lake Ave
                </div>
                <div className="flex gap-2">
                  {(simulating || done) && (
                    <button onClick={reset}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors"
                      style={{ color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  )}
                  <button onClick={start} disabled={simulating}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider text-white transition-all hover:opacity-90 disabled:opacity-40"
                    style={{ background: "#FF5500", boxShadow: "0 4px 16px rgba(255,85,0,0.3)" }}>
                    <Play className="w-3 h-3 fill-white" />
                    {done ? "Again" : simulating ? "Flying…" : "Launch"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
