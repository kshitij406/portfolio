"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stickers, the personal side in one glance. The hero has the big sheet and
 * every section header gets a few of its own. Each one can be peeled up and
 * dragged around its patch of page; a tap without dragging shows what it's
 * about, right next to it. Positions are percentages of the layer so they
 * survive a resize; phones get a smaller, tidier set of positions.
 */

export type S = { id: string; label: string; caption: string; x: number; y: number; mx: number; my: number; r: number; w: number };

export const HERO_STICKERS: S[] = [
  { id: "mask", label: "Dive mask", caption: "I dive. Tanzanian coast first, Mauritius after.", x: 76, y: 9, mx: 16, my: 16, r: -10, w: 108 },
  { id: "uk", label: "Union Jack", caption: "The UK, since September 2026. Second year at Kent.", x: 92, y: 14, mx: 50, my: 12, r: 7, w: 96 },
  { id: "mu", label: "Mauritius flag", caption: "Mauritius: first year of uni, both hackathons, first clients.", x: 70, y: 25, mx: 84, my: 16, r: -6, w: 86 },
  { id: "tz", label: "Tanzania flag", caption: "Tanzania: where I grew up, and both internships.", x: 88, y: 30, mx: 18, my: 50, r: 8, w: 86 },
  { id: "phonebox", label: "Red telephone box", caption: "Placement from summer 2027. Ring me. Or email, which is quicker.", x: 73, y: 43, mx: 50, my: 50, r: -5, w: 60 },
  { id: "bus", label: "Red double-decker bus", caption: "Canterbury now. New city, same laptop.", x: 90, y: 47, mx: 84, my: 52, r: 4, w: 112 },
  { id: "tea", label: "Cup of tea", caption: "A UK sticker set needed one of these.", x: 70, y: 60, mx: 18, my: 84, r: 10, w: 78 },
  { id: "pad", label: "Game controller", caption: "Souls-likes, mostly. I like games that let you lose.", x: 86, y: 61, mx: 52, my: 84, r: -10, w: 96 },
  { id: "film", label: "Film clapperboard", caption: "Every film I watch goes on Letterboxd.", x: 96, y: 60, mx: 85, my: 85, r: -12, w: 76 },
];

// Section sets sit in the empty space to the right of each heading.
export const SECTION_STICKERS: Record<string, S[]> = {
  deck: [
    { id: "lens", label: "Magnifying glass", caption: "Look closer. Everything on this page rewards it.", x: 78, y: 30, mx: 20, my: 50, r: -12, w: 104 },
    { id: "star", label: "Gold star", caption: "One legendary in the deck. Rarity follows real results, not taste.", x: 92, y: 62, mx: 62, my: 50, r: 10, w: 70 },
  ],
  work: [
    { id: "bug", label: "A bug", caption: "Found one. It was eating one punch in six.", x: 74, y: 28, mx: 18, my: 50, r: 14, w: 86 },
    { id: "duck", label: "Rubber duck", caption: "Debugging partner. Never interrupts.", x: 90, y: 58, mx: 52, my: 50, r: -8, w: 92 },
    { id: "hardhat", label: "Hard hat", caption: "Two internships in Dar es Salaam. Both shipped.", x: 66, y: 74, mx: 80, my: 50, r: 6, w: 84 },
  ],
  projects: [
    { id: "lock", label: "Padlock", caption: "Speed coding: 13 locked problems. Nobody opened more than 6. We opened 6.", x: 76, y: 24, mx: 18, my: 50, r: -10, w: 66 },
    { id: "wave", label: "A wave", caption: "2.3 million square kilometres of sea. BlueNet keeps an eye on it.", x: 92, y: 46, mx: 52, my: 50, r: 6, w: 110 },
    { id: "trophy", label: "Trophy", caption: "Finnovate 2026. Winner. 72 hours, five people.", x: 72, y: 72, mx: 80, my: 50, r: 8, w: 76 },
  ],
  demos: [
    { id: "cursor", label: "Mouse pointer", caption: "Go on, click one. They're live.", x: 82, y: 36, mx: 30, my: 50, r: -14, w: 62 },
    { id: "pad2", label: "Game controller", caption: "There's a playable game down there. Arrow keys.", x: 94, y: 66, mx: 70, my: 50, r: 9, w: 96 },
  ],
  about: [
    { id: "hello", label: "Hello my name is sticker", caption: "Kshitij. Rhymes with nothing. Kxitiz online.", x: 76, y: 30, mx: 26, my: 50, r: -6, w: 132 },
    { id: "fedora", label: "Fedora hat", caption: "Fedora with KDE on the laptop. The hat is a pun.", x: 92, y: 64, mx: 76, my: 50, r: 10, w: 100 },
  ],
  contact: [
    { id: "envelope", label: "Envelope", caption: "Email is the quickest way. I answer.", x: 80, y: 30, mx: 24, my: 50, r: 8, w: 104 },
    { id: "plane", label: "Paper plane", caption: "Three countries so far. Next stop: a placement, summer 2027.", x: 94, y: 66, mx: 74, my: 50, r: -12, w: 92 },
  ],
};

