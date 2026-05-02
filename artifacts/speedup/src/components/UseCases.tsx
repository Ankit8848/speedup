import { motion } from "framer-motion";
import { Utensils, Stethoscope, Package, ShieldAlert } from "lucide-react";

const cases = [
  {
    icon: Utensils,
    tag: "Food & Restaurants",
    headline: "Hot food. Under 8 minutes.",
    desc: "SpeedUp bypasses every stoplight, traffic jam, and parking lot. Meals arrive at the right temperature — every time.",
    stat: "< 8 min avg",
  },
  {
    icon: Stethoscope,
    tag: "Medical & Healthcare",
    headline: "Life-saving speed.",
    desc: "Blood, medication, AEDs, and critical supplies delivered at drone speed to hospitals, clinics, and remote areas.",
    stat: "FDA compliant",
  },
  {
    icon: Package,
    tag: "E-Commerce",
    headline: "Same-hour delivery, redefined.",
    desc: "Last-mile logistics reimagined. No truck, no driver — just a direct flight from warehouse to doorstep.",
    stat: "30km range",
  },
  {
    icon: ShieldAlert,
    tag: "Emergency Response",
    headline: "Seconds save lives.",
    desc: "AEDs, fire suppression gear, and first-aid kits deployed in under 2 minutes anywhere in our service zones.",
    stat: "< 2 min deploy",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-36" style={{ background: "#F5F3EF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-10 h-px" style={{ background: "#FF5500" }} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FF5500" }}>Use Cases</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <h2 className="font-black text-[#0D0F14] leading-[1.0]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
            Limitless<br />applications.
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed max-w-md">
            SpeedUp serves every industry that demands speed, reliability, and precision. If it fits in a drone, we'll deliver it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#0D0F14]/10 rounded-3xl overflow-hidden">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-[#F5F3EF] p-10 group hover:bg-white transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#FF550012" }}>
                  <item.icon className="w-6 h-6" style={{ color: "#FF5500" }} />
                </div>
                <div className="text-xs font-black px-3 py-1.5 rounded-full" style={{ background: "#FF550012", color: "#FF5500" }}>
                  {item.stat}
                </div>
              </div>
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#FF5500", opacity: 0.7 }}>
                {item.tag}
              </div>
              <h3 className="text-2xl font-black text-[#0D0F14] mb-3 leading-tight">{item.headline}</h3>
              <p className="text-[#6B7280] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
