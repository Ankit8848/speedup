import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap, Building2, Globe, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { PageLayout } from "@/components/PageLayout";

const PLANS = [
  {
    id: "consumer",
    icon: Zap,
    name: "Consumer",
    tag: "For individuals & households",
    monthlyPrice: null,
    annualPrice: null,
    priceLabel: "Free",
    priceSub: "Join waitlist",
    accent: "#FF5500",
    bg: "#FFF5F0",
    border: "rgba(255,85,0,0.18)",
    cta: "Join the Waitlist",
    ctaStyle: "outline" as const,
    features: [
      "Up to 5 deliveries / month",
      "Food, grocery & retail",
      "Live drone tracking",
      "Backyard or balcony drop",
      "ETA accuracy ±30 seconds",
      "SpeedUp mobile app",
    ],
    note: "Early access · Limited cities",
  },
  {
    id: "business",
    icon: Building2,
    name: "Business",
    tag: "For restaurants, retailers & SMBs",
    monthlyPrice: 299,
    annualPrice: 249,
    priceLabel: null,
    priceSub: "per month + $2.49 / delivery",
    accent: "#FF5500",
    bg: "#FF5500",
    border: "rgba(255,85,0,0)",
    cta: "Schedule a Demo",
    ctaStyle: "solid-white" as const,
    featured: true,
    features: [
      "Unlimited deliveries",
      "Dedicated fleet allocation",
      "API & POS integration",
      "Real-time ops dashboard",
      "Priority dispatch queue",
      "SLA: 99.5% on-time rate",
      "24/7 ops support",
      "Custom branding on HUD",
    ],
    note: "Most popular · 14-day free trial",
  },
  {
    id: "enterprise",
    icon: Globe,
    name: "Enterprise",
    tag: "For logistics, healthcare & chains",
    monthlyPrice: null,
    annualPrice: null,
    priceLabel: "Custom",
    priceSub: "Volume pricing available",
    accent: "#0A0F1E",
    bg: "#F7F9FC",
    border: "rgba(0,0,0,0.10)",
    cta: "Talk to Sales",
    ctaStyle: "outline" as const,
    features: [
      "Multi-city fleet management",
      "Dedicated hub infrastructure",
      "HIPAA & HITRUST compliance",
      "Custom SLAs & contracts",
      "White-label experience",
      "Regulatory filing support",
      "Dedicated account team",
      "Advanced analytics & reporting",
    ],
    note: "Custom contract · Onboarding included",
  },
];

const FAQS = [
  {
    q: "How are deliveries priced for Business plans?",
    a: "Business plans include a flat monthly platform fee plus $2.49 per completed delivery. There are no surge charges, no driver tips, and no fuel surcharges. Volume tiers reduce the per-delivery rate automatically.",
  },
  {
    q: "What's covered by the SLA?",
    a: "Business and Enterprise customers get a guaranteed 99.5% on-time delivery rate (within 2 minutes of quoted ETA). If we miss, you receive delivery credits automatically — no need to contact support.",
  },
  {
    q: "Can I integrate SpeedUp with my existing POS or e-commerce platform?",
    a: "Yes. We provide a REST API, Webhooks, and pre-built plugins for Square, Toast, Shopify, and WooCommerce. Custom integrations are available on the Enterprise plan.",
  },
  {
    q: "Is there a minimum delivery volume?",
    a: "Consumer plans have no minimums. Business plans have no minimums during the 14-day trial and 50 deliveries/month after. Enterprise contracts are negotiated based on projected volume.",
  },
  {
    q: "What areas are currently covered?",
    a: "SpeedUp is live in Orlando FL, Miami FL, Dallas TX, Atlanta GA, and New York (pilot). Los Angeles launches Q3 2025. Enter your zip code on our Locations page to check availability.",
  },
  {
    q: "How do annual plans work?",
    a: "Annual plans lock in a 17% discount versus monthly billing. You're billed once per year. The per-delivery rate ($2.49) stays the same. You can upgrade your plan at any time.",
  },
];

