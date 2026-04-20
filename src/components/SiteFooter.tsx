import { PROFILE, SOCIAL_LINKS } from "@/data/site";
import FooterTime from "@/components/ui/FooterTime";

const MARQUEE_TEXT =
  "available for projects · mauritius +04:00 · open to interesting work · cs student · backend engineer · ";

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

      {/* Footer content */}
      <div className="px-6 md:px-12 py-6">
        <div className="content-shell flex flex-wrap justify-between gap-4 items-center">
          {/* Status indicator */}
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

          <div
            className="flex flex-wrap gap-3 text-xs"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            <a
              href={SOCIAL_LINKS.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-social"
              style={{ minHeight: "34px", padding: "0 10px", fontSize: "11px" }}
            >
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-social"
              style={{ minHeight: "34px", padding: "0 10px", fontSize: "11px" }}
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.letterboxd.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-social"
              style={{
                minHeight: "34px",
                padding: "0 10px",
                fontSize: "11px",
                color: "var(--rating)",
              }}
            >
              ★ Letterboxd
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
