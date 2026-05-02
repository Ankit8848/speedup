import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Place Your Order",
    desc: "Open the SpeedUp app, pick your items, tap confirm. Instantly routed to the nearest drone hub — no queue, no wait.",
  },
  {
    num: "02",
    title: "Drone Dispatched",
    desc: "Your dedicated drone launches in under 30 seconds. No driver, no traffic, no stoplight. A direct flight path to you.",
  },
  {
    num: "03",
    title: "Backyard Delivery",
    desc: "Your package descends gently via smart winch to your porch, backyard, or rooftop. Done in under 10 minutes.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(".hiw-step",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative overflow-hidden"
      style={{ background: "#010b19", padding: "9rem 0" }}>

      {/* Glow */}
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.06)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px" style={{ background: "#FF5500" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>
                How It Works
              </span>
            </div>
            <h2
              className="font-black uppercase text-white leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Order to door<br />in 3 steps.
            </h2>
          </div>
          <p className="text-white/40 text-lg leading-relaxed max-w-sm lg:text-right">
            We removed every friction point from last-mile delivery. What used to take 45 minutes now takes less than 10.
          </p>
        </div>

        {/* Steps — Flytrex card style: glass cards with top orange line */}
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div key={step.num} className="hiw-step group">
              <div
                className="relative rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ background: "#FF5500", opacity: 0.7 }} />

                {/* Number */}
                <div
                  className="text-[5rem] font-black leading-none mb-6 select-none"
                  style={{ color: "rgba(255,85,0,0.1)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.05em" }}
                >
                  {step.num}
                </div>

                <h3 className="text-xl font-black text-white mb-4 leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-white/45 leading-relaxed text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
