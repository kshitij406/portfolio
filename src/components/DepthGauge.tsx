"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The page as one dive. A depth gauge down the left edge reads how far down
 * the page you are, in metres, with every section marked on the scale where
 * it sits. Scrolling down lets out bubbles. The surface button goes back up.
 */

const MAX = 40; // recreational limit
const STOPS = [
  ["top", "Surface"],
  ["deck", "Cards"],
  ["work", "Work"],
  ["projects", "Projects"],
  ["demos", "Demos"],
  ["journey", "Journey"],
  ["about", "About"],
  ["contact", "Contact"],
] as const;

export default function DepthGauge() {
  const [depth, setDepth] = useState(0);
  const [marks, setMarks] = useState<{ id: string; label: string; d: number }[]>([]);
  const [here, setHere] = useState("top");
  const bubbles = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let raf = 0;
    let lastY = scrollY;
    let lastBubble = 0;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const span = document.documentElement.scrollHeight - innerHeight;
      if (span <= 0) return;
      setMarks(
        STOPS.flatMap(([id, label]) => {
          const el = document.getElementById(id);
          if (!el) return [];
          const top = el.getBoundingClientRect().top + scrollY;
          return [{ id, label, d: Math.min(1, Math.max(0, top / span)) }];
        }),
      );
    };

    const update = () => {
      raf = 0;
      const span = document.documentElement.scrollHeight - innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, scrollY / span)) : 0;
      setDepth(p);
      let cur = "top";
      for (const [id] of STOPS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.4) cur = id;
      }
      setHere(cur);

      const dy = scrollY - lastY;
      lastY = scrollY;
      const now = performance.now();
      if (!reduce && dy > 6 && now - lastBubble > 110 && bubbles.current) {
        lastBubble = now;
        const b = document.createElement("i");
        b.className = "bubble";
        const s = 4 + Math.random() * 7;
        b.style.width = b.style.height = `${s}px`;
        b.style.left = `${Math.random() * 14 - 7}px`;
        b.style.setProperty("--wob", `${Math.random() * 16 - 8}px`);
        b.addEventListener("animationend", () => b.remove());
        bubbles.current.appendChild(b);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    measure();
    update();
    const t1 = setTimeout(measure, 1200);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    addEventListener("scroll", onScroll, { passive: true });
    const clock = setInterval(() => setTime((t) => t + 1), 1000);
    return () => {
      removeEventListener("scroll", onScroll);
      ro.disconnect();
      clearTimeout(t1);
      clearInterval(clock);
      cancelAnimationFrame(raf);
    };
  }, []);

  const m = depth * MAX;
  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <aside className="gauge" aria-label="How far down the page you are">
      <div className="gauge-read">
        <span className="gauge-m">
          {m < 0.5 ? "0.0" : `-${m.toFixed(1)}`}
          <small>m</small>
        </span>
        <span className="gauge-t">
          dive {mm}:{ss}
        </span>
      </div>
      <div className="gauge-scale">
        {Array.from({ length: 21 }, (_, i) => (
          <i key={i} className={`gauge-tick${i % 5 === 0 ? " major" : ""}`} style={{ top: `${i * 5}%` }} />
        ))}
        {marks.map((k) => (
          <a
            key={k.id}
            href={`#${k.id}`}
            className={`gauge-mark${here === k.id ? " on" : ""}`}
            style={{ top: `${k.d * 100}%` }}
          >
            <span>{k.label}</span>
          </a>
        ))}
        <div className="gauge-diver" style={{ top: `${depth * 100}%` }}>
          <div className="gauge-bubbles" ref={bubbles} />
        </div>
      </div>
      <a href="#top" className="gauge-surface">
        {depth > 0.02 ? "Surface" : "Dive in"}
      </a>
    </aside>
  );
}
