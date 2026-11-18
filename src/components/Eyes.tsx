"use client";

import { useEffect, useRef } from "react";

/**
 * Two googly eyes that watch the pointer. One listener per pair, and the
 * pupils only move on animation frames, so a page full of them stays cheap.
 */
export default function Eyes({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0,
      mx = 0,
      my = 0;
    const tick = () => {
      raf = 0;
      el.querySelectorAll<HTMLElement>(".eye").forEach((eye) => {
        const r = eye.getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2);
        const dy = my - (r.top + r.height / 2);
        const a = Math.atan2(dy, dx);
        const d = Math.min(Math.hypot(dx, dy) / 40, 1) * r.width * 0.22;
        (eye.firstElementChild as HTMLElement).style.translate = `${Math.cos(a) * d}px ${Math.sin(a) * d}px`;
      });
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <span ref={wrap} className={`eyes ${className}`} aria-hidden>
      <span className="eye">
        <span />
      </span>
      <span className="eye">
        <span />
      </span>
    </span>
  );
}
