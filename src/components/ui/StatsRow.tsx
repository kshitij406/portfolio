"use client";

import AnimatedCounter from "./AnimatedCounter";

interface Stat {
  count: string;
  label: string;
  href?: string;
}

export default function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-wrap gap-8">
      {stats.map((stat) => {
        const numeric = parseInt(stat.count, 10);
        const isNumeric = !isNaN(numeric) && stat.count === String(numeric);

        const countEl = isNumeric ? (
          <AnimatedCounter to={numeric} />
        ) : (
          <span>{stat.count}</span>
        );

        const isFilm = stat.label.includes("film");

        const inner = (
          <div className="flex flex-col items-start gap-0.5">
            <span
              className="text-base font-bold"
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                color: isFilm ? "var(--rating)" : "var(--text)",
              }}
            >
              {isFilm && "★ "}
              {countEl}
            </span>
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: "var(--muted-dim)", fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {stat.label}
            </span>
          </div>
        );

        if (stat.href) {
          return (
            <a key={stat.label} href={stat.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-start gap-0.5">
              {inner}
            </a>
          );
        }

        return <div key={stat.label}>{inner}</div>;
      })}
    </div>
  );
}
