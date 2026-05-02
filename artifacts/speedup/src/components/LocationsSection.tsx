import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, useMap, Circle, Polyline, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Package, Clock, Plane, Navigation2, Activity, Radio, Zap, Battery, Signal, MapPin } from "lucide-react";

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

/* ─── Flight phases ─── */
type FlightPhase = "idle" | "launching" | "enroute" | "approaching" | "landing" | "delivered";

function getPhase(t: number): FlightPhase {
  if (t <= 0) return "idle";
  if (t < 0.08) return "launching";
  if (t < 0.82) return "enroute";
  if (t < 0.93) return "approaching";
  if (t < 1) return "landing";
  return "delivered";
}

const PHASE_LABEL: Record<FlightPhase, string> = {
  idle: "STANDBY",
  launching: "LAUNCHING",
  enroute: "EN ROUTE",
  approaching: "APPROACHING LZ",
  landing: "LANDING",
  delivered: "DELIVERED ✓",
};

const PHASE_COLOR: Record<FlightPhase, string> = {
  idle: "#9CA3AF",
  launching: "#D97706",
  enroute: "#FF5500",
  approaching: "#FF5500",
  landing: "#D97706",
  delivered: "#16A34A",
};

/* ─── Helpers ─── */
const statusColor = (s: string) =>
  s === "Active" ? "#FF5500" : s === "Pilot" ? "#2563EB" : "#D1D5DB";

const statusBg = (s: string) =>
  s === "Active" ? "rgba(255,85,0,0.10)" : s === "Pilot" ? "rgba(37,99,235,0.10)" : "rgba(0,0,0,0.04)";

/** Quadratic bezier interpolation */
function bezierPoint(
  start: [number, number],
  ctrl: [number, number],
  end: [number, number],
  t: number
): [number, number] {
  const mt = 1 - t;
  return [
    mt * mt * start[0] + 2 * mt * t * ctrl[0] + t * t * end[0],
    mt * mt * start[1] + 2 * mt * t * ctrl[1] + t * t * end[1],
  ];
}

/** Compute bezier control point (curves away from straight line) */
function bezierCtrl(start: [number, number], end: [number, number]): [number, number] {
  const midLat = (start[0] + end[0]) / 2;
  const midLng = (start[1] + end[1]) / 2;
  const dLat = end[0] - start[0];
  const dLng = end[1] - start[1];
  const dist = Math.sqrt(dLat * dLat + dLng * dLng);
  const curve = dist * 0.5;
  return [
    midLat - (dLng / dist) * curve,
    midLng + (dLat / dist) * curve,
  ];
}

/** Build bezier path as array of lat/lng points */
function buildBezierPath(
  hub: [number, number],
  dest: [number, number],
  steps = 60
): [number, number][] {
  const ctrl = bezierCtrl(hub, dest);
  return Array.from({ length: steps + 1 }, (_, i) => bezierPoint(hub, ctrl, dest, i / steps));
}

/** Simulated telemetry values based on phase */
function telemetry(t: number) {
  const phase = getPhase(t);
  let alt = 0, speed = 0;
  if (phase === "launching") { alt = Math.round(t / 0.08 * 120); speed = Math.round(t / 0.08 * 45); }
  else if (phase === "enroute") { alt = 120 + Math.round(Math.sin(t * 40) * 5); speed = 88 + Math.round(Math.sin(t * 25) * 4); }
  else if (phase === "approaching") { alt = Math.round(120 * (1 - (t - 0.82) / 0.11)); speed = Math.round(88 * (1 - (t - 0.82) / 0.11 * 0.6)); }
  else if (phase === "landing") { alt = Math.round(30 * (1 - (t - 0.93) / 0.07)); speed = Math.round(12 * (1 - (t - 0.93) / 0.07)); }
  const eta = Math.max(0, Math.round((1 - t) * 420)); // seconds
  return { alt, speed, eta };
}

function randomDest(city: (typeof CITIES)[0]): [number, number] {
  const r = 0.018 + Math.random() * 0.022;
  const angle = Math.random() * Math.PI * 2;
  return [city.latlng[0] + r * Math.cos(angle), city.latlng[1] + r * Math.sin(angle)];
}

function randomDroneId() {
  return "SU-" + Math.random().toString(36).substring(2, 6).toUpperCase();
}

