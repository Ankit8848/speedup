import { motion } from "framer-motion";
import { Utensils, Stethoscope, Package, ShieldAlert, GraduationCap, Dumbbell } from "lucide-react";

const cases = [
  {
    icon: Utensils,
    tag: "Food & Restaurants",
    headline: "Hot food.\nUnder 8 min.",
    desc: "Bypasses every stoplight and traffic jam. Meals land at the right temperature — guaranteed.",
    stat: "8 min avg",
    color: "#FF5500",
    lightBg: "#FFF5F0",
    border: "rgba(255,85,0,0.15)",
  },
  {
    icon: Stethoscope,
    tag: "Medical & Healthcare",
    headline: "Life-saving\nspeed.",
    desc: "Blood, medication, AEDs — deployed to hospitals and clinics at drone speed.",
    stat: "FDA compliant",
    color: "#16A34A",
    lightBg: "#F0FDF4",
    border: "rgba(22,163,74,0.15)",
  },
  {
    icon: Package,
    tag: "E-Commerce",
    headline: "Same-hour\ndelivery.",
    desc: "No truck, no driver — a direct flight from warehouse to doorstep.",
    stat: "30 km range",
    color: "#2563EB",
    lightBg: "#EFF6FF",
    border: "rgba(37,99,235,0.15)",
  },
  {
    icon: ShieldAlert,
    tag: "Emergency Response",
    headline: "Seconds\nsave lives.",
    desc: "AEDs and first-aid kits deployed in under 2 minutes anywhere in our zones.",
    stat: "<2 min deploy",
    color: "#DB2777",
    lightBg: "#FDF2F8",
    border: "rgba(219,39,119,0.15)",
  },
  {
    icon: GraduationCap,
    tag: "Campus Delivery",
    headline: "Dorm to\ndorm.",
    desc: "University campuses with thousands of daily orders — served in minutes.",
    stat: "5 active campuses",
    color: "#7C3AED",
    lightBg: "#F5F3FF",
    border: "rgba(124,58,237,0.15)",
  },
  {
    icon: Dumbbell,
    tag: "Sports & Venues",
    headline: "Stadium\nservice.",
    desc: "Concessions delivered to seats and VIP suites without missing a single play.",
    stat: "250K seat capacity",
    color: "#D97706",
    lightBg: "#FFFBEB",
    border: "rgba(217,119,6,0.15)",
  },
];

function FeaturedCard() {
  const c = cases[0];
  const Icon = c.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="md:row-span-2 group rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
      style={{
        background: c.lightBg,
        border: `1px solid ${c.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        minHeight: "340px",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: c.color }} />
      <div className="absolute -bottom-4 -right-4 text-[7rem] opacity-10 select-none pointer-events-none">🚁</div>

      <div>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: `${c.color}15`, border: `1px solid ${c.color}25` }}>
          <Icon className="w-6 h-6" style={{ color: c.color }} />
        </div>
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
          style={{ color: `${c.color}bb` }}>{c.tag}</div>
        <h3
          className="font-black uppercase whitespace-pre-line leading-[0.9] mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}
        >
          {c.headline}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{c.desc}</p>
      </div>

      <div className="mt-8">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
          style={{ background: `${c.color}15`, color: c.color }}>
          ⚡ {c.stat}
        </span>
      </div>
    </motion.div>
  );
}

function SmallCard({ item, idx }: { item: typeof cases[0]; idx: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (idx + 1) * 0.08, duration: 0.6 }}
      className="group rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: item.lightBg,
        border: `1px solid ${item.border}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        minHeight: "160px",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: item.color }} />

      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2"
            style={{ color: `${item.color}bb` }}>{item.tag}</div>
          <h3
            className="font-black uppercase whitespace-pre-line leading-[0.92]"
            style={{ fontSize: "1.3rem", letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}
          >
            {item.headline}
          </h3>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ml-4"
          style={{ background: `${item.color}12` }}>
          <Icon className="w-4 h-4" style={{ color: item.color }} />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs leading-relaxed mb-3" style={{ color: "#6B7280" }}>{item.desc}</p>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${item.color}bb` }}>
          {item.stat}
        </span>
      </div>
    </motion.div>
  );
}

export function UseCases() {
  return (
    <section id="use-cases" className="relative overflow-hidden"
      style={{ background: "#FFFFFF", padding: "9rem 0" }}>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>Use Cases</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2
            className="font-black uppercase leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}
          >
            Built for<br />every industry.
          </h2>
          <p className="text-lg leading-relaxed max-w-sm lg:text-right" style={{ color: "#6B7280" }}>
            Any sector that demands speed, reliability and precision — SpeedUp delivers.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeaturedCard />
          {cases.slice(1).map((item, idx) => (
            <SmallCard key={item.tag} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
