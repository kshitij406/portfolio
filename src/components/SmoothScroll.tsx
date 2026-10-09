"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -24 } });
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    // Overlays (the card inspector, Patrol, the verdict) lock the page.
    const mo = new MutationObserver(() =>
      document.documentElement.classList.contains("no-scroll") ? lenis.stop() : lenis.start(),
    );
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      mo.disconnect();
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return null;
}
