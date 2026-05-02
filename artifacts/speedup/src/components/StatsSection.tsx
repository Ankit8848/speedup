import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Avg Delivery Time", value: 8, unit: " min", prefix: "<", desc: "Fastest in the industry" },
  { label: "Max Range", value: 30, unit: " km", prefix: "", desc: "Per charge cycle" },
  { label: "Max Payload", value: 3.5, unit: " kg", prefix: "", desc: "Per delivery" },
  { label: "Uptime", value: 99.9, unit: "%", prefix: "", desc: "Operational reliability" },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const counters = document.querySelectorAll(".stat-num");
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute("data-target") || "0");
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        snap: { innerHTML: 0.1 },
        onUpdate: function () {
          if (counter.innerHTML.includes(".")) {
            counter.innerHTML = Number(counter.innerHTML).toFixed(1);
          }
        },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 section-light border-y border-gray-100" id="stats">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-3xl overflow-hidden card-shadow">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white px-8 py-10 text-center group hover:bg-orange-50 transition-colors duration-300">
              <div className="flex justify-center items-end gap-1 mb-2">
                {stat.prefix && (
                  <span className="text-2xl font-black mb-1" style={{ color: "#FF5500" }}>{stat.prefix}</span>
                )}
                <span className="stat-num text-5xl md:text-6xl font-black tabular-nums" style={{ color: "#FF5500" }} data-target={stat.value}>
                  0
                </span>
                <span className="text-2xl font-black mb-1" style={{ color: "#FF5500" }}>{stat.unit}</span>
              </div>
              <div className="font-bold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
