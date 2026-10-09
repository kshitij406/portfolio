"use client";

import { useEffect, useRef, useState } from "react";
import { JOURNEY } from "@/data/content";
import { MAP } from "@/data/map";

/**
 * Three places, one route. The section is tall and its inside is sticky, so
 * scrolling draws the route and flies a little plane along it; each stop
 * swaps the story beside the map. Real coastlines, real coordinates.
 */

const { dar, mauritius, canterbury } = MAP.places;
const STOPS = [dar, mauritius, canterbury].map(([x, y]) => ({ x, y }));
// Curves, not great circles, but they bow the way the real flights do.
const LEG1 = `M${dar[0]} ${dar[1]} Q ${dar[0] + 70} ${dar[1] + 10}, ${mauritius[0]} ${mauritius[1]}`;
const LEG2 = `M${mauritius[0]} ${mauritius[1]} Q ${mauritius[0] - 90} ${(mauritius[1] + canterbury[1]) / 2 - 60}, ${canterbury[0]} ${canterbury[1]}`;

export default function Journey() {
  const sec = useRef<HTMLElement>(null);
  const leg1 = useRef<SVGPathElement>(null);
  const leg2 = useRef<SVGPathElement>(null);
  const plane = useRef<SVGGElement>(null);
  const [stop, setStop] = useState(0);

  useEffect(() => {
    const l1 = leg1.current!,
      l2 = leg2.current!;
    const a = l1.getTotalLength(),
      b = l2.getTotalLength();
    l1.style.strokeDasharray = `${a}`;
    l2.style.strokeDasharray = `${b}`;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = sec.current!.getBoundingClientRect();
      const span = r.height - innerHeight;
      let p = span > 0 ? -r.top / span : 0;
      p = Math.max(0, Math.min(1, p));
      if (reduce) p = 1;
      // Hold at each stop for a moment: 0 to .15 Dar, .15 to .5 leg one,
      // .5 to .6 Mauritius, .6 to .9 leg two, .9 on Canterbury.
      const f1 = Math.max(0, Math.min(1, (p - 0.12) / 0.33));
      const f2 = Math.max(0, Math.min(1, (p - 0.55) / 0.33));
      l1.style.strokeDashoffset = `${a * (1 - f1)}`;
      l2.style.strokeDashoffset = `${b * (1 - f2)}`;
      const onLeg2 = f1 >= 1;
      const path = onLeg2 ? l2 : l1;
      const len = onLeg2 ? b * f2 : a * f1;
      const pt = path.getPointAtLength(len);
      const ahead = path.getPointAtLength(Math.min((onLeg2 ? b : a), len + 1));
      const ang = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
      plane.current!.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${ang})`);
      setStop(p < 0.4 ? 0 : p < 0.8 ? 1 : 2);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="journey" id="journey" ref={sec} aria-labelledby="journey-h">
      <div className="journey-sticky">
        <div className="journey-text">
          <h2 className="sec-h" id="journey-h">
            Three places so far.
          </h2>
          <ol className="journey-stops">
            {JOURNEY.map((j, i) => (
              <li key={j.place} className={i === stop ? "on" : i < stop ? "past" : ""}>
                <p className="js-place">
                  {j.place}
                  <span>{j.country}</span>
                </p>
                <div className="js-body">
                  <p className="js-title">{j.title}</p>
                  <p>{j.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <svg className="journey-map" viewBox={`0 0 ${MAP.w} ${MAP.h}`} aria-hidden>
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M0 ${(i + 0.5) * (MAP.h / 9)} H${MAP.w}`} className="jm-lat" />
          ))}
          <path className="jm-land" d={MAP.land} />
          <path className="jm-route-ghost" d={LEG1} />
          <path className="jm-route-ghost" d={LEG2} />
          <path className="jm-route" d={LEG1} ref={leg1} />
          <path className="jm-route" d={LEG2} ref={leg2} />
          {STOPS.map((s, i) => (
            <g key={i} className={`jm-stop${i <= stop ? " on" : ""}`} transform={`translate(${s.x} ${s.y})`}>
              <circle r="16" className="jm-pulse" />
              <circle r="7" className="jm-dot" />
              <text x={i === 1 ? 0 : 14} y={i === 1 ? 32 : 5} textAnchor={i === 1 ? "end" : "start"}>
                {JOURNEY[i].place}
              </text>
            </g>
          ))}
          <g ref={plane} className="jm-plane">
            <path d="M12 0 L-6 -4 L-10 -12 L-14 -12 L-10 -2 L-16 -1 L-18 -5 L-21 -5 L-19 0 L-21 5 L-18 5 L-16 1 L-10 2 L-14 12 L-10 12 L-6 4z" />
          </g>
        </svg>
      </div>
    </section>
  );
}
