import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./DroneScene";
import { motion } from "framer-motion";
import { CssDroneFallback } from "./WebGLFallback";
import { useWebGLSupported } from "@/hooks/use-webgl";

export function TechnologySection() {
  const [activePart, setActivePart] = useState<string | null>(null);
  const webglSupported = useWebGLSupported();

  const parts = [
    { id: "nav", label: "AI Navigation", desc: "Real-time obstacle avoidance and pathfinding." },
    { id: "sensors", label: "LiDAR Sensors", desc: "360-degree spatial awareness." },
    { id: "payload", label: "Payload System", desc: "Winch-based precision delivery." },
    { id: "battery", label: "High-Density Battery", desc: "Extended range up to 30km." },
  ];

  return (
    <section className="py-32 bg-background relative border-y border-border/10" id="technology">
      <div className="container mx-auto px-4 h-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Technology</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Engineered from the ground up for maximum efficiency and safety.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:h-[600px]">
          {/* Tech Cards */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 order-2 lg:order-1">
            {parts.map((part) => (
              <motion.div
                key={part.id}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 glass-card ${activePart === part.id ? 'border-primary box-glow' : 'hover:border-primary/50'}`}
                onMouseEnter={() => setActivePart(part.id)}
                onMouseLeave={() => setActivePart(null)}
                whileHover={{ x: 10 }}
              >
                <h3 className="text-xl font-bold text-primary mb-2">{part.label}</h3>
                <p className="text-sm text-muted-foreground">{part.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* 3D / CSS Model */}
          <div className="w-full lg:w-2/3 h-[400px] lg:h-full order-1 lg:order-2 bg-gradient-to-b from-card/10 to-transparent rounded-2xl relative flex items-center justify-center">
            <div className="absolute inset-0 z-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#000_100%)] bg-background/50" />
            {webglSupported ? (
              <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                <Scene activePart={activePart} />
              </Canvas>
            ) : (
              <div className="flex items-center justify-center w-full h-full relative z-0">
                <CssDroneFallback size="lg" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
