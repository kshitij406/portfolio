"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Glyph, { type GlyphName, type GlyphTone } from "@/components/Glyph";

const ITEMS: [string, string, GlyphName, GlyphTone][] = [
  ["Home", "/", "home", "orange"],
  ["Work", "/work", "work", "blue"],
  ["Experience", "/experience", "briefcase", "lilac"],
  ["About", "/about", "person", "green"],
  ["Contact", "/contact", "mail", "pink"],
];

/** Bottom-centre dock of big glossy icons. Each names itself on hover; the current page wears a dot. */
export default function Dock() {
  const path = usePathname();
  return (
    <nav className="dock" aria-label="Main">
      {ITEMS.map(([label, href, icon, tone]) => {
        const on = href === "/" ? path === "/" : path.startsWith(href);
        return (
          <Link key={href} href={href} className="dock-tile" aria-current={on ? "page" : undefined} aria-label={label}>
            <Glyph name={icon} tone={tone} size={34} />
            <span className="dock-tip" aria-hidden>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
