"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Anything marked `.rv` rises in once, the first time it scrolls into view.
 * Children of a `.rv-list` take a 30ms stagger from their `--i`. Without
 * JavaScript, or with reduced motion, everything is simply there.
 */
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("rv-on");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".rv:not(.in)").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [path]);
  return null;
}
