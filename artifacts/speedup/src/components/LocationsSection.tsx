import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, useMap, Circle, Polyline, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Package, Clock, Plane, Navigation2, Activity, Radio, Zap } from "lucide-react";

/* ─── Fix Leaflet default icon paths in bundlers ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: "", shadowUrl: "" });

/* ─── City data ───────────────────────────────────── */
const CITIES = [
  {
    id: "orlando", city: "Orlando", state: "FL", status: "Active",
    deliveries: "12,400+", avgTime: "7 min", zones: 8,
    desc: "Our flagship hub — downtown Orlando, Lake Nona & surrounding communities.",
    latlng: [28.5383, -81.3792] as [number, number],
    hub: [28.4772, -81.4561] as [number, number],
    zoom: 13,
  },
  {
    id: "miami", city: "Miami", state: "FL", status: "Active",
    deliveries: "9,200+", avgTime: "9 min", zones: 6,
    desc: "South Beach, Brickell, Coral Gables and the greater Miami metro.",
    latlng: [25.7617, -80.1918] as [number, number],
    hub: [25.7743, -80.2847] as [number, number],
    zoom: 13,
  },
  {
    id: "dallas", city: "Dallas", state: "TX", status: "Active",
    deliveries: "8,100+", avgTime: "8 min", zones: 5,
    desc: "Uptown, Deep Ellum, Frisco and the Plano delivery corridors.",
    latlng: [32.7767, -96.7970] as [number, number],
    hub: [32.7400, -96.8566] as [number, number],
    zoom: 13,
  },
  {
    id: "nyc", city: "New York", state: "NY", status: "Pilot",
    deliveries: "2,300+", avgTime: "11 min", zones: 3,
    desc: "Active pilot across Brooklyn, Queens and lower Manhattan.",
    latlng: [40.7128, -74.0060] as [number, number],
    hub: [40.7580, -73.9857] as [number, number],
    zoom: 13,
  },
  {
    id: "sf", city: "San Francisco", state: "CA", status: "Coming Soon",
    deliveries: "—", avgTime: "—", zones: 0,
    desc: "Launching 2025 — SoMa, Mission District and the Bay Area.",
    latlng: [37.7749, -122.4194] as [number, number],
    hub: [37.7352, -122.4860] as [number, number],
    zoom: 12,
  },
  {
    id: "la", city: "Los Angeles", state: "CA", status: "Coming Soon",
    deliveries: "—", avgTime: "—", zones: 0,
    desc: "Launching Q3 2025 — West Hollywood, Santa Monica and the LA basin.",
    latlng: [34.0522, -118.2437] as [number, number],
    hub: [34.0195, -118.4194] as [number, number],
    zoom: 11,
  },
  {
    id: "atlanta", city: "Atlanta", state: "GA", status: "Active",
    deliveries: "5,600+", avgTime: "8 min", zones: 4,
    desc: "Full service across Midtown, Buckhead and the Atlanta metro ring.",
    latlng: [33.7490, -84.3880] as [number, number],
    hub: [33.7280, -84.4194] as [number, number],
    zoom: 13,
  },
];

/* ─── Helpers ─── */
const statusColor = (s: string) =>
  s === "Active" ? "#FF5500" : s === "Pilot" ? "#3B82F6" : "rgba(255,255,255,0.3)";

const statusBg = (s: string) =>
  s === "Active" ? "rgba(255,85,0,0.15)" : s === "Pilot" ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.05)";

function lerpLatLng(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function randomDest(city: (typeof CITIES)[0]): [number, number] {
  const r = 0.015 + Math.random() * 0.02;
  const angle = Math.random() * Math.PI * 2;
  return [city.latlng[0] + r * Math.cos(angle), city.latlng[1] + r * Math.sin(angle)];
}

/* ─── Icons ─── */
function makeHubIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    html: `<div style="position:relative;width:24px;height:24px;">
      <div style="position:absolute;inset:7px;border-radius:50%;background:${color};box-shadow:0 0 10px ${color},0 0 20px ${color}80;z-index:2;"></div>
      <div class="hub-ring" style="position:absolute;inset:1px;border-radius:50%;border:1.5px solid ${color};"></div>
      <div class="hub-ring-outer" style="position:absolute;inset:-8px;border-radius:50%;border:1px solid ${color};"></div>
    </div>`,
  });
}

