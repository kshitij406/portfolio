import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Journey from "@/components/Journey";
import { EDUCATION, LANGUAGES, LINKS, OFF_CLOCK, PROFILE, RECOGNITION, SKILLS } from "@/data/content";

export const metadata: Metadata = { title: "About" };

const EXPERIENCE = [
  ["CEO and co-founder", "Black Reef", "2026 to now"],
  ["Software developer intern", "Imatic Technologies", "2026"],
  ["Software developer intern", "CubeStone Consulting", "2026"],
];

export default function About() {
  return (
    <main className="wrap page">
      <div className="about">
        <header className="page-head about-head">
          <h1>About</h1>
          <p>
            I&rsquo;m Kshitij, a second-year Computer Science student at the University of Kent and CEO of Black Reef, a
            five&#8209;person software studio in Mauritius. I build backends and the screens on top of them, and I&rsquo;m
            looking for a 12&#8209;month placement from summer 2027.
          </p>
          <p>
            Placement or project? <a href={`mailto:${PROFILE.email}`} className="ul muted">{PROFILE.email}</a>
          </p>
        </header>
        <figure className="portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/portrait.jpg" alt="Kshitij Jha in a dark suit, against a plain grey wall" />
        </figure>
      </div>

      <div className="cols">
        <section>
          <h2>Experience</h2>
          <ul>
            {EXPERIENCE.map(([role, org, when]) => (
              <li key={org}>
                {org}
                <span>
                  {role}, {when}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Education</h2>
          <ul>
            {EDUCATION.map((e) => (
              <li key={e.course}>
                {e.school}
                <span>
                  {e.course}, {e.period}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Recognition</h2>
          <ul>
            {RECOGNITION.map((r) => (
              <li key={r.title}>
                {r.title}
                <span>{r.result}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Stack</h2>
          <ul>
            {SKILLS.map((s) => (
              <li key={s.group}>
                {s.group}
                <span>{s.items.join(", ")}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Outside work</h2>
          <ul>
            {OFF_CLOCK.map((o) => (
              <li key={o.title}>
                {o.title}
                <span>{o.body}</span>
              </li>
            ))}
            <li>
              Languages
              <span>{LANGUAGES}</span>
            </li>
          </ul>
        </section>
        <section>
          <h2>Elsewhere</h2>
          <ul>
            <li>
              <a href="/Kshitij_Jha_CV.pdf" target="_blank" rel="noreferrer" className="ul">
                CV (PDF)
              </a>
            </li>
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" className="ul">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="about-journey">
        <Journey />
      </div>
      <Footer />
    </main>
  );
}
