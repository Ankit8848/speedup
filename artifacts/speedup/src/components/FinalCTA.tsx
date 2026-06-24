import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, Rocket } from "lucide-react";
import { useLocation } from "wouter";
import { useSection } from "@/content/ContentProvider";
import { useDemo } from "./DemoModal";

interface CtaCard { tag: string; headline: string; desc: string; cta: string; href: string; color: string }
interface FinalCtaContent {
  eyebrow: string;
  headlineLine1: string;
  headlineHighlight: string;
  subhead: string;
  cards: CtaCard[];
  demoEyebrow: string;
  demoHeadline: string;
  demoPrimaryLabel: string;
  demoPrimaryHref: string;
  demoSecondaryLabel: string;
  demoSecondaryHref: string;
  liveLabel: string;
  cities: { name: string }[];
  comingSoon: string;
}

const ICONS = [Building2, Users, Rocket];

export function FinalCTA() {
  const [, navigate] = useLocation();
  const { open: openDemo } = useDemo();
  const c = useSection<FinalCtaContent>("home.finalCta");
  const cards = c.cards.map((card, i) => ({
    ...card,
    icon: ICONS[i % ICONS.length],
    bg: `${card.color}0f`,
    border: `${card.color}26`,
  }));

  return (
    <section className="relative overflow-hidden"
      style={{ background: "#FFFFFF", padding: "9rem 0", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,85,0,0.03) 0%, transparent 50%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>
            {c.eyebrow}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2
            className="font-black uppercase leading-[0.88]"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 10rem)",
              letterSpacing: "-0.04em",
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#0A0F1E",
            }}
          >
            {c.headlineLine1}<br />
            <span style={{ color: "#FF5500" }}>
              {c.headlineHighlight}
            </span>
          </h2>
          <p className="mt-8 text-xl leading-relaxed max-w-2xl" style={{ color: "#6B7280" }}>
            {c.subhead}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {cards.map((card, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={() => navigate(card.href)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group rounded-2xl p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1 text-left"
              style={{ background: card.bg, border: `1px solid ${card.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: card.color }} />

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${card.color}12`, border: `1px solid ${card.color}20` }}>
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>

              <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: `${card.color}bb` }}>{card.tag}</div>
              <h3 className="font-black text-xl mb-3 leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>{card.headline}</h3>
              <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: "#6B7280" }}>{card.desc}</p>

              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all group-hover:gap-3"
                style={{ color: card.color }}>
                {card.cta} <ArrowRight className="w-3.5 h-3.5 transition-all" />
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          style={{ background: "#FF5500" }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)" }} />

          <div className="relative z-10">
            <div className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3 text-white/70">
              {c.demoEyebrow}
            </div>
            <h3 className="font-black uppercase text-white text-3xl md:text-4xl leading-none whitespace-pre-line"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {c.demoHeadline}
            </h3>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              onClick={openDemo}
              className="flex items-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ padding: "1rem 2rem", fontSize: "0.8rem", background: "white", color: "#FF5500", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
              {c.demoPrimaryLabel} <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate(c.demoSecondaryHref)}
              className="flex items-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full transition-all"
              style={{ padding: "1rem 2rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.35)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.65)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)"}
            >
              {c.demoSecondaryLabel}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
          style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
        >
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#C4CBD8" }}>{c.liveLabel}</span>
          {c.cities.map(city => (
            <span key={city.name} className="text-sm font-semibold" style={{ color: "#6B7280" }}>{city.name}</span>
          ))}
          <span className="ml-auto text-sm font-semibold" style={{ color: "#FF5500" }}>
            {c.comingSoon}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
