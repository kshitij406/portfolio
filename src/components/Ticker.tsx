"use client";

import { useEffect, useRef } from "react";
import { scroll } from "@/lib/scroll";

/**
 * A band of signal codes in the style FraudLens uses internally, drifting
 * sideways. Scrolling pushes it faster and leans it in the direction of
 * travel; hovering slows it so the codes can be read.
 */

type Props = { items: { code: string; flag?: boolean }[]; reverse?: boolean; speed?: number };

export default function Ticker({ items, reverse = false, speed = 0.04 }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const hover = useRef(false);

  useEffect(() => {
    const el = track.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let x = 0,
      skew = 0,
      raf = 0,
      last = performance.now(),
      visible = false;
    const dir = reverse ? 1 : -1;

    const loop = (t: number) => {
      const dt = Math.min(48, t - last);
      last = t;
      const v = scroll.velocity;
      const base = hover.current ? speed * 0.2 : speed;
      x += dir * (base + Math.abs(v) * 0.012) * dt;
      const half = el.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      skew += (Math.max(-12, Math.min(12, -v * 0.35)) - skew) * 0.1;
      el.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
      if (visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(el.parentElement!);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reverse, speed]);

  const row = items.map((it, i) => (
    <span key={i} className={`tk-item${it.flag ? " tk-flag" : ""}`}>
      <i aria-hidden />
      {it.code}
    </span>
  ));

  return (
    <div
      className="ticker"
      aria-hidden
      onPointerEnter={() => (hover.current = true)}
      onPointerLeave={() => (hover.current = false)}
    >
      <div className="tk-track" ref={track}>
        {row}
        {row}
      </div>
    </div>
  );
}
