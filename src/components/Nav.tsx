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
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 md:px-12 py-5">
      <Link
        href="/"
        className="text-sm transition-opacity hover:opacity-100 opacity-70"
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          color: pathname === "/" ? "var(--accent)" : "var(--muted)",
          opacity: pathname === "/" ? 1 : undefined,
        }}
      >
        kj.
      </Link>
      <div className="flex gap-6 text-sm">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-white"
            style={{
              color:
                pathname === link.href ? "var(--accent)" : "var(--muted)",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
