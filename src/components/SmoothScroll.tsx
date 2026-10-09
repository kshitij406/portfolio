"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scroll } from "@/lib/scroll";

export default function SmoothScroll() {
  useEffect(() => {
    const max = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const setProgress = () => document.documentElement.style.setProperty("--progress", String(scroll.progress));

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const onScroll = () => {
        scroll.progress = scrollY / max();
        setProgress();
      };
      addEventListener("scroll", onScroll, { passive: true });
      return () => removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -24 } });
    lenis.on("scroll", (l: Lenis) => {
      scroll.velocity = l.velocity;
      scroll.progress = l.scroll / max();
      setProgress();
    });
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      // Lenis stops emitting when still, so let velocity settle to zero.
      if (!lenis.isScrolling) scroll.velocity *= 0.9;
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    // The verdict modal locks the page; Lenis needs telling too.
    const mo = new MutationObserver(() =>
      document.documentElement.classList.contains("no-scroll") ? lenis.stop() : lenis.start(),
    );
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      cancelAnimationFrame(id);
      mo.disconnect();
      lenis.destroy();
    };
  }, []);
  return null;
}
