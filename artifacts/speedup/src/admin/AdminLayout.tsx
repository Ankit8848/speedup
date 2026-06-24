import { type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { FileText, Image, Users, LogOut, ExternalLink } from "lucide-react";
import { SpeedUpLogo } from "@/components/SpeedUpLogo";
import { useAuth } from "./AuthContext";
import type { Role } from "./client";

// Paths are relative to the nested router's /admin base (see App.tsx).
const NAV: { label: string; href: string; icon: typeof FileText; roles: Role[] }[] = [
  { label: "Content", href: "/content", icon: FileText, roles: ["super_admin", "editor"] },
  { label: "Media", href: "/media", icon: Image, roles: ["super_admin", "editor"] },
  { label: "Admins", href: "/users", icon: Users, roles: ["super_admin"] },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  return (
    <div className="min-h-dvh flex" style={{ background: "#F4F6FA" }}>
      {/* Sidebar */}
      <aside className="w-60 shrink-0 flex flex-col text-white" style={{ background: "#0A0F1E" }}>
        <div className="px-6 py-6 border-b border-white/10">
          <SpeedUpLogo size={26} wordmarkColor="white" />
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mt-2">Content Studio</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.filter((n) => user && n.roles.includes(user.role)).map((item) => {
            const active = location.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: active ? "rgba(255,85,0,0.16)" : "transparent",
                  color: active ? "#FF8A4C" : "rgba(255,255,255,0.7)",
                }}
              >
                <Icon className="w-4 h-4" /> {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> View site
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
          <div className="px-3 pt-3">
            <div className="text-xs font-bold text-white truncate">{user?.displayName}</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/40 mt-0.5">
              {user?.role === "super_admin" ? "Super Admin" : "Editor"}
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
    </div>
  );
}
