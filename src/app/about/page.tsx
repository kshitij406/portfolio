import ScrambleText from "@/components/ScrambleText";
import ConfessionsDrawer from "@/components/ConfessionsDrawer";
import SectionObserver from "@/components/SectionObserver";
import ScrollProgress from "@/components/ScrollProgress";
import StarRating from "@/components/StarRating";
import SiteFooter from "@/components/SiteFooter";
import { PROFILE, SOCIAL_LINKS } from "@/data/site";

const ANNOTATIONS = [
  {
    label: "actually true",
    body: "The semicolon was on line 247. In the config file. Not the source.",
    cls: "annotation-1",
  },
  {
    label: "for the record",
    body: "SAP HANA documentation reads like legal contracts written by someone who has never used a database.",
    cls: "annotation-2",
  },
  {
    label: "currently",
    body: "Designing products by day, overthinking movie rankings by night.",
    cls: "annotation-3",
  },
  {
    label: "workflow",
    body: "VSCode + Claude. That is the whole setup. It works.",
    cls: "annotation-4",
  },
];

const FAVORITES = [
  { label: "APIs", gradient: "linear-gradient(135deg, #1e3a5f, #0f2035)" },
  { label: "Systems", gradient: "linear-gradient(135deg, #1a3320, #0f2016)" },
  { label: "Films", gradient: "linear-gradient(135deg, #2a1a3d, #1a0f2a)" },
  { label: "CLI", gradient: "linear-gradient(135deg, #1f2f3d, #121c26)" },
];

