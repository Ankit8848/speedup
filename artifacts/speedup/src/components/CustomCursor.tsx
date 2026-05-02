import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [angle, setAngle] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const prevPos = useRef({ x: -200, y: -200 });
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    /* Hide system cursor site-wide */
    const style = document.createElement("style");
    style.id = "drone-cursor-hide";
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      @keyframes rotorSpinA { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes rotorSpinB { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      @keyframes droneGlow  { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
    `;
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 2) {
        const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        setAngle(rawAngle);
        setIsMoving(true);
      }

      setPos({ x: e.clientX, y: e.clientY });
      prevPos.current = { x: e.clientX, y: e.clientY };

      if (moveTimer.current) clearTimeout(moveTimer.current);
      moveTimer.current = setTimeout(() => setIsMoving(false), 150);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.getElementById("drone-cursor-hide")?.remove();
    };
  }, []);

  return (
    <>
      {/* Drone body — follows with slight spring lag for "flying" feel */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - 26,
          y: pos.y - 26,
          rotate: angle,
        }}
        transition={{
          x: { type: "spring", stiffness: 520, damping: 28, mass: 0.6 },
          y: { type: "spring", stiffness: 520, damping: 28, mass: 0.6 },
          rotate: { type: "spring", stiffness: 160, damping: 18, mass: 0.8 },
        }}
        style={{ width: 52, height: 52 }}
      >
        {/* Glow behind drone */}
        <motion.div
          animate={{ opacity: isMoving ? 0.55 : 0.25, scale: isMoving ? 1.2 : 0.9 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,85,0,0.4) 0%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />

        {/* Drone SVG */}
        <svg viewBox="0 0 52 52" width="52" height="52" fill="none" style={{ overflow: "visible" }}>
          {/* ── Arms ── */}
          <line x1="26" y1="26" x2="10" y2="10" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <line x1="26" y1="26" x2="42" y2="10" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <line x1="26" y1="26" x2="10" y2="42" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <line x1="26" y1="26" x2="42" y2="42" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

          {/* ── Rotor housing rings ── */}
          {([[10,10],[42,10],[10,42],[42,42]] as [number,number][]).map(([cx,cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="8"
              fill="rgba(255,85,0,0.06)" stroke="#FF5500" strokeWidth="1.2" opacity="0.55" />
          ))}

          {/* ── Spinning blades — top-left rotor (CW) ── */}
          <g style={{ transformBox: "fill-box", transformOrigin: "10px 10px", animation: "rotorSpinA 0.07s linear infinite" }}>
            <line x1="3.5" y1="10" x2="16.5" y2="10" stroke="rgba(10,15,30,0.45)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="10" y1="3.5" x2="10" y2="16.5" stroke="rgba(10,15,30,0.45)" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* ── Top-right rotor (CCW) ── */}
          <g style={{ transformBox: "fill-box", transformOrigin: "42px 10px", animation: "rotorSpinB 0.07s linear infinite" }}>
            <line x1="35.5" y1="10" x2="48.5" y2="10" stroke="rgba(10,15,30,0.45)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="42" y1="3.5" x2="42" y2="16.5" stroke="rgba(10,15,30,0.45)" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* ── Bottom-left rotor (CCW) ── */}
          <g style={{ transformBox: "fill-box", transformOrigin: "10px 42px", animation: "rotorSpinB 0.07s linear infinite" }}>
            <line x1="3.5" y1="42" x2="16.5" y2="42" stroke="rgba(10,15,30,0.45)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="10" y1="35.5" x2="10" y2="48.5" stroke="rgba(10,15,30,0.45)" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* ── Bottom-right rotor (CW) ── */}
          <g style={{ transformBox: "fill-box", transformOrigin: "42px 42px", animation: "rotorSpinA 0.07s linear infinite" }}>
            <line x1="35.5" y1="42" x2="48.5" y2="42" stroke="rgba(10,15,30,0.45)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="42" y1="35.5" x2="42" y2="48.5" stroke="rgba(10,15,30,0.45)" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* ── Central body ── */}
          <polygon points="26,19 31,23 31,29 26,33 21,29 21,23"
            fill="#FF5500" style={{ filter: "drop-shadow(0 0 4px rgba(255,85,0,0.5))" }} />
          {/* Camera lens */}
          <circle cx="26" cy="26" r="3.5" fill="rgba(10,15,30,0.85)" />
          <circle cx="26" cy="26" r="1.8" fill="#FF5500" style={{ animation: "droneGlow 1.5s ease-in-out infinite" }} />
          <circle cx="26" cy="26" r="0.8" fill="white" />
        </svg>
      </motion.div>

      {/* Precise dot at exact cursor position */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        animate={{ x: pos.x - 2, y: pos.y - 2 }}
        transition={{ type: "spring", stiffness: 2000, damping: 50, mass: 0.1 }}
        style={{ width: 4, height: 4, background: "#0A0F1E", boxShadow: "0 0 6px rgba(255,85,0,0.6)" }}
      />

      {/* Motion trail ring — trails behind with heavy lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border"
        animate={{ x: pos.x - 18, y: pos.y - 18, opacity: isMoving ? 0.35 : 0 }}
        transition={{
          x: { type: "spring", stiffness: 80, damping: 18, mass: 1.2 },
          y: { type: "spring", stiffness: 80, damping: 18, mass: 1.2 },
          opacity: { duration: 0.3 },
        }}
        style={{ width: 36, height: 36, borderColor: "rgba(255,85,0,0.5)", borderWidth: 1 }}
      />
    </>
  );
}
