import Terminal from "@/components/Terminal";
import Link from "next/link";

export const revalidate = 3600;

const NAV_CARDS = [
  {
    href: "/about",
    number: "01",
    label: "About",
    description: "CS student. Backend focus. Mauritius. Watches films.",
  },
  {
    href: "/work",
    number: "02",
    label: "Work",
    description: "APIs, client projects, real users.",
  },
  {
    href: "/contact",
    number: "03",
    label: "Contact",
    description: "Send something interesting.",
  },
];

async function getLetterboxdFilmCount(): Promise<number | null> {
  try {
    const res = await fetch("https://letterboxd.com/Kxitiz_/rss/", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const xml = await res.text();
    const year = new Date().getFullYear().toString();
    const matches = xml.match(
      new RegExp(`<letterboxd:watchedDate>${year}-`, "g")
    );
    return matches?.length ?? 0;
  } catch {
    return null;
  }
}

export default async function Home() {
  const filmCount = await getLetterboxdFilmCount();

  const profileStats = [
    { count: "2", label: "roles" },
    { count: "5", label: "projects" },
    { count: "11", label: "skills" },
    ...(filmCount !== null
      ? [{ count: `${filmCount}`, label: "films this year", href: "https://letterboxd.com/Kxitiz_/" }]
      : [{ count: "/Kxitiz_", label: "letterboxd", href: "https://letterboxd.com/Kxitiz_/" }]),
  ];

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* ─── HERO ─── */}
      <section
        className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-16"
        style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}
      >
        <div className="mb-10">
          <Terminal />
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          <span style={{ color: "var(--text)" }}>I write software,</span>
          <br />
          <span style={{ color: "var(--accent)" }}>allegedly.</span>
        </h1>

        <p
          className="text-lg md:text-xl max-w-xl leading-relaxed mb-8"
          style={{ color: "var(--muted)" }}
        >
          CS student in Mauritius. I build web applications and APIs, mostly
          with Next.js and Node.js. AI agents are part of the workflow now.
          This site was one of them.
        </p>

        {/* Profile stats bar */}
        <div
          className="flex flex-wrap gap-8 py-4 mb-8"
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {profileStats.map((stat) =>
            "href" in stat && stat.href ? (
              <a
                key={stat.label}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-start gap-0.5 transition-opacity hover:opacity-100 opacity-80"
              >
                <span
                  className="text-base font-bold"
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    color: "var(--rating)",
                  }}
                >
                  ★ {stat.count}
                </span>
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{
                    color: "var(--muted-dim)",
                    fontFamily: "var(--font-dm-mono), monospace",
                  }}
                >
                  {stat.label}
                </span>
              </a>
            ) : (
              <div key={stat.label} className="flex flex-col items-start gap-0.5">
                <span
                  className="text-base font-bold"
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    color: "var(--text)",
                  }}
                >
                  {stat.count}
                </span>
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{
                    color: "var(--muted-dim)",
                    fontFamily: "var(--font-dm-mono), monospace",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            )
          )}
        </div>

        {/* Navigation cards */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {NAV_CARDS.map((card) => (
            <Link key={card.href} href={card.href} className="block group">
              <div
                className="flex items-center gap-6 md:gap-10 py-5 md:py-6 px-3 -mx-3 transition-all duration-200 rounded group-hover:bg-[var(--surface)]"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span
                  className="shrink-0 text-xs tabular-nums"
                  style={{
                    color: "var(--muted-dim)",
                    fontFamily: "var(--font-dm-mono), monospace",
                    minWidth: "28px",
                  }}
                >
                  {card.number}
                </span>

                <span
                  className="flex-1 text-3xl md:text-4xl font-bold transition-colors duration-200 group-hover:text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {card.label}
                </span>

                <span
                  className="hidden md:block text-sm text-right max-w-[220px] leading-snug transition-colors duration-200 group-hover:text-[var(--text)]"
                  style={{ color: "var(--muted)" }}
                >
                  {card.description}
                </span>

                <span
                  className="ml-2 text-xl transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                  style={{ color: "var(--border)" }}
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="px-6 md:px-12 py-8 flex flex-wrap justify-between gap-4 items-center"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p
          className="text-xs"
          style={{
            color: "var(--muted-dim)",
            fontFamily: "var(--font-dm-mono), monospace",
          }}
        >
          kshitij jha · mauritius
        </p>
        <div
          className="flex gap-5 text-xs"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          <a
            href="https://github.com/kxitiz"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity opacity-50 hover:opacity-100"
            style={{ color: "var(--muted)" }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/kshitijjha"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity opacity-50 hover:opacity-100"
            style={{ color: "var(--muted)" }}
          >
            LinkedIn
          </a>
          <a
            href="https://letterboxd.com/Kxitiz_/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity opacity-50 hover:opacity-100"
            style={{ color: "var(--rating)" }}
          >
            ★ Letterboxd
          </a>
        </div>
      </footer>
    </main>
  );
}
