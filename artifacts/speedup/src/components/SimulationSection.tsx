import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Crosshair, Navigation2, Clock, Zap, Package } from "lucide-react";

export function SimulationSection() {
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleSimulate = () => {
    if (simulating) return;
    setDone(false);
    setSimulating(true);
    setProgress(0);
  };

  const handleReset = () => { setSimulating(false); setProgress(0); setDone(false); };

  useEffect(() => {
    if (!simulating) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimulating(false);
          setDone(true);
          return 100;
        }
        return prev + 1;
      });
    }, 55);
    return () => clearInterval(interval);
  }, [simulating]);

  const eta = simulating ? Math.max(0, 9 - Math.floor(progress / 12)) : done ? 0 : null;

  return (
    <section className="py-28 section-gray" id="simulation">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4"
            style={{ background: "#FF550012", color: "#FF5500", border: "1px solid #FF550025" }}>
            <Zap className="w-4 h-4" /> Live Simulation
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Watch a Delivery <span style={{ color: "#FF5500" }}>Happen</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Experience our routing algorithm in real-time. Press the button below and watch your order fly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Map container */}
          <div className="bg-white rounded-3xl card-shadow-lg overflow-hidden border border-gray-100">
            {/* Map header bar */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {["#EF4444","#F59E0B","#10B981"].map(c => (
                    <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">SpeedUp Delivery Simulator — Orlando, FL</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${simulating ? 'animate-pulse' : ''}`}
                  style={{ background: simulating ? "#10B981" : done ? "#3B82F6" : "#D1D5DB" }} />
                <span className="text-xs font-semibold text-gray-400">
                  {simulating ? "IN FLIGHT" : done ? "DELIVERED" : "STANDBY"}
                </span>
              </div>
            </div>

            {/* Map canvas */}
            <div className="relative h-[420px] overflow-hidden"
              style={{ background: "linear-gradient(160deg, #EFF6FF 0%, #F0FDF4 50%, #FFF7ED 100%)" }}>

              {/* Grid */}
              <div className="absolute inset-0"
                style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

              {/* Street lines */}
              {[25, 50, 75].map(pct => (
                <div key={pct}>
                  <div className="absolute" style={{ top: `${pct}%`, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.8)" }} />
                  <div className="absolute" style={{ left: `${pct}%`, top: 0, bottom: 0, width: "2px", background: "rgba(255,255,255,0.8)" }} />
                </div>
              ))}

              {/* SVG route */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 22 72 Q 38 48 78 28" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" strokeDasharray="2,2" />
                {(simulating || done) && (
                  <motion.path d="M 22 72 Q 38 48 78 28" fill="none" stroke="#FF5500" strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    style={{ filter: "drop-shadow(0 0 3px rgba(255,85,0,0.5))" }} />
                )}
              </svg>

              {/* Hub pin */}
              <div className="absolute" style={{ bottom: "26%", left: "20%" }}>
                <div className="relative flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-white shadow-lg" style={{ background: "#FF5500" }}>
                    {simulating && <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "#FF5500", opacity: 0.4 }} />}
                  </div>
                  <div className="mt-1 bg-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm" style={{ color: "#FF5500" }}>
                    Hub
                  </div>
                </div>
              </div>

              {/* Destination pin */}
              <div className="absolute" style={{ top: "24%", right: "20%" }}>
                <div className="relative flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-white shadow-lg bg-[#071428]">
                    {done && <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-40" />}
                  </div>
                  <div className="mt-1 bg-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm text-gray-700">
                    You
                  </div>
                </div>
              </div>

              {/* Drone icon */}
              {(simulating || done) && (
                <motion.div className="absolute z-20" style={{
                  top: `calc(72% - ${progress * 0.44}% - 16px)`,
                  left: `calc(22% + ${progress * 0.56}% - 16px)`,
                  filter: "drop-shadow(0 4px 12px rgba(255,85,0,0.4))",
                }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "#FF5500" }}>
                    <Navigation2 className="w-4 h-4 text-white rotate-45" fill="white" />
                  </div>
                </motion.div>
              )}

              {/* Info panel */}
              <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 min-w-[160px]">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Flight Status</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      ETA
                    </div>
                    <span className="text-sm font-black" style={{ color: "#FF5500" }}>
                      {eta !== null ? `${eta} min` : "--"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Package className="w-3 h-3" />
                      Status
                    </div>
                    <span className="text-xs font-bold text-gray-700">
                      {done ? "Delivered ✓" : simulating ? "In Transit" : "Standby"}
                    </span>
                  </div>
                  {(simulating || done) && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: "#FF5500" }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Done celebration */}
              {done && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-4 border border-gray-100 text-center">
                  <div className="text-2xl mb-1">🎉</div>
                  <div className="font-black text-gray-900 text-sm">Delivered in 8 minutes!</div>
                  <div className="text-xs text-gray-400 mt-1">98% faster than a courier van</div>
                </motion.div>
              )}
            </div>

            {/* Bottom controls */}
            <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between gap-4">
              <div className="text-sm text-gray-400">
                Route: SpeedUp Hub → <span className="font-semibold text-gray-700">123 Lake Ave, Orlando FL</span>
              </div>
              <div className="flex gap-3">
                {(simulating || done) && (
                  <button onClick={handleReset}
                    className="px-5 py-2.5 rounded-full border-2 border-gray-200 text-sm font-bold text-gray-600 hover:border-gray-300 transition-colors">
                    Reset
                  </button>
                )}
                <button onClick={handleSimulate} disabled={simulating}
                  data-testid="btn-simulate"
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "#FF5500", boxShadow: "0 4px 18px rgba(255,85,0,0.3)" }}>
                  {done ? "Run Again" : simulating ? "Simulating…" : "▶  Simulate Delivery"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
