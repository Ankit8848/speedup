interface SpeedUpLogoProps {
  size?: number;
  showWordmark?: boolean;
  wordmarkColor?: string;
}

export function SpeedUpLogo({ size = 36, showWordmark = true, wordmarkColor = "white" }: SpeedUpLogoProps) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Icon mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <circle cx="20" cy="20" r="19" fill="#FF5500" opacity="0.12" />
        <circle cx="20" cy="20" r="14" fill="#FF5500" opacity="0.08" />

        {/* Drone body — sleek hexagonal chassis */}
        <path
          d="M20 14.5 L24.5 17 L24.5 23 L20 25.5 L15.5 23 L15.5 17 Z"
          fill="#FF5500"
          opacity="0.9"
        />

        {/* Center dot */}
        <circle cx="20" cy="20" r="2.2" fill="white" opacity="0.95" />

        {/* Four rotor arms */}
        {/* Top-left */}
        <line x1="15.5" y1="17" x2="10" y2="11.5" stroke="#FF5500" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        {/* Top-right */}
        <line x1="24.5" y1="17" x2="30" y2="11.5" stroke="#FF5500" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        {/* Bottom-left */}
        <line x1="15.5" y1="23" x2="10" y2="28.5" stroke="#FF5500" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        {/* Bottom-right */}
        <line x1="24.5" y1="23" x2="30" y2="28.5" stroke="#FF5500" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />

        {/* Rotor discs */}
        <ellipse cx="9" cy="10.5" rx="4.5" ry="1.8" fill="none" stroke="#FF5500" strokeWidth="1.4" opacity="0.9" />
        <ellipse cx="31" cy="10.5" rx="4.5" ry="1.8" fill="none" stroke="#FF5500" strokeWidth="1.4" opacity="0.9" />
        <ellipse cx="9" cy="29.5" rx="4.5" ry="1.8" fill="none" stroke="#FF5500" strokeWidth="1.4" opacity="0.9" />
        <ellipse cx="31" cy="29.5" rx="4.5" ry="1.8" fill="none" stroke="#FF5500" strokeWidth="1.4" opacity="0.9" />

        {/* Speed line under drone */}
        <line x1="14" y1="27" x2="9" y2="27" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
        <line x1="14" y1="29" x2="11" y2="29" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.15" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className="font-black uppercase tracking-[0.08em] leading-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: size * 0.42,
            color: wordmarkColor,
            letterSpacing: "0.1em",
          }}
        >
          Speed<span style={{ color: "#FF5500" }}>Up</span>
        </span>
      )}
    </div>
  );
}
