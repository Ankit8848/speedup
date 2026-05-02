import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 8, unit: "min", prefix: "<", label: "Average delivery time" },
  { value: 30, unit: "km", prefix: "", label: "Max drone range" },
  { value: 3.5, unit: "kg", prefix: "", label: "Max payload" },
  { value: 99.9, unit: "%", prefix: "", label: "Fleet uptime" },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    document.querySelectorAll(".stat-counter").forEach((el) => {
      const target = parseFloat(el.getAttribute("data-target") || "0");
      gsap.to(el, {
        innerHTML: target, duration: 2.5, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        snap: { innerHTML: 0.1 },
        onUpdate() {
          if (el.innerHTML.includes(".")) el.innerHTML = Number(el.innerHTML).toFixed(1);
        },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="stats" className="relative overflow-hidden"
      style={{ background: "#010b19", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="px-8 py-12 flex flex-col group transition-colors duration-300 hover:bg-white/3"
              style={{ background: "#010b19" }}
            >
              <div className="flex items-end gap-1 mb-3">
                {stat.prefix && (
                  <span className="text-2xl font-black mb-1" style={{ color: "#FF5500", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {stat.prefix}
                  </span>
                )}
                <span
                  className="stat-counter font-black leading-none text-white tabular-nums"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", fontFamily: "'Space Grotesk', sans-serif" }}
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-xl font-black mb-1.5 ml-0.5" style={{ color: "#FF5500", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.unit}
                </span>
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
