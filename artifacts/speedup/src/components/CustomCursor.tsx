import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 2 }}
        style={{
          boxShadow: "0 0 20px rgba(0, 212, 255, 0.8)",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-primary/50 rounded-full pointer-events-none z-[9998] mix-blend-screen"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1 }}
      />
    </>
  );
}
