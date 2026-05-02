import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const stats = [
    { label: "Delivery Time", value: 10, unit: "min", prefix: "< " },
    { label: "Range", value: 30, unit: "km", prefix: "" },
    { label: "Payload", value: 3.5, unit: "kg", prefix: "" },
    { label: "Uptime", value: 99.9, unit: "%", prefix: "" },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const counters = document.querySelectorAll(".stat-value");
    
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute("data-target") || "0");
      
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        snap: { innerHTML: 0.1 },
        onUpdate: function() {
          if (counter.innerHTML.includes(".")) {
             counter.innerHTML = Number(counter.innerHTML).toFixed(1);
          }
        }
      });
    });

  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-card/30 border-y border-border/10 relative overflow-hidden" id="stats">
      {/* Background scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-6xl font-bold font-serif text-primary text-glow mb-2 flex justify-center items-end">
                <span>{stat.prefix}</span>
                <span className="stat-value" data-target={stat.value}>0</span>
                <span className="text-2xl md:text-3xl ml-1">{stat.unit}</span>
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
