import './BuddyCharacter.css';

export default function BuddyCharacter({ size = 280 }) {
  return (
    <svg
      className="buddy-stage"
      width={size}
      height={size * 0.75}
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Paper/Canvas */}
      <rect x="40" y="40" width="160" height="120" rx="16" fill="var(--buddy-paper)" />

      {/* Animated Lines of Text */}
      <g strokeWidth="5" strokeLinecap="round">
        <line x1="65" y1="75" x2="140" y2="75" stroke="var(--buddy-line)" className="buddy-text-line buddy-delay-1" />
        <line x1="65" y1="95" x2="175" y2="95" stroke="var(--buddy-line)" className="buddy-text-line buddy-delay-2" />
        <line x1="65" y1="115" x2="155" y2="115" stroke="var(--buddy-line)" className="buddy-text-line buddy-delay-3" />
      </g>

      {/* AI Magic Sparkles */}
      <g>
        <path className="buddy-sparkle buddy-delay-1" d="M195 55L197 61L203 63L197 65L195 71L193 65L187 63L193 61L195 55Z" fill="var(--buddy-sparkle)" />
        <path className="buddy-sparkle buddy-delay-2" d="M215 85L216.5 89.5L221 91L216.5 92.5L215 97L213.5 92.5L209 91L213.5 89.5L215 85Z" fill="var(--buddy-sparkle)" />
      </g>

      {/* The Writing Buddy Character */}
      <g className="buddy-writer-group">
        <g className="buddy-character">
          {/* Shadow */}
          <ellipse cx="30" cy="55" rx="12" ry="4" fill="black" fillOpacity="0.08" />

          {/* Body */}
          <rect x="10" y="10" width="40" height="35" rx="12" fill="var(--buddy-body)" />
          <rect x="14" y="14" width="32" height="20" rx="8" fill="var(--buddy-accent)" fillOpacity="0.5" />

          {/* Eyes */}
          <circle className="buddy-eye" cx="22" cy="24" r="3" fill="var(--buddy-face)" />
          <circle className="buddy-eye" cx="38" cy="24" r="3" fill="var(--buddy-face)" />

          {/* Antenna */}
          <line x1="30" y1="10" x2="30" y2="2" stroke="var(--buddy-body)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="30" cy="2" r="2.5" fill="var(--buddy-sparkle)" className="buddy-sparkle" />

          {/* Stylus/Pen Arm */}
          <g transform="translate(42, 30) rotate(15)">
            <rect x="0" y="0" width="4" height="15" rx="2" fill="var(--buddy-body)" />
            <path d="M0 15 L2 22 L4 15 Z" fill="#71717a" />
          </g>

          {/* Smile */}
          <path d="M26 30 Q30 33 34 30" stroke="var(--buddy-face)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
