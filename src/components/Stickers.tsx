"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stickers on the hero, the personal side in one glance. Each one can be
 * peeled up and dragged anywhere in the hero. A tap without dragging shows
 * what it's about. Positions are percentages of the hero so they survive a
 * resize; phones get a smaller, tidier set of positions.
 */

type S = { id: string; label: string; caption: string; x: number; y: number; mx: number; my: number; r: number; w: number };

const STICKERS: S[] = [
  { id: "mask", label: "Dive mask", caption: "I dive. Tanzanian coast first, Mauritius after.", x: 76, y: 12, mx: 18, my: 24, r: -10, w: 112 },
  { id: "mu", label: "Mauritius flag", caption: "Mauritius: first year of uni, both hackathons, first clients.", x: 91, y: 24, mx: 52, my: 16, r: 8, w: 92 },
  { id: "tz", label: "Tanzania flag", caption: "Tanzania: where I grew up, and both internships.", x: 72, y: 36, mx: 84, my: 28, r: -6, w: 92 },
  { id: "kreol", label: "Speech bubble saying Ki manier?", caption: "'Ki manier?' is Kreol for 'how's it going?'. FraudLens reads Kreol too.", x: 89, y: 44, mx: 28, my: 72, r: 6, w: 120 },
  { id: "pad", label: "Game controller", caption: "Souls-likes, mostly. I like games that let you lose.", x: 74, y: 57, mx: 62, my: 74, r: 12, w: 104 },
  { id: "film", label: "Film clapperboard", caption: "Every film I watch goes on Letterboxd.", x: 92, y: 61, mx: 88, my: 74, r: -12, w: 84 },
];

