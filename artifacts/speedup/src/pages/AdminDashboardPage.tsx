import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Bell, BatteryCharging, CalendarDays, ChartColumn, ChevronRight, Cpu, Download, LayoutDashboard, MapPinned, Package, ShieldAlert, Users, Waves, Zap } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

const KPI_CARDS = [
  { label: "Total Deliveries", value: "12,482", delta: "+14.2%", icon: Package, tone: "#FF5500" },
  { label: "Active Drones", value: "84", delta: "+6", icon: Waves, tone: "#2563EB" },
  { label: "Failed Deliveries", value: "12", delta: "-18%", icon: ShieldAlert, tone: "#DC2626" },
  { label: "Revenue", value: "$428k", delta: "+21.4%", icon: ChartColumn, tone: "#16A34A" },
];

const DRONES = [
  { id: "DR-4829", model: "Aero X2", battery: 92, status: "Delivering", payload: "2.5kg", location: "Downtown Hub" },
  { id: "DR-7712", model: "Aero X1", battery: 37, status: "Charging", payload: "1.8kg", location: "West Station" },
  { id: "DR-1044", model: "Cargo Pro", battery: 68, status: "Idle", payload: "4.2kg", location: "North Hub" },
];

const ALERTS = [
  { title: "Low battery alert", detail: "DR-7712 under 40% at West Station", time: "2 min ago", icon: BatteryCharging, color: "#F59E0B" },
  { title: "Delivery delay", detail: "Order #8821 rerouted due to wind", time: "8 min ago", icon: Bell, color: "#FF5500" },
  { title: "Geo-fence update", detail: "New no-fly polygon approved", time: "18 min ago", icon: MapPinned, color: "#2563EB" },
];

const DELIVERIES = [
  { order: "#8821", customer: "Marco's Pizzeria", city: "Orlando", status: "In Transit", eta: "6 min" },
  { order: "#8819", customer: "Luma Grocery", city: "Miami", status: "Delivered", eta: "Arrived" },
  { order: "#8807", customer: "FreshLeaf", city: "Dallas", status: "Pending", eta: "12 min" },
  { order: "#8798", customer: "Cobalt Cafe", city: "Atlanta", status: "Failed", eta: "Retry" },
];

