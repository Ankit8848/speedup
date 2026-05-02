import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const scrollToNext = () => {
    const el = document.getElementById("how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0D0F14" }}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,85,0,0.06) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(255,85,0,0.04) 0%, transparent 45%)`,
      }} />

      {/* Thin horizontal line accents */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none select-none" style={{ opacity: 0.025 }}
        dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="300" height="300" filter="url(#n)" opacity="1"/></svg>` }} />

      {/* Vertical line accents */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: "8%", width: "1px", background: "linear-gradient(180deg, transparent 0%, rgba(255,85,0,0.15) 30%, rgba(255,85,0,0.08) 70%, transparent 100%)" }} />
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ right: "8%", width: "1px", background: "linear-gradient(180deg, transparent 0%, rgba(255,85,0,0.10) 30%, rgba(255,85,0,0.05) 70%, transparent 100%)" }} />

      {/* Main content — centered */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <span className="block w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>
            Drone Delivery · Now Operational
          </span>
          <span className="block w-8 h-px" style={{ background: "#FF5500" }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-black tracking-tight text-white leading-[0.95] mb-8"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", letterSpacing: "-0.03em" }}
        >
          The Sky Is<br />
          <span style={{
            background: "linear-gradient(90deg, #FF5500 0%, #FF8844 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Your Courier.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl font-medium mb-12 mx-auto max-w-xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          SpeedUp delivers anything, anywhere — in under 10 minutes.
          Fully autonomous. Zero traffic. Zero emissions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-[0.95rem] transition-all hover:opacity-90 hover:scale-[1.03]"
            style={{ background: "#FF5500", boxShadow: "0 8px 32px rgba(255,85,0,0.4)" }}
          >
            Request a Demo <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[0.95rem] transition-all hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(255,255,255,0.15)" }}
            onClick={scrollToNext}
          >
            See How It Works
          </button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-20"
        >
          {[
            { num: "< 10", unit: "min", label: "Avg delivery" },
            { num: "100K+", unit: "", label: "Deliveries completed" },
            { num: "6", unit: " cities", label: "Active in US" },
            { num: "0", unit: "", label: "Safety incidents" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-white">
                {s.num}<span className="text-lg" style={{ color: "#FF5500" }}>{s.unit}</span>
              </div>
              <div className="text-xs font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity hover:opacity-60"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(180deg, rgba(255,85,0,0.6) 0%, transparent 100%)" }}
        />
      </motion.button>
    </section>
  );
}
