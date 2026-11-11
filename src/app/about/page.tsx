import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Journey from "@/components/Journey";
import { EDUCATION, LANGUAGES, LINKS, OFF_CLOCK, RECOGNITION, SKILLS } from "@/data/content";

export const metadata: Metadata = { title: "About" };

const EXPERIENCE = [
  ["CEO and co-founder", "Black Reef", "Oct 2026 to now"],
  ["Software developer intern", "Imatic Technologies", "Jun to Sep 2026"],
  ["Software developer intern", "CubeStone Consulting", "Jan to Mar 2026"],
];

export default function About() {
  return (
    <div className="page">
      <main>
        <div className="about">
          <div className="about-text">
            <h1 className="about-lede">
              I&rsquo;m Kshitij. Second year of Computer Science at Kent, CEO of a five&#8209;person software studio in
              Mauritius, and the person who finds the bug nobody noticed. Looking for a 12&#8209;month placement from summer
              2027.
            </h1>

            <div className="record">
              <div>
                <h2>Experience</h2>
                <ul>
                  {EXPERIENCE.map(([role, org, when]) => (
                    <li key={org}>
                      {role}, {org}
                      <span className="yr">{when}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Education</h2>
                <ul>
                  {EDUCATION.map((e) => (
                    <li key={e.course}>
                      {e.course}, {e.school}
                      <span className="yr">{e.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Recognition</h2>
                <ul>
                  {RECOGNITION.map((r) => (
                    <li key={r.title}>
                      {r.result}, {r.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Stack</h2>
                <ul>
                  {SKILLS.map((s) => (
                    <li key={s.group}>
                      {s.items.join(", ")}
                      <span className="muted">{s.group}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Outside work</h2>
                <ul>
                  {OFF_CLOCK.map((o) => (
                    <li key={o.title}>{o.body}</li>
                  ))}
                  <li>{LANGUAGES}</li>
                </ul>
              </div>
              <div>
                <h2>Elsewhere</h2>
                <ul>
                  <li>
                    <a href="/Kshitij_Jha_CV.pdf" target="_blank" rel="noreferrer">
                      CV (PDF)
                    </a>
                  </li>
                  {LINKS.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <figure className="portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/portrait.jpg" alt="Kshitij Jha in a dark suit, against a plain grey wall" />
          </figure>
        </div>

        <div className="about-journey">
          <Journey />
        </div>
      </main>
      <Footer />
    </div>
  );
}