const DRONE_ICON = L.divIcon({
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  html: `<div class="drone-icon" style="width:36px;height:36px;filter:drop-shadow(0 0 8px #FF5500) drop-shadow(0 0 16px #FF550080);">
    <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
      <circle cx="18" cy="18" r="5" fill="#FF5500"/>
      <circle cx="18" cy="18" r="3" fill="white"/>
      <line x1="18" y1="18" x2="8" y2="8" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="18" y1="18" x2="28" y2="8" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="18" y1="18" x2="8" y2="28" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="18" y1="18" x2="28" y2="28" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="8" cy="8" r="3.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
      <circle cx="28" cy="8" r="3.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
      <circle cx="8" cy="28" r="3.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
      <circle cx="28" cy="28" r="3.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
    </svg>
  </div>`,
});

/* ─── Inner map components (must be inside MapContainer) ─── */

function FlyController({ city, onDone }: { city: (typeof CITIES)[0]; onDone: () => void }) {
  const map = useMap();
  const lastId = useRef("");
  useEffect(() => {
    if (lastId.current === city.id) return;
    lastId.current = city.id;
    map.flyTo(city.latlng, city.zoom, { animate: true, duration: 2.2 });
    const handler = () => onDone();
    map.once("moveend", handler);
    return () => { map.off("moveend", handler); };
  }, [city, map, onDone]);
  return null;
}

function DeliveryZones() {
  return (
    <>
      {CITIES.map(city => {
        const c = statusColor(city.status);
        const r = city.status === "Active" ? 5200 : city.status === "Pilot" ? 3800 : 2800;
        return (
          <React.Fragment key={city.id}>
            <Circle center={city.latlng} radius={r}
              pathOptions={{ color: c, weight: 0, fillColor: c, fillOpacity: 0.03 }} />
            <Circle center={city.latlng} radius={r * 0.85}
              pathOptions={{ color: c, weight: 1.5, opacity: 0.45, dashArray: "6 4", fillColor: c, fillOpacity: 0.05 }} />
            <Circle center={city.latlng} radius={r * 0.55}
              pathOptions={{ color: c, weight: 0, fillColor: c, fillOpacity: 0.04 }} />
          </React.Fragment>
        );
      })}
    </>
  );
}

function HubMarkers({ onCityClick }: { onCityClick: (id: string) => void }) {
  return (
    <>
      {CITIES.map(city => (
        <Marker
          key={city.id}
          position={city.hub}
          icon={makeHubIcon(statusColor(city.status))}
          eventHandlers={{ click: () => onCityClick(city.id) }}
        />
      ))}
    </>
  );
}

interface DroneProps {
  active: boolean;
  hub: [number, number];
  dest: [number, number];
  onProgress: (p: number) => void;
  onComplete: () => void;
}

function DroneLayer({ active, hub, dest, onProgress, onComplete }: DroneProps) {
  const [pos, setPos] = useState<[number, number]>(hub);
  const frameRef = useRef<number | null>(null);
  const tRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active) return;
    tRef.current = 0;
    doneRef.current = false;
    setPos(hub);

    const tick = () => {
      if (doneRef.current) return;
      tRef.current = Math.min(tRef.current + 0.0045, 1);
      const newPos = lerpLatLng(hub, dest, tRef.current);
      setPos(newPos);
      onProgress(Math.round(tRef.current * 100));
      if (tRef.current < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        doneRef.current = true;
        onComplete();
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      doneRef.current = true;
    };
  }, [active, hub, dest]);

  return (
    <>
      <Polyline positions={[hub, dest]}
        pathOptions={{ color: "#FF5500", weight: 1.5, opacity: 0.25, dashArray: "6 5" }} />
      <Polyline positions={[hub, pos]}
        pathOptions={{ color: "#FF5500", weight: 2.5, opacity: 0.75 }} />
      <Marker position={pos} icon={DRONE_ICON} zIndexOffset={1000} />
    </>
  );
}

