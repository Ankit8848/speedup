import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Place Your Order",
    desc: "Open the SpeedUp app, pick what you need, confirm. Your order instantly routes to the nearest hub — no waiting, no queue.",
  },
  {
    num: "02",
    title: "Drone Dispatched",
    desc: "A fully autonomous drone launches in under 30 seconds. No driver, no traffic, no delays — just a direct flight path to you.",
  },
  {
    num: "03",
    title: "Doorstep Delivery",
    desc: "Your package descends via precision winch system directly to your door, rooftop, or balcony. Done in under 10 minutes.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(".hiw-step",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.25, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-36" style={{ background: "#F5F3EF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-10 h-px" style={{ background: "#FF5500" }} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FF5500" }}>How It Works</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-end mb-24">
          <h2 className="font-black text-[#0D0F14] leading-[1.0]" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            Order to door<br />in 3 steps.
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed max-w-md">
            We've removed every friction point from last-mile delivery. What used to take 45 minutes now takes less than 10.
          </p>
        </div>

        {/* Steps — horizontal rule layout like Flytrex */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0D0F14]/10">
          {steps.map((step) => (
            <div key={step.num} className="hiw-step py-10 md:py-0 md:pr-12 md:pl-12 first:pl-0 last:pr-0">
              <div
                className="text-6xl font-black mb-8 leading-none"
                style={{ color: "#0D0F14", opacity: 0.08, letterSpacing: "-0.05em" }}
              >
                {step.num}
              </div>
              <h3 className="text-xl font-black text-[#0D0F14] mb-4">{step.title}</h3>
              <p className="text-[#6B7280] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
