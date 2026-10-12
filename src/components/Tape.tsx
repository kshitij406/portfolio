"use client";

import { useEffect, useRef } from "react";

/**
 * Hazard tape stretched across the page between sections. It drifts on its
 * own and gets shoved along by scrolling, in whichever direction you scroll.
 * Hovering holds it still so it can be read.
 */
export default function Tape({ items, tone = "sodium", tilt = -2 }: { items: readonly string[]; tone?: string; tilt?: number }) {
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let x = 0;
    let push = 0;
    let lastY = scrollY;
    let held = false;
    let raf = 0;
    let last = 0;
    const dir = tilt < 0 ? -1 : 1;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      const dy = scrollY - lastY;
      lastY = scrollY;
      push += dy * 0.6;
      push *= 0.9;
      if (!held) x += (dir * 40 * dt) + dir * push * dt * 6;
      const w = el.scrollWidth / 2;
      x = ((x % w) + w) % w;
      el.style.transform = `translate3d(${-x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) {
        lastY = scrollY;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(root.current!);
    const r = root.current!;
    const on = () => (held = true);
    const off = () => (held = false);
    r.addEventListener("pointerenter", on);
    r.addEventListener("pointerleave", off);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      r.removeEventListener("pointerenter", on);
      r.removeEventListener("pointerleave", off);
    };
  }, [tilt]);

  // Twice over, so the loop has no seam.
  const run = [...items, ...items, ...items];
  return (
    <div className="tape-wrap" aria-hidden>
      <div className={`tape tape-${tone}`} ref={root} style={{ ["--tilt" as string]: `${tilt}deg` }}>
        <div className="tape-track" ref={track}>
          {[0, 1].map((k) => (
            <span className="tape-run" key={k}>
              {run.map((t, i) => (
                <span key={i} className="tape-item">
                  {t}
                  <i className="tape-sep" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
