import { motion } from "framer-motion";
import { Utensils, Stethoscope, Package, ShieldAlert } from "lucide-react";

const cases = [
  {
    icon: Utensils,
    title: "Food & Restaurants",
    desc: "Hot meals delivered in minutes, bypassing all traffic. Temperature-controlled payload keeps food perfect.",
    color: "#FF5500",
    bg: "#FFF4EF",
    stat: "< 8 min avg",
  },
  {
    icon: Stethoscope,
    title: "Medical Supply",
    desc: "Critical supplies, blood, and medication transported to remote areas and hospitals at unprecedented speed.",
    color: "#3B82F6",
    bg: "#EFF6FF",
    stat: "FDA compliant",
  },
  {
    icon: Package,
    title: "E-Commerce",
    desc: "Last-mile logistics reinvented. Same-hour delivery for retail and e-commerce at a fraction of the cost.",
    color: "#10B981",
    bg: "#ECFDF5",
    stat: "30km range",
  },
  {
    icon: ShieldAlert,
    title: "Emergency Response",
    desc: "Rapid deployment of AEDs, fire suppression, and first-aid kits. SpeedUp saves lives in minutes, not hours.",
    color: "#EF4444",
    bg: "#FEF2F2",
    stat: "< 2 min deploy",
  },
];

export function UseCases() {
  return (
    <section className="py-28 section-light" id="use-cases">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4"
            style={{ background: "#FF550012", color: "#FF5500", border: "1px solid #FF550025" }}>
            Use Cases
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Limitless <span style={{ color: "#FF5500" }}>Applications</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From hot meals to life-saving medicine — SpeedUp serves every industry that demands speed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((item, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 card-shadow hover:card-shadow-lg transition-all duration-300 group cursor-default"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: item.bg }}>
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>

              {/* Stat pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: item.bg, color: item.color }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: item.color }} />
                {item.stat}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
