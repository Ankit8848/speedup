import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ background: "#071428" }}>
      {/* Decorative orange blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF5500 0%, transparent 70%)" }} />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF7722 0%, transparent 70%)" }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="max-w-5xl mx-auto px-4 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-10"
          style={{ background: "rgba(255,85,0,0.15)", color: "#FF5500", border: "1px solid rgba(255,85,0,0.3)" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FF5500" }} />
          Available in 6 US cities — expanding every quarter
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-black leading-[1.05] tracking-tight text-white mb-6"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Delivery.<br />
          <span style={{
            background: "linear-gradient(90deg, #FF5500, #FF9944)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Reinvented.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Join thousands of businesses and residents already getting deliveries in under 10 minutes.
          The future isn't coming — it's already here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <button data-testid="btn-partner"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-white text-base transition-all hover:opacity-90 hover:scale-[1.03]"
            style={{ background: "#FF5500", boxShadow: "0 8px 32px rgba(255,85,0,0.35)" }}>
            Partner With Us <ArrowRight className="w-5 h-5" />
          </button>
          <button data-testid="btn-early-access-cta"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-white text-base border-2 border-white/20 hover:bg-white/10 transition-colors">
            Get Early Access
          </button>
        </motion.div>

        {/* City pills */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {["Orlando, FL", "Miami, FL", "Dallas, TX", "Atlanta, GA", "New York, NY", "LA — Coming Soon"].map(city => (
            <div key={city} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: "#FF5500" }} />
              {city}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
