import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex flex-col"
      style={{ minHeight: "100dvh", background: "#010b19" }}
    >
      {/* Background drone image with gradient overlay — Flytrex style */}
      <div className="absolute inset-0">
        {/* Simulated aerial/dark cityscape using gradient layers */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse at 70% 40%, rgba(255,85,0,0.08) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 80%, rgba(255,85,0,0.05) 0%, transparent 45%),
            #010b19
          `
        }} />
        {/* Left-to-right overlay like Flytrex drone background */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, rgba(1,11,25,0.85) 0%, rgba(1,11,25,0.5) 50%, rgba(1,11,25,0.1) 100%)"
        }} />
      </div>

      {/* Glow blobs — Flytrex signature decoration */}
      <div className="absolute -top-32 -right-32 w-[620px] h-[620px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.06)", filter: "blur(80px)" }} />
      <div className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.05)", filter: "blur(80px)" }} />

      {/* Vertical rule lines */}
      <div className="absolute inset-y-0 left-[8%] w-px hidden lg:block"
        style={{ background: "linear-gradient(180deg, transparent, rgba(255,85,0,0.2) 40%, rgba(255,85,0,0.1) 70%, transparent)" }} />
      <div className="absolute inset-y-0 right-[8%] w-px hidden lg:block"
        style={{ background: "linear-gradient(180deg, transparent, rgba(255,85,0,0.12) 40%, transparent)" }} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-10 w-full pt-32 pb-24">

        {/* Eyebrow pill — Flytrex style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 self-start"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ background: "rgba(255,85,0,0.12)", border: "1px solid rgba(255,85,0,0.25)", color: "#FF5500" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FF5500" }} />
            Now Operational · 6 US Cities
          </div>
        </motion.div>

        {/* Headline — PPRightGrotesk compressed style: all-caps, tight leading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-black uppercase text-white leading-[0.88]"
          style={{
            fontSize: "clamp(4rem, 13vw, 13rem)",
            letterSpacing: "-0.03em",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Backyard<br />
          <span style={{ color: "#FF5500" }}>Delivery.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 text-lg md:text-xl max-w-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Drone delivery from your favorite local restaurants and stores, straight to your exact location — in under 10 minutes.
        </motion.p>

        {/* CTAs — Flytrex button style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <button
            onClick={() => scrollTo("simulation")}
            className="flex items-center justify-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full text-white transition-all hover:opacity-90 hover:scale-[1.03]"
            style={{
              padding: "1rem 2.5rem",
              fontSize: "0.85rem",
              background: "#FF5500",
              boxShadow: "0 8px 32px rgba(255,85,0,0.4)",
            }}
          >
            Get Early Access <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="flex items-center justify-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full transition-all hover:bg-white/8 hover:text-white"
            style={{
              padding: "1rem 2.5rem",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            How It Works
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-20 flex flex-wrap items-center gap-x-12 gap-y-6"
        >
          {[
            { num: "< 10", unit: "min", label: "Average delivery" },
            { num: "100K+", unit: "", label: "Deliveries flown" },
            { num: "6", unit: " cities", label: "Active in US" },
            { num: "0", unit: "", label: "Incidents" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <div className="text-3xl font-black text-white leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {s.num}<span className="text-xl" style={{ color: "#FF5500" }}>{s.unit}</span>
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 rounded-full"
          style={{ background: "linear-gradient(180deg, #FF5500 0%, transparent 100%)", opacity: 0.5 }}
        />
      </motion.div>
    </section>
  );
}