/* ─── Icons ─── */
function makeHubIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `
      <div style="position:relative;width:28px;height:28px;">
        <div style="position:absolute;inset:9px;border-radius:50%;background:${color};box-shadow:0 0 12px ${color},0 0 24px ${color}70;z-index:2;"></div>
        <div class="hub-ring" style="position:absolute;inset:2px;border-radius:50%;border:1.5px solid ${color};"></div>
        <div class="hub-ring-outer" style="position:absolute;inset:-9px;border-radius:50%;border:1px solid ${color};"></div>
      </div>`,
  });
}

function makeDroneIcon(phase: FlightPhase): L.DivIcon {
  const glow = phase === "delivered" ? "#4ADE80" : "#FF5500";
  const scale = phase === "landing" || phase === "delivered" ? 0.8 : 1;
  return L.divIcon({
    className: "",
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    html: `
      <div class="map-drone" style="
        width:56px;height:56px;
        transform:scale(${scale});
        transition:transform 0.5s ease;
        filter:drop-shadow(0 0 8px ${glow}) drop-shadow(0 0 20px ${glow}60);
      ">
        <svg viewBox="0 0 56 56" width="56" height="56" fill="none" style="overflow:visible;">
          <!-- Arms -->
          <line x1="28" y1="28" x2="11" y2="11" stroke="${glow}" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
          <line x1="28" y1="28" x2="45" y2="11" stroke="${glow}" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
          <line x1="28" y1="28" x2="11" y2="45" stroke="${glow}" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
          <line x1="28" y1="28" x2="45" y2="45" stroke="${glow}" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
          <!-- Rotor housings -->
          <circle cx="11" cy="11" r="9" fill="${glow}10" stroke="${glow}" stroke-width="1.2" opacity="0.6"/>
          <circle cx="45" cy="11" r="9" fill="${glow}10" stroke="${glow}" stroke-width="1.2" opacity="0.6"/>
          <circle cx="11" cy="45" r="9" fill="${glow}10" stroke="${glow}" stroke-width="1.2" opacity="0.6"/>
          <circle cx="45" cy="45" r="9" fill="${glow}10" stroke="${glow}" stroke-width="1.2" opacity="0.6"/>
          <!-- Spinning blades TL (CW) -->
          <g class="rotor-cw" style="transform-box:fill-box;transform-origin:11px 11px;">
            <line x1="4" y1="11" x2="18" y2="11" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
            <line x1="11" y1="4" x2="11" y2="18" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
          </g>
          <!-- Spinning blades TR (CCW) -->
          <g class="rotor-ccw" style="transform-box:fill-box;transform-origin:45px 11px;">
            <line x1="38" y1="11" x2="52" y2="11" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
            <line x1="45" y1="4" x2="45" y2="18" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
          </g>
          <!-- Spinning blades BL (CCW) -->
          <g class="rotor-ccw" style="transform-box:fill-box;transform-origin:11px 45px;">
            <line x1="4" y1="45" x2="18" y2="45" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
            <line x1="11" y1="38" x2="11" y2="52" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
          </g>
          <!-- Spinning blades BR (CW) -->
          <g class="rotor-cw" style="transform-box:fill-box;transform-origin:45px 45px;">
            <line x1="38" y1="45" x2="52" y2="45" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
            <line x1="45" y1="38" x2="45" y2="52" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
          </g>
          <!-- Body hexagon -->
          <polygon points="28,20 34,24 34,32 28,36 22,32 22,24" fill="${glow}" opacity="0.95"/>
          <!-- Camera dome -->
          <circle cx="28" cy="28" r="5" fill="#010b19" opacity="0.9"/>
          <circle cx="28" cy="28" r="3" fill="${glow}" opacity="0.7"/>
          <circle cx="28" cy="28" r="1.2" fill="white"/>
        </svg>
      </div>`,
  });
}

function makeDestIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    html: `
      <div style="position:relative;width:48px;height:48px;">
        <div class="dest-ring-1" style="position:absolute;inset:4px;border-radius:50%;border:2px solid #4ADE80;opacity:0.8;"></div>
        <div class="dest-ring-2" style="position:absolute;inset:-4px;border-radius:50%;border:1px solid #4ADE80;opacity:0.4;"></div>
        <div style="position:absolute;inset:20px;border-radius:50%;background:#4ADE80;box-shadow:0 0 12px #4ADE80;"></div>
        <div style="
          position:absolute;inset:0;
          display:flex;align-items:center;justify-content:center;
          font-size:9px;font-weight:900;color:#4ADE80;
          font-family:'Space Grotesk',sans-serif;letter-spacing:0.05em;
          padding-top:28px;
        ">LZ</div>
      </div>`,
  });
}

