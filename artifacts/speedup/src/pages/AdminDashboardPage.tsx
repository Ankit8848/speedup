import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  BatteryCharging,
  CalendarDays,
  ChartColumn,
  ChevronRight,
  Cpu,
  Download,
  LayoutDashboard,
  MapPinned,
  Package,
  ShieldAlert,
  Users,
  Waves,
  Zap,
  Radar,
  TriangleAlert,
  Gauge,
  Route,
  Database,
  ShieldCheck,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

const KPI_CARDS = [
  { label: "Total Deliveries", value: "12,482", delta: "+14.2%", icon: Package, tone: "#FF5500", note: "vs last 30 days" },
  { label: "Active Drones", value: "84", delta: "+6", icon: Waves, tone: "#2563EB", note: "online right now" },
  { label: "Failed Deliveries", value: "12", delta: "-18%", icon: ShieldAlert, tone: "#DC2626", note: "auto-recovered" },
  { label: "Revenue", value: "$428k", delta: "+21.4%", icon: ChartColumn, tone: "#16A34A", note: "this month" },
];

const DRONES = [
  { id: "DR-4829", model: "Aero X2", battery: 92, status: "Delivering", payload: "2.5kg", location: "Downtown Hub", signal: "Strong", eta: "5m 24s" },
  { id: "DR-7712", model: "Aero X1", battery: 37, status: "Charging", payload: "1.8kg", location: "West Station", signal: "Stable", eta: "Next wave" },
  { id: "DR-1044", model: "Cargo Pro", battery: 68, status: "Idle", payload: "4.2kg", location: "North Hub", signal: "Strong", eta: "Standby" },
  { id: "DR-5530", model: "Aero X3", battery: 58, status: "Maintenance", payload: "3.0kg", location: "Service Bay", signal: "Limited", eta: "Inspection" },
];

const ALERTS = [
  { title: "Low battery alert", detail: "DR-7712 under 40% at West Station", time: "2 min ago", icon: BatteryCharging, color: "#F59E0B" },
  { title: "Delivery delay", detail: "Order #8821 rerouted due to wind", time: "8 min ago", icon: Bell, color: "#FF5500" },
  { title: "Geo-fence update", detail: "New no-fly polygon approved", time: "18 min ago", icon: MapPinned, color: "#2563EB" },
  { title: "Maintenance due", detail: "DR-5530 flagged for rotor calibration", time: "31 min ago", icon: TriangleAlert, color: "#8B5CF6" },
];

const DELIVERIES = [
  { order: "#8821", customer: "Marco's Pizzeria", city: "Orlando", status: "In Transit", eta: "6 min", priority: "High" },
  { order: "#8819", customer: "Luma Grocery", city: "Miami", status: "Delivered", eta: "Arrived", priority: "Normal" },
  { order: "#8807", customer: "FreshLeaf", city: "Dallas", status: "Pending", eta: "12 min", priority: "Normal" },
  { order: "#8798", customer: "Cobalt Cafe", city: "Atlanta", status: "Failed", eta: "Retry", priority: "Critical" },
  { order: "#8790", customer: "Northside Clinic", city: "Austin", status: "Scheduled", eta: "18 min", priority: "Medical" },
];

const TASKS = [
  { label: "Optimize routes", value: "Auto-pilot", icon: Route, tone: "#FF5500" },
  { label: "Fleet sync", value: "Realtime", icon: Radar, tone: "#2563EB" },
  { label: "Storage", value: "78% used", icon: Database, tone: "#16A34A" },
  { label: "Compliance", value: "99.8%", icon: ShieldCheck, tone: "#8B5CF6" },
];

