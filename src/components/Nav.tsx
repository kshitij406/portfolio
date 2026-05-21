"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SOCIAL_LINKS } from "@/data/site";

const LINKS = [
  { href: "/about", label: "about", number: "01" },
  { href: "/work", label: "work", number: "02" },
  { href: "/contact", label: "contact", number: "03" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5 text-sm">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative pb-1 flex items-center gap-1.5"
                  style={{
                    color: active ? "var(--text)" : "var(--muted)",
                    fontFamily: "var(--font-dm-mono), monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ color: "var(--muted-dim)", fontSize: "9px" }}>{link.number}</span>
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block h-px rounded-full"
              style={{ background: "var(--text)", width: 20 }}
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="block h-px rounded-full"
              style={{ background: "var(--text)", width: 20 }}
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.18 }}
            />
            <motion.span
              className="block h-px rounded-full"
              style={{ background: "var(--text)", width: 20 }}
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[61px] left-0 right-0 z-30 md:hidden"
            style={{
              background: "var(--surface-glass)",
              backdropFilter: "blur(14px)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="px-6 py-3">
              {LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 py-3"
                    style={{
                      borderBottom: "1px solid var(--border-dim)",
                      color: active ? "var(--accent)" : "var(--text)",
                      fontFamily: "var(--font-dm-mono), monospace",
                    }}
                  >
                    <span style={{ color: "var(--muted-dim)", fontSize: "10px", minWidth: "18px" }}>
                      {link.number}
                    </span>
                    <span className="text-sm uppercase tracking-widest">{link.label}</span>
                    {active && (
                      <span className="ml-auto text-xs" style={{ color: "var(--accent)" }}>
                        ●
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="pt-3 pb-1 flex gap-2">
                <a
                  href={SOCIAL_LINKS.github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-social flex-1 justify-center"
                  style={{ fontSize: "11px", minHeight: "38px" }}
                >
                  GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-social flex-1 justify-center"
                  style={{ fontSize: "11px", minHeight: "38px" }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
