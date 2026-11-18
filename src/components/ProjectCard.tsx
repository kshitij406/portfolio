import Link from "next/link";
import type { Project } from "@/data/projects";

// Alternating lean, so a grid of cards looks dealt rather than tiled.
const TILTS = [-3, 2.5, -1.5, 3, -2.5, 1.5];

/** A project as a little browser window clipped to the page. */
export default function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <Link href={`/work/${p.slug}`} className="pcard" style={{ ["--tilt" as string]: `${TILTS[i % TILTS.length]}deg`, ["--i" as string]: i }}>
      <svg className="clip" viewBox="0 0 24 60" width="18" height="46" aria-hidden>
        <path
          d="M8 44V12a6 6 0 0 1 12 0v36a9 9 0 0 1-18 0V16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="pcard-bar" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <span className="pcard-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt="" loading="lazy" decoding="async" />
      </span>
      <span className="pcard-foot">
        <span className="pcard-name">{p.name}</span>
        <span className="pcard-meta">
          <span>{p.award ?? p.kind}</span>
          {/* Awards already carry their year. */}
          {!(p.award ?? p.kind).includes(p.year) && <span>{p.year}</span>}
        </span>
      </span>
    </Link>
  );
}
