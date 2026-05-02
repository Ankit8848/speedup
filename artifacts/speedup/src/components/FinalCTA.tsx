import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden"
      style={{ background: "#010b19", padding: "9rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>

      {/* Glow blobs */}
      <div className="absolute -top-32 right-0 w-[620px] h-[620px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.07)", filter: "blur(80px)" }} />
      <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.05)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>
            Available in 6 US cities · Expanding every quarter
          </span>
        </div>

        {/* Massive headline — Flytrex "ADDING VALUE" style */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-black uppercase text-white leading-[0.88] mb-12"
          style={{
            fontSize: "clamp(4rem, 12vw, 11rem)",
            letterSpacing: "-0.04em",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Delivery.<br />
          <span style={{ color: "#FF5500" }}>Reinvented.</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-end">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-white/40 text-xl leading-relaxed mb-12 max-w-lg">
              Join thousands of businesses and residents already getting deliveries in under 10 minutes.
              The future isn't coming — it's already here.
            </p>

            <div className="flex flex-wrap gap-4">
              <button data-testid="btn-partner"
                className="flex items-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full text-white transition-all hover:opacity-90 hover:scale-[1.03]"
                style={{ padding: "1rem 2.5rem", fontSize: "0.8rem", background: "#FF5500", boxShadow: "0 8px 32px rgba(255,85,0,0.4)" }}>
                Partner With Us <ArrowRight className="w-4 h-4" />
              </button>
              <button data-testid="btn-early-access-cta"
                className="flex items-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full transition-all hover:bg-white/8"
                style={{ padding: "1rem 2.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)" }}>
                Get Early Access
              </button>
            </div>
          </motion.div>

          {/* Right — city list + cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "#FF5500" }} />
              <h3 className="font-black uppercase text-white text-xl mb-2 leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                For Businesses
              </h3>
              <p className="text-white/35 text-sm leading-relaxed mb-5">
                Restaurant, retail, or healthcare — SpeedUp has a delivery solution built for your industry.
              </p>
              <a href="#use-cases"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-white"
                style={{ color: "#FF5500" }}>
                Explore Use Cases <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "rgba(255,85,0,0.4)" }} />
              <h3 className="font-black uppercase text-white text-xl mb-2 leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                For Residents
              </h3>
              <p className="text-white/35 text-sm leading-relaxed mb-5">
                Sign up and we'll notify you when SpeedUp launches in your neighborhood.
              </p>
              <a href="#hero"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-white"
                style={{ color: "#FF5500" }}>
                Join the Waitlist <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Cities footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">Live in</span>
          {["Orlando, FL", "Miami, FL", "Dallas, TX", "Atlanta, GA", "New York, NY"].map(city => (
            <span key={city} className="text-sm font-semibold text-white/50">{city}</span>
          ))}
          <span className="text-sm font-semibold" style={{ color: "rgba(255,85,0,0.5)" }}>+ LA → Q3 2025</span>
        </motion.div>
      </div>
    </section>
  );
}
