"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/about", label: "about" },
  { href: "/work", label: "work" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 md:px-12 py-4"
      style={{
        background: "rgba(20, 24, 28, 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-1.5 transition-opacity hover:opacity-100 opacity-80"
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: "var(--accent)" }}
        />
        <span
          className="text-sm"
          style={{ color: pathname === "/" ? "var(--accent)" : "var(--text)" }}
        >
          kj
        </span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative pb-0.5 transition-colors hover:text-white"
              style={{ color: active ? "var(--accent)" : "var(--muted)" }}
            >
              {link.label}
              {active && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </Link>
          );
        })}

        {/* Letterboxd handle */}
        <a
          href="https://letterboxd.com/Kxitiz_/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1 text-xs transition-opacity opacity-40 hover:opacity-90 ml-2"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-dm-mono), monospace",
          }}
        >
          <span style={{ color: "var(--rating)" }}>★</span>
          <span>/Kxitiz_</span>
        </a>
      </div>
    </nav>
  );
}
