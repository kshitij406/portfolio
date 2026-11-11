import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { EXPERIENCE } from "@/data/content";
import { project } from "@/data/projects";

export const metadata: Metadata = { title: "Experience" };

export default function Experience() {
  return (
    <main className="wrap page">
      <header className="page-head">
        <h1>Experience</h1>
        <p>A software studio I co-founded, and the two internships before it. Each one opens into the project it produced.</p>
      </header>

      <ol className="jobs">
        {EXPERIENCE.map((job, i) => {
          const p = project(job.project)!;
          return (
            <li key={job.company} className="job" style={{ ["--i" as string]: i }}>
              <p className="job-when">
                {job.period}
                <span>{job.place}</span>
              </p>
              <div className="job-who">
                <h2>
                  <a href={job.href} target="_blank" rel="noreferrer" className="ul">
                    {job.company}
                  </a>
                </h2>
                <p>{job.role}</p>
                <a href={job.href} target="_blank" rel="noreferrer" className={`job-logo ${job.tile}`} tabIndex={-1} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={job.logo} alt="" loading="lazy" />
                </a>
              </div>
              <div className="job-body">
                <p className="job-lede">{job.lede}</p>
                <ul className="job-points">
                  {job.points.map((pt) => (
                    <li key={pt.slice(0, 24)}>{pt}</li>
                  ))}
                </ul>
                <p className="job-stack">
                  {job.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </p>
                <Link href={`/work/${p.slug}`} className="job-proj">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" loading="lazy" />
                  <span>
                    <span className="label">The project</span>
                    {p.name}
                  </span>
                  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden>
                    <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
      <Footer />
    </main>
  );
}
