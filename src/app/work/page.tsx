import ScrambleText from "@/components/ScrambleText";
import SkillBenchmark from "@/components/SkillBenchmark";
import SectionObserver from "@/components/SectionObserver";
import ScrollProgress from "@/components/ScrollProgress";
import StarRating from "@/components/StarRating";
import { EXPERIENCE, PROJECTS, SKILLS_RATED } from "@/data/content";

const mono = { fontFamily: "var(--font-dm-mono), monospace" } as const;
const syne = { fontFamily: "var(--font-syne), sans-serif" } as const;

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
            <span className="text-xs" style={{ ...mono, color: "var(--muted-dim)", letterSpacing: "0.1em" }}>
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
              <h2 className="text-2xl font-bold" style={syne}>Experience</h2>
              <span className="text-xs" style={{ ...mono, color: "var(--muted)" }}>
                the highlights — no buzzwords, I promise
              </span>
            </div>
          </SectionObserver>

          {/* Timeline */}
          <div className="relative">
            <div
              className="absolute top-3 bottom-3 left-[72px] md:left-[88px] w-px hidden sm:block"
              style={{ background: "var(--border-dim)" }}
            />
            <div className="space-y-0">
              {EXPERIENCE.map((exp, i) => (
                <SectionObserver key={exp.company} delay={i * 100}>
                  <div className="relative flex gap-6 md:gap-10 pb-10 last:pb-0">
                    {/* Year + dot */}
                    <div className="hidden sm:flex flex-col items-center shrink-0 w-[88px]">
                      <span className="text-xs tabular-nums mb-3 pt-1" style={{ ...mono, color: "var(--muted-dim)" }}>
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

                    {/* Card */}
                    <div
                      className="flex-1 p-5 md:p-6 rounded border transition-colors duration-200"
                      style={{
                        borderColor: i === 0 ? "var(--accent)" : "var(--border)",
                        background: "var(--surface)",
                      }}
                    >
                      {/* Diary header */}
                      <div className="flex justify-between mb-3">
                        <span style={{ ...mono, color: "var(--muted-dim)", fontSize: "10px", letterSpacing: "0.15em" }}>
                          DIARY ENTRY
                        </span>
                        <span className="sm:hidden" style={{ ...mono, color: "var(--muted-dim)", fontSize: "10px" }}>
                          {exp.period}
                        </span>
                      </div>

                      <div className="flex flex-wrap justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-semibold" style={syne}>{exp.role}</h3>
                          <div className="text-sm mt-0.5" style={{ ...mono, color: "var(--accent)" }}>
                            {exp.company} · {exp.location}
                          </div>
                        </div>
                      </div>

                      <StarRating rating={exp.rating} size="sm" showLabel className="mb-2" />

                      <p className="text-sm italic mb-3" style={{ color: "var(--muted)" }}>
                        &ldquo;{exp.diaryNote}&rdquo;
                      </p>

                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text)" }}>
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              background: "var(--accent-dim)",
                              color: "var(--accent)",
                              border: "1px solid rgba(0,224,84,0.2)",
                              ...mono,
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
              <h2 className="text-2xl font-bold" style={syne}>Projects</h2>
              <span className="text-xs" style={{ ...mono, color: "var(--muted)" }}>
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
              <h2 className="text-2xl font-bold" style={syne}>Skills</h2>
              <span className="text-xs" style={{ ...mono, color: "var(--muted)" }}>
                self-assessed. take with salt.
              </span>
            </div>

            {/* Rated list */}
            <div className="mb-8" style={{ borderTop: "1px solid var(--border)" }}>
              {SKILLS_RATED.map((item, i) => (
                <div
                  key={item.skill}
                  className="flex items-center gap-4 py-3"
                  style={{ borderBottom: "1px solid var(--border-dim)" }}
                >
                  <span
                    className="w-6 text-xs text-right shrink-0 tabular-nums"
                    style={{ ...mono, color: "var(--muted-dim)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-medium" style={mono}>
                    {item.skill}
                  </span>
                  <StarRating rating={item.rating} size="sm" />
                  <span
                    className="hidden md:block text-xs italic text-right"
                    style={{ color: "var(--muted)", maxWidth: "260px", flex: "0 0 260px" }}
                  >
                    {item.review}
                  </span>
                </div>
              ))}
            </div>

            {/* Benchmark (bonus) */}
            <div className="pt-6" style={{ borderTop: "1px solid var(--border-dim)" }}>
              <p className="text-xs mb-4" style={{ ...mono, color: "var(--muted-dim)" }}>
                {`// click a skill to run the benchmark`}
              </p>
              <SkillBenchmark />
            </div>
          </SectionObserver>
        </section>
      </div>

      {/* Footer */}
      <footer
        className="px-6 md:px-12 py-8 flex flex-wrap justify-between gap-4 items-center"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-xs" style={{ ...mono, color: "var(--muted-dim)" }}>
          kshitij jha · mauritius
        </p>
        <div className="flex gap-5 text-xs" style={mono}>
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

function ProjectCard({
  project,
  featured,
}: {
  project: (typeof PROJECTS)[number];
  featured?: boolean;
}) {
  if (featured) {
    return (
      <div
        className="md:col-span-2 flex flex-col md:flex-row rounded overflow-hidden border transition-colors duration-200 hover:border-[var(--accent)]"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        {/* Poster */}
        <div
          className="poster-shimmer shrink-0 md:w-48"
          style={{
            background: project.posterGradient,
            minHeight: "180px",
          }}
        >
          <div className="h-full flex flex-col justify-between p-3">
            <span
              className="self-end text-xs px-1.5 py-0.5 rounded"
              style={{
                background: "rgba(0,0,0,0.5)",
                color: "var(--muted-dim)",
                ...{ fontFamily: "var(--font-dm-mono), monospace" },
              }}
            >
              {project.note}
            </span>
            <span
              className="text-xs"
              style={{ color: project.posterAccent, fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {project.year}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 p-5 flex flex-col">
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
            {project.name}
          </h3>
          <StarRating rating={project.rating} size="md" showLabel className="mb-2" />
          <p className="text-sm italic mb-3" style={{ color: "var(--muted)" }}>
            &ldquo;{project.review}&rdquo;
          </p>
          <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--text)" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  background: "var(--accent-dim)",
                  color: "var(--accent)",
                  border: "1px solid rgba(0,224,84,0.2)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col rounded overflow-hidden border transition-colors duration-200 hover:border-[var(--accent)]"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      {/* Poster */}
      <div
        className="poster-shimmer relative w-full"
        style={{
          background: project.posterGradient,
          aspectRatio: "16/9",
          maxHeight: "180px",
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-2.5">
          <span
            className="self-end text-xs px-1.5 py-0.5 rounded"
            style={{
              background: "rgba(0,0,0,0.5)",
              color: "var(--muted-dim)",
              fontFamily: "var(--font-dm-mono), monospace",
            }}
          >
            {project.note}
          </span>
          <span
            className="text-xs"
            style={{ color: project.posterAccent, fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {project.year}
          </span>
        </div>
      </div>

      {/* Metadata */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-base mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
          {project.name}
        </h3>
        <StarRating rating={project.rating} size="sm" className="mb-2" />
        <p className="text-xs italic mb-3" style={{ color: "var(--muted)" }}>
          &ldquo;{project.review}&rdquo;
        </p>
        <div className="flex flex-wrap gap-1 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                background: "var(--accent-dim)",
                color: "var(--accent)",
                border: "1px solid rgba(0,224,84,0.2)",
                fontFamily: "var(--font-dm-mono), monospace",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
