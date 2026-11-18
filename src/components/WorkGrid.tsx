"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { CATEGORIES, PROJECTS, type Category } from "@/data/projects";

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", ...CATEGORIES];
const TONES = ["ink", "pink", "blue", "yellow", "green", "lilac"];

/** Every project as a card, filterable by kind. */
export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = PROJECTS.filter((p) => filter === "All" || p.category === filter);
  const count = (f: Filter) => (f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f, i) => (
          <button key={f} type="button" className={`filter t-${TONES[i]}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
            <span>{count(f)}</span>
          </button>
        ))}
      </div>
      {/* Keyed on the filter so the cards deal in again when it changes. */}
      <div className="pgrid pgrid-page" key={filter}>
        {shown.map((p, i) => (
          <ProjectCard key={p.slug} p={p} i={i} />
        ))}
      </div>
    </>
  );
}
