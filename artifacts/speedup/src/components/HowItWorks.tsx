import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Rocket, PackageCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Smartphone,
    step: "01",
    title: "Place Your Order",
    desc: "Open the app, choose your items, and confirm. Your order is instantly routed to the nearest SpeedUp hub.",
    color: "#FF5500",
  },
  {
    icon: Rocket,
    step: "02",
    title: "Autonomous Launch",
    desc: "A drone is dispatched from the hub in under 30 seconds — no driver, no traffic, no delays.",
    color: "#FF7722",
  },
  {
    icon: PackageCheck,
    step: "03",
    title: "Precision Delivery",
    desc: "Your package is gently lowered to your exact location via our smart winch system. Done in under 10 minutes.",
    color: "#FF9944",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      ".hiw-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.2, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-28 section-gray" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4"
            style={{ background: "#FF550012", color: "#FF5500", border: "1px solid #FF550025" }}>
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Order to door in <span style={{ color: "#FF5500" }}>3 steps</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            The simplest, fastest last-mile experience ever built.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px"
            style={{ background: "linear-gradient(90deg, #FF5500, #FF9944)" }} />

          {steps.map((step) => (
            <div key={step.step} className="hiw-card relative">
              <div className="bg-white rounded-3xl p-8 card-shadow hover:card-shadow-lg transition-all duration-300 group hover:-translate-y-1 text-center">
                {/* Step number */}
                <div className="text-xs font-black tracking-widest mb-5" style={{ color: step.color }}>
                  STEP {step.step}
                </div>
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: step.color + "12" }}>
                  <step.icon className="w-9 h-9" style={{ color: step.color }} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
