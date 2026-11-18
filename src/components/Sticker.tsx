"use client";

import { useRef } from "react";

export type Tone = "pink" | "blue" | "yellow" | "green" | "lilac" | "lime";

/**
 * A tilted paper tag you can pick up and move. It follows the pointer 1:1
 * while held, rubber-bands past the edge of its section, and settles back
 * inside when let go. Touch scrolls the page instead, so it only drags
 * with a mouse or pen.
 */
export default function Sticker({
  children,
  tone = "pink",
  tilt = -6,
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  tilt?: number;
  className?: string;
}) {
  const el = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    const node = el.current!;
    const bounds = (node.closest("[data-sticker-bounds]") ?? document.body).getBoundingClientRect();
    const start = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y };
    const rect = node.getBoundingClientRect();
    // How far it can travel before the band starts pulling back.
    const lim = {
      x0: bounds.left - rect.left + pos.current.x,
      x1: bounds.right - rect.right + pos.current.x,
      y0: bounds.top - rect.top + pos.current.y,
      y1: bounds.bottom - rect.bottom + pos.current.y,
    };
    const band = (v: number, lo: number, hi: number) =>
      v < lo ? lo - Math.sqrt(lo - v) * 6 : v > hi ? hi + Math.sqrt(v - hi) * 6 : v;

    node.setPointerCapture(e.pointerId);
    node.classList.add("held");

    const move = (ev: PointerEvent) => {
      const x = band(ev.clientX - start.x, lim.x0, lim.x1);
      const y = band(ev.clientY - start.y, lim.y0, lim.y1);
      pos.current = { x, y };
      node.style.translate = `${x}px ${y}px`;
    };
    const up = () => {
      node.classList.remove("held");
      const x = Math.min(Math.max(pos.current.x, lim.x0), lim.x1);
      const y = Math.min(Math.max(pos.current.y, lim.y0), lim.y1);
      pos.current = { x, y };
      node.style.translate = `${x}px ${y}px`;
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up);
      node.removeEventListener("pointercancel", up);
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
    node.addEventListener("pointercancel", up);
  };

  return (
    <span
      ref={el}
      className={`sticker t-${tone} ${className}`}
      style={{ ["--tilt" as string]: `${tilt}deg` }}
      onPointerDown={onDown}
    >
      <span className="sticker-dot" aria-hidden />
      {children}
    </span>
  );
}