/* ─── Inner map components ─── */

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
              pathOptions={{ color: c, weight: 1.5, opacity: 0.4, dashArray: "6 4", fillColor: c, fillOpacity: 0.05 }} />
            <Circle center={city.latlng} radius={r * 0.52}
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
  hub: [number, number];
  dest: [number, number];
  onProgress: (t: number) => void;
  onPhaseChange: (p: FlightPhase) => void;
  onComplete: () => void;
  running: boolean;
}

function DroneLayer({ hub, dest, onProgress, onPhaseChange, onComplete, running }: DroneProps) {
  const map = useMap();
  const [pos, setPos] = useState<[number, number]>(hub);
  const [phase, setPhase] = useState<FlightPhase>("launching");
  const [trailPts, setTrailPts] = useState<[number, number][]>([hub]);
  const frameRef = useRef<number | null>(null);
  const tRef = useRef(0);
  const doneRef = useRef(false);
  const lastPanRef = useRef(0);

  const path = useMemo(() => buildBezierPath(hub, dest), [hub, dest]);
  const ctrl = useMemo(() => bezierCtrl(hub, dest), [hub, dest]);

  useEffect(() => {
    if (!running) return;
    tRef.current = 0;
    doneRef.current = false;
    setPos(hub);
    setTrailPts([hub]);
    setPhase("launching");

    const tick = () => {
      if (doneRef.current) return;
      tRef.current = Math.min(tRef.current + 0.003, 1);
      const t = tRef.current;
      const newPos = bezierPoint(hub, ctrl, dest, t);
      const newPhase = getPhase(t);

      setPos(newPos);
      setPhase(newPhase);
      setTrailPts(prev => [...prev.slice(-80), newPos]);
      onProgress(t);
      onPhaseChange(newPhase);

      /* Pan map to follow drone (every 30 frames) */
      const now = Date.now();
      if (now - lastPanRef.current > 800 && newPhase === "enroute") {
        map.panTo(newPos, { animate: true, duration: 0.8 });
        lastPanRef.current = now;
      }

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        doneRef.current = true;
        setPhase("delivered");
        onPhaseChange("delivered");
        onComplete();
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      doneRef.current = true;
    };
  }, [running, hub, dest]);

  return (
    <>
      {/* Full planned route (dashed) */}
      <Polyline
        positions={path}
        pathOptions={{ color: "#FF5500", weight: 1, opacity: 0.18, dashArray: "5 6" }}
      />
      {/* Live trail */}
      {trailPts.length > 1 && (
        <Polyline
          positions={trailPts}
          pathOptions={{ color: "#FF5500", weight: 3, opacity: 0.8 }}
        />
      )}
      {/* Drone marker */}
      <Marker position={pos} icon={makeDroneIcon(phase)} zIndexOffset={2000} />
      {/* Destination LZ */}
      <Marker position={dest} icon={makeDestIcon()} zIndexOffset={1500} />
    </>
  );
}

