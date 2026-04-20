"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/data/site";

const LINKS = [
  { href: "/about", label: "about" },
  { href: "/work", label: "work" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-4"
      style={{
        background: "var(--surface-glass)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: scrolled
          ? "0 1px 0 0 var(--border), 0 8px 32px rgba(0,0,0,0.22)"
          : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div className="content-shell flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full timeline-dot-active"
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
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
    </motion.nav>
  );
}
