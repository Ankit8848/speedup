import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 8, unit: " min", prefix: "<", label: "Average delivery time", desc: "Fastest in the industry" },
  { value: 30, unit: "km", prefix: "", label: "Max flight range", desc: "Per full charge cycle" },
  { value: 3.5, unit: "kg", prefix: "", label: "Max payload capacity", desc: "Most deliveries covered" },
  { value: 99.9, unit: "%", prefix: "", label: "Fleet uptime", desc: "Operational reliability" },
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
    <section ref={sectionRef} id="stats" className="py-28" style={{ background: "#0D0F14" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-20">
          <span className="block w-10 h-px" style={{ background: "#FF5500" }} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FF5500" }}>By The Numbers</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="px-8 first:pl-0 last:pr-0 py-4">
              <div className="flex items-end gap-1 mb-3">
                {stat.prefix && (
                  <span className="text-3xl font-black mb-1.5" style={{ color: "#FF5500" }}>{stat.prefix}</span>
                )}
                <span
                  className="stat-counter font-black leading-none tabular-nums text-white"
                  style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", letterSpacing: "-0.04em" }}
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-2xl font-black mb-2 ml-0.5" style={{ color: "#FF5500" }}>{stat.unit}</span>
              </div>
              <div className="text-sm font-bold text-white/70 mb-1">{stat.label}</div>
              <div className="text-xs text-white/30">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