function FAQ({ item }: { item: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(0,0,0,0.08)" }}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between py-5 gap-6">
        <span className="text-sm font-bold" style={{ color: "#0A0F1E" }}>{item.q}</span>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform duration-300"
          style={{ color: "#9CA3AF", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <p className="text-sm leading-relaxed pb-5" style={{ color: "#6B7280" }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [, navigate] = useLocation();

  return (
    <PageLayout>
      <section className="relative overflow-hidden" style={{ background: "#FFFFFF", padding: "6rem 0 9rem" }}>

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="pg" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(10,15,30,0.03)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pg)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

          {/* ── Header ── */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-8 h-px" style={{ background: "#FF5500" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>Pricing</span>
              <span className="w-8 h-px" style={{ background: "#FF5500" }} />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-black uppercase leading-[0.9] mb-6"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.04em",
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#0A0F1E",
              }}
            >
              Simple, honest<br />
              <span style={{ color: "#FF5500" }}>pricing.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg leading-relaxed mx-auto"
              style={{ color: "#6B7280", maxWidth: "34rem" }}
            >
              No hidden fees, no surge pricing, no driver tips. Just fast, reliable drone delivery at a flat rate.
            </motion.p>

            {/* Annual toggle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="inline-flex items-center gap-4 mt-8 p-1.5 rounded-full"
              style={{ background: "#F7F9FC", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <button
                onClick={() => setAnnual(false)}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  background: !annual ? "#FFFFFF" : "transparent",
                  color: !annual ? "#0A0F1E" : "#9CA3AF",
                  boxShadow: !annual ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  background: annual ? "#FFFFFF" : "transparent",
                  color: annual ? "#0A0F1E" : "#9CA3AF",
                  boxShadow: annual ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}
              >
                Annual
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                  style={{ background: "rgba(255,85,0,0.12)", color: "#FF5500" }}>
                  Save 17%
                </span>
              </button>
            </motion.div>
          </div>

          {/* ── Plans ── */}
          <div className="grid lg:grid-cols-3 gap-5 mb-24">
            {PLANS.map((plan, idx) => {
              const Icon = plan.icon;
              const price = plan.featured ? (annual ? plan.annualPrice : plan.monthlyPrice) : null;
              const isFeatured = plan.featured;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: isFeatured ? plan.bg : plan.bg,
                    border: `1px solid ${plan.border}`,
                    boxShadow: isFeatured
                      ? "0 32px 80px rgba(255,85,0,0.25), 0 8px 24px rgba(255,85,0,0.12)"
                      : "0 2px 12px rgba(0,0,0,0.05)",
                    transform: isFeatured ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  {isFeatured && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.18em]"
                      style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                      Most Popular
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-1">
                    {/* Icon + plan name */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: isFeatured ? "rgba(255,255,255,0.2)" : `${plan.accent}12`,
                          border: `1px solid ${isFeatured ? "rgba(255,255,255,0.25)" : `${plan.accent}20`}`,
                        }}>
                        <Icon className="w-5 h-5" style={{ color: isFeatured ? "white" : plan.accent }} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5"
                          style={{ color: isFeatured ? "rgba(255,255,255,0.65)" : "#9CA3AF" }}>
                          {plan.tag}
                        </div>
                        <div className="font-black uppercase text-lg leading-none"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: isFeatured ? "white" : "#0A0F1E" }}>
                          {plan.name}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-8 pb-8" style={{ borderBottom: `1px solid ${isFeatured ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.07)"}` }}>
                      {price !== null ? (
                        <div className="flex items-end gap-1.5">
                          <span className="text-[10px] font-bold mb-2.5" style={{ color: isFeatured ? "rgba(255,255,255,0.65)" : "#9CA3AF" }}>$</span>
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={annual ? "annual" : "monthly"}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="font-black leading-none"
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                                letterSpacing: "-0.04em",
                                color: isFeatured ? "white" : "#0A0F1E",
                              }}
                            >
                              {price}
                            </motion.span>
                          </AnimatePresence>
                          <span className="text-sm font-semibold mb-2" style={{ color: isFeatured ? "rgba(255,255,255,0.55)" : "#9CA3AF" }}>/mo</span>
                        </div>
                      ) : (
                        <div className="font-black leading-none"
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            letterSpacing: "-0.03em",
                            color: isFeatured ? "white" : "#0A0F1E",
                          }}>
                          {plan.priceLabel}
                        </div>
                      )}
                      <div className="mt-2 text-[11px] font-medium" style={{ color: isFeatured ? "rgba(255,255,255,0.55)" : "#9CA3AF" }}>
                        {plan.priceSub}
                      </div>
                      {plan.note && (
                        <div className="mt-3 text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: isFeatured ? "rgba(255,255,255,0.7)" : plan.accent }}>
                          · {plan.note}
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 flex-1 mb-8">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{
                              background: isFeatured ? "rgba(255,255,255,0.2)" : `${plan.accent}12`,
                            }}>
                            <Check className="w-2.5 h-2.5" style={{ color: isFeatured ? "white" : plan.accent }} />
                          </div>
                          <span className="text-sm leading-relaxed"
                            style={{ color: isFeatured ? "rgba(255,255,255,0.85)" : "#4B5675" }}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={() => navigate("/for-business")}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold uppercase tracking-[0.1em] text-sm transition-all hover:scale-[1.02] hover:opacity-90"
                      style={
                        plan.ctaStyle === "solid-white"
                          ? { background: "white", color: "#FF5500", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }
                          : {
                            background: "transparent",
                            color: isFeatured ? "white" : plan.accent,
                            border: `1.5px solid ${isFeatured ? "rgba(255,255,255,0.4)" : `${plan.accent}40`}`,
                          }
                      }
                    >
                      {plan.cta} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Compare strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 md:p-12 mb-24 relative overflow-hidden"
            style={{ background: "#F7F9FC", border: "1px solid rgba(0,0,0,0.07)" }}
          >
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { label: "Per-delivery cost", consumer: "~$3.99", business: "$2.49", enterprise: "Volume pricing" },
                { label: "Avg delivery time", consumer: "< 10 min", business: "< 10 min", enterprise: "< 10 min" },
                { label: "Real-time tracking", consumer: "✓", business: "✓", enterprise: "✓" },
                { label: "API access", consumer: "—", business: "✓", enterprise: "✓" },
                { label: "Dedicated fleet", consumer: "—", business: "✓", enterprise: "✓" },
                { label: "24/7 support", consumer: "—", business: "✓", enterprise: "Dedicated team" },
                { label: "SLA guarantee", consumer: "—", business: "99.5%", enterprise: "Custom" },
                { label: "White-label HUD", consumer: "—", business: "Add-on", enterprise: "✓" },
              ].map((row, i) => (
                <div key={i} className={i === 0 ? "" : "md:col-start-auto"} style={{ display: "contents" }}>
                  {i === 0 && (
                    <>
                      <div />
                      {["Consumer", "Business", "Enterprise"].map(h => (
                        <div key={h} className="text-[11px] font-black uppercase tracking-[0.15em] mb-4 pb-4"
                          style={{ color: h === "Business" ? "#FF5500" : "#9CA3AF", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                          {h}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}

              {/* header row */}
              <div />
              {["Consumer", "Business", "Enterprise"].map(h => (
                <div key={h} className="text-[11px] font-black uppercase tracking-[0.15em] pb-4"
                  style={{ color: h === "Business" ? "#FF5500" : "#9CA3AF", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                  {h}
                </div>
              ))}

              {[
                { label: "Per-delivery cost", consumer: "~$3.99", business: "$2.49", enterprise: "Volume pricing" },
                { label: "Avg delivery time", consumer: "< 10 min", business: "< 10 min", enterprise: "< 10 min" },
                { label: "Real-time tracking", consumer: "✓", business: "✓", enterprise: "✓" },
                { label: "API access", consumer: "—", business: "✓", enterprise: "✓" },
                { label: "Dedicated fleet", consumer: "—", business: "✓", enterprise: "✓" },
                { label: "24/7 support", consumer: "—", business: "✓", enterprise: "Dedicated" },
                { label: "SLA guarantee", consumer: "—", business: "99.5%", enterprise: "Custom" },
                { label: "White-label HUD", consumer: "—", business: "Add-on", enterprise: "✓" },
              ].map(row => (
                <Fragment key={row.label}>
                  <div className="text-xs font-semibold py-3.5"
                    style={{ color: "#6B7280", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    {row.label}
                  </div>
                  {[row.consumer, row.business, row.enterprise].map((val, vi) => (
                    <div key={`${row.label}-${vi}`} className="text-xs font-bold py-3.5 text-center"
                      style={{
                        color: val === "✓" ? "#16A34A" : val === "—" ? "#D1D5DB" : vi === 1 ? "#FF5500" : "#0A0F1E",
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                      }}>
                      {val}
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </motion.div>

          {/* ── FAQ ── */}
          <div className="max-w-3xl mx-auto mb-24">
            <div className="flex items-center gap-3 mb-12">
              <span className="w-8 h-px" style={{ background: "#FF5500" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>FAQ</span>
            </div>
            <h2 className="font-black uppercase leading-[0.9] mb-12"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>
              Questions,<br />answered.
            </h2>
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              {FAQS.map(item => <FAQ key={item.q} item={item} />)}
            </div>
          </div>

          {/* ── Bottom CTA band ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{ background: "#FF5500" }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <div className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4 text-white/70">Get Started Today</div>
              <h3 className="font-black uppercase text-white leading-[0.9] mb-6"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}>
                See SpeedUp fly<br />in your city.
              </h3>
              <p className="text-white/70 leading-relaxed mb-10 mx-auto" style={{ maxWidth: "28rem" }}>
                No commitment required. Schedule a 20-minute demo and we'll show you live flights in your coverage zone.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/for-business")}
                  className="flex items-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full transition-all hover:scale-[1.02]"
                  style={{ padding: "1rem 2.5rem", background: "white", color: "#FF5500", fontSize: "0.8rem", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
                >
                  Schedule a Demo <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/locations")}
                  className="flex items-center gap-2 font-bold uppercase tracking-[0.1em] rounded-full transition-all"
                  style={{ padding: "1rem 2.5rem", color: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.35)", fontSize: "0.8rem" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.65)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)"}
                >
                  Check My City
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </PageLayout>
  );
}
