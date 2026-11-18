import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";
import WorkGrid from "@/components/WorkGrid";
import { SMALLER } from "@/data/content";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  return (
    <main className="page">
      <PageHead tag="Work" tone="yellow" title={<>Ten projects, start to finish</>}>
        <p>Products, client sites and hackathon builds, 2025 to now. Each one opens into the story and, where there is one, a demo you can use.</p>
      </PageHead>

      <WorkGrid />

      <section className="smaller" aria-labelledby="smaller-h">
        <h2 id="smaller-h" className="display">Smaller things</h2>
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
