import { PROFILE, SOCIAL_LINKS } from "@/data/site";
import FooterTime from "@/components/ui/FooterTime";
import Link from "next/link";

const MARQUEE_TEXT =
  "available for projects · mauritius +04:00 · open to interesting work · cs student · backend engineer · ";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

const year = new Date().getFullYear();

export default function SiteFooter() {
  const repeated = MARQUEE_TEXT.repeat(4);

  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      {/* Marquee strip */}
      <div
        className="overflow-hidden py-2.5"
        style={{
          borderBottom: "1px solid var(--border-dim)",
          background: "var(--surface)",
        }}
      >
        <div className="ticker-track-slow">
          <span
            className="text-[10px] uppercase tracking-widest pr-8"
            style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {repeated}
          </span>
          <span
            className="text-[10px] uppercase tracking-widest pr-8"
            style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
            aria-hidden="true"
          >
            {repeated}
          </span>
        </div>
      </div>

      {/* Main footer */}
      <div className="px-6 md:px-12 py-8 md:py-10">
        <div className="content-shell">
          {/* Three-column top section */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 pb-8"
            style={{ borderBottom: "1px solid var(--border-dim)" }}
          >
            {/* Brand */}
            <div>
              <div
                className="flex items-center gap-2 mb-3"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full timeline-dot-active shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <span className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--text)" }}>
                  kshitij jha
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--muted)", fontFamily: "var(--font-dm-mono), monospace" }}
              >
                CS student. Backend focus.
                <br />
                Building things that work.
              </p>
            </div>

            {/* Pages */}
            <div>
              <div
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
              >
                Pages
              </div>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Elsewhere */}
            <div>
              <div
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
              >
                Elsewhere
              </div>
              <ul className="space-y-2">
                {[SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.letterboxd].map((link) => {
                  const isLetterboxd = link.label === "Letterboxd";
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        style={isLetterboxd ? { color: "var(--rating)" } : undefined}
                      >
                        {isLetterboxd ? "★ " : ""}{link.handle}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Bottom: status + copyright */}
          <div className="flex flex-wrap justify-between gap-3 items-center">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full timeline-dot-active shrink-0"
                style={{ background: "var(--accent)" }}
              />
              <p
                className="text-xs uppercase tracking-[0.12em]"
                style={{
                  color: "var(--muted-dim)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
              >
                {PROFILE.name.toLowerCase()} · available ·{" "}
                <FooterTime />
              </p>
            </div>
            <p
              className="text-xs"
              style={{
                color: "var(--muted-dim)",
                fontFamily: "var(--font-dm-mono), monospace",
              }}
            >
              © {year} {PROFILE.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
