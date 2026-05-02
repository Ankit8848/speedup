import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function VisionSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;
    
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: bgRef.current.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section className="relative py-40 overflow-hidden bg-black border-y border-border/20" id="vision">
      {/* Parallax Starfield Background */}
      <div 
        ref={bgRef}
        className="absolute -inset-[20%] opacity-40 z-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 max-w-4xl mx-auto leading-tight"
        >
          Building the next-generation logistics network.
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mt-16 text-xl md:text-2xl font-serif text-muted-foreground">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
            <span className="text-primary font-bold block mb-2 text-3xl">01</span>
            Autonomous
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
            <span className="text-secondary font-bold block mb-2 text-3xl">02</span>
            Scalable
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true }}>
            <span className="text-white font-bold block mb-2 text-3xl text-glow">03</span>
            Instant
          </motion.div>
        </div>
      </div>
    </section>
  );
}