export default function AdminDashboardPage() {
  const [, navigate] = useLocation();

  return (
    <PageLayout>
      <section className="relative overflow-hidden" style={{ background: "#07111F", color: "white", padding: "5.75rem 0 4.5rem" }}>
        <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden>
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 12% 10%, rgba(255,85,0,0.28), transparent 28%), radial-gradient(circle at 88% 0%, rgba(37,99,235,0.2), transparent 28%), radial-gradient(circle at 50% 100%, rgba(22,163,74,0.12), transparent 30%)" }} />
          <svg width="100%" height="100%">
            <defs>
              <pattern id="adminGrid" width="72" height="72" patternUnits="userSpaceOnUse">
                <path d="M 72 0 L 0 0 0 72" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#adminGrid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8 mb-10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-5 text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: "#FF9B66" }}>
                <LayoutDashboard className="w-4 h-4" /> Operations Control Center
                <span className="px-3 py-1 rounded-full border border-white/10 text-white/70" style={{ background: "rgba(255,255,255,0.04)" }}>Enterprise</span>
                <span className="px-3 py-1 rounded-full border border-emerald-400/20 text-emerald-300" style={{ background: "rgba(16,185,129,0.08)" }}>All systems nominal</span>
              </div>
              <h1 className="font-black uppercase leading-[0.88]" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", letterSpacing: "-0.05em", fontFamily: "'Space Grotesk', sans-serif" }}>
                Autonomous logistics<br />in one cockpit.
              </h1>
              <p className="mt-5 text-white/62 max-w-2xl text-lg leading-relaxed">
                Monitor fleet health, dispatch routes, manage delivery zones, and act on anomalies before they impact service.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full xl:w-auto xl:min-w-[360px]">
              <button onClick={() => navigate("/for-business")} className="col-span-2 px-5 py-3 rounded-full bg-white text-[#07111F] font-bold uppercase tracking-[0.1em] text-xs transition-all hover:scale-[1.01]">
                Add operator
              </button>
              <button className="px-5 py-3 rounded-full border border-white/12 text-white/82 font-bold uppercase tracking-[0.1em] text-xs transition-all hover:bg-white/5">
                Export report
              </button>
              <button className="px-5 py-3 rounded-full border border-white/12 text-white/82 font-bold uppercase tracking-[0.1em] text-xs transition-all hover:bg-white/5">
                View audit log
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {KPI_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} className="rounded-[1.75rem] p-6 border" style={{ background: "rgba(255,255,255,0.045)", borderColor: "rgba(255,255,255,0.08)", boxShadow: "0 24px 70px rgba(0,0,0,0.22)" }}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${card.tone}18`, boxShadow: `0 0 0 1px ${card.tone}1f inset` }}>
                      <Icon className="w-5 h-5" style={{ color: card.tone }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{card.delta}</span>
                  </div>
                  <div className="text-4xl font-black mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{card.value}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/58 mb-2">{card.label}</div>
                  <div className="text-xs text-white/38">{card.note}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F9FC", padding: "4rem 0 6rem" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid xl:grid-cols-[1.55fr_0.95fr] gap-6">
          <div className="space-y-6">
            <div className="rounded-[2rem] p-6 md:p-8 border bg-white" style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 12px 40px rgba(15,23,42,0.06)" }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FF5500] mb-2">Live fleet map</div>
                  <h2 className="text-2xl font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>Drone telemetry</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-xs font-bold uppercase tracking-[0.12em] text-[#4B5675] flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-slate-300 transition-colors">
                    View zones <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="text-xs font-bold uppercase tracking-[0.12em] text-[#4B5675] flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-slate-300 transition-colors">
                    <Download className="w-4 h-4" /> Export
                  </button>
                </div>
              </div>

              <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-5">
                <div className="rounded-[1.75rem] overflow-hidden border border-slate-200" style={{ background: "linear-gradient(135deg, #09111F 0%, #111B30 100%)", minHeight: 420 }}>
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                      <Radar className="w-4 h-4 text-[#FF8A4C]" /> Live command feed
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> streaming
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-px bg-white/6">
                    {Array.from({ length: 9 }).map((_, i) => <div key={i} className="h-28 border border-white/5" />)}
                  </div>
                  <div className="-mt-[22rem] p-6 md:p-8">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
                      <Cpu className="w-3 h-3" /> Live route optimization
                    </div>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      {[
                        ["Wind", "7 mph"],
                        ["Visibility", "Good"],
                        ["Corridors", "12 open"],
                        ["No-fly zones", "2 active"],
                      ].map(([k, v]) => (
                        <div key={k} className="rounded-2xl p-4 border border-white/8" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 font-bold">{k}</div>
                          <div className="mt-2 text-lg font-bold text-white">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {TASKS.map((task, idx) => {
                    const Icon = task.icon;
                    return (
                      <motion.div key={task.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} className="rounded-[1.5rem] p-5 border bg-white" style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 10px 30px rgba(15,23,42,0.05)" }}>
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${task.tone}14` }}>
                          <Icon className="w-5 h-5" style={{ color: task.tone }} />
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9CA3AF] mb-2">{task.label}</div>
                        <div className="text-lg font-black text-[#0A0F1E]">{task.value}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] p-6 border bg-white" style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 12px 40px rgba(15,23,42,0.06)" }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FF5500] mb-2">Drone queue</div>
                  <h3 className="text-xl font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>Fleet status</h3>
                </div>
                <button className="text-xs font-bold uppercase tracking-[0.12em] text-[#FF5500]">Manage drones</button>
              </div>
              <div className="space-y-4">
                {DRONES.map(d => {
                  const color = d.status === "Delivering" ? "#16A34A" : d.status === "Charging" ? "#F59E0B" : d.status === "Maintenance" ? "#8B5CF6" : "#4B5675";
                  return (
                    <div key={d.id} className="rounded-2xl p-4 border flex items-start justify-between gap-4" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <div className="min-w-0">
                        <div className="font-bold text-[#0A0F1E]">{d.id} · {d.model}</div>
                        <div className="text-xs mt-1 text-[#6B7280]">{d.location} · Payload {d.payload}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] bg-slate-100 text-slate-600">Signal {d.signal}</span>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] bg-slate-100 text-slate-600">ETA {d.eta}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-black" style={{ color }}>{d.status}</div>
                        <div className="text-xs text-[#6B7280] mt-1">Battery {d.battery}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] p-6 border bg-white" style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 12px 40px rgba(15,23,42,0.06)" }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FF5500] mb-2">Notifications</div>
                  <h3 className="text-xl font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>Ops alerts</h3>
                </div>
                <Bell className="w-4 h-4 text-[#FF5500]" />
              </div>
              <div className="space-y-4">
                {ALERTS.map(a => {
                  const Icon = a.icon;
                  return (
                    <div key={a.title} className="rounded-2xl p-4 border flex items-start gap-4" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${a.color}14` }}>
                        <Icon className="w-4 h-4" style={{ color: a.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#0A0F1E]">{a.title}</div>
                        <div className="text-sm text-[#6B7280] mt-1">{a.detail}</div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9CA3AF] mt-3">{a.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "white", padding: "0 0 7rem" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid xl:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="rounded-[2rem] p-6 md:p-8 border" style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 12px 40px rgba(15,23,42,0.05)" }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FF5500] mb-2">Delivery stream</div>
                <h3 className="text-2xl font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>Recent deliveries</h3>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-xs font-bold uppercase tracking-[0.12em] text-[#4B5675] flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-slate-300 transition-colors">
                  <Users className="w-4 h-4" /> Users
                </button>
                <button className="text-xs font-bold uppercase tracking-[0.12em] text-[#4B5675] flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-slate-300 transition-colors">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="grid grid-cols-6 gap-4 px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#9CA3AF] bg-[#F7F9FC]">
                <div>Order</div><div>Customer</div><div>City</div><div>Status</div><div>Priority</div><div className="text-right">ETA</div>
              </div>
              {DELIVERIES.map((d, idx) => (
                <div key={d.order} className={`grid grid-cols-6 gap-4 px-5 py-4 items-center ${idx !== DELIVERIES.length - 1 ? "border-b" : ""}`} style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="font-bold text-[#0A0F1E]">{d.order}</div>
                  <div className="text-[#4B5675]">{d.customer}</div>
                  <div className="text-[#4B5675]">{d.city}</div>
                  <div className="text-sm font-bold" style={{ color: d.status === "Delivered" ? "#16A34A" : d.status === "Failed" ? "#DC2626" : d.status === "In Transit" ? "#FF5500" : "#4B5675" }}>{d.status}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF5500]">{d.priority}</div>
                  <div className="text-right font-bold text-[#0A0F1E]">{d.eta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] p-6 border bg-[#0A0F1E] text-white" style={{ borderColor: "rgba(255,255,255,0.08)", boxShadow: "0 18px 50px rgba(15,23,42,0.12)" }}>
              <div className="flex items-center gap-3 mb-5 text-[10px] font-black uppercase tracking-[0.24em] text-[#FF8A4C]"><CalendarDays className="w-4 h-4" /> Today</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Orders dispatched", "1,284"],
                  ["Success rate", "99.2%"],
                  ["Avg delivery time", "8m 42s"],
                  ["Support tickets", "14 open"],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-2 rounded-2xl px-4 py-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/55 font-bold">{label}</div>
                    <div className="font-black text-white text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] p-6 border bg-[#F7F9FC]" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FF5500] mb-3">Automation</div>
              <h3 className="text-xl font-black uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>Ops rules</h3>
              <div className="space-y-3 text-sm text-[#4B5675]">
                <div className="flex items-center justify-between"><span>Max wind speed</span><span className="font-bold text-[#0A0F1E]">18 mph</span></div>
                <div className="flex items-center justify-between"><span>Battery minimum</span><span className="font-bold text-[#0A0F1E]">20%</span></div>
                <div className="flex items-center justify-between"><span>Noise limit</span><span className="font-bold text-[#0A0F1E]">Low</span></div>
                <div className="flex items-center justify-between"><span>Retry threshold</span><span className="font-bold text-[#0A0F1E]">2 attempts</span></div>
              </div>
              <button className="mt-6 w-full rounded-full bg-[#0A0F1E] text-white py-3 text-xs font-bold uppercase tracking-[0.12em] flex items-center justify-center gap-2">
                Open settings <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
