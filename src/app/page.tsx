import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PunchDemo from "@/components/PunchDemo";
import ScamCheck from "@/components/ScamCheck";
import TestGrid from "@/components/TestGrid";
import VesselMap from "@/components/VesselMap";
import Deadlock from "@/components/Deadlock";
import CopyEmail from "@/components/CopyEmail";
import Deck from "@/components/deck/Deck";
import ScamGame from "@/components/ScamGame";
import Patrol from "@/components/Patrol";
import Journey from "@/components/Journey";
import Demos from "@/components/Demos";
import SecHead from "@/components/SecHead";
import Tape from "@/components/Tape";
import { StickerArt } from "@/components/Stickers";
import { BLACKREEF, EDUCATION, LINKS, OFF_CLOCK, PROFILE, SMALLER, TAPE, WORK } from "@/data/content";
import Keys from "@/components/Keys";

const ext = { target: "_blank", rel: "noreferrer" } as const;

function Log({ points }: { points: string[] }) {
  return (
    <ul className="log">
      {points.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <p className="tags">
      {items.map((t) => (
        <span className="kc kc-sm" key={t}>
          {t}
        </span>
      ))}
    </p>
  );
}

const POLAROID_ART = ["mask", "pad", "fedora", "film"];

export default function Page() {
  const [itl, cubestone] = WORK;

  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* The deck */}
        <section className="sec deck-sec" id="deck" aria-labelledby="deck-h">
          <SecHead id="deck">Eleven things I built or won. Pick a card.</SecHead>
          <Deck />
        </section>

        <Tape items={TAPE} tone="sodium" tilt={0} />

        {/* Work */}
        <section className="sec" id="work" aria-labelledby="work-h">
          <SecHead id="work">CEO of a five&#8209;founder studio. Two internships before that.</SecHead>

          <article className="job">
            <aside className="job-meta">
              <h3>{BLACKREEF.company}</h3>
              <p>{BLACKREEF.role}</p>
              <p className="muted">
                {BLACKREEF.period}, {BLACKREEF.place}
              </p>
            </aside>
            <div className="job-body">
              <p className="lede">{BLACKREEF.lede}</p>
              <Log points={BLACKREEF.points} />
              <Tags items={BLACKREEF.stack} />
              <p className="stack">
                <a href={BLACKREEF.href} {...ext}>
                  teamblackreef.com
                </a>
              </p>
            </div>
          </article>

          <article className="job">
            <aside className="job-meta">
              <h3>{itl.company}</h3>
              <p>{itl.role}</p>
              <p className="muted">
                {itl.period}, {itl.place}
              </p>
            </aside>
            <div className="job-body">
              <p className="lede">{itl.lede}</p>

              <div className="story">
                <h4 className="story-h">The bug I&rsquo;m proudest of finding</h4>
                <p>
                  The import ran clean. No errors, no warnings, and about one punch in six was
                  quietly missing. Two doors recording the same employee in the same minute looked
                  identical to the unique index, so it kept one and threw the other away. The fix was
                  one column.
                </p>
              </div>
              <PunchDemo />

              <Log points={itl.points} />
              <Tags items={itl.stack} />
            </div>
          </article>

          <article className="job">
            <aside className="job-meta">
              <h3>{cubestone.company}</h3>
              <p>{cubestone.role}</p>
              <p className="muted">
                {cubestone.period}, {cubestone.place}
              </p>
            </aside>
            <div className="job-body">
              <p className="lede">{cubestone.lede}</p>
              <Log points={cubestone.points} />
              <Tags items={cubestone.stack} />
              <p className="stack">
                <a href={cubestone.href} {...ext}>
                  Read the app code
                </a>
              </p>
            </div>
          </article>
        </section>

        {/* Projects */}
        <section className="sec" id="projects" aria-labelledby="projects-h">
          <SecHead id="projects">Two hackathon awards as team lead, and a Go server that taught me locks.</SecHead>

          <article className="project">
            <header className="project-head">
              <h3 className="project-name">FraudLens AI</h3>
              <p className="award">Winner, Finnovate Hackathon 2026</p>
              <p className="project-links">
                <a href="https://fraudlens.site" {...ext}>
                  fraudlens.site
                </a>
                <a
                  href="https://chromewebstore.google.com/detail/ijoefckhnkajhegfegkifedkahdiebdj"
                  {...ext}
                >
                  Chrome extension
                </a>
              </p>
            </header>
            <div className="project-cols">
              <div className="project-text">
                <p className="lede">
                  A scam checker for messages, links and emails, built for Mauritius in English,
                  French and Kreol Morisien. I led the team of five and owned the backend and the
                  extension.
                </p>
                <p>
                  The decision I&rsquo;d defend in any interview: the language model never decides
                  the verdict. A deterministic engine with about 70 signal codes owns the score. The
                  model only reads language, and it has to quote words that are actually in the
                  message, or its output is thrown away. When the model is down, the rules still
                  return a full answer.
                </p>
                <p>
                  Before the code, a test for you. Eight real-looking messages. Which ones are scams?
                </p>
              </div>
              <div className="project-stats">
                <p>
                  <span className="stat">73%</span> recall
                </p>
                <p>
                  <span className="stat">100%</span> precision
                </p>
                <p className="muted">On 84 test messages, with the model switched off.</p>
              </div>
            </div>
            <ScamGame />
            <details className="own-check">
              <summary>Or paste your own message into a small version of the engine</summary>
              <ScamCheck />
            </details>
            <TestGrid />
          </article>

          <article className="project">
            <header className="project-head">
              <h3 className="project-name">BlueNet: Ocean Watch</h3>
              <p className="award">Judge&rsquo;s Choice, Build with Gemma</p>
            </header>
            <div className="project-cols">
              <div className="project-text">
                <p className="lede">
                  Mauritius has 2.3 million square kilometres of sea and three patrol boats. BlueNet
                  helps decide where they go.
                </p>
                <p>
                  Plain code flags the patterns that matter in vessel tracking data: ships going
                  dark in protected zones, two vessels meeting at sea, trawling patterns. Then a
                  Gemma agent investigates each flagged vessel with function calling and writes a
                  ranked case file for the coast guard. I led the team of five and built the
                  backend.
                </p>
              </div>
            </div>
            <Patrol />
            <VesselMap />
          </article>

          <article className="project project-small">
            <header className="project-head">
              <h3 className="project-name">Concurrent TCP chat server</h3>
              <p className="project-links">
                <a href="https://github.com/kshitij406/TCP" {...ext}>
                  Read the Go code
                </a>
              </p>
            </header>
            <div className="project-cols">
              <div className="project-text">
                <p className="lede">
                  Raw TCP in Go, one goroutine per client, mutex-guarded shared state, and a clean
                  shutdown across every connection.
                </p>
                <p>
                  I wanted to understand concurrency rather than trust the runtime with it. It
                  deadlocked, raced on a map and misused a WaitGroup, and I fixed each one by tracing
                  it through the synchronisation model instead of adding sleeps until it stopped.
                </p>
              </div>
            </div>
            <Deadlock />
          </article>

          <div className="smaller">
            <h3 className="smaller-h">Smaller things</h3>
            <ul>
              {SMALLER.map((s) => (
                <li key={s.name}>
                  <a href={s.href} {...(s.href.startsWith("http") ? ext : {})}>
                    <span className="sm-name">{s.name}</span>
                    <span className="sm-what">{s.what}</span>
                    <span className="sm-lang">{s.lang}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Demos */}
        <section className="sec" id="demos" aria-labelledby="demos-h">
          <SecHead id="demos">Three live sites and a game you can play right here.</SecHead>
          <Demos />
        </section>

        <Journey />

        {/* About */}
        <section className="sec" id="about" aria-labelledby="about-h">
          <SecHead id="about">Second year of CS at Kent, after a First in every graded module.</SecHead>
          <div className="about">
            <div className="edu">
              {EDUCATION.map((e) => (
                <div key={e.course} className="edu-item">
                  <h3>{e.school}</h3>
                  <p>
                    {e.course}, <span className="edu-period">{e.period}</span>
                  </p>
                  <p className="muted">{e.note}</p>
                </div>
              ))}
              <Keys />
            </div>
            <ul className="offclock">
              {OFF_CLOCK.map((o, i) => (
                <li key={o.title} className="polaroid">
                  <div className="polaroid-pic" aria-hidden>
                    <StickerArt id={POLAROID_ART[i % POLAROID_ART.length]} />
                  </div>
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="sec contact" id="contact" aria-labelledby="contact-h">
          <SecHead id="contact">
            {PROFILE.availability.replace("12-month", "12\u2011month")}. Write to me.
          </SecHead>
          <CopyEmail email={PROFILE.email} />
          <ul className="elsewhere">
            <li>
              <a href="/Kshitij_Jha_CV.pdf" {...ext}>
                CV (PDF)
              </a>
            </li>
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} {...ext}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="foot">
        <p>Designed and built by Kshitij in Canterbury, 2026.</p>
      </footer>
    </>
  );
}