/* ─── Main section ─── */
export function LocationsSection() {
  const [selected, setSelected] = useState("orlando");
  const [isFlying, setIsFlying] = useState(false);
  const [droneActive, setDroneActive] = useState(false);
  const [droneDest, setDroneDest] = useState<[number, number] | null>(null);
  const [droneProgress, setDroneProgress] = useState(0);
  const [showDrone, setShowDrone] = useState(false);

  const active = CITIES.find(c => c.id === selected)!;

  const handleSelectCity = useCallback((id: string) => {
    if (id === selected) return;
    setSelected(id);
    setIsFlying(true);
    setDroneActive(false);
    setShowDrone(false);
    setDroneDest(null);
    setDroneProgress(0);
  }, [selected]);

  const launchDrone = useCallback(() => {
    if (droneActive || isFlying) return;
    const dest = randomDest(active);
    setDroneDest(dest);
    setDroneActive(true);
    setShowDrone(true);
    setDroneProgress(0);
  }, [active, droneActive, isFlying]);

  const handleDroneComplete = useCallback(() => {
    setDroneActive(false);
    setTimeout(() => {
      setShowDrone(false);
      setDroneDest(null);
      setDroneProgress(0);
    }, 2500);
  }, []);

  return (
    <section id="locations" className="relative overflow-hidden"
      style={{ background: "#010b19", padding: "9rem 0" }}>

      <style>{`
        .leaflet-container { background: #010b19 !important; }
        .leaflet-control-attribution { display: none !important; }
        .leaflet-control-zoom {
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 12px !important;
          overflow: hidden;
          background: rgba(1,11,25,0.85) !important;
          backdrop-filter: blur(12px);
          box-shadow: none !important;
        }
        .leaflet-control-zoom a {
          background: transparent !important;
          color: rgba(255,255,255,0.45) !important;
          border-color: rgba(255,255,255,0.08) !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(255,85,0,0.15) !important;
          color: #FF5500 !important;
        }
        .hub-ring { animation: hubRingPulse 2s ease-out infinite; }
        .hub-ring-outer { animation: hubRingPulse 2s ease-out infinite 0.65s; }
        @keyframes hubRingPulse {
          0% { opacity: 0.6; transform: scale(0.85); }
          100% { opacity: 0; transform: scale(2.4); }
        }
        .drone-icon { animation: droneFloat 2.8s ease-in-out infinite; }
        @keyframes droneFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(6deg); }
        }
        .leaflet-popup-content-wrapper {
          background: rgba(4,17,36,0.96) !important;
          border: 1px solid rgba(255,85,0,0.3) !important;
          border-radius: 14px !important;
          color: white !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
        }
        .leaflet-popup-tip-container { display: none; }
      `}</style>

      <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,85,0,0.04)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-px" style={{ background: "#FF5500" }} />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#FF5500" }}>
            Service Areas
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <h2 className="font-black uppercase text-white leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem,6vw,6rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk',sans-serif" }}>
            Delivering<br />across<br />America.
          </h2>
          <div className="flex flex-col gap-3">
            <p className="text-white/40 text-base max-w-xs lg:text-right leading-relaxed">
              Live drone ops in 5 cities. A new city every quarter.
            </p>
            <div className="flex items-center lg:justify-end gap-4 flex-wrap">
              {[
                { label: "Active", color: "#FF5500" },
                { label: "Pilot", color: "#3B82F6" },
                { label: "Coming Soon", color: "rgba(255,255,255,0.3)" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.3)" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3-column grid */}
        <div className="grid lg:grid-cols-[190px_1fr_280px] gap-4 items-stretch">

          {/* City list */}
          <div className="flex flex-col gap-2">
            {CITIES.map((city, idx) => (
              <motion.button
                key={city.id}
                onClick={() => handleSelectCity(city.id)}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="w-full text-left rounded-xl px-4 py-3.5 transition-all duration-200 relative overflow-hidden"
                style={{
                  background: selected === city.id ? "rgba(255,85,0,0.1)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selected === city.id ? "rgba(255,85,0,0.3)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {selected === city.id && (
                  <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                    style={{ background: "#FF5500" }} />
                )}
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-black text-[13px]"
                    style={{ color: selected === city.id ? "white" : "rgba(255,255,255,0.42)", fontFamily: "'Space Grotesk',sans-serif" }}>
                    {city.city}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: statusColor(city.status) }} />
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-wider"
                  style={{ color: selected === city.id ? "rgba(255,85,0,0.6)" : "rgba(255,255,255,0.18)" }}>
                  {city.state} · {city.status}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Map container */}
          <div className="relative rounded-2xl overflow-hidden"
            style={{ height: "520px", border: "1px solid rgba(255,255,255,0.08)" }}>

            <MapContainer
              center={CITIES[0].latlng}
              zoom={12}
              style={{ height: "520px", width: "100%" }}
              zoomControl
              scrollWheelZoom={false}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={19}
              />
              <FlyController city={active} onDone={() => setIsFlying(false)} />
              <DeliveryZones />
              <HubMarkers onCityClick={handleSelectCity} />
              {showDrone && droneDest && (
                <DroneLayer
                  active={droneActive}
                  hub={active.hub}
                  dest={droneDest}
                  onProgress={setDroneProgress}
                  onComplete={handleDroneComplete}
                />
              )}
            </MapContainer>

            {/* Live ops HUD */}
            <div className="absolute top-4 left-4 z-[800] pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: "rgba(1,11,25,0.82)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
                <Activity className="w-3 h-3 text-green-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.4)" }}>Live Operations</span>
                <span className="text-[9px] text-green-400">●</span>
              </div>
            </div>

            {/* Flying overlay */}
            <AnimatePresence>
              {isFlying && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[900] pointer-events-none flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full"
                    style={{ background: "rgba(1,11,25,0.88)", border: "1px solid rgba(255,85,0,0.35)", backdropFilter: "blur(20px)" }}>
                    <Navigation2 className="w-3.5 h-3.5 animate-spin" style={{ color: "#FF5500" }} />
                    <span className="text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: "rgba(255,255,255,0.6)" }}>Flying to {active.city}…</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Drone progress HUD */}
            <AnimatePresence>
              {showDrone && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-4 z-[800] rounded-xl p-3.5"
                  style={{ background: "rgba(1,11,25,0.9)", border: "1px solid rgba(255,85,0,0.28)", backdropFilter: "blur(16px)", minWidth: "200px" }}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Radio className="w-3 h-3 shrink-0" style={{ color: "#FF5500" }} />
                    <span className="text-[9px] font-black uppercase tracking-widest"
                      style={{ color: droneActive ? "#FF5500" : "#4ADE80" }}>
                      {droneActive ? "Drone In Flight" : "Delivered ✓"}
                    </span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden mb-1.5"
                    style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div className="h-full rounded-full transition-all duration-100"
                      style={{ width: `${droneProgress}%`, background: droneActive ? "#FF5500" : "#4ADE80" }} />
                  </div>
                  <div className="flex justify-between" style={{ color: "rgba(255,255,255,0.25)" }}>
                    <span className="text-[9px]">Hub</span>
                    <span className="text-[9px] font-bold">{droneProgress}%</span>
                    <span className="text-[9px]">Drop Zone</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl p-6 flex flex-col relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>

              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: statusColor(active.status) }} />

              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
                  style={{ background: statusBg(active.status) }}>
                  <div className="w-1.5 h-1.5 rounded-full"
                    style={{ background: statusColor(active.status) }} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: statusColor(active.status) }}>{active.status}</span>
                </div>
              </div>

              <h3 className="font-black uppercase text-white leading-none mb-1"
                style={{ fontSize: "2.2rem", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk',sans-serif" }}>
                {active.city}
              </h3>
              <p className="font-bold text-[10px] uppercase tracking-widest mb-4" style={{ color: "#FF5500" }}>
                {active.state}
              </p>
              <p className="text-white/30 text-xs leading-relaxed mb-5 flex-1">{active.desc}</p>

              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { icon: Package, label: "Deliveries", value: active.deliveries },
                  { icon: Clock, label: "Avg Time", value: active.avgTime },
                  { icon: Plane, label: "Zones", value: active.zones > 0 ? String(active.zones) : "Soon" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl p-3 text-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <Icon className="w-3.5 h-3.5 mx-auto mb-2" style={{ color: "#FF5500" }} />
                    <div className="font-black text-white text-sm leading-none"
                      style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{value}</div>
                    <div className="text-white/25 text-[9px] mt-1 uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>

              {active.status !== "Coming Soon" ? (
                <button
                  onClick={launchDrone}
                  disabled={droneActive || isFlying}
                  className="w-full py-3 rounded-full font-bold uppercase tracking-[0.1em] text-white text-[11px] transition-all hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2 mb-3"
                  style={{ background: "#FF5500", boxShadow: "0 4px 20px rgba(255,85,0,0.35)" }}>
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {droneActive ? "Drone In Flight…" : "Launch Drone Delivery"}
                </button>
              ) : (
                <div className="w-full py-3 rounded-full font-bold uppercase tracking-[0.1em] text-center text-[11px] mb-3"
                  style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  Coming Soon
                </div>
              )}

              <button
                className="w-full py-2.5 rounded-full font-bold uppercase tracking-[0.1em] text-[11px] transition-all"
                style={{ color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                Request Service in {active.city}
              </button>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
