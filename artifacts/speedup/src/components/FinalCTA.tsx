import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Converging Particles Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[80px] animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-12 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"
        >
          Delivery.<br/>Reinvented.
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <button data-testid="btn-partner" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all hover:scale-105">
            Partner With Us
          </button>
          <button data-testid="btn-early-access-cta" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all hover:scale-105 box-glow">
            Get Early Access
          </button>
        </motion.div>
      </div>
    </section>
  );
}
