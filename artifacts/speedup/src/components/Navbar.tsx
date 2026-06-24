import { useState, useEffect } from "react";
import { X, Menu, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { SpeedUpLogo } from "./SpeedUpLogo";
import { useSection } from "@/content/ContentProvider";
import { useDemo } from "./DemoModal";

interface NavbarContent {
  links: { label: string; href: string }[];
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
}

export function Navbar() {
  const {
    links: NAV_LINKS,
    ctaSecondaryLabel,
    ctaSecondaryHref,
    ctaPrimaryLabel,
  } = useSection<NavbarContent>("global.navbar");
  const { open: openDemo } = useDemo();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    navigate(href);
  };

  const isActive = (href: string) => location === href;

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          marginTop: "40px",
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${scrolled ? "rgba(0,0,0,0.09)" : "rgba(0,0,0,0.04)"}`,
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[68px]">
          <button onClick={() => go("/")} className="select-none hover:opacity-80 transition-opacity">
            <SpeedUpLogo size={34} wordmarkColor="#0A0F1E" />
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.label}
                  onClick={() => go(link.href)}
                  className="relative px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] transition-colors rounded-full hover:bg-black/5"
                  style={{ color: active ? "#FF5500" : "#4B5675" }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#0A0F1E"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#4B5675"; }}
                >
                  {link.label}
                  {active && <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full" style={{ background: "#FF5500" }} />}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => go(ctaSecondaryHref)} className="px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all hover:bg-black/5" style={{ color: "#4B5675", border: "1px solid rgba(0,0,0,0.15)" }}>
              {ctaSecondaryLabel}
            </button>
            <button onClick={openDemo} className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] rounded-full text-white transition-all hover:opacity-90 hover:scale-[1.02]" style={{ background: "#FF5500", boxShadow: "0 4px 16px rgba(255,85,0,0.3)" }}>
              {ctaPrimaryLabel} <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 transition-colors" style={{ color: "#4B5675" }}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50" style={{ background: "rgba(10,15,30,0.35)", backdropFilter: "blur(4px)" }} onClick={() => setMenuOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: "easeOut" }} className="fixed top-0 right-0 h-full w-full lg:w-[380px] z-50 flex flex-col" style={{ background: "#FF5500" }}>
              <div className="flex items-center justify-between px-8 pt-8 pb-6">
                <SpeedUpLogo size={32} wordmarkColor="white" />
                <button onClick={() => setMenuOpen(false)} className="p-2 text-white/80 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex-1 px-8 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.button key={link.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }} onClick={() => go(link.href)} className="w-full text-left py-4 text-2xl font-black uppercase transition-colors border-b border-white/15 tracking-tight" style={{ color: isActive(link.href) ? "rgba(255,255,255,0.5)" : "white" }}>
                    {link.label}
                  </motion.button>
                ))}
              </nav>
              <div className="px-8 pb-10 pt-6 flex flex-col gap-3">
                <button onClick={() => go(ctaSecondaryHref)} className="w-full py-4 text-sm font-bold uppercase tracking-widest text-white border-2 border-white/40 rounded-full hover:bg-white/10 transition-colors">{ctaSecondaryLabel}</button>
                <button onClick={() => { setMenuOpen(false); openDemo(); }} className="w-full py-4 text-sm font-bold uppercase tracking-widest rounded-full bg-white hover:opacity-90 transition-opacity" style={{ color: "#FF5500" }}>{ctaPrimaryLabel}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
