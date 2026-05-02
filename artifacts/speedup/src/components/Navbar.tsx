import { useState, useEffect } from "react";
import { X, Menu, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SpeedUpLogo } from "./SpeedUpLogo";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Technology", href: "#technology" },
  { label: "Safety", href: "#safety" },
  { label: "Locations", href: "#locations" },
  { label: "For Business", href: "#use-cases" },
  { label: "Company", href: "#hero" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Main navbar */}
      <div
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          marginTop: "40px",
          background: scrolled ? "rgba(1,11,25,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="select-none hover:opacity-90 transition-opacity"
          >
            <SpeedUpLogo size={34} />
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo("#locations")}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] rounded-full text-white/70 border border-white/20 hover:bg-white/8 hover:text-white transition-all"
            >
              Find My City
            </button>
            <button
              onClick={() => scrollTo("#simulation")}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] rounded-full text-[#010b19] transition-all hover:opacity-90 hover:scale-[1.03]"
              style={{ background: "#FF5500", color: "white", boxShadow: "0 4px 20px rgba(255,85,0,0.35)" }}
            >
              Request Demo <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile slide-in drawer (Flytrex style — slides from right, orange fill) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-full lg:w-[380px] z-50 flex flex-col"
              style={{ background: "#FF5500" }}
            >
              {/* Close */}
              <div className="flex items-center justify-between px-8 pt-8 pb-6">
                <SpeedUpLogo size={32} wordmarkColor="white" />
                <button onClick={() => setMenuOpen(false)} className="p-2 text-white/80 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-8 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left py-4 text-2xl font-black uppercase text-white hover:text-white/70 transition-colors border-b border-white/15 tracking-tight"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="px-8 pb-10 pt-6 flex flex-col gap-3">
                <button
                  onClick={() => scrollTo("#locations")}
                  className="w-full py-4 text-sm font-bold uppercase tracking-widest text-white border-2 border-white/40 rounded-full hover:bg-white/10 transition-colors"
                >
                  Find My City
                </button>
                <button
                  onClick={() => scrollTo("#simulation")}
                  className="w-full py-4 text-sm font-bold uppercase tracking-widest text-[#FF5500] rounded-full bg-white hover:opacity-90 transition-opacity"
                >
                  Request Demo
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
