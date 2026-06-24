import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Loader2, ShieldCheck, PenLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminApi, type AdminUser, type Role } from "./client";
import { useAuth } from "./AuthContext";

const blankForm = { email: "", password: "", displayName: "", role: "editor" as Role };

export default function UsersAdmin() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { user: me } = useAuth();
  const [form, setForm] = useState(blankForm);
  const [showForm, setShowForm] = useState(false);

  const { data: users = [], isLoading } = useQuery({ queryKey: ["users"], queryFn: adminApi.listUsers });

  const create = useMutation({
    mutationFn: () => adminApi.createUser(form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      setForm(blankForm);
      setShowForm(false);
      toast({ title: "Admin created" });
    },
    onError: (e) => toast({ title: "Failed", description: String(e), variant: "destructive" }),
  });

  const toggleActive = useMutation({
    mutationFn: (u: AdminUser) => adminApi.updateUser(u.id, { active: !u.active }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  const setRole = useMutation({
    mutationFn: ({ u, role }: { u: AdminUser; role: Role }) => adminApi.updateUser(u.id, { role }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  const del = useMutation({
    mutationFn: (id: number) => adminApi.deleteUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "Admin removed" });
    },
    onError: (e) => toast({ title: "Failed", description: String(e), variant: "destructive" }),
  });

  const input = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#FF5500]";

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#0A0F1E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Admins
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">Manage who can sign in and edit the site.</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 rounded-full bg-[#FF5500] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3 hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> New admin
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={(e) => { e.preventDefault(); create.mutate(); }}
          className="rounded-2xl bg-white border border-slate-100 p-5 mb-6 grid sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Name</label>
            <input className={input} value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} required />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Email</label>
            <input type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Password (min 8)</label>
            <input type="text" className={input} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Role</label>
            <select className={input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
              <option value="editor">Editor</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-slate-200 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-slate-500">Cancel</button>
            <button type="submit" disabled={create.isPending} className="flex items-center gap-2 rounded-full bg-[#0A0F1E] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] disabled:opacity-60">
              {create.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Create
            </button>
          </div>
        </form>
      )}

      <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-sm text-slate-400">Loading…</div>
        ) : (
          users.map((u) => (
            <div key={u.id} className="flex items-center gap-4 px-5 py-4 border-b border-slate-50 last:border-0">
              <div className="w-9 h-9 rounded-full bg-[#FFF1E9] flex items-center justify-center text-[#FF5500] font-black text-sm shrink-0">
                {u.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-[#0A0F1E] flex items-center gap-2">
                  {u.displayName}
                  {u.id === me?.id && <span className="text-[10px] font-bold text-slate-400">(you)</span>}
                  {!u.active && <span className="text-[10px] font-bold text-red-500 uppercase">Disabled</span>}
                </div>
                <div className="text-xs text-slate-400 truncate">{u.email}</div>
              </div>

              <select
                value={u.role}
                disabled={u.id === me?.id}
                onChange={(e) => setRole.mutate({ u, role: e.target.value as Role })}
                className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold text-slate-600 disabled:opacity-50"
              >
                <option value="editor">Editor</option>
                <option value="super_admin">Super Admin</option>
              </select>

              <span className="hidden sm:flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 w-24">
                {u.role === "super_admin" ? <><ShieldCheck className="w-3.5 h-3.5" /> Full</> : <><PenLine className="w-3.5 h-3.5" /> Content</>}
              </span>

              <button
                onClick={() => toggleActive.mutate(u)}
                disabled={u.id === me?.id}
                className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500 hover:text-[#FF5500] disabled:opacity-40 w-16"
              >
                {u.active ? "Disable" : "Enable"}
              </button>

              <button
                onClick={() => del.mutate(u.id)}
                disabled={u.id === me?.id}
                className="p-2 rounded-lg text-red-400 hover:bg-red-50 disabled:opacity-30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
