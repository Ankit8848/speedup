import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const FLOAT_DOTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: (((i * 1637) % 8) + 4) + "px",
  top: ((i * 1877) % 90) + "%",
  left: ((i * 2341) % 90) + "%",
  delay: (((i * 997) % 20) / 10) + "s",
  dur: (((i * 1123) % 20) / 10 + 3) + "s",
}));

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden flex items-center" id="hero"
      style={{ background: "linear-gradient(135deg, #ffffff 0%, #fff7f3 50%, #fff0e8 100%)" }}>

      {/* Floating orange circles – decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FF5500 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #FF5500 0%, transparent 70%)" }} />
        {FLOAT_DOTS.map(d => (
          <div key={d.id} className="absolute rounded-full opacity-20"
            style={{
              width: d.size, height: d.size, top: d.top, left: d.left,
              background: "#FF5500",
              animation: `floatDot ${d.dur} ease-in-out infinite alternate ${d.delay}`,
            }} />
        ))}
        <style>{`
          @keyframes floatDot {
            from { transform: translateY(0px); opacity: 0.12; }
            to   { transform: translateY(-14px); opacity: 0.28; }
          }
        `}</style>
      </div>

      {/* Animated drone SVG – right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-full pointer-events-none hidden lg:flex items-center justify-center">
        <motion.div
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-80 h-80"
        >
          {/* Drone body */}
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-2xl">
            {/* Shadow below */}
            <ellipse cx="120" cy="220" rx="60" ry="10" fill="rgba(255,85,0,0.15)" />
            {/* Arms */}
            <line x1="60" y1="80" x2="20" y2="50" stroke="#FF5500" strokeWidth="6" strokeLinecap="round"/>
            <line x1="180" y1="80" x2="220" y2="50" stroke="#FF5500" strokeWidth="6" strokeLinecap="round"/>
            <line x1="60" y1="130" x2="20" y2="160" stroke="#FF5500" strokeWidth="6" strokeLinecap="round"/>
            <line x1="180" y1="130" x2="220" y2="160" stroke="#FF5500" strokeWidth="6" strokeLinecap="round"/>
            {/* Motor housings */}
            {[[20,50],[220,50],[20,160],[220,160]].map(([x,y],i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="18" fill="#071428" />
                <circle cx={x} cy={y} r="12" fill="#FF5500" opacity="0.8" />
                <circle cx={x} cy={y} r="5" fill="white" />
              </g>
            ))}
            {/* Propellers */}
            {[[20,50],[220,50],[20,160],[220,160]].map(([x,y],i) => (
              <g key={`p${i}`}>
                <ellipse cx={x-22} cy={y} rx="20" ry="4" fill="#071428" opacity="0.7">
                  <animateTransform attributeName="transform" type="rotate" from={`0 ${x} ${y}`} to={`360 ${x} ${y}`} dur={i%2===0?"0.3s":"0.25s"} repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx={x+22} cy={y} rx="20" ry="4" fill="#071428" opacity="0.7">
                  <animateTransform attributeName="transform" type="rotate" from={`0 ${x} ${y}`} to={`360 ${x} ${y}`} dur={i%2===0?"0.3s":"0.25s"} repeatCount="indefinite"/>
                </ellipse>
              </g>
            ))}
            {/* Main body */}
            <rect x="80" y="90" width="80" height="60" rx="16" fill="#071428" />
            <rect x="88" y="98" width="64" height="44" rx="12" fill="#0f2040" />
            {/* Camera lens */}
            <circle cx="120" cy="140" r="10" fill="#071428" />
            <circle cx="120" cy="140" r="7" fill="#1a3560" />
            <circle cx="120" cy="140" r="4" fill="#071428" />
            <circle cx="118" cy="138" r="1.5" fill="rgba(255,255,255,0.5)" />
            {/* Status light */}
            <circle cx="120" cy="100" r="4" fill="#FF5500">
              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
            </circle>
            {/* Package */}
            <rect x="104" y="155" width="32" height="28" rx="4" fill="#FF5500" />
            <line x1="104" y1="169" x2="136" y2="169" stroke="white" strokeWidth="1.5"/>
            <line x1="120" y1="155" x2="120" y2="183" stroke="white" strokeWidth="1.5"/>
            {/* String */}
            <line x1="120" y1="150" x2="120" y2="155" stroke="#071428" strokeWidth="2"/>
          </svg>

          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(255,85,0,0.12) 0%, transparent 70%)",
              animation: "pulse 3s ease-in-out infinite",
            }} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8"
            style={{ background: "#FF550015", color: "#FF5500", border: "1px solid #FF550030" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FF5500" }} />
            Now delivering in Orlando, FL
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-gray-900 mb-6"
          >
            The Future of<br />
            <span className="relative inline-block">
              <span style={{ color: "#FF5500" }}>Instant Delivery</span>
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                height="12"
                preserveAspectRatio="none"
              >
                <path d="M0,10 Q75,2 150,8 Q225,14 300,6" fill="none" stroke="#FF5500" strokeWidth="3" strokeLinecap="round" />
              </motion.svg>
            </span>
            <br />is Here.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-xl"
          >
            Autonomous drone logistics for the next generation of commerce.
            Faster, greener, and limitless — delivered in under 10 minutes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="btn-orange flex items-center justify-center gap-2 text-base">
              Get Early Access <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center gap-3 px-7 py-3 rounded-full text-base font-bold text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#FF550015" }}>
                <Play className="w-4 h-4 ml-0.5" style={{ color: "#FF5500" }} />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-6 mt-12 text-sm text-gray-400"
          >
            {["FAA Certified", "100K+ Deliveries", "Zero Incidents"].map((badge, i) => (
              <div key={badge} className="flex items-center gap-2">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-gray-300" />}
                <span className="font-medium">{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,80 L0,80 Z" fill="#F7F8FA" />
        </svg>
      </div>
    </section>
  );
}
