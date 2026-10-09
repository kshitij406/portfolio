"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  ["work", "Work"],
  ["projects", "Projects"],
  ["clients", "Clients"],
  ["prizes", "Prizes"],
  ["about", "About"],
  ["contact", "Contact"],
] as const;

/**
 * Appears once the hero is gone. Shows which section you're in, rolls to the
 * next name as you cross into it, and fills with scroll progress. Clicking it
 * goes back to the top.
 */
export default function SectionPill() {
  const [current, setCurrent] = useState<number>(-1);

  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(SECTIONS.findIndex(([id]) => id === e.target.id));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById("top");
    const heroIo = new IntersectionObserver(([e]) => e.isIntersecting && setCurrent(-1), { threshold: 0.35 });
    if (hero) heroIo.observe(hero);
    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

  return (
    <a href="#top" className={`spill${current >= 0 ? " show" : ""}`} aria-label="Back to top">
      <span className="spill-bar" aria-hidden />
      <span className="spill-roll" aria-hidden>
        <span style={{ transform: `translateY(${-Math.max(0, current) * 1.3}em)` }}>
          {SECTIONS.map(([id, label]) => (
            <span key={id}>{label}</span>
          ))}
        </span>
      </span>
    </a>
  );
}
