import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import ScamGame from "@/components/ScamGame";
import ScamCheck from "@/components/ScamCheck";
import TestGrid from "@/components/TestGrid";
import Patrol from "@/components/Patrol";
import VesselMap from "@/components/VesselMap";
import PunchDemo from "@/components/PunchDemo";
import Deadlock from "@/components/Deadlock";
import { LiveSite, PlayGame } from "@/components/Demos";
import { PROJECTS, nextProject, project } from "@/data/projects";

type Demo = { title: string; note?: string; node: React.ReactNode };

// The working parts of each project, shown under its write-up.
const DEMOS: Record<string, Demo[]> = {
  fraudlens: [
    {
      title: "Scam or legit?",
      note: "Eight real-looking messages from Mauritius. Swipe or tap to judge each one, then see what the engine says.",
      node: <ScamGame />,
    },
    {
      title: "Paste your own message",
      note: "A small version of the rules engine, running in your browser. Nothing is sent anywhere.",
      node: <ScamCheck />,
    },
    { title: "The test suite", note: "Every square is one test against the engine.", node: <TestGrid /> },
    { title: "The real thing", note: "The FraudLens site, live.", node: <LiveSite id="fraudlens" /> },
  ],
  bluenet: [
    { title: "Plan a patrol", note: "Three boats, a lot of sea. Pick where they go.", node: <Patrol /> },
    {
      title: "Vessel tracks",
      note: "Simulated tracking data with the patterns BlueNet flags. One vessel goes dark where it shouldn't.",
      node: <VesselMap />,
    },
  ],
  smarterp: [
    {
      title: "The vanishing punches",
      note: "The import as it was, with the unique index that quietly dropped one punch in six. Add the column and watch them come back.",
      node: <PunchDemo />,
    },
  ],
  tcp: [
    {
      title: "Two goroutines, waiting forever",
      note: "Each one holds the lock the other needs. Swap the order to break the deadlock.",
      node: <Deadlock />,
    },
  ],
  sultan: [{ title: "The real thing", note: "The shop, as it is today.", node: <LiveSite id="sultan" /> }],
  country: [{ title: "The real thing", note: "The site, live.", node: <LiveSite id="country" /> }],
  platformer: [{ title: "Play it", note: "The real Godot build, running in your browser.", node: <PlayGame /> }],
};

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = project((await params).slug);
  return p ? { title: p.name, description: p.story[0] } : {};
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = project(slug);
  if (!p) notFound();
  const next = nextProject(slug);
  const demos = DEMOS[slug] ?? [];

  return (
    <div className="page">
      <main>
        <article className="proj">
          <aside className="proj-meta">
            <div>
              <p className="label">Project</p>
              <h1>{p.name}</h1>
              {p.award && <p className="proj-award">{p.award}</p>}
            </div>

            <dl className="facts">
              <dt>Category</dt>
              <dd>{p.kind}</dd>
              <dt>Role</dt>
              <dd>{p.role}</dd>
              <dt>Year</dt>
              <dd>{p.year}</dd>
              {p.stack && (
                <>
                  <dt>Stack</dt>
                  <dd>{p.stack.join(", ")}</dd>
                </>
              )}
            </dl>

            <div className="story">
              <p className="label">Project info</p>
              {p.story.map((s) => (
                <p key={s.slice(0, 24)}>{s}</p>
              ))}
            </div>

            {p.links && (
              <p className="links">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="ul">
                    {l.label}
                  </a>
                ))}
              </p>
            )}

            <Link href={`/work/${next.slug}`} className="next">
              <span className="label">Next project</span>
              <span>{next.name}</span>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={next.image} alt="" loading="lazy" />
              </figure>
            </Link>
          </aside>

          <div className="proj-media">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.illustration ? `Illustration of ${p.name}` : `${p.name}`} />
              {p.illustration && <figcaption>Illustration, drawn for this page.</figcaption>}
            </figure>
            {p.points && (
              <ul className="log">
                {p.points.map((pt) => (
                  <li key={pt.slice(0, 24)}>{pt}</li>
                ))}
              </ul>
            )}
          </div>
        </article>

        {demos.length > 0 && (
          <div className="proj-demos">
            {demos.map((d) => (
              <section className="demo-block" key={d.title}>
                <header>
                  <h2>{d.title}</h2>
                  {d.note && <p>{d.note}</p>}
                </header>
                <div>{d.node}</div>
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
