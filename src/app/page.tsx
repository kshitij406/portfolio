import Terminal from "@/components/Terminal";
import SiteFooter from "@/components/SiteFooter";
import HeroSpotlight from "@/components/ui/HeroSpotlight";
import StatsRow from "@/components/ui/StatsRow";
import StarRating from "@/components/StarRating";
import SectionObserver from "@/components/SectionObserver";
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

interface LetterboxdData {
  filmCount: number;
  latestFilm: string | null;
  latestFilmYear: string | null;
  latestFilmRating: number | null;
}

async function fetchLatestFilm() {
  try {
    const res = await fetch("https://letterboxd.com/Kxitiz_/rss/", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { latestFilm: null, latestFilmYear: null, latestFilmRating: null };
    const xml = await res.text();
    return {
      latestFilm: xml.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/)?.[1] ?? null,
      latestFilmYear: xml.match(/<letterboxd:filmYear>(.*?)<\/letterboxd:filmYear>/)?.[1] ?? null,
      latestFilmRating:
        parseFloat(xml.match(/<letterboxd:memberRating>(.*?)<\/letterboxd:memberRating>/)?.[1] ?? "") || null,
    };
  } catch {
    return { latestFilm: null, latestFilmYear: null, latestFilmRating: null };
  }
}

async function fetchFilmCount(year: string): Promise<number> {
  let total = 0;
  for (let page = 1; page <= 20; page++) {
    try {
      const url =
        page === 1
          ? `https://letterboxd.com/Kxitiz_/films/diary/for/${year}/`
          : `https://letterboxd.com/Kxitiz_/films/diary/for/${year}/page/${page}/`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) break;
      const html = await res.text();
      const entries = (html.match(/diary-entry-row/g) ?? []).length;
      if (entries === 0) break;
      total += entries;
      if (!html.includes(`/diary/for/${year}/page/${page + 1}/`)) break;
    } catch {
      break;
    }
  }
  return total;
}

async function getLetterboxdData(): Promise<LetterboxdData> {
  const year = new Date().getFullYear().toString();
  const [film, filmCount] = await Promise.all([fetchLatestFilm(), fetchFilmCount(year)]);
  return { filmCount, ...film };
}

export default async function Home() {
  const { filmCount, latestFilm, latestFilmYear, latestFilmRating } = await getLetterboxdData();

  const profileStats = [
    { count: "2", label: "roles shipped" },
    { count: "5", label: "projects delivered" },
    { count: "11", label: "skills in use" },
    ...(filmCount > 0
      ? [{ count: `${filmCount}`, label: "films this year", href: "https://letterboxd.com/Kxitiz_/" }]
      : [{ count: "/Kxitiz_", label: "letterboxd", href: "https://letterboxd.com/Kxitiz_/" }]),
  ];

  return (
    <main className="min-h-screen flex flex-col" style={{ color: "var(--text)" }}>
      <section className="flex-1 px-6 md:px-12 lg:px-20 pt-32 pb-16 relative">
        <HeroSpotlight />
        <div className="content-shell relative z-10">
          <div className="mb-10">
            <Terminal watchingLine={latestFilm ?? undefined} />
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8 xl:gap-12 items-start mb-12">
            <div>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.03] mb-6"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                <span>I build web products</span>
                <br />
                <span className="text-gradient-accent">that feel intentional.</span>
              </h1>

              <p className="text-lg md:text-xl max-w-xl leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                {PROFILE.role}. I focus on backend systems, clean APIs, and frontend work that does not look like a rushed template.
                I care about shipping solid products and leaving codebases easier to extend.
              </p>

              <div className="flex flex-wrap gap-3">
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

            {/* Film card */}
            <aside
              className="editorial-card shimmer-card p-5"
              style={{ borderLeft: "2px solid var(--rating)" }}
            >
              {/* Now screening indicator */}
              <div className="flex items-center gap-2 mb-4">
                <span className="screening-dot" />
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
                >
                  now screening
                </span>
              </div>

              {/* Film details */}
              {latestFilm ? (
                <div className="mb-3">
                  <p
                    className="font-bold text-base leading-snug mb-1.5"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {latestFilm}
                  </p>
                  <div
                    className="flex items-center gap-3 text-xs"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    {latestFilmYear && (
                      <span style={{ color: "var(--muted-dim)" }}>{latestFilmYear}</span>
                    )}
                    {latestFilmRating && (
                      <StarRating rating={latestFilmRating} size="sm" showLabel />
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
                  Loading latest log from RSS&hellip;
                </p>
              )}

              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: "var(--muted-dim)", fontStyle: "italic" }}
              >
                Movies influence the design decisions here.
              </p>

              <div className="editorial-divider mb-4" />

              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <a href={SOCIAL_LINKS.github.href} target="_blank" rel="noopener noreferrer" className="btn btn-social justify-center">
                    GitHub
                  </a>
                  <a href={SOCIAL_LINKS.linkedin.href} target="_blank" rel="noopener noreferrer" className="btn btn-social justify-center">
                    LinkedIn
                  </a>
                </div>
                <a
                  href={SOCIAL_LINKS.letterboxd.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-social justify-center"
                  style={{ color: "var(--rating)" }}
                >
                  ★ Letterboxd {SOCIAL_LINKS.letterboxd.handle}
                </a>
              </div>
            </aside>
          </div>

          {/* Stats row */}
          <div className="editorial-card shimmer-card p-5 mb-8">
            <StatsRow stats={profileStats} />
          </div>

          {/* Nav cards */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {NAV_CARDS.map((card, i) => (
              <SectionObserver key={card.href} delay={i * 70}>
                <Link href={card.href} className="block group nav-card-link">
                  <div
                    className="flex items-center gap-6 md:gap-10 py-7 px-3 -mx-3 transition-all duration-200 rounded group-hover:bg-[var(--surface)]"
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
                      className="flex-1 text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-200 group-hover:text-[var(--accent)]"
                      style={{ fontFamily: "var(--font-syne), sans-serif" }}
                    >
                      {card.label}
                    </span>
                    <span
                      className="hidden md:block text-sm text-right max-w-[260px] leading-snug"
                      style={{ color: "var(--muted)" }}
                    >
                      {card.description}
                    </span>
                    <span
                      className="ml-2 text-xl transition-all duration-250 group-hover:translate-x-2 group-hover:text-[var(--accent)]"
                      style={{ color: "var(--border)" }}
                    >
                      →
                    </span>
                  </div>
                </Link>
              </SectionObserver>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
