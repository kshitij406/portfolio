"use client";

import { useEffect, useRef } from "react";

/**
 * Letters get heavier the closer the pointer is, using the display face's
 * weight axis, so a bulge of weight follows the cursor through the word.
 */
export default function WaveText({ text, min = 300, max = 800, radius = 260 }: { text: string; min?: number; max?: number; radius?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // No hover on touch screens, so a virtual pointer sweeps through instead.
    const touch = !matchMedia("(pointer: fine)").matches;
    const R = touch ? radius * 0.4 : radius;
    const spans = [...ref.current!.querySelectorAll<HTMLElement>("span")];
    const cur = spans.map(() => min);
    const p = { x: -9999, y: -9999 };
    let raf = 0;
    let active = false;

    const loop = (t: number) => {
      if (touch) {
        const b = ref.current!.getBoundingClientRect();
        const k = ((t / 2600) % 1.4) - 0.2;
        p.x = b.left + b.width * k;
        p.y = b.top + b.height / 2;
      }
      let moving = false;
      spans.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - p.x, r.top + r.height / 2 - p.y);
        const target = min + (max - min) * Math.max(0, 1 - d / R) ** 1.6;
        cur[i] += (target - cur[i]) * 0.16;
        if (Math.abs(target - cur[i]) > 0.5) moving = true;
        s.style.fontWeight = String(Math.round(cur[i]));
      });
      raf = moving || (touch && active) ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
      if (touch) {
        if (active && !raf) raf = requestAnimationFrame(loop);
        return;
      }
      if (active) addEventListener("pointermove", move, { passive: true });
      else removeEventListener("pointermove", move);
    });
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [min, max, radius]);

  return (
    <span ref={ref} className="wave" aria-label={text}>
      {[...text].map((c, i) => (
        <span key={i} aria-hidden style={{ fontWeight: min }}>
          {c}
        </span>
      ))}
    </span>
  );
}