const STATS = [
  ["studying", "CS, systems track"],
  ["year", "2 of 3"],
  ["based", PROFILE.location],
  ["focus", "backend / web"],
  ["letterboxd", "/Kxitiz_"],
  ["editor", "VSCode + Claude"],
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ color: "var(--text)" }}>
      <ScrollProgress />

      <div className="px-6 md:px-12 lg:px-20 pt-32 pb-24">
        <div className="content-shell">
        {/* Header */}
        <SectionObserver>
          <div className="mb-4">
            <span
              className="text-xs"
              style={{
                color: "var(--muted-dim)",
                fontFamily: "var(--font-dm-mono), monospace",
                letterSpacing: "0.1em",
              }}
            >
              01 / about
            </span>
          </div>
          <div className="mb-10">
            <ScrambleText
              text="A quick read on me."
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
              as="h1"
            />
          </div>
        </SectionObserver>

        {/* Profile header card */}
        <SectionObserver delay={60}>
          <div
            className="editorial-card p-5 md:p-6 mb-12 flex flex-wrap gap-6 items-center"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "var(--accent-dim)", border: "2px solid var(--accent)" }}
            >
              <span
                className="font-bold text-lg"
                style={{ color: "var(--accent)", fontFamily: "var(--font-syne), sans-serif" }}
              >
                KJ
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div
                className="font-bold text-base mb-0.5"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {PROFILE.name}
              </div>
              <div
                className="text-sm mb-2"
                style={{ color: "var(--muted)", fontFamily: "var(--font-dm-mono), monospace" }}
              >
                {SOCIAL_LINKS.letterboxd.handle} · {PROFILE.location}
              </div>
              <div className="flex gap-5 text-xs" style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
                {[["2", "roles"], ["5", "projects"], ["11", "skills"]].map(([n, l]) => (
                  <div key={l}>
                    <span className="font-bold mr-1" style={{ color: "var(--text)" }}>{n}</span>
                    <span style={{ color: "var(--muted)" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div
                className="text-xs mb-1"
                style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
              >
                self rating
              </div>
              <StarRating rating={3.5} size="md" showLabel />
            </div>
          </div>
        </SectionObserver>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 xl:gap-20">
          {/* Left: main content */}
          <div>
            <SectionObserver>
              <div className="space-y-5 text-base leading-relaxed mb-12" style={{ color: "var(--text)" }}>
                <p>
                  I am a second-year CS student in Mauritius focused on systems and backend engineering.
                  I enjoy building the parts users do not always see: APIs, data flow, performance, and failure handling.
                </p>
                <p>
                  I have worked with <span style={{ color: "var(--accent)" }}>SAP HANA</span> and
                  <span style={{ color: "var(--accent)" }}> .NET</span> on production work,
                  and with Next.js + TypeScript on client projects where design and delivery both matter.
                </p>
                <p>
                  AI tooling is part of my workflow. It helps with velocity, but never replaces understanding.
                  I still own the architecture decisions, the debugging, and the final quality bar.
                </p>
                <p>
                  Outside code, I watch and log films on{" "}
                  <a
                    href={SOCIAL_LINKS.letterboxd.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)" }}
                  >
                    Letterboxd
                  </a>
                  . It keeps my taste honest and my UI references sharp.
                </p>
                <p style={{ color: "var(--muted)" }}>
                  Current status: finishing Year 2, shipping freelance work, and steadily raising the quality floor.
                </p>
              </div>
            </SectionObserver>

            {/* Stats card */}
            <SectionObserver delay={100}>
              <div className="editorial-card p-6 mb-6">
                <h3
                  className="text-xs mb-5 uppercase tracking-widest"
                  style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
                >
                  profile card
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {STATS.map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                      <dt
                        style={{
                          color: "var(--muted)",
                          fontFamily: "var(--font-dm-mono), monospace",
                          minWidth: "72px",
                          flexShrink: 0,
                        }}
                      >
                        {k}
                      </dt>
                      <dd style={{ color: "var(--text)" }}>
                        {k === "letterboxd" ? (
                          <a
                            href={SOCIAL_LINKS.letterboxd.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--accent)" }}
                          >
                            {v}
                          </a>
                        ) : (
                          v
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </SectionObserver>

            {/* Confessions */}
            <SectionObserver delay={150}>
              <ConfessionsDrawer />
            </SectionObserver>
          </div>

          {/* Right: margin annotations */}
          <div className="hidden lg:flex flex-col gap-4 pt-1">
            {/* Favorites block */}
            <div
              className="editorial-card p-4 mb-1"
            >
              <div
                className="text-xs mb-3 uppercase tracking-wider"
                style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
              >
                favorites
              </div>
              <div className="grid grid-cols-4 gap-1.5 mb-2">
                {FAVORITES.map((item) => (
                  <div
                    key={item.label}
                    className="poster-shimmer rounded overflow-hidden"
                    title={item.label}
                    style={{ aspectRatio: "2/3", background: item.gradient }}
                  >
                    <div className="h-full flex items-end p-1">
                      <span
                        style={{
                          fontSize: "8px",
                          lineHeight: 1.2,
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "var(--font-dm-mono), monospace",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p
                className="text-sm"
                style={{ color: "var(--muted-dim)", fontFamily: "var(--font-caveat), cursive" }}
              >
                things I&apos;d watch again
              </p>
            </div>

            {/* Annotation cards */}
            {ANNOTATIONS.map((note) => (
              <div
                key={note.label}
                className={`p-4 rounded ${note.cls}`}
                style={{
                  background: "var(--surface)",
                  borderLeft: "2px solid var(--accent)",
                  borderTop: "1px solid var(--border)",
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-xs mb-2 uppercase tracking-wider"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-dm-mono), monospace" }}
                >
                  {note.label}
                </div>
                <p
                  className="text-base leading-snug"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-caveat), cursive",
                    fontSize: "1.05rem",
                  }}
                >
                  {note.body}
                </p>
              </div>
            ))}

            {/* Opinions */}
            <div
              className="p-4 rounded annotation-2"
              style={{ background: "transparent", border: "1px dashed var(--border)" }}
            >
              <div
                className="text-xs mb-3 uppercase tracking-wider"
                style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
              >
                opinions I hold
              </div>
              <ul className="space-y-2">
                {[
                  "AI-assisted is still code you own",
                  "reading docs beats doom-scrolling tutorials",
                  "shipping beats polishing forever",
                  "good taste is a technical skill",
                ].map((opinion) => (
                  <li
                    key={opinion}
                    className="text-sm flex items-start gap-2"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-caveat), cursive",
                      fontSize: "1rem",
                    }}
                  >
                    <span style={{ color: "var(--muted-dim)" }}>·</span>
                    {opinion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
