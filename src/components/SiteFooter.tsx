import { PROFILE, SOCIAL_LINKS } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer
      className="px-6 md:px-12 py-8"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="content-shell flex flex-wrap justify-between gap-4 items-center">
        <p
          className="text-xs uppercase tracking-[0.12em]"
          style={{
            color: "var(--muted-dim)",
            fontFamily: "var(--font-dm-mono), monospace",
          }}
        >
          {PROFILE.name.toLowerCase()} · {PROFILE.location.toLowerCase()}
        </p>

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
    </footer>
  );
}
