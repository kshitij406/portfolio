"use client";

import { useMemo, useRef } from "react";
import { useAnomalies } from "@/lib/anomalies";
import { rng, useCanvas } from "@/lib/useCanvas";

// One dot per 8 punches: 14,888 punches is 1,861 dots, of which 310 (2,478)
// were being thrown away as "duplicates".
const TOTAL = 1861;
const DROPPED = 310;

export default function PunchDemo() {
  const { found, flag } = useAnomalies();
  const fixed = found.has("punches");
  const fixedAt = useRef<number | null>(null);

  const order = useMemo(() => {
    const r = rng(14888);
    const dropped = new Set<number>();
    while (dropped.size < DROPPED) dropped.add(Math.floor(r() * TOTAL));
    // Restore order: left to right in a sweep, with a bit of jitter.
    const delay = new Map<number, number>();
    for (const i of dropped) delay.set(i, i / TOTAL + r() * 0.15);
    return delay;
  }, []);

  const ref = useCanvas((ctx, w, h, t, pal) => {
    if (fixed && fixedAt.current === null) fixedAt.current = t;
    const since = fixedAt.current === null ? -1 : (t - fixedAt.current) / 1400;
    ctx.clearRect(0, 0, w, h);
    if (!w || !h) return;
    // Fit every dot into the box, whatever its shape.
    let cols = Math.ceil(Math.sqrt((TOTAL * w) / h));
    while (Math.ceil(TOTAL / cols) * (w / cols) > h) cols++;
    const step = w / cols;
    const r = Math.max(1.6, step * 0.3);
    for (let i = 0; i < TOTAL; i++) {
      const x = (i % cols) * step + step / 2;
      const y = Math.floor(i / cols) * step + step / 2;
      if (y > h) break;
      const d = order.get(i);
      if (d === undefined) {
        ctx.fillStyle = pal.ink;
        ctx.globalAlpha = 0.78;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      const p = since < 0 ? 0 : Math.min(1, Math.max(0, (since - d) * 4));
      ctx.globalAlpha = 1;
      if (p < 1) {
        const pulse = 0.55 + 0.45 * Math.sin(t / 380 + i);
        ctx.strokeStyle = pal.flag;
        ctx.globalAlpha = since < 0 ? pulse : 1 - p;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (p > 0) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = p < 1 ? pal.ok : pal.ink;
        ctx.beginPath();
        ctx.arc(x, y, r * (p < 1 ? 1 + (1 - p) * 0.9 : 1), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  });

  return (
    <figure className={`demo punch${fixed ? " is-fixed" : ""}`}>
      <div className="punch-code">
        <p className="demo-note">
          The clock-in device exports a CSV. The import de-duplicated it on a unique index, which
          sounds safe until two doors record the same person in the same minute.
        </p>
        <pre className="code" aria-label="SQL index definition">
          <code>
            <span className="k">CREATE UNIQUE INDEX</span> ux_raw_punch{"\n"}
            {"  "}
            <span className="k">ON</span> raw_punch (employee_id, punch_time
            {fixed ? <span className="ins">, checkpoint</span> : null}){"\n"}
            {"  "}
            <span className="k">WITH</span> (IGNORE_DUP_KEY = <span className="k">ON</span>);
          </code>
        </pre>
        <button type="button" className="btn" onClick={() => flag("punches")} disabled={fixed}>
          {fixed ? "Checkpoint added to the index" : "Add checkpoint to the index"}
        </button>
      </div>
      <div className="punch-viz">
        <canvas ref={ref} className="punch-canvas" aria-hidden />
        <figcaption className="punch-count">
          <strong>{fixed ? "14,888" : "12,410"}</strong> of 14,888 punches imported.{" "}
          {fixed ? (
            "None dropped."
          ) : (
            <span className="flag-text">2,478 discarded, and no error raised.</span>
          )}
          <span className="punch-scale">One dot is eight punches from a real July file.</span>
        </figcaption>
      </div>
    </figure>
  );
}
