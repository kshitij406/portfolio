import CopyEmail from "@/components/CopyEmail";
import ScrambleText from "@/components/ScrambleText";
import SectionObserver from "@/components/SectionObserver";
import SiteFooter from "@/components/SiteFooter";
import { PROFILE, SOCIAL_LINKS } from "@/data/site";

const SOCIAL = [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.letterboxd];

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ color: "var(--text)" }}>
      <div className="flex-1 px-6 md:px-12 lg:px-20 pt-32 pb-24">
        <div className="content-shell max-w-[940px]">
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
                03 / contact
              </span>
            </div>
            <div className="mb-8">
              <ScrambleText
                text="Let's connect."
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-accent"
                as="h1"
              />
            </div>
          </SectionObserver>

          <SectionObserver delay={80}>
            <div className="editorial-card p-6 md:p-8 mb-8">
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                I am not mass-applying right now, but I am always open to sharp conversations,
                interesting collaborations, and people building things with intent.
              </p>

              <div className="flex flex-wrap gap-3 mb-5">
                <a
                  href={SOCIAL_LINKS.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Connect on LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Follow on GitHub
                </a>
              </div>

              <div className="editorial-divider my-5" />

              <div>
                <div
                  className="text-xs mb-3 uppercase tracking-widest"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-dm-mono), monospace",
                  }}
                >
                  email
                </div>
                <CopyEmail />
              </div>
            </div>
          </SectionObserver>

          <SectionObserver delay={140}>
            <div className="editorial-card p-6 md:p-8 mb-8">
              <div
                className="text-xs mb-4 uppercase tracking-widest"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
              >
                elsewhere
              </div>

              <div className="social-grid">
                {SOCIAL.map((link) => {
                  const isLetterboxd = link.label === "Letterboxd";
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-social"
                      style={{
                        justifyContent: "space-between",
                        color: isLetterboxd ? "var(--rating)" : "var(--text)",
                      }}
                    >
                      <span>{isLetterboxd ? "★ " : ""}{link.label}</span>
                      <span style={{ color: "var(--muted-dim)", fontSize: "11px" }}>{link.handle}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </SectionObserver>

          <SectionObserver delay={200}>
            <div
              className="p-5 rounded border"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                borderStyle: "dashed",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-dm-mono), monospace",
                  }}
                >
                  status
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                Open to meaningful conversations and collaboration opportunities.
                If the project is interesting, I will make time.
              </p>
              <p
                className="text-xs mt-2"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
              >
                avg response time: faster if the message has details
              </p>
              <p
                className="text-xs mt-1"
                style={{
                  color: "var(--muted-dim)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
              >
                from {PROFILE.location}
              </p>
            </div>
          </SectionObserver>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
