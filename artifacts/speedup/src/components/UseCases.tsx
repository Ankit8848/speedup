import { motion } from "framer-motion";
import { Utensils, Stethoscope, Package, ShieldAlert } from "lucide-react";

export function UseCases() {
  const cases = [
    {
      icon: Utensils,
      title: "Food Delivery",
      desc: "Hot meals delivered in minutes, bypassing traffic.",
      bg: "from-orange-500/10 to-transparent",
      color: "text-orange-500"
    },
    {
      icon: Stethoscope,
      title: "Medical Supply",
      desc: "Critical supplies and blood transport to remote areas.",
      bg: "from-blue-500/10 to-transparent",
      color: "text-blue-500"
    },
    {
      icon: Package,
      title: "E-Commerce",
      desc: "Last-mile logistics for instant gratification.",
      bg: "from-green-500/10 to-transparent",
      color: "text-green-500"
    },
    {
      icon: ShieldAlert,
      title: "Emergency Response",
      desc: "Rapid deployment of automated defibrillators.",
      bg: "from-red-500/10 to-transparent",
      color: "text-red-500"
    }
  ];

  return (
    <section className="py-32 bg-background relative" id="use-cases">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Limitless Applications</h2>
          <div className="w-24 h-1 bg-secondary mx-auto box-glow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-2xl glass-card relative overflow-hidden group border-border/50 hover:border-secondary transition-colors duration-300`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <item.icon className={`w-12 h-12 mb-6 ${item.color} relative z-10`} />
              <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
              <p className="text-muted-foreground relative z-10">{item.desc}</p>
              
              {/* Glow effect on hover */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
