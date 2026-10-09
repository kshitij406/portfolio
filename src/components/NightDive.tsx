"use client";

import { useEffect, useRef } from "react";

/**
 * Night dive only. Marine snow (the drifting specks you see on any night dive)
 * behind the page, moving against the scroll for a bit of depth, and a dive
 * torch that follows the pointer and lights up whatever is under it.
 */
export default function NightDive() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const torch = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const isDark = () => (html.dataset.theme ? html.dataset.theme === "dark" : mq.matches);

    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    let w = 0,
      h = 0,
      raf = 0;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const N = Math.round(Math.min(110, (innerWidth * innerHeight) / 14000));
    const flakes = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.3 + Math.random() * 0.7,
      s: Math.random() * Math.PI * 2,
    }));
    const m = { x: -999, y: -999 };
    const onMove = (e: PointerEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      torch.current!.style.setProperty("--tx", `${m.x}px`);
      torch.current!.style.setProperty("--ty", `${m.y}px`);
    };
    addEventListener("pointermove", onMove, { passive: true });

    let lastScroll = scrollY;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      if (isDark()) {
        const dy = scrollY - lastScroll;
        lastScroll = scrollY;
        for (const f of flakes) {
          f.y -= (dy * f.z * 0.25) / h + 0.00006 * f.z;
          f.x += Math.sin(t / 3000 + f.s) * 0.00008;
          if (f.y < -0.02) f.y += 1.04;
          if (f.y > 1.02) f.y -= 1.04;
          const x = f.x * w,
            y = f.y * h;
          const lit = Math.max(0, 1 - Math.hypot(x - m.x, y - m.y) / 260);
          ctx.globalAlpha = 0.12 + f.z * 0.18 + lit * 0.6;
          ctx.fillStyle = lit > 0.05 ? "#bdf3f2" : "#8fb3bd";
          ctx.beginPath();
          ctx.arc(x, y, f.z * 1.6 + lit, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvas} className="snow" aria-hidden />
      <div ref={torch} className="torch" aria-hidden />
    </>
  );
}
