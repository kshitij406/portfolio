import ScrambleText from "@/components/ScrambleText";
import ConfessionsDrawer from "@/components/ConfessionsDrawer";
import SectionObserver from "@/components/SectionObserver";
import ScrollProgress from "@/components/ScrollProgress";

const ANNOTATIONS = [
  {
    label: "✓ actually true",
    body: "The semicolon was on line 247. In the config file. Not the source.",
    cls: "annotation-1",
  },
  {
    label: "for the record",
    body: "SAP HANA documentation is fine if you enjoy reading legal contracts about databases.",
    cls: "annotation-2",
  },
  {
    label: "currently",
    body: "Something on Letterboxd. Always something on Letterboxd.",
    cls: "annotation-3",
  },
  {
    label: "editor of choice",
    body: "VSCode. I've tried the others. I'm not switching.",
    cls: "annotation-4",
  },
];

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
                color: "var(--muted)",
                fontFamily: "var(--font-dm-mono), monospace",
                letterSpacing: "0.1em",
              }}
            >
              01 / about
            </span>
          </div>
          <div className="mb-16">
            <ScrambleText
              text="Who I am."
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
              as="h1"
            />
          </div>
        </SectionObserver>

        {/* Main two-column layout */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 xl:gap-20">
          {/* Left: main content */}
          <div>
            <SectionObserver>
              <div className="space-y-5 text-base leading-relaxed mb-12" style={{ color: "var(--text)" }}>
                <p>
                  I&apos;m a second-year CS student in Mauritius on a systems
                  engineering track. I&apos;ve built APIs, wired up SAP systems,
                  and once spent three hours debugging something that turned out
                  to be a missing semicolon.
                </p>
                <p>
                  I&apos;m drawn to backend work — the part that nobody sees
                  unless something breaks. I like knowing how the plumbing works.
                  I&apos;ve done real work with{" "}
                  <span style={{ color: "var(--accent)" }}>SAP HANA</span> and{" "}
                  <span style={{ color: "var(--accent)" }}>.NET</span>, built
                  things that shipped to actual users, and survived the SAP
                  documentation.
                </p>
                <p>
                  Outside of code: I watch a lot of films and log everything on{" "}
                  <a
                    href="https://letterboxd.com/Kxitiz_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)" }}
                  >
                    Letterboxd
                  </a>
                  . I have opinions about cinema, and I think most portfolio
                  sites are insufferably boring. So I made this one.
                </p>
                <p style={{ color: "var(--muted)" }}>
                  Currently: finishing Year 2. Next: moving to the UK for Year 3.
                  After that: we&apos;ll see.
                </p>
              </div>
            </SectionObserver>

            {/* Stats card */}
            <SectionObserver delay={100}>
              <div
                className="p-6 rounded border mb-6"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <h3
                  className="text-xs mb-5 uppercase tracking-widest"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-dm-mono), monospace",
                  }}
                >
                  quick stats
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {[
                    ["studying", "CS, systems track"],
                    ["year", "2 of 3 (then UK)"],
                    ["based", "Mauritius"],
                    ["focus", "backend / systems"],
                    ["letterboxd", "/Kxitiz_"],
                    ["editor", "VSCode (don't @ me)"],
                  ].map(([k, v]) => (
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
                      <dd style={{ color: "var(--text)" }}>{v}</dd>
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
          <div className="hidden lg:flex flex-col gap-5 pt-1">
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
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-dm-mono), monospace",
                  }}
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

            {/* A small "things I believe" section */}
            <div
              className="p-4 rounded annotation-2 mt-2"
              style={{
                background: "transparent",
                border: "1px dashed var(--border)",
              }}
            >
              <div
                className="text-xs mb-3 uppercase tracking-wider"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
              >
                opinions I hold
              </div>
              <ul className="space-y-2">
                {[
                  "tabs over spaces (sorry)",
                  "backends are more interesting",
                  "docs should be honest",
                  "ship first, refactor later",
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
                    <span style={{ color: "var(--border)" }}>—</span>
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
        className="px-6 md:px-12 py-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p
          className="text-xs"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-dm-mono), monospace",
          }}
        >
          kshitij jha · mauritius · cs student
        </p>
      </footer>
    </main>
  );
}