// Takes a section id rather than the array: server components can render
// this, but can't read plain values out of a client module.
export default function Stickers({ section, className = "" }: { section?: string; className?: string }) {
  const set = (section && SECTION_STICKERS[section]) || HERO_STICKERS;
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
    setCaption(null);
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

  const cap = set.find((s) => s.id === caption);
  const cp = cap ? at(cap) : null;

  return (
    <div className={`stickers ${className}`} ref={area}>
      {set.map((s, i) => {
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
      <p
        className={`sticker-caption${cap ? " show" : ""}`}
        role="status"
        style={cp ? { left: `${Math.max(12, Math.min(88, cp.x))}%`, top: `${cp.y}%` } : undefined}
      >
        {cap?.caption}
      </p>
    </div>
  );
}

export function StickerArt({ id }: { id: string }) {
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
    case "uk":
      return (
        <svg viewBox="0 0 96 66">
          <rect x="3" y="3" width="90" height="60" rx="6" fill="#fff" />
          <g transform="translate(8 8)">
            <clipPath id="ukc">
              <rect width="80" height="50" />
            </clipPath>
            <g clipPath="url(#ukc)">
              <rect width="80" height="50" fill="#012169" />
              <path d="M0 0 L80 50 M80 0 L0 50" stroke="#fff" strokeWidth="10" />
              <path d="M0 0 L80 50 M80 0 L0 50" stroke="#c8102e" strokeWidth="3.4" />
              <path d="M40 0 V50 M0 25 H80" stroke="#fff" strokeWidth="16" />
              <path d="M40 0 V50 M0 25 H80" stroke="#c8102e" strokeWidth="9" />
            </g>
          </g>
        </svg>
      );
    case "phonebox":
      return (
        <svg viewBox="0 0 60 110">
          <g stroke="#fff" strokeWidth="5" paintOrder="stroke">
            <path d="M8 104 V20 Q8 6 30 4 Q52 6 52 20 V104z" fill="#c8102e" />
          </g>
          <rect x="12" y="16" width="36" height="7" rx="1.5" fill="#0f1d2c" />
          <rect x="15" y="17.5" width="30" height="4" fill="#f4f7f5" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}-${c}`} x={15 + c * 10.5} y={30 + r * 13} width="9" height="11" rx="1" fill="#f7e7c9" opacity="0.9" />
            )),
          )}
          <rect x="14" y="72" width="32" height="26" rx="2" fill="#a50d26" />
          <rect x="44" y="82" width="3" height="8" rx="1" fill="#ffc63d" />
        </svg>
      );
    case "bus":
      return (
        <svg viewBox="0 0 120 84">
          <g stroke="#fff" strokeWidth="5" paintOrder="stroke">
            <rect x="6" y="6" width="104" height="64" rx="10" fill="#d0202f" />
            <circle cx="30" cy="72" r="9" fill="#0f1d2c" />
            <circle cx="88" cy="72" r="9" fill="#0f1d2c" />
          </g>
          <circle cx="30" cy="72" r="3.5" fill="#c9d3d8" />
          <circle cx="88" cy="72" r="3.5" fill="#c9d3d8" />
          {[0, 1, 2, 3].map((k) => (
            <rect key={`u${k}`} x={14 + k * 22} y="13" width="18" height="15" rx="2.5" fill="#cfe6f0" />
          ))}
          {[0, 1, 2].map((k) => (
            <rect key={`l${k}`} x={36 + k * 22} y="38" width="18" height="15" rx="2.5" fill="#cfe6f0" />
          ))}
          <rect x="13" y="38" width="17" height="26" rx="2.5" fill="#8c1520" />
          <rect x="6" y="32" width="104" height="3" fill="#ffc63d" />
        </svg>
      );
    case "tea":
      return (
        <svg viewBox="0 0 90 80">
          <g stroke="#fff" strokeWidth="5" paintOrder="stroke">
            <ellipse cx="42" cy="70" rx="38" ry="7" fill="#e6ece8" />
            <path d="M14 30 H70 V52 Q70 68 42 68 Q14 68 14 52z" fill="#f4f7f5" />
            <path d="M70 36 q16 0 16 12 q0 12 -16 12" fill="none" stroke="#f4f7f5" strokeWidth="6" />
          </g>
          <path d="M70 36 q16 0 16 12 q0 12 -16 12" fill="none" stroke="#0f1d2c" strokeWidth="2.5" />
          <path d="M14 30 H70 V52 Q70 68 42 68 Q14 68 14 52z" fill="none" stroke="#0f1d2c" strokeWidth="2.5" />
          <ellipse cx="42" cy="31" rx="27" ry="4" fill="#9a5b2e" />
          <path d="M22 44 h40" stroke="#24838a" strokeWidth="5" strokeLinecap="round" />
          <g fill="none" stroke="#4d5d69" strokeWidth="2.5" strokeLinecap="round">
            <path d="M32 22 q-5 -6 0 -11 q5 -5 0 -10" />
            <path d="M48 22 q-5 -6 0 -11 q5 -5 0 -10" />
          </g>
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
    case "pad2":
      return <StickerArt id="pad" />;
    case "lens":
      return (
        <svg viewBox="0 0 120 120">
          <g stroke="#fff" strokeWidth="6" paintOrder="stroke">
            <path d="M74 74 L106 106" stroke="#6b4b2a" strokeWidth="16" strokeLinecap="round" />
            <circle cx="48" cy="48" r="36" fill="#cfe6f0" />
          </g>
          <circle cx="48" cy="48" r="36" fill="none" stroke="#0f1d2c" strokeWidth="7" />
          <path d="M28 40 q6 -14 22 -16" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
          <text x="48" y="62" textAnchor="middle" fontSize="34" fontWeight="800" fill="#d01f6b" fontFamily="system-ui">
            і
          </text>
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 100 96">
          <path
            d="M50 6 L62 36 L94 38 L69 58 L78 90 L50 72 L22 90 L31 58 L6 38 L38 36z"
            fill="#ffc63d"
            stroke="#fff"
            strokeWidth="6"
            strokeLinejoin="round"
            paintOrder="stroke"
          />
          <path d="M50 22 L56 40 L74 41" stroke="#fff3c4" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="40" cy="54" r="3" fill="#0f1d2c" />
          <circle cx="60" cy="54" r="3" fill="#0f1d2c" />
          <path d="M42 64 q8 6 16 0" stroke="#0f1d2c" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "bug":
      return (
        <svg viewBox="0 0 100 100">
          <g stroke="#fff" strokeWidth="6" paintOrder="stroke" strokeLinecap="round">
            <g stroke="#0f1d2c" strokeWidth="4">
              <path d="M30 44 L12 36 M28 58 L10 60 M32 72 L16 84 M70 44 L88 36 M72 58 L90 60 M68 72 L84 84 M42 22 L34 8 M58 22 L66 8" />
            </g>
            <ellipse cx="50" cy="60" rx="24" ry="30" fill="#d01f6b" />
            <circle cx="50" cy="28" r="12" fill="#0f1d2c" />
          </g>
          <path d="M50 32 V90" stroke="#0f1d2c" strokeWidth="3" />
          <circle cx="40" cy="54" r="5" fill="#0f1d2c" />
          <circle cx="60" cy="68" r="5" fill="#0f1d2c" />
          <circle cx="42" cy="76" r="4" fill="#0f1d2c" />
          <circle cx="45" cy="26" r="2.5" fill="#fff" />
          <circle cx="55" cy="26" r="2.5" fill="#fff" />
        </svg>
      );
    case "duck":
      return (
        <svg viewBox="0 0 110 96">
          <g stroke="#fff" strokeWidth="6" paintOrder="stroke">
            <path d="M14 58 Q14 86 52 86 Q96 86 96 60 Q96 44 80 44 Q70 44 66 50 Q60 46 50 48 Q30 40 14 58z" fill="#ffc63d" />
            <circle cx="40" cy="34" r="22" fill="#ffc63d" />
            <path d="M18 34 Q4 34 6 42 Q16 46 26 40z" fill="#f2832b" />
          </g>
          <circle cx="36" cy="28" r="4" fill="#0f1d2c" />
          <circle cx="37.5" cy="26.5" r="1.3" fill="#fff" />
          <path d="M58 60 Q72 72 86 58" stroke="#e0a520" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "hardhat":
      return (
        <svg viewBox="0 0 110 80">
          <g stroke="#fff" strokeWidth="6" paintOrder="stroke">
            <path d="M6 60 H104 V68 Q104 72 98 72 H12 Q6 72 6 68z" fill="#e0a520" />
            <path d="M18 60 Q18 18 55 16 Q92 18 92 60z" fill="#ffc63d" />
          </g>
          <path d="M48 17 H62 V60 H48z" fill="#e0a520" />
          <path d="M28 46 Q30 30 44 24" stroke="#fff3c4" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "lock":
      return (
        <svg viewBox="0 0 70 96">
          <g stroke="#fff" strokeWidth="6" paintOrder="stroke">
            <path d="M18 44 V28 a17 17 0 0 1 34 0 v6" fill="none" stroke="#9aa7b0" strokeWidth="9" />
            <rect x="6" y="42" width="58" height="48" rx="8" fill="#ffc63d" />
          </g>
          <path d="M18 44 V28 a17 17 0 0 1 34 0 v6" fill="none" stroke="#9aa7b0" strokeWidth="8" />
          <circle cx="35" cy="62" r="6" fill="#0f1d2c" />
          <path d="M35 64 V76" stroke="#0f1d2c" strokeWidth="5" strokeLinecap="round" />        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 130 90">
          <path
            d="M6 84 V58 Q20 20 58 14 Q96 10 104 40 Q86 30 74 42 Q90 46 92 60 Q104 72 124 66 V84z"
            fill="#24838a"
            stroke="#fff"
            strokeWidth="6"
            strokeLinejoin="round"
            paintOrder="stroke"
          />
          <path d="M20 58 Q36 30 64 26" stroke="#7fe0e3" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M74 42 Q84 36 96 40" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M14 74 Q30 68 46 74 T78 74 T110 74" stroke="#4fc1c6" strokeWidth="4" fill="none" />
        </svg>
      );
    case "trophy":
      return (
        <svg viewBox="0 0 90 100">
          <g stroke="#fff" strokeWidth="6" paintOrder="stroke">
            <path d="M20 14 Q4 14 6 30 Q8 44 26 46" fill="none" stroke="#c9962b" strokeWidth="6" />
            <path d="M70 14 Q86 14 84 30 Q82 44 64 46" fill="none" stroke="#c9962b" strokeWidth="6" />
            <path d="M18 8 H72 V30 Q72 58 45 60 Q18 58 18 30z" fill="#ffc63d" />
            <rect x="24" y="78" width="42" height="16" rx="3" fill="#6b4b2a" />
          </g>
          <path d="M20 14 Q4 14 6 30 Q8 44 26 46 M70 14 Q86 14 84 30 Q82 44 64 46" fill="none" stroke="#c9962b" strokeWidth="5" />
          <rect x="39" y="58" width="12" height="22" fill="#c9962b" />
          <path d="M30 16 V32 Q30 44 40 48" stroke="#fff3c4" strokeWidth="4" fill="none" strokeLinecap="round" />
          <text x="45" y="90" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffc63d" fontFamily="system-ui">
            2026
          </text>
        </svg>
      );
    case "cursor":
      return (
        <svg viewBox="0 0 70 100">
          <path
            d="M8 6 L8 80 L26 64 L38 92 L52 86 L40 58 L64 58z"
            fill="#0f1d2c"
            stroke="#fff"
            strokeWidth="6"
            strokeLinejoin="round"
            paintOrder="stroke"
          />
        </svg>
      );
    case "hello":
      return (
        <svg viewBox="0 0 150 100">
          <rect x="4" y="4" width="142" height="92" rx="12" fill="#d0202f" stroke="#fff" strokeWidth="5" paintOrder="stroke" />
          <text x="75" y="26" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff" fontFamily="system-ui">
            HELLO
          </text>
          <text x="75" y="39" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff" fontFamily="system-ui">
            my name is
          </text>
          <rect x="12" y="46" width="126" height="40" rx="3" fill="#fff" />
          <text x="75" y="76" textAnchor="middle" fontSize="24" fill="#0f1d2c" style={{ fontFamily: "var(--f-hand), cursive" }}>
            Kshitij
          </text>
        </svg>
      );
    case "fedora":
      return (
        <svg viewBox="0 0 120 70">
          <g stroke="#fff" strokeWidth="6" paintOrder="stroke">
            <ellipse cx="60" cy="54" rx="54" ry="12" fill="#3c2f2a" />
            <path d="M28 54 Q26 18 44 12 Q52 18 60 14 Q68 18 76 12 Q94 18 92 54z" fill="#4a3a33" />
          </g>
          <path d="M28 44 Q60 50 92 44 L92 52 Q60 58 28 52z" fill="#3b78c2" />
          <path d="M60 14 Q58 26 60 38" stroke="#2e231f" strokeWidth="3" fill="none" />
        </svg>
      );
    case "envelope":
      return (
        <svg viewBox="0 0 120 84">
          <g stroke="#fff" strokeWidth="6" paintOrder="stroke">
            <rect x="6" y="8" width="108" height="70" rx="6" fill="#f4f7f5" />
          </g>
          <path d="M8 12 L60 50 L112 12" stroke="#0f1d2c" strokeWidth="3" fill="none" />
          <rect x="6" y="8" width="108" height="70" rx="6" fill="none" stroke="#0f1d2c" strokeWidth="3" />
          <rect x="86" y="54" width="20" height="16" fill="#ffc63d" stroke="#0f1d2c" strokeWidth="2" />
          <circle cx="60" cy="50" r="9" fill="#d01f6b" />
        </svg>
      );
    case "plane":
      return (
        <svg viewBox="0 0 120 90">
          <g stroke="#fff" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke">
            <path d="M6 44 L114 6 L80 84 L58 58z" fill="#f4f7f5" />
          </g>
          <path d="M6 44 L114 6 L80 84 L58 58z M58 58 L114 6 M58 58 L56 80 L70 66" fill="none" stroke="#0f1d2c" strokeWidth="3" strokeLinejoin="round" />
          <path d="M58 58 L56 80 L70 66z" fill="#cfd8dd" />
        </svg>
      );
    default:
      return null;
  }
}
