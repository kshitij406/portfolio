import ScrambleText from "@/components/ScrambleText";
import CopyEmail from "@/components/CopyEmail";
import SectionObserver from "@/components/SectionObserver";

const SOCIAL = [
  {
    label: "GitHub",
    href: "https://github.com/kxitiz",
    handle: "@kxitiz",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kshitijjha",
    handle: "kshitijjha",
  },
  {
    label: "Letterboxd",
    href: "https://letterboxd.com/Kxitiz_/",
    handle: "@Kxitiz_",
  },
];

export default function ContactPage() {
  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div
        className="flex-1 px-6 md:px-12 lg:px-20 pt-32 pb-24"
        style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}
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
              03 / contact
            </span>
          </div>
          <div className="mb-8">
            <ScrambleText
              text="Say hi."
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
              as="h1"
            />
          </div>
        </SectionObserver>

        {/* Subtext */}
        <SectionObserver delay={80}>
          <p
            className="text-base md:text-lg max-w-lg leading-relaxed mb-12"
            style={{ color: "var(--muted)" }}
          >
            Not actively hunting for roles right now, but open to good
            conversations. About software, about what you are building, about
            films. Send something interesting and I will read it.
          </p>
        </SectionObserver>

        {/* Email */}
        <SectionObserver delay={120}>
          <div className="mb-10">
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
        </SectionObserver>

        {/* Social links */}
        <SectionObserver delay={160}>
          <div className="mb-12">
            <div
              className="text-xs mb-4 uppercase tracking-widest"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-dm-mono), monospace",
              }}
            >
              elsewhere
            </div>
            <div className="flex flex-wrap gap-6">
              {SOCIAL.map((link) => {
                const isLetterboxd = link.label === "Letterboxd";
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm transition-opacity hover:opacity-100 opacity-70"
                  >
                    {isLetterboxd && (
                      <span style={{ color: "var(--rating)" }}>★</span>
                    )}
                    <span
                      className="font-medium group-hover:underline"
                      style={{
                        color: isLetterboxd ? "var(--rating)" : "var(--text)",
                        fontFamily: "var(--font-dm-mono), monospace",
                      }}
                    >
                      {link.label}
                    </span>
                    <span style={{ color: "var(--border)" }}>/</span>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        color: isLetterboxd ? "var(--rating)" : "var(--muted)",
                      }}
                    >
                      {link.handle}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </SectionObserver>

        {/* Availability / fun note */}
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
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
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
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              Open to conversations. Not actively job hunting, but if you have
              something interesting, I&apos;m listening.
            </p>
            <p
              className="text-xs mt-2"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-dm-mono), monospace",
              }}
            >
              avg response time: whenever I&apos;m not debugging
            </p>
          </div>
        </SectionObserver>
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
