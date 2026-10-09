"use client";

import { useEffect, useRef } from "react";

export type Palette = Record<"ink" | "paper" | "muted" | "line" | "flag" | "ok" | "cobalt" | "sodium" | "sea" | "sans" | "mono", string>;

export function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const v = (n: string) => s.getPropertyValue(`--${n}`).trim();
  return {
    ink: v("ink"),
    paper: v("paper"),
    muted: v("muted"),
    line: v("line"),
    flag: v("flag"),
    ok: v("ok"),
    cobalt: v("cobalt"),
    sodium: v("sodium"),
    sea: v("sea"),
    sans: v("f-sans") || "system-ui, sans-serif",
    mono: v("f-mono") || "monospace",
  };
}

/**
 * Sizes a canvas to its box at device pixel ratio, keeps the palette in sync
 * with the theme, and only runs the draw loop while the canvas is on screen.
 */
export function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, pal: Palette) => void,
) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0,
      h = 0,
      raf = 0,
      visible = false;
    let pal = readPalette();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const loop = (t: number) => {
      drawRef.current(ctx, w, h, t, pal);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    const mo = new MutationObserver(() => (pal = readPalette()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onMq = () => (pal = readPalette());
    mq.addEventListener("change", onMq);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return ref;
}

/** Small deterministic PRNG so every visitor sees the same data. */
export function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
