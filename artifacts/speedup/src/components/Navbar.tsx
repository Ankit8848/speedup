import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ORANGE = "#FF5500";

const NAV_ITEMS = [
  {
    label: "About",
    items: [
      { label: "About SpeedUp", href: "#about" },
      { label: "Our Mission", href: "#mission" },
      { label: "Leadership Team", href: "#team" },
      { label: "Press & Media", href: "#press" },
    ],
  },
  {
    label: "Locations",
    items: [
      { label: "USA Overview", href: "#locations" },
      { label: "Florida – Orlando", href: "#florida" },
      { label: "Texas – Dallas", href: "#texas" },
      { label: "California – LA", href: "#california" },
      { label: "New York – NYC", href: "#newyork" },
      { label: "Georgia – Atlanta", href: "#georgia" },
    ],
  },
  {
    label: "Technology",
    items: [
      { label: "AI Navigation", href: "#technology" },
      { label: "LiDAR Sensors", href: "#lidar" },
      { label: "Drone Fleet", href: "#fleet" },
      { label: "Software Platform", href: "#software" },
    ],
  },
  {
    label: "For Business",
    items: [
      { label: "Enterprise", href: "#enterprise" },
      { label: "Retail & E-Commerce", href: "#retail" },
      { label: "Healthcare", href: "#healthcare" },
      { label: "Restaurants & Food", href: "#food" },
    ],
  },
  {
    label: "Safety",
    items: [
      { label: "Safety Standards", href: "#safety" },
      { label: "Certifications", href: "#certifications" },
      { label: "Flight Testing", href: "#testing" },
      { label: "Emergency Protocols", href: "#emergency" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog & News", href: "#blog" },
      { label: "Documentation", href: "#docs" },
      { label: "Case Studies", href: "#cases" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Partnership", href: "#partnership" },
    ],
  },
];

function DropdownMenu({ items, onClose }: { items: { label: string; href: string }[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-2xl min-w-[200px] py-2 z-50"
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => { e.preventDefault(); onClose(); const el = document.querySelector(item.href); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
          className="block px-5 py-2.5 text-sm text-gray-800 hover:text-[#FF5500] hover:bg-orange-50 transition-colors font-medium"
        >
          {item.label}
        </a>
      ))}
    </motion.div>
  );
}

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={navRef} className="fixed top-0 left-0 right-0 z-[100]" style={{ marginTop: "40px" }}>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: ORANGE }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 3L4 9v12h6v-7h4v7h6V9L12 3z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-wide" style={{ color: ORANGE }}>
              SPEEDUP
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((nav) => (
              <div key={nav.label} className="relative">
                <button
                  onMouseEnter={() => setOpenMenu(nav.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onClick={() => setOpenMenu(openMenu === nav.label ? null : nav.label)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    openMenu === nav.label ? "text-[#FF5500] bg-orange-50" : "text-gray-800 hover:text-[#FF5500] hover:bg-orange-50"
                  }`}
                >
                  {nav.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === nav.label ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  onMouseEnter={() => setOpenMenu(nav.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <AnimatePresence>
                    {openMenu === nav.label && (
                      <DropdownMenu items={nav.items} onClose={() => setOpenMenu(null)} />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* Right CTA buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              className="px-5 py-2 text-sm font-bold rounded-full border-2 border-[#FF5500] text-[#FF5500] hover:bg-orange-50 transition-colors"
            >
              Partner
            </button>
            <button
              className="px-5 py-2 text-sm font-bold rounded-full text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ background: ORANGE }}
            >
              Company Sales
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-gray-100 lg:hidden"
            >
              <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {NAV_ITEMS.map((nav) => (
                  <div key={nav.label}>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === nav.label ? null : nav.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-gray-800 rounded-lg hover:bg-orange-50 hover:text-[#FF5500]"
                    >
                      {nav.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === nav.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === nav.label && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {nav.items.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-[#FF5500] font-medium"
                            >
                              {item.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 py-2.5 text-sm font-bold rounded-full border-2 border-[#FF5500] text-[#FF5500]">
                    Partner
                  </button>
                  <button className="flex-1 py-2.5 text-sm font-bold rounded-full text-white" style={{ background: ORANGE }}>
                    Company Sales
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
