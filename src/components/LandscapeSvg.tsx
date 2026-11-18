/**
 * Source for public/land-1280.jpg and land-2560.jpg. Not rendered on the
 * site: its noise filters are far too slow to repaint while scrolling, so
 * edit this, render it once to those two JPEGs, and <Landscape> shows them.
 *
 * Rolling hills under a summer sky, drawn rather than photographed. Sky,
 * cloud, four hills and a speckle of flowers on the near slopes. `id`
 * keeps gradient and filter ids unique when two scenes share a page.
 */
export default function LandscapeSvg({ id, className = "" }: { id: string; className?: string }) {
  const u = (s: string) => `${id}-${s}`;
  return (
    <svg
      className={`land ${className}`}
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={u("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3c6fbe" />
          <stop offset="0.45" stopColor="#7ea7dc" />
          <stop offset="0.62" stopColor="#c4d8ee" />
        </linearGradient>
        <linearGradient id={u("far")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7c9c69" />
          <stop offset="1" stopColor="#5f8a46" />
        </linearGradient>
        <linearGradient id={u("left")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b9c94a" />
          <stop offset="0.6" stopColor="#93ad35" />
          <stop offset="1" stopColor="#6f9330" />
        </linearGradient>
        <linearGradient id={u("right")} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fb23d" />
          <stop offset="1" stopColor="#4f7d2a" />
        </linearGradient>
        <linearGradient id={u("near")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c6c94c" />
          <stop offset="1" stopColor="#8ea83a" />
        </linearGradient>

        {/* Cumulus: soft blobs, blurred, then pushed around by noise. */}
        <filter id={u("cloud")} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="4" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="70" />
          <feGaussianBlur stdDeviation="9" />
        </filter>

        {/* Grass grain, multiplied over the hills. */}
        <filter id={u("grain")}>
          <feTurbulence type="fractalNoise" baseFrequency="0.7 0.22" numOctaves="3" seed="3" />
          <feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.32  0 0 0 0 0.06  1.6 0 0 0 -0.55" />
        </filter>

        {/* Flowers: noise thresholded into small yellow and white specks. */}
        <filter id={u("flowers")}>
          <feTurbulence type="fractalNoise" baseFrequency="0.32" numOctaves="1" seed="11" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  12 0 0 0 -8.9" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feComposite in="SourceGraphic" operator="in" />
        </filter>

        <clipPath id={u("land")}>
          <path d="M0 600C260 520 520 560 780 640S1200 820 1600 760V1000H0Z" />
          <path d="M640 1000C880 760 1140 560 1600 500V1000Z" />
          <path d="M0 830C320 770 700 800 1000 900S1400 990 1600 950V1000H0Z" />
        </clipPath>
      </defs>

      <rect width="1600" height="1000" fill={`url(#${u("sky")})`} />

      <g filter={`url(#${u("cloud")})`} fill="#fff" opacity="0.95">
        <circle cx="960" cy="250" r="80" />
        <circle cx="1060" cy="200" r="95" />
        <circle cx="1160" cy="260" r="75" />
        <circle cx="1010" cy="120" r="60" />
        <circle cx="880" cy="320" r="60" />
        <ellipse cx="1040" cy="330" rx="200" ry="55" />
        <ellipse cx="320" cy="400" rx="130" ry="30" opacity="0.7" />
        <ellipse cx="420" cy="380" rx="60" ry="30" opacity="0.7" />
      </g>

      <path d="M0 560C300 470 600 520 900 470S1400 430 1600 480V1000H0Z" fill={`url(#${u("far")})`} />
      <path d="M0 600C260 520 520 560 780 640S1200 820 1600 760V1000H0Z" fill={`url(#${u("left")})`} />
      <path d="M640 1000C880 760 1140 560 1600 500V1000Z" fill={`url(#${u("right")})`} />
      <path d="M0 830C320 770 700 800 1000 900S1400 990 1600 950V1000H0Z" fill={`url(#${u("near")})`} />

      <g clipPath={`url(#${u("land")})`}>
        <rect width="1600" height="1000" filter={`url(#${u("grain")})`} style={{ mixBlendMode: "multiply" }} />
        <rect y="560" width="1600" height="440" fill="#f2dc3a" filter={`url(#${u("flowers")})`} opacity="0.9" />
        <rect y="700" width="1600" height="300" fill="#fbf8ea" filter={`url(#${u("flowers")})`} opacity="0.55" transform="translate(7 5)" />
      </g>
    </svg>
  );
}
