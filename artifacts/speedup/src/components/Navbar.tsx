import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-8 h-8 bg-primary rounded-tr-xl rounded-bl-xl box-glow animate-pulse" />
          <span className="text-xl font-serif font-bold tracking-wider">SPEEDUP</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('how-it-works')} className="text-sm text-muted-foreground hover:text-primary transition-colors">Technology</button>
          <button onClick={() => scrollTo('use-cases')} className="text-sm text-muted-foreground hover:text-primary transition-colors">Solutions</button>
          <button onClick={() => scrollTo('simulation')} className="text-sm text-muted-foreground hover:text-primary transition-colors">Simulation</button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            data-testid="btn-theme-toggle"
            className="p-2 rounded-full hover:bg-card transition-colors"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <Sun className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Moon className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button data-testid="btn-nav-early-access" className="hidden sm:block px-5 py-2 bg-primary/10 text-primary border border-primary/50 hover:bg-primary hover:text-primary-foreground rounded-full text-sm font-medium transition-all box-glow-hover">
            Get Early Access
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
