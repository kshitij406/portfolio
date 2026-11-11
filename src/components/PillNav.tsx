"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

const ITEMS = [
  ["Index", "/"],
  ["Work", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

/**
 * Floating navigation, bottom centre. One white highlight slides between
 * items rather than each item drawing its own, so a page change reads as
 * the same object moving.
 */
export default function PillNav() {
  const path = usePathname();
  const active = ITEMS.findIndex(([, href]) => (href === "/" ? path === "/" : path.startsWith(href)));
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const [box, setBox] = useState<{ x: number; w: number } | null>(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    const measure = () => {
      const el = links.current[active];
      setBox(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
    };
    measure();
    // Don't animate the very first placement, only real moves.
    requestAnimationFrame(() => (first.current = false));
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, [active]);

  return (
    <nav className="pill" aria-label="Main">
      {box && (
        <span
          className={`pill-hl${first.current ? " still" : ""}`}
          style={{ transform: `translateX(${box.x}px)`, width: box.w }}
          aria-hidden
        />
      )}
      {ITEMS.map(([label, href], i) => (
        <Link
          key={href}
          href={href}
          ref={(a) => {
            links.current[i] = a;
          }}
          aria-current={i === active ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
