import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PunchDemo from "@/components/PunchDemo";
import ScamCheck from "@/components/ScamCheck";
import TestGrid from "@/components/TestGrid";
import VesselMap from "@/components/VesselMap";
import Deadlock from "@/components/Deadlock";
import CopyEmail from "@/components/CopyEmail";
import {
  CLIENTS,
  EDUCATION,
  LANGUAGES,
  LINKS,
  OFF_CLOCK,
  PROFILE,
  RECOGNITION,
  SKILLS,
  SMALLER,
  WORK,
} from "@/data/content";

const ext = { target: "_blank", rel: "noreferrer" } as const;

export default function Page() {
  const [itl, cubestone] = WORK;

  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Work */}
        <section className="sec" id="work" aria-labelledby="work-h">
          <h2 className="sec-h" id="work-h">
            Two internships, both in Dar es Salaam, both shipped.
          </h2>

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

              <ul className="points">
                {itl.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="stack">{itl.stack.join(", ")}</p>
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
              <ul className="points">
                {cubestone.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="stack">
                {cubestone.stack.join(", ")}.{" "}
                <a href={cubestone.href} {...ext}>
                  Read the app code
                </a>
              </p>
            </div>
          </article>
        </section>

        {/* Projects */}
        <section className="sec" id="projects" aria-labelledby="projects-h">
          <h2 className="sec-h" id="projects-h">
            Two hackathon teams I led, and one server I built to understand concurrency.
          </h2>

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
                  Try a small version of that idea. Eight rules, no model, every point explained.
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
            <ScamCheck />
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

        {/* Clients */}
        <section className="sec sec-tight" id="clients" aria-labelledby="clients-h">
          <h2 className="sec-h" id="clients-h">
            Paid client work, on the side.
          </h2>
          <ul className="clients">
            {CLIENTS.map((c) => (
              <li key={c.name}>
                <h3>{c.name}</h3>
                <p>{c.what}</p>
                {c.href ? (
                  <a href={c.href} {...ext}>
                    {c.href.replace("https://", "")}
                  </a>
                ) : (
                  <span className="muted">{c.status}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Recognition */}
        <section className="sec sec-tight" aria-labelledby="rec-h">
          <h2 className="sec-h" id="rec-h">
            Prizes, mostly for things built in a weekend.
          </h2>
          <ul className="recog">
            {RECOGNITION.map((r) => (
              <li key={r.title}>
                <span className="recog-result">{r.result}</span>
                <span className="recog-title">{r.title}</span>
                <span className="recog-detail">{r.detail}</span>
                {r.title.startsWith("Middlesex") && (
                  <span className="locks" aria-label="6 of 13 problems solved">
                    {Array.from({ length: 13 }, (_, i) => (
                      <i key={i} className={i < 6 ? "open" : ""} />
                    ))}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* About */}
        <section className="sec" id="about" aria-labelledby="about-h">
          <h2 className="sec-h" id="about-h">
            Second year at Kent, and the rest of me.
          </h2>
          <div className="about">
            <div className="edu">
              {EDUCATION.map((e) => (
                <div key={e.school} className="edu-item">
                  <h3>{e.school}</h3>
                  <p>
                    {e.course}, {e.period}
                  </p>
                  <p className="muted">{e.note}</p>
                </div>
              ))}
              <dl className="skills">
                {SKILLS.map((s) => (
                  <div key={s.group}>
                    <dt>{s.group}</dt>
                    <dd>{s.items.join(", ")}</dd>
                  </div>
                ))}
                <div>
                  <dt>Spoken</dt>
                  <dd>{LANGUAGES}</dd>
                </div>
              </dl>
            </div>
            <ul className="offclock">
              {OFF_CLOCK.map((o) => (
                <li key={o.title}>
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="sec contact" id="contact" aria-labelledby="contact-h">
          <h2 className="contact-h" id="contact-h">
            {PROFILE.availability}. Write to me.
          </h2>
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
        <p className="muted">Next.js, two canvases, and nothing generated from a template.</p>
      </footer>
    </>
  );
}
