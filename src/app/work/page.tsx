import type { Metadata } from "next";
import Footer from "@/components/Footer";
import WorkIndex from "@/components/WorkIndex";
import { SMALLER } from "@/data/content";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  return (
    <main className="wrap page">
      <header className="page-head">
        <h1>Work</h1>
        <p>Products, client sites and hackathon builds, 2025 to now. Each one opens into the story and, where there is one, a demo you can use.</p>
      </header>

      <WorkIndex />

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
      <Footer />
    </main>
  );
}
