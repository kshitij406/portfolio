import ScrambleText from "@/components/ScrambleText";
import ConfessionsDrawer from "@/components/ConfessionsDrawer";
import SectionObserver from "@/components/SectionObserver";
import ScrollProgress from "@/components/ScrollProgress";
import StarRating from "@/components/StarRating";

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
    body: "Something on Letterboxd. Always something on Letterboxd.",
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
  ["based", "Mauritius"],
  ["focus", "backend / web"],
  ["letterboxd", "/Kxitiz_"],
  ["editor", "VSCode + Claude"],
] as const;

export default function AboutPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <ScrollProgress />

      <div
        className="px-6 md:px-12 lg:px-20 pt-32 pb-24"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
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
              text="Who I am."
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
              as="h1"
            />
          </div>
        </SectionObserver>

        {/* Profile header card */}
        <SectionObserver delay={60}>
          <div
            className="p-5 rounded border mb-12 flex flex-wrap gap-6 items-center"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
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
                Kshitij Jha
              </div>
              <div
                className="text-sm mb-2"
                style={{ color: "var(--muted)", fontFamily: "var(--font-dm-mono), monospace" }}
              >
                @Kxitiz_ · Mauritius
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
                  Second-year CS student in Mauritius on a systems engineering track.
                  I have built APIs, wired up SAP integrations, and spent three hours
                  debugging something that turned out to be a missing semicolon. The
                  semicolon was in the config file.
                </p>
                <p>
                  My focus is backend and web: databases, APIs, the parts users never
                  see until something breaks. I have worked with{" "}
                  <span style={{ color: "var(--accent)" }}>SAP HANA</span> and{" "}
                  <span style={{ color: "var(--accent)" }}>.NET</span> in actual
                  production, and I have read enough SAP documentation to know it was
                  written by people who do not use SAP.
                </p>
                <p>
                  These days AI agents are a genuine part of how I work. Claude mostly.
                  This site was built with it. That is not a disclaimer, it is just
                  accurate. The code still has to be understood, reviewed, and debugged
                  by an actual person. That part is still me.
                </p>
                <p>
                  Outside code: I watch a lot of films and log everything on{" "}
                  <a
                    href="https://letterboxd.com/Kxitiz_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)" }}
                  >
                    Letterboxd
                  </a>
                  . I have opinions about cinema, and I think most portfolio sites are
                  boring in a very specific, template-shaped way. So I made this one.
                </p>
                <p style={{ color: "var(--muted)" }}>
                  Currently finishing Year 2 in Mauritius. The plan for what comes
                  after exists. Taking it one semester at a time.
                </p>
              </div>
            </SectionObserver>

            {/* Stats card */}
            <SectionObserver delay={100}>
              <div
                className="p-6 rounded border mb-6"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <h3
                  className="text-xs mb-5 uppercase tracking-widest"
                  style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
                >
                  profile
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
                            href="https://letterboxd.com/Kxitiz_/"
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
              className="p-4 rounded mb-1"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
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
                  "reading docs beats watching tutorials",
                  "a working app beats perfect code",
                  "prompts are the new config files",
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

      {/* Footer */}
      <footer
        className="px-6 md:px-12 py-8 flex flex-wrap justify-between gap-4 items-center"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p
          className="text-xs"
          style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
        >
          kshitij jha · mauritius
        </p>
        <div className="flex gap-5 text-xs" style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
          <a href="https://github.com/kxitiz" target="_blank" rel="noopener noreferrer"
            className="transition-opacity opacity-50 hover:opacity-100" style={{ color: "var(--muted)" }}>
            GitHub
          </a>
          <a href="https://linkedin.com/in/kshitijjha" target="_blank" rel="noopener noreferrer"
            className="transition-opacity opacity-50 hover:opacity-100" style={{ color: "var(--muted)" }}>
            LinkedIn
          </a>
          <a href="https://letterboxd.com/Kxitiz_/" target="_blank" rel="noopener noreferrer"
            className="transition-opacity opacity-50 hover:opacity-100" style={{ color: "var(--rating)" }}>
            ★ Letterboxd
          </a>
        </div>
      </footer>
    </main>
  );
}
