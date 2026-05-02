import { Canvas } from "@react-three/fiber";
import { Scene } from "./DroneScene";
import { motion } from "framer-motion";
import { Stars } from "@react-three/drei";
import { CssDroneFallback } from "./WebGLFallback";
import { useWebGLSupported } from "@/hooks/use-webgl";

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  w: (((i * 7919) % 20) / 10 + 1).toFixed(1) + "px",
  h: (((i * 7919) % 20) / 10 + 1).toFixed(1) + "px",
  top: ((i * 1637) % 100) + "%",
  left: ((i * 2741) % 100) + "%",
  opacity: (((i * 3491) % 7) / 10 + 0.1).toFixed(2),
  dur: (((i * 1123) % 30) / 10 + 2).toFixed(1) + "s",
  delay: (((i * 997) % 30) / 10).toFixed(1) + "s",
}));

function CssFallbackBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 20% 80%, rgba(0,212,255,0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(123,47,255,0.08) 0%, transparent 50%)"
        }}
      />
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: s.w, height: s.h,
            top: s.top, left: s.left,
            opacity: Number(s.opacity),
            animation: `twinkle ${s.dur} ease-in-out infinite ${s.delay}`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }
      `}</style>
      <CssDroneFallback size="lg" />
    </div>
  );
}

export function HeroSection() {
  const webglSupported = useWebGLSupported();

  return (
    <section className="relative h-[100dvh] w-full bg-background overflow-hidden" id="hero">
      {/* 3D / CSS Background */}
      <div className="absolute inset-0 z-0">
        {webglSupported ? (
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Scene />
          </Canvas>
        ) : (
          <CssFallbackBackground />
        )}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_100%,#000_10%,transparent_100%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            SpeedUp <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">
              The Future of Instant Delivery
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Autonomous drone logistics for the next generation of commerce.
          Faster, greener, and limitless.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button data-testid="btn-experience" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all hover:scale-105 box-glow">
            Experience the Future
          </button>
          <button data-testid="btn-watch-demo" className="px-8 py-4 bg-card/40 backdrop-blur-md border border-primary/30 text-white font-semibold rounded-full hover:bg-card/60 transition-all hover:scale-105 box-glow-hover">
            Watch Demo
          </button>
        </motion.div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
}
