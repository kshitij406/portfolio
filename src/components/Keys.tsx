"use client";

import { useMemo, useState } from "react";
import { CARDS, LANGUAGES, SKILLS, SMALLER, WORK } from "@/data/content";

/**
 * Skills as a keyboard. Press a key and it tells you where on this page that
 * skill was actually used, found by searching the work, the deck and the
 * smaller projects for it. Nothing is hand-written here, so it can't lie.
 */

const SOURCES = [
  ...WORK.map((w) => ({ name: w.company, text: [w.lede, ...w.points, ...w.stack].join(" ") })),
  ...CARDS.map((c) => ({ name: c.name, text: [c.kind, c.line, c.back, c.badge, ...c.stats.flat()].join(" ") })),
  ...SMALLER.map((s) => ({ name: s.name, text: `${s.what} ${s.lang}` })),
];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function usedIn(skill: string) {
  // "Go" must not match "Godot", "Java" must not match "JavaScript".
  const re = new RegExp(`(^|[^A-Za-z0-9#])${esc(skill)}(?![A-Za-z0-9#])`);
  return [...new Set(SOURCES.filter((s) => re.test(s.text)).map((s) => s.name))];
}

export default function Keys() {
  const [down, setDown] = useState<string | null>(null);
  const hits = useMemo(() => (down ? usedIn(down) : []), [down]);

  return (
    <div className="keys">
      {SKILLS.map((g) => (
        <div className="keys-row" key={g.group}>
          <p className="keys-group">{g.group}</p>
          <div className="keys-caps">
            {g.items.map((s) => (
              <button
                type="button"
                key={s}
                className={`kc${down === s ? " down" : ""}`}
                aria-pressed={down === s}
                onClick={() => setDown((d) => (d === s ? null : s))}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
      <p className="keys-out" aria-live="polite">
        {!down ? (
          <span className="muted">Press a key to see where I used it.</span>
        ) : hits.length ? (
          <>
            <strong>{down}</strong> shows up in {hits.join(", ")}.
          </>
        ) : (
          <>
            <strong>{down}</strong> is on the CV, but nothing on this page shows it off yet. Ask me about it.
          </>
        )}
      </p>
      <p className="keys-spoken">
        <span className="keys-group">Spoken</span> {LANGUAGES}
      </p>
    </div>
  );
}
