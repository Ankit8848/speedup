import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, Rocket } from "lucide-react";

const cards = [
  {
    icon: Building2,
    tag: "For Businesses",
    headline: "Cut your delivery costs in half.",
    desc: "No driver fleet, no tips, no logistics overhead. SpeedUp charges a flat fee per delivery and handles everything from launch to landing.",
    cta: "Explore Business Plans",
    color: "#FF5500",
  },
  {
    icon: Users,
    tag: "For Residents",
    headline: "Your neighborhood, delivered fast.",
    desc: "Sign up for early access in your city and get notified when SpeedUp goes live within 2 km of your address.",
    cta: "Join the Waitlist",
    color: "#60A5FA",
  },
  {
    icon: Rocket,
    tag: "For Investors",
    headline: "The future of last-mile logistics.",
    desc: "We've proven the model. Now we're scaling to 100 cities by 2027. See our traction, unit economics, and roadmap.",
    cta: "View Investor Deck",
    color: "#4ADE80",
  },
];

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden"
      style={{ background: "#010b19", padding: "9rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>

      {/* Large ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,85,0,0.07) 0%, transparent 60%)" }} />
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.04)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>
            Available Now · 6 US Cities
          </span>
        </div>

        {/* Massive headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2
            className="font-black uppercase text-white leading-[0.88]"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 10rem)",
              letterSpacing: "-0.04em",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Delivery.<br />
            <span style={{
              background: "linear-gradient(135deg, #FF5500 0%, #ff8c42 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Reinvented.
            </span>
          </h2>
          <p className="mt-8 text-white/40 text-xl leading-relaxed max-w-2xl">
            Join thousands already flying with SpeedUp. Whether you're a restaurant, retailer, or resident — there's a SpeedUp plan built for you.
          </p>
        </motion.div>

        {/* Three cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group rounded-2xl p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: card.color }} />

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}>
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>

              <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: `${card.color}99` }}>{card.tag}</div>
              <h3 className="font-black text-white text-xl mb-3 leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{card.headline}</h3>
              <p className="text-white/35 text-sm leading-relaxed mb-8 flex-1">{card.desc}</p>

              <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors group-hover:gap-3"
                style={{ color: card.color }}>
                {card.cta} <ArrowRight className="w-3.5 h-3.5 transition-all" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Full-width CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          style={{ background: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.2)" }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(255,85,0,0.12) 0%, transparent 60%)" }} />

          <div className="relative z-10">
            <div className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#FF5500" }}>
              Request a Demo
            </div>
            <h3 className="font-black uppercase text-white text-3xl md:text-4xl leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              See SpeedUp fly<br />in your city.
            </h3>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              className="flex items-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ padding: "1rem 2rem", fontSize: "0.8rem", background: "#FF5500", boxShadow: "0 8px 32px rgba(255,85,0,0.4)" }}>
              Schedule a Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="flex items-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full transition-all hover:border-white/30 hover:text-white"
              style={{ padding: "1rem 2rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)" }}>
              View Pricing
            </button>
          </div>
        </motion.div>

        {/* Footer cities row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">Live in</span>
          {["Orlando, FL", "Miami, FL", "Dallas, TX", "Atlanta, GA", "New York, NY"].map(city => (
            <span key={city} className="text-sm font-semibold text-white/45">{city}</span>
          ))}
          <span className="ml-auto text-sm font-semibold" style={{ color: "rgba(255,85,0,0.6)" }}>
            + Los Angeles → Q3 2025
          </span>
        </motion.div>
      </div>
    </section>
  );
}
