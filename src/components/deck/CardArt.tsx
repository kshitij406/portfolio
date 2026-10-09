/**
 * Card illustrations, drawn for this site. Flat shapes in the card's own
 * colours, 240 by 150, readable at thumbnail size.
 */

const INK = "#0f1d2c";
const PAPER = "#f4f7f5";
const FLAG = "#d01f6b";
const OK = "#0f8458";
const SEA = "#24838a";
const SODIUM = "#ffc63d";
const COBALT = "#2a46d8";

export default function CardArt({ art }: { art: string }) {
  return (
    <svg viewBox="0 0 240 150" className="card-art" aria-hidden>
      {ART[art] ?? null}
    </svg>
  );
}

const ART: Record<string, React.ReactNode> = {
  fraudlens: (
    <>
      <rect width="240" height="150" fill="#1c1030" />
      <g opacity="0.25" fill={PAPER}>
        {Array.from({ length: 30 }, (_, i) => (
          <circle key={i} cx={(i * 37) % 240} cy={(i * 53) % 150} r="1.2" />
        ))}
      </g>
      <rect x="28" y="26" width="132" height="92" rx="14" fill={PAPER} />
      <path d="M44 118 l-8 14 l20 -14z" fill={PAPER} />
      <rect x="42" y="44" width="80" height="7" rx="3.5" fill="#b9c3c9" />
      <rect x="42" y="60" width="38" height="7" rx="3.5" fill="#b9c3c9" />
      <rect x="84" y="57" width="44" height="13" rx="4" fill={FLAG} />
      <rect x="42" y="78" width="96" height="7" rx="3.5" fill="#b9c3c9" />
      <rect x="42" y="94" width="58" height="7" rx="3.5" fill="#b9c3c9" />
      <circle cx="150" cy="70" r="40" fill="none" stroke={SODIUM} strokeWidth="9" />
      <circle cx="150" cy="70" r="34" fill={SODIUM} opacity="0.18" />
      <path d="M180 100 l30 30" stroke={SODIUM} strokeWidth="14" strokeLinecap="round" />
    </>
  ),
  bluenet: (
    <>
      <rect width="240" height="150" fill="#0b2a3a" />
      {[22, 44, 66, 88].map((r) => (
        <circle key={r} cx="96" cy="78" r={r} fill="none" stroke="#3f8a99" strokeWidth="1.2" opacity="0.7" />
      ))}
      <path d="M96 78 L184 40" stroke="#7fe0e3" strokeWidth="2" opacity="0.8" />
      <path d="M96 78 L184 40 A96 96 0 0 1 190 70 z" fill="#7fe0e3" opacity="0.12" />
      <ellipse cx="96" cy="78" rx="8" ry="11" transform="rotate(-20 96 78)" fill="#e7efe9" />
      <circle cx="176" cy="58" r="22" fill="none" stroke="#4fc1c6" strokeDasharray="4 4" />
      <path d="M150 112 l12 -4 -4 10z" fill={PAPER} />
      <path d="M40 40 l12 -4 -4 10z" fill={PAPER} />
      <path d="M200 120 l12 -4 -4 10z" fill={PAPER} />
      <circle cx="180" cy="56" r="7" fill="none" stroke={FLAG} strokeWidth="2.5" strokeDasharray="3 3" />
      <path d="M60 116 l7 -12 7 12z" fill="#8297ff" />
    </>
  ),
  smarterp: (
    <>
      <rect width="240" height="150" fill="#e3ece6" />
      {Array.from({ length: 8 }, (_, r) =>
        Array.from({ length: 16 }, (_, c) => {
          const missing = (r * 7 + c * 3) % 11 === 0;
          return (
            <circle
              key={`${r}-${c}`}
              cx={20 + c * 13}
              cy={22 + r * 13}
              r="4"
              fill={missing ? "none" : INK}
              stroke={missing ? FLAG : "none"}
              strokeWidth="1.5"
            />
          );
        }),
      )}
      <circle cx="196" cy="118" r="24" fill={SODIUM} stroke={INK} strokeWidth="3" />
      <path d="M196 118 v-14 M196 118 l10 6" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  sultan: (
    <>
      <rect width="240" height="150" fill="#f7e7c9" />
      <circle cx="190" cy="34" r="20" fill="#f2a93b" />
      <path d="M0 120 Q60 100 120 118 T240 112 V150 H0z" fill={SEA} />
      <path d="M40 120 Q42 70 54 46" stroke="#6b4b2a" strokeWidth="5" fill="none" strokeLinecap="round" />
      {[-60, -20, 20, 60, 100].map((a) => (
        <path
          key={a}
          d="M54 46 q22 -6 36 6 q-22 -2 -36 -6z"
          fill="#2f8f5b"
          transform={`rotate(${a} 54 46)`}
        />
      ))}
      <path d="M110 58 h70 l-8 66 h-54z" fill={FLAG} />
      <path d="M128 58 v-8 a17 17 0 0 1 34 0 v8" stroke={INK} strokeWidth="4" fill="none" />
      <text x="145" y="98" textAnchor="middle" fontSize="20" fontWeight="800" fill={PAPER} fontFamily="system-ui">
        EN FR
      </text>
    </>
  ),
  country: (
    <>
      <rect width="240" height="150" fill="#ece3d6" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={24 + c * 30 + (r % 2) * 15}
            y={112 - r * 20}
            width="27"
            height="17"
            rx="2"
            fill={["#b5532d", "#c86a3e", "#9c4425"][(r + c) % 3]}
          />
        )),
      )}
      <g transform="translate(196 62)" fill="none" stroke={OK} strokeWidth="6" strokeLinecap="round">
        <path d="M-22 -6 A24 24 0 0 1 14 -19" />
        <path d="M22 6 A24 24 0 0 1 -14 19" />
        <path d="M8 -26 l8 7 -10 4" strokeWidth="5" />
        <path d="M-8 26 l-8 -7 10 -4" strokeWidth="5" />
      </g>
    </>
  ),
  fleet: (
    <>
      <rect width="240" height="150" fill="#dfe6f2" />
      <path d="M0 120 H240" stroke={INK} strokeWidth="2" />
      <path d="M20 132 H220" stroke={INK} strokeWidth="2" strokeDasharray="10 8" opacity="0.4" />
      <rect x="40" y="62" width="104" height="52" rx="4" fill={COBALT} />
      <path d="M144 76 h34 l18 20 v18 h-52z" fill={INK} />
      <rect x="152" y="82" width="22" height="13" rx="2" fill="#b9d4ff" />
      <circle cx="72" cy="118" r="11" fill={INK} />
      <circle cx="72" cy="118" r="4" fill={PAPER} />
      <circle cx="170" cy="118" r="11" fill={INK} />
      <circle cx="170" cy="118" r="4" fill={PAPER} />
      <path d="M200 30 q10 -18 20 0 q-10 18 -10 26 q0 -8 -10 -26z" fill={FLAG} />
      <circle cx="210" cy="30" r="4" fill={PAPER} />
    </>
  ),
  speed: (
    <>
      <rect width="240" height="150" fill="#1a1a2e" />
      {Array.from({ length: 13 }, (_, i) => {
        const x = 20 + (i % 7) * 30;
        const y = i < 7 ? 40 : 96;
        const open = i < 6;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path
              d={open ? "M3 0 v-9 a8 8 0 0 1 16 0" : "M3 0 v-9 a8 8 0 0 1 16 0 v9"}
              fill="none"
              stroke={open ? SODIUM : "#55607a"}
              strokeWidth="3"
              transform={open ? "rotate(-25 3 0)" : undefined}
            />
            <rect x="-1" y="0" width="24" height="20" rx="3" fill={open ? SODIUM : "#55607a"} />
          </g>
        );
      })}
    </>
  ),
  tcp: (
    <>
      <rect width="240" height="150" fill="#d8efe9" />
      {[30, 75, 120].map((y, i) => (
        <g key={y}>
          <circle cx="34" cy={y} r="13" fill={[SEA, COBALT, FLAG][i]} />
          <path d={`M47 ${y} C110 ${y} 120 75 160 75`} stroke={INK} strokeWidth="2.5" fill="none" strokeDasharray="6 5" />
        </g>
      ))}
      <rect x="160" y="45" width="56" height="60" rx="8" fill={INK} />
      <rect x="172" y="70" width="32" height="24" rx="3" fill={SODIUM} />
      <path d="M178 70 v-7 a10 10 0 0 1 20 0 v7" stroke={SODIUM} strokeWidth="4" fill="none" />
    </>
  ),
  oracle: (
    <>
      <rect width="240" height="150" fill="#f0e2e2" />
      {[96, 70, 44].map((y, i) => (
        <g key={y}>
          <rect x="80" y={y} width="80" height="26" fill={["#b22f2f", "#c94848", "#d86464"][i]} />
          <ellipse cx="120" cy={y + 26} rx="40" ry="10" fill={["#8f2424", "#b22f2f", "#c94848"][i]} />
          <ellipse cx="120" cy={y} rx="40" ry="10" fill={["#d86464", "#e08080", "#ea9a9a"][i]} />
        </g>
      ))}
      <path d="M176 40 l6 12 13 2 -9 9 2 13 -12 -6 -12 6 2 -13 -9 -9 13 -2z" fill={SODIUM} />
    </>
  ),
};
