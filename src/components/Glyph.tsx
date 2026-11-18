import { useId } from "react";

/**
 * The site's big icons: solid shapes filled with a two-stop gradient, a
 * gloss on the top half and white details on top, so they read like little
 * plastic app icons. One 48px grid, one corner style, one gloss, so the set
 * stays a family wherever it appears.
 */

export type GlyphName =
  | "home"
  | "work"
  | "briefcase"
  | "person"
  | "mail"
  | "server"
  | "browser"
  | "database"
  | "phone"
  | "spark"
  | "cloud"
  | "star"
  | "bolt"
  | "trophy";

export type GlyphTone = "pink" | "blue" | "yellow" | "green" | "lilac" | "lime" | "orange";

const TONES: Record<GlyphTone, [string, string]> = {
  pink: ["#ff9fa0", "#ef3f45"],
  blue: ["#86cbff", "#1b74e4"],
  yellow: ["#ffe07a", "#f2a200"],
  green: ["#86e8a6", "#16a055"],
  lilac: ["#c3b3ff", "#6a47ee"],
  lime: ["#e2f97a", "#7fb300"],
  orange: ["#ffc46a", "#ff6a1a"],
};

// Each glyph: the body (takes the gradient and gloss) and white details.
const SHAPES: Record<GlyphName, { body: React.ReactNode; detail?: React.ReactNode }> = {
  home: {
    body: <path d="M24 5.5 4.5 21.6c-1.3 1.1-.5 3.2 1.2 3.2H9V40a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3V24.8h3.3c1.7 0 2.5-2.1 1.2-3.2z" />,
    detail: <rect x="19.5" y="29" width="9" height="14" rx="2.5" />,
  },
  work: {
    body: (
      <>
        <rect x="5" y="5" width="17" height="17" rx="5" />
        <rect x="26" y="5" width="17" height="17" rx="5" />
        <rect x="5" y="26" width="17" height="17" rx="5" />
        <rect x="26" y="26" width="17" height="17" rx="5" />
      </>
    ),
  },
  briefcase: {
    body: (
      <>
        <path d="M17 12V9.5A3.5 3.5 0 0 1 20.5 6h7A3.5 3.5 0 0 1 31 9.5V12h-4V10h-6v2z" />
        <rect x="4" y="12" width="40" height="30" rx="6" />
      </>
    ),
    detail: <rect x="20" y="23" width="8" height="6" rx="2" />,
  },
  person: {
    body: (
      <>
        <circle cx="24" cy="15" r="10" />
        <path d="M5 42c1.6-9 9.2-14.5 19-14.5S41.4 33 43 42a2 2 0 0 1-2 2.4H7A2 2 0 0 1 5 42z" />
      </>
    ),
  },
  mail: {
    body: <rect x="3.5" y="9" width="41" height="31" rx="7" />,
    detail: <path d="m9 16 15 11 15-11" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />,
  },
  server: {
    body: (
      <>
        <rect x="5" y="6" width="38" height="16" rx="5" />
        <rect x="5" y="26" width="38" height="16" rx="5" />
      </>
    ),
    detail: (
      <>
        <circle cx="13" cy="14" r="2.6" />
        <circle cx="13" cy="34" r="2.6" />
        <rect x="21" y="12.5" width="15" height="3" rx="1.5" />
        <rect x="21" y="32.5" width="15" height="3" rx="1.5" />
      </>
    ),
  },
  browser: {
    body: <rect x="3.5" y="6" width="41" height="36" rx="7" />,
    detail: (
      <>
        <rect x="3.5" y="15" width="41" height="2.6" />
        <circle cx="10" cy="10.6" r="1.9" />
        <circle cx="16" cy="10.6" r="1.9" />
        <rect x="10" y="23" width="17" height="4" rx="2" />
        <rect x="10" y="31" width="27" height="4" rx="2" />
      </>
    ),
  },
  database: {
    body: (
      <path d="M24 4c10.5 0 19 3.4 19 7.5v25C43 40.6 34.5 44 24 44S5 40.6 5 36.5v-25C5 7.4 13.5 4 24 4z" />
    ),
    detail: (
      <>
        <path d="M8 20c3 2.6 9 4.2 16 4.2s13-1.6 16-4.2" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M8 30c3 2.6 9 4.2 16 4.2s13-1.6 16-4.2" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
      </>
    ),
  },
  phone: {
    body: <rect x="11" y="3" width="26" height="42" rx="7" />,
    detail: (
      <>
        <rect x="20" y="7" width="8" height="2.6" rx="1.3" />
        <rect x="19" y="38" width="10" height="2.6" rx="1.3" />
      </>
    ),
  },
  spark: {
    body: (
      <>
        <path d="M21 4c1.2 9.2 4.8 12.8 14 14-9.2 1.2-12.8 4.8-14 14-1.2-9.2-4.8-12.8-14-14 9.2-1.2 12.8-4.8 14-14z" />
        <path d="M36 27c.7 5 2.5 6.8 7.5 7.5-5 .7-6.8 2.5-7.5 7.5-.7-5-2.5-6.8-7.5-7.5 5-.7 6.8-2.5 7.5-7.5z" />
      </>
    ),
  },
  cloud: {
    body: <path d="M14 40a10 10 0 0 1-1.6-19.9A12.5 12.5 0 0 1 36.3 17 11.5 11.5 0 0 1 35 40z" />,
  },
  star: {
    body: (
      <path d="M24 3.5c1 0 1.8.6 2.2 1.4l5 10.3 11.3 1.6c2 .3 2.8 2.8 1.3 4.2l-8.2 8 1.9 11.2c.4 2-1.7 3.5-3.5 2.6L24 37.5l-10.1 5.3c-1.8.9-3.9-.6-3.5-2.6l1.9-11.2-8.2-8c-1.5-1.4-.7-3.9 1.3-4.2l11.3-1.6 5-10.3c.4-.8 1.3-1.4 2.3-1.4z" />
    ),
  },
  bolt: {
    body: <path d="M27.5 3 8 27.5h13L18.5 45 40 19.5H27z" />,
  },
  trophy: {
    body: (
      <>
        <path d="M13 5h22v13a11 11 0 0 1-22 0z" />
        <path d="M13 9H7a2 2 0 0 0-2 2.2C5.6 17.8 9.5 21.6 14 22.5zM35 9h6a2 2 0 0 1 2 2.2c-.6 6.6-4.5 10.4-9 11.3z" />
        <rect x="21" y="27" width="6" height="8" />
        <rect x="13" y="35" width="22" height="8" rx="3" />
      </>
    ),
  },
};

export default function Glyph({
  name,
  tone,
  size = 48,
  className = "",
}: {
  name: GlyphName;
  tone: GlyphTone;
  size?: number;
  className?: string;
}) {
  const [hi, lo] = TONES[tone];
  // Unique per instance: a shared id resolves to the first copy in the
  // document, and if that copy is display:none the gradient paints nothing.
  const uid = useId();
  const id = `gl${uid}`;
  const gloss = `gs${uid}`;
  const { body, detail } = SHAPES[name];
  return (
    <svg className={`glyph ${className}`} viewBox="0 0 48 48" width={size} height={size} aria-hidden focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={hi} />
          <stop offset="1" stopColor={lo} />
        </linearGradient>
        <linearGradient id={gloss} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>{body}</g>
      <g fill={`url(#${gloss})`}>{body}</g>
      {detail && <g fill="#fff">{detail}</g>}
    </svg>
  );
}
