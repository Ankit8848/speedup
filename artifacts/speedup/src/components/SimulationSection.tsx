import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Crosshair, Navigation2 } from "lucide-react";

export function SimulationSection() {
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    setProgress(0);
  };

  useEffect(() => {
    if (!simulating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setSimulating(false), 2000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [simulating]);

  return (
    <section className="py-32 bg-background relative" id="simulation">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Live Simulation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Experience our routing algorithm in real-time.</p>
        </div>

        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-4 border border-primary/20 overflow-hidden relative">
          
          {/* Map Canvas Mockup */}
          <div className="w-full h-[400px] md:h-[500px] bg-[#020814] rounded-xl relative overflow-hidden border border-border/50">
            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            
            {/* Hub */}
            <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-primary rounded-full box-glow animate-pulse z-10" />
            <MapPin className="absolute bottom-[calc(25%+12px)] left-[calc(25%-8px)] text-primary w-5 h-5" />
            
            {/* Destination */}
            <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-secondary rounded-full z-10" style={{ boxShadow: "0 0 15px rgba(123,47,255,0.8)" }} />
            <Crosshair className="absolute top-[calc(25%-12px)] right-[calc(25%-8px)] text-secondary w-5 h-5" />

            {/* Path SVG — viewBox 0 0 100 100, percentages not valid in path d */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M 25 75 Q 40 50 75 25" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="0.5" 
                strokeDasharray="2,2" 
              />
              {simulating && (
                <motion.path 
                  d="M 25 75 Q 40 50 75 25" 
                  fill="none" 
                  stroke="#00D4FF" 
                  strokeWidth="0.8" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  style={{ filter: "drop-shadow(0 0 2px #00D4FF)" }}
                />
              )}
            </svg>

            {/* Drone Icon — positioned via interpolated style */}
            {simulating && (
              <motion.div 
                className="absolute w-6 h-6 z-20 text-primary"
                style={{ 
                  top: `calc(75% - ${progress * 0.5}% - 12px)`,
                  left: `calc(25% + ${progress * 0.5}% - 12px)`,
                }}
              >
                <Navigation2 className="w-full h-full rotate-45" fill="currentColor" />
              </motion.div>
            )}

            {/* Overlay UI */}
            <div className="absolute top-4 left-4 glass-card p-4 rounded-lg border border-border/50 text-sm">
              <div className="font-bold mb-2">Flight Status</div>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${simulating ? 'bg-green-500 animate-pulse' : 'bg-muted'}`} />
                <span className="text-muted-foreground">{simulating ? 'In Transit' : 'Standby'}</span>
              </div>
              <div className="text-primary font-mono mt-2">
                ETA: {simulating ? `${Math.max(0, 10 - Math.floor(progress / 10))} min` : '--'}
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <button 
                data-testid="btn-simulate"
                onClick={handleSimulate}
                disabled={simulating}
                className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 box-glow transition-all"
              >
                {simulating ? 'Simulating...' : 'Simulate Delivery'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
