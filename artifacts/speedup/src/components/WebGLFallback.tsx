import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function CssDroneFallback({ size = "lg" }: { size?: "sm" | "lg" }) {
  const scale = size === "sm" ? 0.6 : 1;
  const px = (n: number) => `${n * scale}px`;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: px(300), height: px(300) }}
    >
      <div
        className="absolute"
        style={{
          width: px(300),
          height: px(300),
          animation: "drone-float 3s ease-in-out infinite",
        }}
      >
        {/* Drone body */}
        <div
          className="absolute bg-card border border-primary/30 rounded-lg"
          style={{
            width: px(80),
            height: px(24),
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${px(20)} rgba(0,212,255,0.3)`,
          }}
        />
        {/* AI Dome */}
        <div
          className="absolute bg-primary/20 border border-primary/60 rounded-full"
          style={{
            width: px(28),
            height: px(16),
            top: "calc(50% - 20px)",
            left: "50%",
            transform: "translateX(-50%)",
            boxShadow: `0 0 ${px(10)} rgba(0,212,255,0.6)`,
          }}
        />
        {/* Payload */}
        <div
          className="absolute bg-white/10 border border-white/20 rounded"
          style={{
            width: px(24),
            height: px(20),
            top: "calc(50% + 12px)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* Arms */}
        {[
          { angle: -45, x: -30, y: -30 },
          { angle: 45, x: 30, y: -30 },
          { angle: 45, x: -30, y: 30 },
          { angle: -45, x: 30, y: 30 },
        ].map((arm, i) => (
          <div key={i}>
            {/* Arm */}
            <div
              className="absolute bg-card/80 border border-border/50"
              style={{
                width: px(50),
                height: px(4),
                top: "50%",
                left: "50%",
                transformOrigin: "0% 50%",
                transform: `translate(${arm.x < 0 ? "-100%" : "0"}, -50%) rotate(${arm.angle}deg)`,
              }}
            />
            {/* Motor hub */}
            <div
              className="absolute bg-card border border-primary/40 rounded-full"
              style={{
                width: px(16),
                height: px(16),
                top: `calc(50% + ${arm.y}px - 8px)`,
                left: `calc(50% + ${arm.x}px - 8px)`,
                boxShadow: `0 0 ${px(8)} rgba(0,212,255,0.4)`,
              }}
            />
            {/* Rotor */}
            <div
              className="absolute rounded-full border-t-2 border-primary/70"
              style={{
                width: px(50),
                height: px(50),
                top: `calc(50% + ${arm.y}px - 25px)`,
                left: `calc(50% + ${arm.x}px - 25px)`,
                animation: `rotor-spin ${i % 2 === 0 ? "0.5s" : "0.5s"} linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
                borderColor: "rgba(0,212,255,0.5)",
                boxShadow: `0 0 ${px(12)} rgba(0,212,255,0.2)`,
              }}
            />
          </div>
        ))}

        {/* Ambient glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: px(200),
            height: px(200),
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
            animation: "drone-glow 3s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes drone-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(1deg); }
          66% { transform: translateY(-6px) rotate(-1deg); }
        }
        @keyframes rotor-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes drone-glow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
