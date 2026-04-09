import Terminal from "@/components/Terminal";
import Link from "next/link";

const NAV_CARDS = [
  {
    href: "/about",
    number: "01",
    label: "About",
    description: "CS student. Backend person. Mauritius → UK. Watches films.",
  },
  {
    href: "/work",
    number: "02",
    label: "Work",
    description: "APIs, internships, client projects. Real code, real users.",
  },
  {
    href: "/contact",
    number: "03",
    label: "Contact",
    description: "Say hi. I don't bite. Usually.",
  },
];

const TICKER_ITEMS = [
  "backend engineer",
  "allegedly",
  "c# · .net",
  "sap hana survivor",
  "mauritius → uk",
  "second year cs",
  "letterboxd addict",
  "open to conversations",
  "not a frontend person",
  "4 stars, would rewatch",
  "pushing to main",
  "probably debugging",
];

export default function Home() {
  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS]
    .map((item) => `${item} ·`)
    .join("  ");

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
          <span style={{ color: "var(--text)" }}>Backend engineer,</span>
          <br />
          <span style={{ color: "var(--accent)" }}>allegedly.</span>
        </h1>

        <p
          className="text-lg md:text-xl max-w-xl leading-relaxed mb-16"
          style={{ color: "var(--muted)" }}
        >
          CS student finishing up in Mauritius before relocating to the UK.
          I build APIs and systems that talk to databases. Sometimes they even
          work on the first deploy.
        </p>

        {/* Navigation cards */}
        <div
          className="w-full"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {NAV_CARDS.map((card) => (
            <Link key={card.href} href={card.href} className="block group">
              <div
                className="flex items-center gap-6 md:gap-10 py-5 md:py-6 transition-all duration-200"
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingLeft: "0",
                  paddingRight: "0",
                }}
              >
                <span
                  className="shrink-0 text-xs tabular-nums"
                  style={{
                    color: "var(--muted)",
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

      {/* ─── TICKER ─── */}
      <div
        className="w-full overflow-hidden py-3 border-t border-b"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
        }}
      >
        <div className="ticker-track">
          <span
            className="text-xs pr-8"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-dm-mono), monospace",
              letterSpacing: "0.05em",
            }}
          >
            {tickerContent}
          </span>
          <span
            className="text-xs pr-8"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-dm-mono), monospace",
              letterSpacing: "0.05em",
            }}
          >
            {tickerContent}
          </span>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer
        className="px-6 md:px-12 py-8 flex flex-wrap justify-between gap-4 items-center"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p
          className="text-xs"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-dm-mono), monospace",
          }}
        >
          built by kshitij jha · no template · no buzzwords
        </p>
        <p
          className="text-xs"
          style={{
            color: "var(--border)",
            fontFamily: "var(--font-dm-mono), monospace",
          }}
        >
          letterboxd.com/Kxitiz_
        </p>
      </footer>
    </main>
  );
}
