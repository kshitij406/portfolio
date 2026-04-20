import Terminal from "@/components/Terminal";
import SiteFooter from "@/components/SiteFooter";
import { PROFILE, SOCIAL_LINKS } from "@/data/site";
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

async function getLatestLetterboxdFilm(): Promise<string | null> {
  try {
    const res = await fetch("https://letterboxd.com/Kxitiz_/rss/", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const xml = await res.text();
    const match = xml.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const filmCount = await getLetterboxdFilmCount();
  const latestFilm = await getLatestLetterboxdFilm();

  const profileStats = [
    { count: "2", label: "roles shipped" },
    { count: "5", label: "projects delivered" },
    { count: "11", label: "skills in use" },
    ...(filmCount !== null
      ? [{ count: `${filmCount}`, label: "films this year", href: "https://letterboxd.com/Kxitiz_/" }]
      : [{ count: "/Kxitiz_", label: "letterboxd", href: "https://letterboxd.com/Kxitiz_/" }]),
  ];

  return (
    <main className="min-h-screen flex flex-col" style={{ color: "var(--text)" }}>
      <section
        className="flex-1 px-6 md:px-12 lg:px-20 pt-32 pb-16"
      >
        <div className="content-shell">
          <div className="mb-8">
            <Terminal />
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-12">
            <div>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.03] mb-5"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                <span>I build web products</span>
                <br />
                <span style={{ color: "var(--accent)" }}>that feel intentional.</span>
              </h1>

              <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--muted)" }}>
                {PROFILE.role}. I focus on backend systems, clean APIs, and frontend work that does not look like a rushed template.
                I care about shipping solid products and leaving codebases easier to extend.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SOCIAL_LINKS.github.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Follow on GitHub
                </a>
                <a href={SOCIAL_LINKS.linkedin.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Connect on LinkedIn
                </a>
                <Link href="/work" className="btn btn-secondary">
                  View Selected Work
                </Link>
              </div>
            </div>

            <aside className="editorial-card p-5 md:p-6">
              <div className="chip mb-3">currently rolling</div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {latestFilm ? `Latest Letterboxd log: ${latestFilm}.` : "Latest Letterboxd log loading from RSS."} Yes, movies influence the design decisions here.
              </p>
              <div className="editorial-divider my-4" />
              <div className="social-grid">
                <a href={SOCIAL_LINKS.github.href} target="_blank" rel="noopener noreferrer" className="btn btn-social">
                  GitHub {SOCIAL_LINKS.github.handle}
                </a>
                <a href={SOCIAL_LINKS.linkedin.href} target="_blank" rel="noopener noreferrer" className="btn btn-social">
                  LinkedIn Profile
                </a>
                <a href={SOCIAL_LINKS.letterboxd.href} target="_blank" rel="noopener noreferrer" className="btn btn-social" style={{ color: "var(--rating)" }}>
                  ★ Letterboxd
                </a>
              </div>
            </aside>
          </div>

          <div className="editorial-card p-5 mb-8">
            <div className="flex flex-wrap gap-8">
              {profileStats.map((stat) =>
                "href" in stat && stat.href ? (
                  <a key={stat.label} href={stat.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-start gap-0.5">
                    <span className="text-base font-bold" style={{ fontFamily: "var(--font-syne), sans-serif", color: "var(--rating)" }}>
                      ★ {stat.count}
                    </span>
                    <span className="text-xs uppercase tracking-wider" style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}>
                      {stat.label}
                    </span>
                  </a>
                ) : (
                  <div key={stat.label} className="flex flex-col items-start gap-0.5">
                    <span className="text-base font-bold" style={{ fontFamily: "var(--font-syne), sans-serif", color: "var(--text)" }}>
                      {stat.count}
                    </span>
                    <span className="text-xs uppercase tracking-wider" style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}>
                      {stat.label}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)" }}>
            {NAV_CARDS.map((card) => (
              <Link key={card.href} href={card.href} className="block group">
                <div className="flex items-center gap-6 md:gap-10 py-6 px-3 -mx-3 transition-all duration-200 rounded group-hover:bg-[var(--surface)]" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="shrink-0 text-xs tabular-nums" style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace", minWidth: "28px" }}>
                    {card.number}
                  </span>
                  <span className="flex-1 text-3xl md:text-4xl font-bold transition-colors duration-200 group-hover:text-[var(--accent)]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                    {card.label}
                  </span>
                  <span className="hidden md:block text-sm text-right max-w-[260px] leading-snug" style={{ color: "var(--muted)" }}>
                    {card.description}
                  </span>
                  <span className="ml-2 text-xl transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent)]" style={{ color: "var(--border)" }}>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