export default function Stickers() {
  const [pos, setPos] = useState<Record<string, { x: number; y: number; r: number }>>({});
  const [lifted, setLifted] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [z, setZ] = useState<Record<string, number>>({});
  const area = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const topZ = useRef(10);

  useEffect(() => {
    const mq = matchMedia("(max-width: 760px)");
    const set = () => {
      setMobile(mq.matches);
      setPos({});
    };
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (!caption) return;
    const t = setTimeout(() => setCaption(null), 3800);
    return () => clearTimeout(t);
  }, [caption]);

  const at = (s: S) => pos[s.id] ?? { x: mobile ? s.mx : s.x, y: mobile ? s.my : s.y, r: s.r };

  const down = (e: React.PointerEvent, s: S) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const p = at(s);
    drag.current = { id: s.id, sx: e.clientX, sy: e.clientY, ox: p.x, oy: p.y, moved: false };
    setLifted(s.id);
    topZ.current += 1;
    setZ((m) => ({ ...m, [s.id]: topZ.current }));
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const r = area.current!.getBoundingClientRect();
    const dx = e.clientX - d.sx,
      dy = e.clientY - d.sy;
    if (Math.hypot(dx, dy) > 4) d.moved = true;
    const x = Math.max(0, Math.min(100, d.ox + (dx / r.width) * 100));
    const y = Math.max(0, Math.min(100, d.oy + (dy / r.height) * 100));
    const tilt = Math.max(-25, Math.min(25, e.movementX * 1.5));
    setPos((m) => ({ ...m, [d.id]: { x, y, r: tilt } }));
  };
  const up = (s: S) => {
    const d = drag.current;
    drag.current = null;
    setLifted(null);
    if (d && !d.moved) setCaption(s.id);
    else setPos((m) => (m[s.id] ? { ...m, [s.id]: { ...m[s.id], r: s.r + (Math.random() - 0.5) * 10 } } : m));
  };

  const cap = STICKERS.find((s) => s.id === caption);

  return (
    <div className="stickers" ref={area}>
      {STICKERS.map((s, i) => {
        const p = at(s);
        return (
          <button
            type="button"
            key={s.id}
            className={`sticker${lifted === s.id ? " lifted" : ""}`}
            aria-label={`${s.label}. ${s.caption}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: mobile ? s.w * 0.72 : s.w,
              zIndex: z[s.id] ?? i + 1,
              ["--r" as string]: `${p.r}deg`,
              ["--d" as string]: `${0.9 + i * 0.09}s`,
            }}
            onPointerDown={(e) => down(e, s)}
            onPointerMove={move}
            onPointerUp={() => up(s)}
            onPointerCancel={() => up(s)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setCaption(s.id)}
          >
            <StickerArt id={s.id} />
          </button>
        );
      })}
      <p className={`sticker-caption${cap ? " show" : ""}`} role="status">
        {cap?.caption}
      </p>
    </div>
  );
}

function StickerArt({ id }: { id: string }) {
  switch (id) {
    case "mask":
      return (
        <svg viewBox="0 0 120 80">
          <path d="M10 30 Q10 10 32 10 H88 Q110 10 110 30 V46 Q110 66 88 66 H74 Q66 66 62 56 Q60 52 58 56 Q54 66 46 66 H32 Q10 66 10 46z" fill="#0f1d2c" stroke="#fff" strokeWidth="5" paintOrder="stroke" />
          <path d="M20 32 Q20 20 34 20 H56 V54 Q54 58 46 58 H34 Q20 58 20 44z" fill="#4fc1c6" />
          <path d="M64 20 H86 Q100 20 100 32 V44 Q100 58 86 58 H74 Q66 58 64 54z" fill="#4fc1c6" />
          <path d="M26 26 l10 0 -10 12z" fill="#fff" opacity="0.6" />
          <path d="M70 26 l10 0 -10 12z" fill="#fff" opacity="0.6" />
          <rect x="102" y="2" width="12" height="40" rx="6" fill="#ffc63d" stroke="#fff" strokeWidth="4" paintOrder="stroke" />
        </svg>
      );
    case "mu":
      return (
        <svg viewBox="0 0 96 66">
          <rect x="3" y="3" width="90" height="60" rx="6" fill="#fff" />
          <g transform="translate(8 8)">
            <rect width="80" height="12.5" fill="#ea2839" />
            <rect y="12.5" width="80" height="12.5" fill="#1a206d" />
            <rect y="25" width="80" height="12.5" fill="#ffd500" />
            <rect y="37.5" width="80" height="12.5" fill="#00a551" />
          </g>
        </svg>
      );
    case "tz":
      return (
        <svg viewBox="0 0 96 66">
          <rect x="3" y="3" width="90" height="60" rx="6" fill="#fff" />
          <g transform="translate(8 8)">
            <clipPath id="tzc">
              <rect width="80" height="50" />
            </clipPath>
            <g clipPath="url(#tzc)">
              <path d="M0 0 H80 L0 50z" fill="#1eb53a" />
              <path d="M80 0 V50 H0z" fill="#00a3dd" />
              <path d="M-6 46 L74 -4" stroke="#fcd116" strokeWidth="22" />
              <path d="M-6 46 L74 -4" stroke="#000" strokeWidth="14" />
            </g>
          </g>
        </svg>
      );
    case "kreol":
      return (
        <svg viewBox="0 0 130 84">
          <path d="M14 6 H116 Q126 6 126 16 V52 Q126 62 116 62 H44 L22 80 L26 62 H14 Q4 62 4 52 V16 Q4 6 14 6z" fill="#ffc63d" stroke="#fff" strokeWidth="5" paintOrder="stroke" />
          <text x="65" y="42" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="21" fill="#0f1d2c">
            Ki manier?
          </text>
        </svg>
      );
    case "pad":
      return (
        <svg viewBox="0 0 120 76">
          <path d="M30 10 H90 Q114 10 116 40 Q118 70 98 70 Q86 70 78 54 H42 Q34 70 22 70 Q2 70 4 40 Q6 10 30 10z" fill="#d01f6b" stroke="#fff" strokeWidth="5" paintOrder="stroke" />
          <rect x="22" y="32" width="22" height="7" rx="2" fill="#fff" />
          <rect x="29.5" y="24.5" width="7" height="22" rx="2" fill="#fff" />
          <circle cx="86" cy="28" r="5" fill="#ffc63d" />
          <circle cx="96" cy="38" r="5" fill="#4fc1c6" />
          <circle cx="76" cy="38" r="5" fill="#3fd39a" />
          <circle cx="86" cy="48" r="5" fill="#fff" />
        </svg>
      );
    case "film":
      return (
        <svg viewBox="0 0 90 84">
          <g stroke="#fff" strokeWidth="5" paintOrder="stroke">
            <rect x="6" y="30" width="78" height="48" rx="4" fill="#0f1d2c" />
            <g transform="rotate(-14 6 30)">
              <rect x="6" y="12" width="78" height="16" rx="3" fill="#0f1d2c" />
            </g>
          </g>
          <g transform="rotate(-14 6 30)" fill="#fff">
            {[0, 1, 2, 3].map((k) => (
              <path key={k} d={`M${14 + k * 18} 12 l10 0 -8 16 -10 0z`} />
            ))}
          </g>
          <rect x="14" y="40" width="40" height="6" rx="3" fill="#ffc63d" />
          <rect x="14" y="54" width="60" height="6" rx="3" fill="#4d5d69" />
          <rect x="14" y="66" width="30" height="6" rx="3" fill="#4d5d69" />
        </svg>
      );
    default:
      return null;
  }
}
