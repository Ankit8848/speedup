import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#FF5500", minHeight: "60vh", display: "flex", alignItems: "center" }}>
      {/* Texture overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 10% 90%, rgba(0,0,0,0.12) 0%, transparent 50%),
                          radial-gradient(circle at 90% 10%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-32 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2
              className="font-black text-white leading-[0.95] mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
            >
              Delivery.<br />Reinvented.
            </h2>
            <p className="text-white/70 text-xl leading-relaxed max-w-md">
              The future of last-mile logistics is already here. Join thousands of businesses and residents already flying with SpeedUp.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* CTA card */}
            <div className="rounded-3xl p-8" style={{ background: "rgba(0,0,0,0.15)" }}>
              <h3 className="text-2xl font-black text-white mb-2">Partner with us</h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Whether you're a restaurant, retailer, or healthcare provider — SpeedUp has a delivery solution built for your industry.
              </p>
              <button data-testid="btn-partner"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[#FF5500] text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "white" }}>
                Get in Touch <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-3xl p-8" style={{ background: "rgba(0,0,0,0.15)" }}>
              <h3 className="text-2xl font-black text-white mb-2">Get early access</h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Be first to experience drone delivery in your city. Sign up and we'll notify you when SpeedUp launches near you.
              </p>
              <button data-testid="btn-early-access-cta"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-sm transition-all hover:bg-white/20 border-2 border-white/40">
                Join the Waitlist
              </button>
            </div>
          </motion.div>
        </div>

        {/* Cities row */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-t border-white/20 flex flex-wrap gap-x-8 gap-y-3 items-center"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-white/40">Live in</span>
          {["Orlando, FL", "Miami, FL", "Dallas, TX", "Atlanta, GA", "New York, NY"].map(city => (
            <span key={city} className="text-sm font-semibold text-white/70">{city}</span>
          ))}
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>+ Los Angeles, CA → Q3 2025</span>
        </motion.div>
      </div>
    </section>
  );
}
