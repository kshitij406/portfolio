"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@/data/site";

const LINKS = [
  { href: "/about", label: "about" },
  { href: "/work", label: "work" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-4"
      style={{
        background: "var(--surface-glass)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="content-shell flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span
            className="text-xs uppercase tracking-[0.16em]"
            style={{ color: pathname === "/" ? "var(--accent)" : "var(--text)" }}
          >
            kshitij jha
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-5 text-sm">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative pb-1"
                style={{
                  color: active ? "var(--text)" : "var(--muted)",
                  fontFamily: "var(--font-dm-mono), monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontSize: "12px",
                }}
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

          <a
            href={SOCIAL_LINKS.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-social hidden sm:inline-flex"
            style={{ minHeight: "34px", padding: "0 10px", fontSize: "11px" }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  );
}
