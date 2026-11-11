"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, PROJECTS, type Category } from "@/data/projects";

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", ...CATEGORIES];

/**
 * Every project as a row you can filter. On a mouse, hovering a row floats
 * its image beside the cursor; every image is mounted in the preview so
 * moving between rows crossfades rather than reloads.
 */
export default function WorkIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const [hover, setHover] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const rows = PROJECTS.map((p, i) => ({ ...p, n: i + 1 })).filter((p) => filter === "All" || p.category === filter);
  const count = (f: Filter) => (f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length);

  // The preview drifts after the cursor instead of sticking to it.
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    const el = preview.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0,
      x = 0,
      y = 0,
      tx = 0,
      ty = 0;
    const tick = () => {
      x += (tx - x) * (reduce ? 1 : 0.16);
      y += (ty - y) * (reduce ? 1 : 0.16);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX + 24;
      ty = e.clientY - 120;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div className="chips" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
            <span>{count(f)}</span>
          </button>
        ))}
      </div>

      {/* Keyed on the filter so the rows deal in again when it changes. */}
      <ul className="index" key={filter} onPointerLeave={() => setHover(null)}>
        {rows.map((p, i) => (
          <li key={p.slug} style={{ ["--i" as string]: i }}>
            <Link
              href={`/work/${p.slug}`}
              className="row"
              onPointerEnter={() => setHover(p.slug)}
              onFocus={() => setHover(p.slug)}
              onBlur={() => setHover(null)}
            >
              <span className="row-n">{String(p.n).padStart(2, "0")}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="row-thumb" src={p.image} alt="" loading="lazy" />
              <span className="row-name">{p.name}</span>
              <span className="row-what">{p.award ?? p.kind}</span>
              <span className="row-cat">{p.category}</span>
              <span className="row-yr">{p.year}</span>
              <svg className="row-go" viewBox="0 0 12 12" width="12" height="12" aria-hidden>
                <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>

      <div className={`preview${hover ? " on" : ""}`} ref={preview} aria-hidden>
        {PROJECTS.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.slug} src={p.image} alt="" className={hover === p.slug ? "on" : undefined} />
        ))}
      </div>
    </>
  );
}
