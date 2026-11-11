import type { Metadata } from "next";
import WorkStrip from "@/components/WorkStrip";
import Footer from "@/components/Footer";
import { SMALLER } from "@/data/content";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  return (
    <div className="page">
      <main>
        <h1 className="work-title">
          Things I built
          <br />
          (25&ndash;26)
        </h1>
        <WorkStrip />
        <section className="smaller" aria-labelledby="smaller-h">
          <h2 id="smaller-h">Smaller things</h2>
          <ul>
            {SMALLER.map((s) => (
              <li key={s.name}>
                <a href={s.href} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                  <span>{s.name}</span>
                  <span>{s.what}</span>
                  <span>{s.lang}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
