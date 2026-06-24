import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Loader2 } from "lucide-react";
import { SpeedUpLogo } from "@/components/SpeedUpLogo";
import { useAuth } from "./AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email.trim(), password);
      navigate("/content");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-6" style={{ background: "#0A0F1E" }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <SpeedUpLogo size={36} wordmarkColor="white" />
        </div>
        <div className="rounded-2xl bg-white p-8" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
          <h1 className="text-xl font-black uppercase tracking-tight text-[#0A0F1E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Admin sign in
          </h1>
          <p className="text-sm text-[#6B7280] mt-1 mb-6">Manage your site content.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#9CA3AF] mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF5500] transition-colors"
                placeholder="admin@speedup.com"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#9CA3AF] mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF5500] transition-colors"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-[#FF5500] text-white font-bold uppercase tracking-[0.12em] text-xs py-3.5 transition-all hover:opacity-90 disabled:opacity-60"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign in <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
        <p className="text-center text-[11px] text-white/40 mt-6">SpeedUp CMS · authorized access only</p>
      </div>
    </div>
  );
}
