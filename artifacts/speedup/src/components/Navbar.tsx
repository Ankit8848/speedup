import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
  {
    label: "Technology",
    items: [
      { label: "AI Navigation", href: "#technology" },
      { label: "LiDAR Sensors", href: "#technology" },
      { label: "Drone Fleet", href: "#technology" },
      { label: "Autonomy Stack", href: "#technology" },
    ],
  },
  {
    label: "Locations",
    items: [
      { label: "USA Overview", href: "#locations" },
      { label: "Orlando, FL", href: "#locations" },
      { label: "Miami, FL", href: "#locations" },
      { label: "Dallas, TX", href: "#locations" },
      { label: "New York, NY", href: "#locations" },
      { label: "Atlanta, GA", href: "#locations" },
    ],
  },
  {
    label: "Safety",
    items: [
      { label: "Safety Standards", href: "#safety" },
      { label: "Certifications", href: "#safety" },
      { label: "Emergency Protocols", href: "#safety" },
    ],
  },
  {
    label: "For Business",
    items: [
      { label: "Enterprise", href: "#use-cases" },
      { label: "Retail & E-Commerce", href: "#use-cases" },
      { label: "Healthcare", href: "#use-cases" },
      { label: "Restaurants", href: "#use-cases" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About SpeedUp", href: "#hero" },
      { label: "Careers", href: "#hero" },
      { label: "Partnership", href: "#hero" },
      { label: "Press", href: "#hero" },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const scrollTo = (href: string) => {
    setOpenMenu(null);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isLight = scrolled;

  return (
    <div ref={navRef} className="fixed top-0 left-0 right-0 z-[100]" style={{ marginTop: "40px" }}>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="transition-all duration-300"
        style={{
          background: isLight ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: isLight ? "blur(20px)" : "none",
          borderBottom: isLight ? "1px solid rgba(0,0,0,0.06)" : "none",
          boxShadow: isLight ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[68px]">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 select-none"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "#FF5500" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 2L3 8v14h7v-8h4v8h7V8L12 2z" fill="white" />
              </svg>
            </div>
            <span
              className="text-[1.1rem] font-black tracking-widest uppercase"
              style={{ color: isLight ? "#0D0F14" : "#FFFFFF" }}
            >
              SpeedUp
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((nav) => (
              <div key={nav.label} className="relative">
                <button
                  onMouseEnter={() => setOpenMenu(nav.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                  className={`flex items-center gap-1 px-4 py-2 text-[0.85rem] font-semibold tracking-wide transition-colors rounded-lg ${
                    openMenu === nav.label
                      ? isLight ? "text-[#FF5500]" : "text-[#FF5500]"
                      : isLight
                        ? "text-gray-700 hover:text-[#FF5500]"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {nav.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === nav.label ? "rotate-180" : ""}`} />
                </button>
                <div onMouseEnter={() => setOpenMenu(nav.label)} onMouseLeave={() => setOpenMenu(null)}>
                  <AnimatePresence>
                    {openMenu === nav.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl min-w-[200px] py-2 z-50 overflow-hidden"
                      >
                        {nav.items.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => scrollTo(item.href)}
                            className="w-full text-left block px-5 py-2.5 text-sm text-gray-700 hover:text-[#FF5500] hover:bg-orange-50 transition-colors font-medium"
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              className="px-5 py-2.5 text-sm font-bold rounded-full transition-all"
              style={{
                color: isLight ? "#0D0F14" : "white",
                border: isLight ? "1.5px solid #0D0F14" : "1.5px solid rgba(255,255,255,0.4)",
              }}
            >
              Sign In
            </button>
            <button
              className="px-5 py-2.5 text-sm font-bold rounded-full text-white transition-all hover:opacity-90 hover:scale-[1.03]"
              style={{ background: "#FF5500", boxShadow: "0 4px 16px rgba(255,85,0,0.3)" }}
            >
              Request Demo
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: isLight ? "#0D0F14" : "white" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden bg-white border-t border-gray-100 lg:hidden"
            >
              <div className="px-5 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {NAV_ITEMS.map((nav) => (
                  <div key={nav.label}>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === nav.label ? null : nav.label)}
                      className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-800 rounded-xl hover:bg-gray-50"
                    >
                      {nav.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === nav.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === nav.label && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-4">
                          {nav.items.map((item) => (
                            <button key={item.label} onClick={() => scrollTo(item.href)}
                              className="w-full text-left block px-3 py-2.5 text-sm text-gray-500 hover:text-[#FF5500] font-medium">
                              {item.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 py-3 text-sm font-bold rounded-full border-2 border-gray-200 text-gray-700">Sign In</button>
                  <button className="flex-1 py-3 text-sm font-bold rounded-full text-white" style={{ background: "#FF5500" }}>Request Demo</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
