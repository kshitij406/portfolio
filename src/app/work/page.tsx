import ScrambleText from "@/components/ScrambleText";
import SkillBenchmark from "@/components/SkillBenchmark";
import SectionObserver from "@/components/SectionObserver";
import ScrollProgress from "@/components/ScrollProgress";
import { EXPERIENCE, PROJECTS } from "@/data/content";

export default function WorkPage() {
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
              02 / work
            </span>
          </div>
          <div className="mb-16">
            <ScrambleText
              text="What I've built."
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
              as="h1"
            />
          </div>
        </SectionObserver>

        {/* ─── EXPERIENCE ─── */}
        <section className="mb-24">
          <SectionObserver>
            <div className="flex items-baseline gap-4 mb-10">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Experience
              </h2>
              <span
                className="text-xs"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
              >
                the highlights — no buzzwords, I promise
              </span>
            </div>
          </SectionObserver>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute top-3 bottom-3 left-[72px] md:left-[88px] w-px hidden sm:block"
              style={{ background: "var(--border)" }}
            />

            <div className="space-y-0">
              {EXPERIENCE.map((exp, i) => (
                <SectionObserver key={exp.company} delay={i * 100}>
                  <div className="relative flex gap-6 md:gap-10 pb-10 last:pb-0">
                    {/* Year + dot */}
                    <div className="hidden sm:flex flex-col items-center shrink-0 w-[88px]">
                      <span
                        className="text-xs tabular-nums mb-3 pt-1"
                        style={{
                          color: "var(--muted)",
                          fontFamily: "var(--font-dm-mono), monospace",
                        }}
                      >
                        {exp.period}
                      </span>
                      <div
                        className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 ${i === 0 ? "timeline-dot-active" : ""}`}
                        style={{
                          borderColor: i === 0 ? "var(--accent)" : "var(--border)",
                          background: i === 0 ? "var(--accent)" : "var(--bg)",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 p-5 md:p-6 rounded border transition-colors duration-200 hover:border-[var(--accent)]"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--surface)",
                      }}
                    >
                      {/* Mobile year */}
                      <span
                        className="block sm:hidden text-xs mb-2"
                        style={{
                          color: "var(--muted)",
                          fontFamily: "var(--font-dm-mono), monospace",
                        }}
                      >
                        {exp.period}
                      </span>

                      <div className="flex flex-wrap justify-between gap-2 mb-3">
                        <div>
                          <h3
                            className="text-lg font-semibold"
                            style={{ fontFamily: "var(--font-syne), sans-serif" }}
                          >
                            {exp.role}
                          </h3>
                          <div
                            className="text-sm mt-0.5"
                            style={{
                              color: "var(--accent)",
                              fontFamily: "var(--font-dm-mono), monospace",
                            }}
                          >
                            {exp.company} · {exp.location}
                          </div>
                        </div>
                      </div>

                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "var(--text)" }}
                      >
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              background: "rgba(232,255,71,0.06)",
                              color: "var(--accent)",
                              fontFamily: "var(--font-dm-mono), monospace",
                              border: "1px solid rgba(232,255,71,0.15)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionObserver>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section
          className="mb-24 pt-12"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <SectionObserver>
            <div className="flex items-baseline gap-4 mb-10">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Projects
              </h2>
              <span
                className="text-xs"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
              >
                things I built because I wanted to
              </span>
            </div>
          </SectionObserver>

          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <SectionObserver key={project.name} delay={i * 70}>
                <ProjectCard project={project} featured={i === 0} />
              </SectionObserver>
            ))}
          </div>
        </section>

        {/* ─── SKILLS ─── */}
        <section
          className="pt-12"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <SectionObserver>
            <div className="flex items-baseline gap-4 mb-10">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Skills
              </h2>
              <span
                className="text-xs"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
              >
                click one. I dare you.
              </span>
            </div>
            <SkillBenchmark />
          </SectionObserver>
        </section>
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
          kshitij jha · built real things · still learning
        </p>
      </footer>
    </main>
  );
}

function ProjectCard({
  project,
  featured,
}: {
  project: (typeof PROJECTS)[number];
  featured?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded border flex flex-col transition-all duration-200 hover:border-[var(--accent)] ${featured ? "md:col-span-2" : ""}`}
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3
          className={`font-semibold ${featured ? "text-xl" : "text-lg"}`}
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          {project.name}
        </h3>
        <span
          className="text-xs px-2 py-1 rounded ml-3 shrink-0"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-dm-mono), monospace",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
          }}
        >
          {project.note}
        </span>
      </div>
      <p
        className="text-sm leading-relaxed flex-1 mb-4"
        style={{ color: "var(--text)" }}
      >
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded"
            style={{
              background: "rgba(232,255,71,0.06)",
              color: "var(--accent)",
              fontFamily: "var(--font-dm-mono), monospace",
              border: "1px solid rgba(232,255,71,0.15)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
