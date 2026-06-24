import { useId } from "react";

interface SpeedUpLogoProps {
  size?: number;
  showWordmark?: boolean;
  wordmarkColor?: string;
}

export function SpeedUpLogo({ size = 36, showWordmark = true, wordmarkColor = "#0A0F1E" }: SpeedUpLogoProps) {
  // Unique gradient ids — the logo renders many times on a page.
  const uid = useId().replace(/:/g, "");
  const grad = `su-grad-${uid}`;
  const sheen = `su-sheen-${uid}`;

  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 4px 10px rgba(255,85,0,0.28))" }}
      >
        <defs>
          <linearGradient id={grad} x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FF8A3D" />
            <stop offset="0.55" stopColor="#FF5500" />
            <stop offset="1" stopColor="#E03E00" />
          </linearGradient>
          <linearGradient id={sheen} x1="20" y1="3" x2="20" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.30" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Rounded "squircle" badge */}
        <rect x="3" y="3" width="34" height="34" rx="11" fill={`url(#${grad})`} />
        {/* Top sheen for a glassy, premium feel */}
        <rect x="3" y="3" width="34" height="34" rx="11" fill={`url(#${sheen})`} />
        {/* Crisp inner edge */}
        <rect x="3.6" y="3.6" width="32.8" height="32.8" rx="10.4" fill="none" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="1" />

        {/* Speed mark — stacked upward chevrons (motion + "up") */}
        <path d="M12.5 22 L20 14.5 L27.5 22" fill="none" stroke="#FFFFFF" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.5 27.5 L20 20 L27.5 27.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {showWordmark && (
        <span
          className="font-black uppercase leading-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: size * 0.44,
            color: wordmarkColor,
            letterSpacing: "0.02em",
          }}
        >
          Speed<span style={{ color: "#FF5500" }}>Up</span>
        </span>
      )}
    </div>
  );
}
