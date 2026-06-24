/**
 * Global "Request a demo" modal. Any component can open it via `useDemo().open()`.
 * Submissions POST to a Formspree endpoint configured in the admin
 * (content section "global.demoForm"), so no backend code is needed.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useSection } from "@/content/ContentProvider";

interface DemoFormContent {
  formspreeEndpoint: string;
  title: string;
  subtitle: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
}

const DemoContext = createContext<{ open: () => void }>({ open: () => {} });

export function useDemo() {
  return useContext(DemoContext);
}

const FIELD =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/15 transition-all";

function DemoForm({ onClose }: { onClose: () => void }) {
  const c = useSection<DemoFormContent>("global.demoForm");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!c.formspreeEndpoint) {
      setError("This form isn't connected yet. Add a Formspree endpoint in the admin.");
      return;
    }

    setStatus("sending");
    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch(c.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.errors?.[0]?.message ?? "Submission failed. Please try again.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="px-8 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FFF1E9] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-[#FF5500]" />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight text-[#0A0F1E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {c.successTitle}
        </h3>
        <p className="text-sm text-[#6B7280] mt-3 max-w-sm mx-auto leading-relaxed">{c.successMessage}</p>
        <button
          onClick={onClose}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0A0F1E] text-white text-xs font-bold uppercase tracking-[0.12em] px-7 py-3 hover:opacity-90"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="px-8 pt-7 pb-8">
      <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FF5500] mb-2">SpeedUp</div>
      <h3 className="text-2xl font-black uppercase tracking-tight text-[#0A0F1E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {c.title}
      </h3>
      <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">{c.subtitle}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF] mb-1.5">Name</label>
            <input name="name" required className={FIELD} placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF] mb-1.5">Email</label>
            <input name="email" type="email" required className={FIELD} placeholder="jane@company.com" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF] mb-1.5">Company</label>
            <input name="company" className={FIELD} placeholder="Optional" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF] mb-1.5">City</label>
            <input name="city" className={FIELD} placeholder="Where are you based?" />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF] mb-1.5">Message</label>
          <textarea name="message" rows={3} className={FIELD + " resize-none"} placeholder="Tell us what you're looking for…" />
        </div>

        {error && <div className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</div>}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-[#FF5500] text-white font-black uppercase tracking-[0.12em] text-xs py-4 transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-60"
          style={{ boxShadow: "0 8px 28px rgba(255,85,0,0.32)" }}
        >
          {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{c.submitLabel} <ArrowRight className="w-4 h-4" /></>}
        </button>
        <p className="text-[11px] text-center text-[#9CA3AF]">We respect your privacy. No spam, ever.</p>
      </form>
    </div>
  );
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <DemoContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ background: "rgba(10,15,30,0.55)", backdropFilter: "blur(6px)" }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white"
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                style={{ boxShadow: "0 40px 100px rgba(10,15,30,0.45)" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Accent top bar */}
                <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#FF8A3D,#FF5500,#E03E00)" }} />
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <DemoForm onClose={() => setOpen(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </DemoContext.Provider>
  );
}
