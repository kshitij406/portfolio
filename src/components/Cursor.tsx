"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only cursor. A dot that is exactly where the pointer is, and a ring
 * that follows with some lag and stretches in the direction of travel. The
 * ring reads context from the element under it:
 *   links and buttons: it grows, links get a one-word label
 *   [data-cursor="scan"]: it becomes a crosshair
 *   [data-cursor="lens"]: it gets out of the way of the hero lens
 *   text fields: the native caret comes back
 * Left alone for a few seconds, it starts scanning.
 * Anything with .magnetic leans towards the pointer.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const p = { x: innerWidth / 2, y: innerHeight / 2 };
    const r = { x: p.x, y: p.y };
    let idleTimer = 0;
    let raf = 0;
    let magnet: HTMLElement | null = null;

    const setState = (s: string, text = "") => {
      ring.current!.dataset.state = s;
      label.current!.textContent = text;
    };

    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const ctx = t.closest<HTMLElement>("[data-cursor]");
      const field = t.closest("textarea, input");
      const link = t.closest<HTMLAnchorElement>("a[href]");
      const btn = t.closest("button, [role=button]");
      if (field) setState("text");
      else if (ctx) setState(ctx.dataset.cursor!, ctx.dataset.cursorLabel ?? "");
      else if (link) {
        const ext = link.target === "_blank" || /^mailto:/.test(link.href);
        setState("link", link.href.startsWith("mailto:") ? "Write" : ext ? "Visit" : "Go");
      } else if (btn) setState("button");
      else setState("");

      const m = t.closest<HTMLElement>(".magnetic");
      if (m !== magnet) {
        if (magnet) magnet.style.transform = "";
        magnet = m;
      }
    };

    const move = (e: PointerEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
      html.classList.remove("cursor-idle", "cursor-out");
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => html.classList.add("cursor-idle"), 3500);
      if (magnet) {
        const b = magnet.getBoundingClientRect();
        const dx = (p.x - (b.left + b.width / 2)) * 0.28;
        const dy = (p.y - (b.top + b.height / 2)) * 0.38;
        magnet.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    const loop = () => {
      const vx = p.x - r.x;
      const vy = p.y - r.y;
      r.x += vx * 0.18;
      r.y += vy * 0.18;
      const speed = Math.min(Math.hypot(vx, vy) / 120, 0.45);
      const angle = Math.atan2(vy, vx);
      ring.current!.style.transform = `translate(${r.x}px, ${r.y}px) rotate(${angle}rad) scale(${1 + speed}, ${1 - speed * 0.6})`;
      label.current!.style.transform = `rotate(${-angle}rad)`;
      dot.current!.style.transform = `translate(${p.x}px, ${p.y}px)`;
      raf = requestAnimationFrame(loop);
    };

    const leave = () => html.classList.add("cursor-out");
    const down = () => html.classList.add("cursor-down");
    const up = () => html.classList.remove("cursor-down");

    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerover", over, { passive: true });
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      removeEventListener("pointermove", move);
      removeEventListener("pointerover", over);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      html.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div className="cursor" aria-hidden>
      <div className="cursor-ring" ref={ring}>
        <span className="cursor-label" ref={label} />
      </div>
      <div className="cursor-dot" ref={dot} />
    </div>
  );
}
