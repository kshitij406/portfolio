"use client";

import { useRef, useState } from "react";
import { useAnomalies } from "@/lib/anomalies";
import { rng, useCanvas } from "@/lib/useCanvas";

/**
 * BlueNet in miniature. Vessels report their position; plain code watches
 * for the patterns that matter. One vessel switches its transponder off inside
 * the protected zone. Click where it was last seen to open a case.
 */

type Vessel = { x: number; y: number; vx: number; vy: number; trail: [number, number][]; dark?: boolean };

const ZONE = { cx: 0.7, cy: 0.38, r: 0.17 };
const PATROLS = [
  [0.3, 0.7],
  [0.52, 0.22],
  [0.82, 0.78],
];
const CROSSING = 7500; // ms for the dark vessel to sail into the zone, from when the map is first seen

function makeFleet(): Vessel[] {
  const r = rng(23);
  const fleet: Vessel[] = Array.from({ length: 13 }, () => {
    const a = r() * Math.PI * 2;
    const s = 0.000012 + r() * 0.00002;
    return { x: r(), y: r(), vx: Math.cos(a) * s, vy: Math.sin(a) * s, trail: [] };
  });
  return fleet;
}

export default function VesselMap() {
  const { found, flag } = useAnomalies();
  const fixed = found.has("vessel");
  const fleet = useRef<Vessel[]>(makeFleet());
  const last = useRef<number | null>(null);
  const start = useRef<number | null>(null);
  const isDark = useRef(false);
  const ghost = useRef<{ x: number; y: number } | null>(null);
  const size = useRef({ w: 1, h: 1 });
  const [miss, setMiss] = useState(false);

  const ref = useCanvas((ctx, w, h, t, pal) => {
    size.current = { w, h };
    const dt = last.current === null ? 16 : Math.min(48, t - last.current);
    last.current = t;
    const m = Math.min(w, h);
    ctx.clearRect(0, 0, w, h);

    // Range rings around Mauritius.
    const ix = w * 0.42,
      iy = h * 0.5;
    ctx.strokeStyle = pal.line;
    ctx.lineWidth = 1;
    for (let k = 1; k <= 4; k++) {
      ctx.beginPath();
      ctx.arc(ix, iy, m * 0.13 * k, 0, Math.PI * 2);
      ctx.stroke();
    }
    // The island, roughly the right shape.
    ctx.fillStyle = pal.ink;
    ctx.beginPath();
    ctx.ellipse(ix, iy, m * 0.026, m * 0.035, -0.35, 0, Math.PI * 2);
    ctx.fill();

    // Protected zone, hatched.
    const zx = ZONE.cx * w,
      zy = ZONE.cy * h,
      zr = ZONE.r * m;
    ctx.save();
    ctx.beginPath();
    ctx.arc(zx, zy, zr, 0, Math.PI * 2);
    ctx.clip();
    ctx.strokeStyle = pal.sea;
    ctx.globalAlpha = 0.5;
    for (let d = -zr * 2; d < zr * 2; d += 7) {
      ctx.beginPath();
      ctx.moveTo(zx + d - zr, zy - zr);
      ctx.lineTo(zx + d + zr, zy + zr);
      ctx.stroke();
    }
    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = pal.sea;
    ctx.beginPath();
    ctx.arc(zx, zy, zr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = pal.muted;
    ctx.font = `500 11px ${pal.sans}`;
    ctx.fillText("Protected zone", zx - zr * 0.55, zy - zr - 8);

    // Ordinary traffic.
    for (const v of fleet.current) {
      v.x += v.vx * dt;
      v.y += v.vy * dt;
      if (v.x < -0.05) v.x = 1.05;
      if (v.x > 1.05) v.x = -0.05;
      if (v.y < -0.05) v.y = 1.05;
      if (v.y > 1.05) v.y = -0.05;
      v.trail.push([v.x, v.y]);
      if (v.trail.length > 70) v.trail.shift();
      drawTrail(ctx, v.trail, w, h, pal.muted);
      drawBoat(ctx, v.x * w, v.y * h, Math.atan2(v.vy, v.vx), pal.ink, 4.5);
    }

    // The vessel that goes dark. It sails in, stops transmitting inside the
    // zone, and stays gone. The clock starts the first time the map is seen.
    if (start.current === null) start.current = t;
    const elapsed = t - start.current;
    const sx = 0.98,
      sy = 0.04;
    const ex = ZONE.cx + 0.02,
      ey = ZONE.cy + 0.03;
    const travel = Math.min(1, elapsed / CROSSING);
    isDark.current = travel >= 1;
    const dx = sx + (ex - sx) * travel,
      dy = sy + (ey - sy) * travel + Math.sin(travel * 5) * 0.015;
    const trail: [number, number][] = [];
    for (let k = 0; k <= 50; k++) {
      const tt = (travel * k) / 50;
      trail.push([sx + (ex - sx) * tt, sy + (ey - sy) * tt + Math.sin(tt * 5) * 0.015]);
    }
    drawTrail(ctx, trail, w, h, fixed ? pal.flag : pal.muted);
    ghost.current = { x: dx * w, y: dy * h };
    if (travel < 1) {
      drawBoat(ctx, dx * w, dy * h, Math.atan2(ey - sy, ex - sx), pal.ink, 4.5);
    } else {
      const gone = elapsed - CROSSING;
      ctx.strokeStyle = fixed ? pal.flag : pal.muted;
      ctx.lineWidth = fixed ? 1.5 : 1;
      ctx.setLineDash(fixed ? [] : [2, 3]);
      ctx.beginPath();
      ctx.arc(dx * w, dy * h, 7 + (fixed ? Math.sin(t / 200) * 2 : 0), 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      if (fixed) {
        ctx.fillStyle = pal.flag;
        ctx.font = `600 12px ${pal.sans}`;
        ctx.fillText("Case 1: AIS off in protected zone", dx * w + 12, dy * h + 4);
      } else if (gone > 600) {
        ctx.fillStyle = pal.muted;
        ctx.font = `11px ${pal.mono}`;
        ctx.fillText(`no signal ${Math.floor(gone / 1000)}s`, dx * w + 12, dy * h + 4);
      }
    }

    // Three patrol boats for 2.3 million square kilometres.
    for (const [px, py] of PATROLS) {
      ctx.fillStyle = pal.cobalt;
      ctx.beginPath();
      ctx.moveTo(px * w, py * h - 7);
      ctx.lineTo(px * w + 6, py * h + 5);
      ctx.lineTo(px * w - 6, py * h + 5);
      ctx.closePath();
      ctx.fill();
    }
  });

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    const g = ghost.current;
    if (g && isDark.current && Math.hypot(g.x - x, g.y - y) < 34) {
      flag("vessel");
    } else if (!fixed) {
      setMiss(true);
      setTimeout(() => setMiss(false), 1600);
    }
  };

  return (
    <figure className="demo vessels">
      <canvas
        ref={ref}
        className="vessel-canvas"
        data-cursor="scan"
        data-cursor-label="Scan"
        onClick={onClick}
        aria-label="Vessel traffic around Mauritius. One vessel stops transmitting inside the protected zone."
      />
      <figcaption>
        <span className="legend">
          <i className="lg-boat" /> Vessel reporting position
        </span>
        <span className="legend">
          <i className="lg-patrol" /> Coast guard patrol
        </span>
        <span className="legend-note" aria-live="polite">
          {fixed
            ? "Flagged. In BlueNet, a Gemma agent would now pull this vessel's history and rank the case."
            : miss
              ? "That one is still transmitting. Look for a track that just stops."
              : "Watch the protected zone."}
        </span>
      </figcaption>
    </figure>
  );
}

function drawTrail(ctx: CanvasRenderingContext2D, trail: [number, number][], w: number, h: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let i = 1; i < trail.length; i++) {
    const [ax, ay] = trail[i - 1];
    const [bx, by] = trail[i];
    if (Math.abs(ax - bx) > 0.5 || Math.abs(ay - by) > 0.5) continue;
    ctx.globalAlpha = (i / trail.length) * 0.6;
    ctx.beginPath();
    ctx.moveTo(ax * w, ay * h);
    ctx.lineTo(bx * w, by * h);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawBoat(ctx: CanvasRenderingContext2D, x: number, y: number, a: number, color: string, s: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(a);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(s * 1.6, 0);
  ctx.lineTo(-s, s * 0.8);
  ctx.lineTo(-s * 0.5, 0);
  ctx.lineTo(-s, -s * 0.8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