/* ─── HUD subcomponent ─── */
function DeliveryHUD({
  phase, progress, droneId,
  alt, speed, eta,
  hub, dest,
}: {
  phase: FlightPhase; progress: number; droneId: string;
  alt: number; speed: number; eta: number;
  hub: [number, number]; dest: [number, number];
}) {
  const etaMin = Math.floor(eta / 60);
  const etaSec = eta % 60;
  const phaseColor = PHASE_COLOR[phase];
  const isDelivered = phase === "delivered";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-4 left-4 z-[800] rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.97)",
        border: `1px solid ${phaseColor}35`,
        backdropFilter: "blur(20px)",
        minWidth: "240px",
        boxShadow: `0 8px 32px rgba(0,0,0,0.10)`,
      }}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${phaseColor}, transparent)` }} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full"
              style={{ background: phaseColor, boxShadow: `0 0 6px ${phaseColor}60`, animation: !isDelivered ? "hudPulse 1s ease-in-out infinite" : "none" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: phaseColor }}>
              {PHASE_LABEL[phase]}
            </span>
          </div>
          <span className="text-[9px] font-bold tracking-wider" style={{ color: "#9CA3AF", fontFamily: "monospace" }}>
            {droneId}
          </span>
        </div>

        {/* Telemetry row */}
        {!isDelivered ? (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "ALT", value: `${alt}m`, icon: "↑" },
              { label: "SPEED", value: `${speed}km/h`, icon: "⚡" },
              { label: "ETA", value: `${etaMin}:${String(etaSec).padStart(2, "0")}`, icon: "⏱" },
            ].map(item => (
              <div key={item.label} className="rounded-lg p-2 text-center"
                style={{ background: "#F7F9FC", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="text-[8px] mb-1" style={{ color: "#9CA3AF" }}>{item.label}</div>
                <div className="text-[11px] font-black" style={{ color: "#0A0F1E", fontFamily: "monospace" }}>{item.value}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 mb-3 py-2 rounded-lg"
            style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.20)" }}>
            <span className="text-lg">📦</span>
            <span className="text-[11px] font-black" style={{ color: "#16A34A" }}>Package Delivered!</span>
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-2">
          <div className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(0,0,0,0.07)" }}>
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={{ duration: 0.15 }}
              style={{ background: isDelivered ? "#16A34A" : `linear-gradient(90deg, ${phaseColor}80, ${phaseColor})` }}
            />
          </div>
        </div>

        {/* Route labels */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF5500" }} />
            <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Hub</span>
          </div>
          <div className="text-[8px] font-bold" style={{ color: "#C4CBD8", fontFamily: "monospace" }}>
            {Math.round(progress * 100)}%
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Drop Zone</span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#16A34A" }} />
          </div>
        </div>
      </div>

      {/* Coordinates footer */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="flex items-center gap-3">
            <Battery className="w-2.5 h-2.5" style={{ color: "#9CA3AF" }} />
            <span className="text-[8px] font-bold" style={{ color: "#6B7280", fontFamily: "monospace" }}>94%</span>
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-sm" style={{ width: 3, height: i * 2 + 2, background: i <= 3 ? "#FF5500" : "rgba(0,0,0,0.10)" }} />
            ))}
          </div>
          <span className="text-[8px] font-bold" style={{ color: "#9CA3AF", fontFamily: "monospace" }}>
            {dest[0].toFixed(4)}, {dest[1].toFixed(4)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ─── */
export function LocationsSection() {
  const [selected, setSelected] = useState("orlando");
  const [isFlying, setIsFlying] = useState(false);
  const [droneRunning, setDroneRunning] = useState(false);
  const [showDrone, setShowDrone] = useState(false);
  const [droneDest, setDroneDest] = useState<[number, number] | null>(null);
  const [droneProgress, setDroneProgress] = useState(0);
  const [dronePhase, setDronePhase] = useState<FlightPhase>("idle");
  const [droneId] = useState(randomDroneId);
  const [tel, setTel] = useState({ alt: 0, speed: 0, eta: 0 });
  const [showBurst, setShowBurst] = useState(false);

  const active = CITIES.find(c => c.id === selected)!;

  const handleSelectCity = useCallback((id: string) => {
    if (id === selected) return;
    setSelected(id);
    setIsFlying(true);
    setDroneRunning(false);
    setShowDrone(false);
    setDroneDest(null);
    setDroneProgress(0);
    setDronePhase("idle");
  }, [selected]);

  const handleProgress = useCallback((t: number) => {
    setDroneProgress(t);
    setTel(telemetry(t));
  }, []);

  const handlePhaseChange = useCallback((p: FlightPhase) => {
    setDronePhase(p);
  }, []);

  const launchDrone = useCallback(() => {
    if (droneRunning || isFlying) return;
    const dest = randomDest(active);
    setDroneDest(dest);
    setShowDrone(true);
    setDroneRunning(true);
    setDroneProgress(0);
    setDronePhase("launching");
    setShowBurst(false);
  }, [active, droneRunning, isFlying]);

  const handleDroneComplete = useCallback(() => {
    setDroneRunning(false);
    setShowBurst(true);
    setTimeout(() => {
      setShowDrone(false);
      setDroneDest(null);
      setDroneProgress(0);
      setDronePhase("idle");
      setShowBurst(false);
    }, 4000);
  }, []);

  return (
    <section id="locations" className="relative overflow-hidden"
      style={{ background: "#FFFFFF", padding: "9rem 0" }}>

      <style>{`
        /* ── Leaflet overrides ── */
        .leaflet-container { background: #EEF2F9 !important; }
        .leaflet-control-attribution { display: none !important; }
        .leaflet-control-zoom {
          border: 1px solid rgba(0,0,0,0.10) !important;
          border-radius: 12px !important;
          overflow: hidden;
          background: rgba(255,255,255,0.95) !important;
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
        }
        .leaflet-control-zoom a {
          background: transparent !important;
          color: #6B7280 !important;
          border-color: rgba(0,0,0,0.07) !important;
          width: 32px !important; height: 32px !important; line-height: 32px !important;
        }
        .leaflet-control-zoom a:hover { background: rgba(255,85,0,0.08) !important; color: #FF5500 !important; }

        /* ── Hub animations ── */
        .hub-ring { animation: hubRingPulse 2s ease-out infinite; }
        .hub-ring-outer { animation: hubRingPulse 2s ease-out infinite 0.65s; }
        @keyframes hubRingPulse {
          0% { opacity: 0.65; transform: scale(0.8); }
          100% { opacity: 0; transform: scale(2.5); }
        }

        /* ── Drone rotor spin ── */
        .rotor-cw  { animation: rotorCW  0.06s linear infinite; }
        .rotor-ccw { animation: rotorCCW 0.06s linear infinite; }
        @keyframes rotorCW  { to { transform: rotate(360deg);  } }
        @keyframes rotorCCW { to { transform: rotate(-360deg); } }

        /* ── Destination LZ rings ── */
        .dest-ring-1 { animation: lzRing 1.5s ease-out infinite; }
        .dest-ring-2 { animation: lzRing 1.5s ease-out infinite 0.5s; }
        @keyframes lzRing {
          0% { opacity: 0.8; transform: scale(0.9); }
          100% { opacity: 0; transform: scale(1.8); }
        }

        /* ── HUD pulse ── */
        @keyframes hudPulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
      `}</style>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />

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
          <h2 className="font-black uppercase leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem,6vw,6rem)", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk',sans-serif", color: "#0A0F1E" }}>
            Delivering<br />across<br />America.
          </h2>
          <div className="flex flex-col gap-3">
            <p className="text-base max-w-xs lg:text-right leading-relaxed" style={{ color: "#6B7280" }}>
              Live drone ops in 5 cities. A new city every quarter.
            </p>
            <div className="flex items-center lg:justify-end gap-4 flex-wrap">
              {[
                { label: "Active", color: "#FF5500" },
                { label: "Pilot", color: "#2563EB" },
                { label: "Coming Soon", color: "#D1D5DB" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: "#9CA3AF" }}>{l.label}</span>
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
                  background: selected === city.id ? "rgba(255,85,0,0.07)" : "#FFFFFF",
                  border: `1px solid ${selected === city.id ? "rgba(255,85,0,0.25)" : "rgba(0,0,0,0.07)"}`,
                  boxShadow: selected === city.id ? "0 2px 8px rgba(255,85,0,0.08)" : "none",
                }}
              >
                {selected === city.id && (
                  <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                    style={{ background: "#FF5500" }} />
                )}
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-black text-[13px]"
                    style={{ color: selected === city.id ? "#0A0F1E" : "#4B5675", fontFamily: "'Space Grotesk',sans-serif" }}>
                    {city.city}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: statusColor(city.status) }} />
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-wider"
                  style={{ color: selected === city.id ? "#FF5500" : "#9CA3AF" }}>
                  {city.state} · {city.status}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden"
            style={{ height: "540px", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

            <MapContainer
              center={CITIES[0].latlng}
              zoom={12}
              style={{ height: "540px", width: "100%" }}
              zoomControl
              scrollWheelZoom={false}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={19}
              />
              <FlyController city={active} onDone={() => setIsFlying(false)} />
              <DeliveryZones />
              <HubMarkers onCityClick={handleSelectCity} />
              {showDrone && droneDest && (
                <DroneLayer
                  running={droneRunning}
                  hub={active.hub}
                  dest={droneDest}
                  onProgress={handleProgress}
                  onPhaseChange={handlePhaseChange}
                  onComplete={handleDroneComplete}
                />
              )}
            </MapContainer>

            {/* Live ops badge */}
            <div className="absolute top-4 left-4 z-[800] pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(0,0,0,0.08)", backdropFilter: "blur(16px)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <Activity className="w-3 h-3" style={{ color: "#16A34A" }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6B7280" }}>Live Ops</span>
                <span className="text-[9px] animate-pulse" style={{ color: "#16A34A" }}>●</span>
              </div>
            </div>

            {/* Flying overlay */}
            <AnimatePresence>
              {isFlying && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[900] pointer-events-none flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(255,85,0,0.35)", backdropFilter: "blur(20px)", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}>
                    <Navigation2 className="w-3.5 h-3.5 animate-spin" style={{ color: "#FF5500" }} />
                    <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#4B5675" }}>Flying to {active.city}…</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Delivery HUD */}
            <AnimatePresence>
              {showDrone && (
                <DeliveryHUD
                  phase={dronePhase}
                  progress={droneProgress}
                  droneId={droneId}
                  alt={tel.alt}
                  speed={tel.speed}
                  eta={tel.eta}
                  hub={active.hub}
                  dest={droneDest ?? active.hub}
                />
              )}
            </AnimatePresence>

            {/* Delivery burst */}
            <AnimatePresence>
              {showBurst && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute top-4 right-4 z-[800] rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{ background: "rgba(255,255,255,0.97)", border: "1px solid rgba(22,163,74,0.25)", backdropFilter: "blur(20px)", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}>
                  <span className="text-xl">📦</span>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: "#16A34A" }}>
                      Delivered
                    </div>
                    <div className="text-[10px] font-medium" style={{ color: "#6B7280" }}>{droneId} · {active.city}</div>
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
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>

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

              <h3 className="font-black uppercase leading-none mb-1"
                style={{ fontSize: "2.2rem", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk',sans-serif", color: "#0A0F1E" }}>
                {active.city}
              </h3>
              <p className="font-bold text-[10px] uppercase tracking-widest mb-4" style={{ color: "#FF5500" }}>
                {active.state}
              </p>
              <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: "#6B7280" }}>{active.desc}</p>

              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { icon: Package, label: "Deliveries", value: active.deliveries },
                  { icon: Clock, label: "Avg Time", value: active.avgTime },
                  { icon: Plane, label: "Zones", value: active.zones > 0 ? String(active.zones) : "Soon" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl p-3 text-center"
                    style={{ background: "#F7F9FC", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <Icon className="w-3.5 h-3.5 mx-auto mb-2" style={{ color: "#FF5500" }} />
                    <div className="font-black text-sm leading-none"
                      style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#0A0F1E" }}>{value}</div>
                    <div className="text-[9px] mt-1 uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Drone status in card */}
              {showDrone && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-3 rounded-xl px-3 py-2.5"
                  style={{ background: `${PHASE_COLOR[dronePhase]}0C`, border: `1px solid ${PHASE_COLOR[dronePhase]}25` }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest"
                      style={{ color: PHASE_COLOR[dronePhase] }}>
                      {PHASE_LABEL[dronePhase]}
                    </span>
                    <span className="text-[9px] font-bold" style={{ color: "#9CA3AF", fontFamily: "monospace" }}>
                      {droneId}
                    </span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.07)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      animate={{ width: `${Math.round(droneProgress * 100)}%` }}
                      transition={{ duration: 0.15 }}
                      style={{ background: PHASE_COLOR[dronePhase] }}
                    />
                  </div>
                </motion.div>
              )}

              {active.status !== "Coming Soon" ? (
                <button
                  onClick={launchDrone}
                  disabled={droneRunning || isFlying}
                  className="w-full py-3 rounded-full font-bold uppercase tracking-[0.1em] text-white text-[11px] transition-all hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2 mb-3"
                  style={{ background: "#FF5500", boxShadow: "0 4px 16px rgba(255,85,0,0.25)" }}>
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {droneRunning ? "Drone In Flight…" : "Watch Live Delivery"}
                </button>
              ) : (
                <div className="w-full py-3 rounded-full font-bold uppercase tracking-[0.1em] text-center text-[11px] mb-3"
                  style={{ background: "#F7F9FC", color: "#9CA3AF", border: "1px solid rgba(0,0,0,0.07)" }}>
                  Coming Soon
                </div>
              )}

              <button
                className="w-full py-2.5 rounded-full font-bold uppercase tracking-[0.1em] text-[11px] transition-all"
                style={{ color: "#6B7280", border: "1px solid rgba(0,0,0,0.10)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.20)"; (e.currentTarget as HTMLElement).style.color = "#0A0F1E"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.10)"; (e.currentTarget as HTMLElement).style.color = "#6B7280"; }}
              >
                <MapPin className="w-3 h-3 inline mr-1.5" />
                Request Service in {active.city}
              </button>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
