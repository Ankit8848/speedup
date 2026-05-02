import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Rocket, PackageCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !stepsRef.current) return;

    const steps = stepsRef.current.children;

    gsap.fromTo(
      steps,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      }
    );

    // Line animation
    gsap.fromTo(
      ".connection-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
      }
    );

  }, []);

  const steps = [
    {
      icon: Smartphone,
      title: "Order Placed",
      desc: "Instantly routed to the nearest hub.",
    },
    {
      icon: Rocket,
      title: "Autonomous Launch",
      desc: "Drone deployed in under 30 seconds.",
    },
    {
      icon: PackageCheck,
      title: "Precision Drop",
      desc: "Package lowered safely to your doorstep.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-background relative" id="how-it-works">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <div className="w-24 h-1 bg-primary mx-auto box-glow" />
        </div>

        <div ref={stepsRef} className="flex flex-col md:flex-row justify-center items-center md:items-start gap-12 md:gap-8 relative">
          {/* Desktop Connection Lines */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[2px] bg-border z-0">
            <div className="connection-line w-full h-full bg-primary box-glow" />
          </div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-xs w-full">
              <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mb-6 relative group box-glow-hover transition-all duration-300">
                <step.icon className="w-10 h-10 text-primary group-hover:text-secondary transition-colors" />
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-20" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
