"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PROJECTS } from "@/data/projects";

/**
 * Projects stood on edge along a diagonal, nearest at the bottom left,
 * receding to the top right. The stack leans a little towards the pointer,
 * driven through two CSS variables on the stage; React renders it once.
 */
export default function Stack() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0,
      px = 0,
      py = 0,
      tx = 0,
      ty = 0;

    const tick = () => {
      // Ease the lean towards the pointer, so it drifts rather than snaps.
      px += (tx - px) * 0.08;
      py += (ty - py) * 0.08;
      el.style.setProperty("--px", px.toFixed(4));
      el.style.setProperty("--py", py.toFixed(4));
      raf = Math.abs(tx - px) + Math.abs(ty - py) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="stack-stage" ref={stage}>
      <div className="stack">
        {PROJECTS.map((p, i) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="stack-card" style={{ ["--i" as string]: i }} aria-label={p.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" decoding="async" draggable={false} />
            <span className="stack-label">{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
