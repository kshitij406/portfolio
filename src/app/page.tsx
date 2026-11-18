import Link from "next/link";
import Landscape from "@/components/Landscape";
import Sticker, { type Tone } from "@/components/Sticker";
import Eyes from "@/components/Eyes";
import Glyph, { type GlyphName, type GlyphTone } from "@/components/Glyph";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { FAQ, PROFILE, RECOGNITION, SERVICES, STATS } from "@/data/content";
import { PROJECTS, project } from "@/data/projects";

const featured = project("travelio")!;

// Where each recognition note is pinned, and how it leans.
const NOTE_TILT = [-4, 3, -2, 4, -3];

// The big icon for each service row, in SERVICES order.
const SERVICE_ICON: GlyphName[] = ["server", "browser", "database", "phone", "spark", "cloud"];

export default function Home() {
  return (
    <main>
      {/* ---------- Hero ---------- */}
      <section className="hero" data-sticker-bounds>
        <Landscape priority />
        <h1 className="display hero-h">
          <span className="line">
            I build
            <Sticker tone="green" tilt={9} className="hs-a">
              Backend
            </Sticker>
          </span>
          <span className="line">
            things people
            <Sticker tone="pink" tilt={-5} className="hs-b">
              Mobile
            </Sticker>
          </span>
          <span className="line">
            <Sticker tone="lilac" tilt={-7} className="hs-c">
              Web
            </Sticker>
            actually use
          </span>
        </h1>

        <p className="hero-tag">
          CS at the University of Kent.
          <br />
          CEO and co-founder of Black Reef.
        </p>

        <Link href={`/work/${featured.slug}`} className="glass hero-feature">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured.image} alt="" className="glass-thumb" />
          <span className="glass-text">
            <span className="glass-meta">
              <span>{featured.award}</span>
            </span>
            <span className="glass-title">{featured.name}</span>
            <span className="glass-sub hf-go">Read the case study</span>
          </span>
        </Link>
      </section>

      {/* ---------- About ---------- */}
      <section className="sec about-sec" data-sticker-bounds>
        <Eyes className="about-eyes" />
        <Glyph name="star" tone="orange" size={92} className="float fl-a" />
        <Glyph name="cloud" tone="blue" size={84} className="float fl-b" />
        <div className="sec-head rv">
          <h2 className="display sec-h">
            <Sticker tone="blue" tilt={-10} className="sec-tag">
              About
            </Sticker>
            I find the bug
            <br />
            nobody noticed
          </h2>
          <p className="sec-lede">
            I&rsquo;m Kshitij, a Computer Science student at Kent and CEO of Black Reef, a five&#8209;person software
            studio. I build software people actually use, from the database to the screen, and I&rsquo;m looking for a
            12&#8209;month placement from July 2027.
          </p>
          <div className="sec-cta">
            <a href={`mailto:${PROFILE.email}`} className="btn">
              Email me
            </a>
            <Link href="/about" className="btn btn-ghost">
              More about me
            </Link>
          </div>
        </div>

        <ul className="stats rv-list">
          {STATS.map((s, i) => (
            <li key={s.label} className="note rv" style={{ ["--i" as string]: i, ["--tilt" as string]: `${[-3, 2, -2, 3][i]}deg` }}>
              <span className="pin" aria-hidden />
              <p className="stat">{s.value}</p>
              <h3>{s.label}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Projects ---------- */}
      <section className="band" data-sticker-bounds>
        <Landscape />
        <div className="sec-head rv">
          <h2 className="display sec-h on-photo">
            <Sticker tone="yellow" tilt={-9} className="sec-tag">
              Projects
            </Sticker>
            Ten projects,
            <br />
            start to finish
          </h2>
        </div>
        <div className="pgrid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="sec" data-sticker-bounds>
        <Glyph name="bolt" tone="yellow" size={80} className="float fl-c" />
        <Glyph name="spark" tone="lilac" size={70} className="float fl-d" />
        <div className="sec-head rv">
          <h2 className="display sec-h">
            <Sticker tone="pink" tilt={-8} className="sec-tag">
              What I build
            </Sticker>
            Where I can
            <br />
            help you
          </h2>
        </div>
        <div className="services rv-list">
          {SERVICES.map((s, i) => (
            <details key={s.title} className={`svc t-${s.tone} rv`} style={{ ["--i" as string]: i }} name="svc">
              <summary>
                <span className="svc-icon">
                  <Glyph name={SERVICE_ICON[i]} tone={s.tone as GlyphTone} size={40} />
                </span>
                <span className="svc-title">{s.title}</span>
                <span className="svc-x" aria-hidden />
              </summary>
              <div className="svc-body">
                <p>{s.body}</p>
                <p className="chips">
                  {s.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- Recognition ---------- */}
      <section className="sec" data-sticker-bounds>
        <Eyes className="rec-eyes" />
        <Glyph name="trophy" tone="yellow" size={96} className="float fl-e" />
        <div className="sec-head rv">
          <h2 className="display sec-h">
            <Sticker tone="lime" tilt={-8} className="sec-tag">
              Recognition
            </Sticker>
            Three hackathons,
            <br />
            three awards
          </h2>
        </div>
        <ul className="notes rv-list">
          {RECOGNITION.map((r, i) => (
            <li key={r.title} className="note rv" style={{ ["--i" as string]: i, ["--tilt" as string]: `${NOTE_TILT[i]}deg` }}>
              <span className="pin" aria-hidden />
              <p className="note-result">{r.result}</p>
              <h3>{r.title}</h3>
              <p>{r.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="sec faq-sec" data-sticker-bounds>
        <h2 className="display sec-h faq-h rv">
          <Sticker tone="blue" tilt={-8} className="sec-tag">
            FAQ
          </Sticker>
          Before you
          <br />
          email me
        </h2>
        <div className="faq">
          {FAQ.map((f, i) => (
            <details key={f.q} className={`faq-item t-${f.tone as Tone} f${i}`} name="faq">
              <summary>
                {f.q}
                <span className="svc-x" aria-hidden />
              </summary>
              <p>
                {f.a}{" "}
                {f.link && (
                  <a href={f.link.href} target="_blank" rel="noreferrer" className="ul">
                    {f.link.label}
                  </a>
                )}
              </p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