export default function AdminDashboardPage() {
  const [, navigate] = useLocation();

  return (
    <PageLayout>
      <section className="relative overflow-hidden" style={{ background: "#0A0F1E", color: "white", padding: "6rem 0 5rem" }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle at top left, rgba(255,85,0,0.22), transparent 38%), radial-gradient(circle at 80% 0%, rgba(37,99,235,0.18), transparent 32%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-5 text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: "#FF8A4C" }}>
                <LayoutDashboard className="w-4 h-4" /> Operations Control Center
              </div>
              <h1 className="font-black uppercase leading-[0.88]" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.04em", fontFamily: "'Space Grotesk', sans-serif" }}>
                Admin<br />dashboard.
              </h1>
              <p className="mt-5 text-white/65 max-w-2xl text-lg leading-relaxed">
                Monitor flights, manage zones, dispatch drones, and keep every delivery moving in real time.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate("/for-business")} className="px-5 py-3 rounded-full bg-white text-[#0A0F1E] font-bold uppercase tracking-[0.1em] text-xs transition-all hover:scale-[1.02]">
                Add Operator
              </button>
              <button className="px-5 py-3 rounded-full border border-white/20 text-white/80 font-bold uppercase tracking-[0.1em] text-xs transition-all hover:bg-white/5">
                Export CSV
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {KPI_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} className="rounded-2xl p-6 border" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${card.tone}18` }}><Icon className="w-5 h-5" style={{ color: card.tone }} /></div>
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-white/45">{card.delta}</span>
                  </div>
                  <div className="text-3xl font-black mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{card.value}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">{card.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F9FC", padding: "4rem 0 6rem" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid xl:grid-cols-[1.45fr_0.9fr] gap-6">
          <div className="rounded-3xl p-6 md:p-8 border" style={{ background: "white", borderColor: "rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FF5500] mb-2">Live fleet map</div>
                <h2 className="text-2xl font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>Drone telemetry</h2>
              </div>
              <button className="text-xs font-bold uppercase tracking-[0.12em] text-[#4B5675] flex items-center gap-2">
                View zones <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0A0F1E 0%, #111827 100%)", minHeight: 360 }}>
              <div className="grid grid-cols-3 gap-px bg-white/10">
                {Array.from({ length: 9 }).map((_, i) => <div key={i} className="h-28 border border-white/5" />)}
              </div>
              <div className="-mt-72 p-8">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}><Cpu className="w-3 h-3" /> Live route optimization</div>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {[
                    ["Wind", "7 mph"], ["Visibility", "Good"], ["Corridors", "12 open"], ["No-fly zones", "2 active"]
                  ].map(([k, v]) => <div key={k} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.07)" }}><div className="text-[10px] uppercase tracking-[0.2em] text-white/45 font-bold">{k}</div><div className="mt-2 text-lg font-bold text-white">{v}</div></div>)}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl p-6 border bg-white" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>Drone queue</h3>
                <button className="text-xs font-bold uppercase tracking-[0.12em] text-[#FF5500]">Manage drones</button>
              </div>
              <div className="space-y-4">
                {DRONES.map(d => (
                  <div key={d.id} className="rounded-2xl p-4 border flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div>
                      <div className="font-bold text-[#0A0F1E]">{d.id} · {d.model}</div>
                      <div className="text-xs mt-1 text-[#6B7280]">{d.location} · Payload {d.payload}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black" style={{ color: d.status === "Delivering" ? "#16A34A" : d.status === "Charging" ? "#F59E0B" : "#4B5675" }}>{d.status}</div>
                      <div className="text-xs text-[#6B7280]">Battery {d.battery}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-6 border bg-white" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>Alerts</h3>
                <Bell className="w-4 h-4 text-[#FF5500]" />
              </div>
              <div className="space-y-4">
                {ALERTS.map(a => {
                  const Icon = a.icon;
                  return <div key={a.title} className="rounded-2xl p-4 border flex items-start gap-4" style={{ borderColor: "rgba(0,0,0,0.06)" }}><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}14` }}><Icon className="w-4 h-4" style={{ color: a.color }} /></div><div className="flex-1"><div className="font-bold text-[#0A0F1E]">{a.title}</div><div className="text-sm text-[#6B7280] mt-1">{a.detail}</div><div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9CA3AF] mt-3">{a.time}</div></div></div>
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "white", padding: "0 0 7rem" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid xl:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="rounded-3xl p-6 md:p-8 border" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>Recent deliveries</h3>
              <button className="text-xs font-bold uppercase tracking-[0.12em] text-[#4B5675] flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>
            </div>
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="grid grid-cols-5 gap-4 px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#9CA3AF] bg-[#F7F9FC]">
                <div>Order</div><div>Customer</div><div>City</div><div>Status</div><div className="text-right">ETA</div>
              </div>
              {DELIVERIES.map((d, idx) => (
                <div key={d.order} className={`grid grid-cols-5 gap-4 px-5 py-4 items-center ${idx !== DELIVERIES.length - 1 ? "border-b" : ""}`} style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="font-bold text-[#0A0F1E]">{d.order}</div>
                  <div className="text-[#4B5675]">{d.customer}</div>
                  <div className="text-[#4B5675]">{d.city}</div>
                  <div className="text-sm font-bold" style={{ color: d.status === "Delivered" ? "#16A34A" : d.status === "Failed" ? "#DC2626" : d.status === "In Transit" ? "#FF5500" : "#4B5675" }}>{d.status}</div>
                  <div className="text-right font-bold text-[#0A0F1E]">{d.eta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl p-6 border bg-[#0A0F1E] text-white" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-3 mb-5 text-[10px] font-black uppercase tracking-[0.24em] text-[#FF8A4C]"><CalendarDays className="w-4 h-4" /> Today</div>
              <div className="space-y-4">
                {[
                  ["Orders dispatched", "1,284"],
                  ["Success rate", "99.2%"],
                  ["Avg delivery time", "8m 42s"],
                  ["Support tickets", "14 open"],
                ].map(([label, value]) => <div key={label} className="flex items-center justify-between rounded-2xl px-4 py-4" style={{ background: "rgba(255,255,255,0.04)" }}><div className="text-sm text-white/60">{label}</div><div className="font-black text-white">{value}</div></div>)}
              </div>
            </div>

            <div className="rounded-3xl p-6 border bg-[#F7F9FC]" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FF5500] mb-3">Settings</div>
              <h3 className="text-xl font-black uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0F1E" }}>Operations rules</h3>
              <div className="space-y-3 text-sm text-[#4B5675]">
                <div className="flex items-center justify-between"><span>Max wind speed</span><span className="font-bold text-[#0A0F1E]">18 mph</span></div>
                <div className="flex items-center justify-between"><span>Battery minimum</span><span className="font-bold text-[#0A0F1E]">20%</span></div>
                <div className="flex items-center justify-between"><span>Noise limit</span><span className="font-bold text-[#0A0F1E]">Low</span></div>
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
