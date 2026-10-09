"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PATROL. You are one of Mauritius's three patrol boats. Fishing vessels
 * wander the map; now and then one switches off its tracker inside a
 * protected zone. Get to where it was last seen before the trail goes cold.
 * 60 seconds, three misses and you're done.
 *
 * Steering: the boat heads for the pointer (mouse or finger). Arrow keys and
 * WASD work too.
 */

type V = { x: number; y: number };
type Ship = V & { vx: number; vy: number; dark: boolean; trail: V[] };
type Case = V & { ttl: number; max: number; ship: Ship };
type Pop = V & { t: number; text: string; good: boolean };

const SEA = "#071a2a";
const RING = "rgba(120, 200, 210, 0.13)";
const SHIP = "#cfe3e6";
const PLAYER = "#ffc63d";
const FLAG = "#ff4f97";
const OK = "#3fd39a";
const ZONE = "rgba(79, 193, 198, 0.5)";

const GAME_TIME = 60;

export default function Patrol() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="patrol-launch" onClick={() => setOpen(true)}>
        <span className="pl-boat" aria-hidden />
        <span>
          <strong>Play Patrol</strong>
          <span>Drive the coast guard boat. Catch vessels that go dark.</span>
        </span>
      </button>
      {open && <Game onClose={() => setOpen(false)} />}
    </>
  );
}

function Game({ onClose }: { onClose: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"ready" | "play" | "over">("ready");
  const [result, setResult] = useState({ score: 0, closed: 0, best: 0 });
  const stateRef = useRef(state);
  stateRef.current = state;
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("no-scroll");
      removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let W = 0,
      H = 0;
    const resize = () => {
      W = c.clientWidth;
      H = c.clientHeight;
      c.width = W * dpr;
      c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const S = () => Math.min(W, H);
    const island = () => ({ x: W * 0.5, y: H * 0.52 });
    const zones = () => [
      { x: W * 0.22, y: H * 0.3, r: S() * 0.16 },
      { x: W * 0.78, y: H * 0.7, r: S() * 0.18 },
      { x: W * 0.8, y: H * 0.24, r: S() * 0.12 },
    ];
    const inZone = (p: V) => zones().some((z) => Math.hypot(p.x - z.x, p.y - z.y) < z.r);

    let player: V & { vx: number; vy: number; a: number; wake: (V & { t: number })[] };
    let ships: Ship[] = [];
    let cases: Case[] = [];
    let pops: Pop[] = [];
    let score = 0,
      closed = 0,
      misses = 0,
      combo = 0,
      time = GAME_TIME,
      nextDark = 2.5,
      shake = 0;
    const target: V = { x: 0, y: 0 };
    let usePointer = false;
    const keys = new Set<string>();

    const reset = () => {
      const isl = island();
      player = { x: isl.x, y: isl.y + S() * 0.12, vx: 0, vy: 0, a: -Math.PI / 2, wake: [] };
      target.x = player.x;
      target.y = player.y;
      ships = Array.from({ length: 11 }, () => spawnShip());
      cases = [];
      pops = [];
      score = closed = misses = combo = 0;
      time = GAME_TIME;
      nextDark = 2.5;
    };
    const spawnShip = (): Ship => {
      const a = Math.random() * Math.PI * 2;
      const sp = 14 + Math.random() * 18;
      return { x: Math.random() * W, y: Math.random() * H, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, dark: false, trail: [] };
    };
    reset();

    const toLocal = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.buttons === 0) return;
      const p = toLocal(e);
      target.x = p.x;
      target.y = p.y;
      usePointer = true;
    };
    const onDown = (e: PointerEvent) => {
      const p = toLocal(e);
      target.x = p.x;
      target.y = p.y;
      usePointer = true;
    };
    const kd = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        keys.add(e.key);
        usePointer = false;
        e.preventDefault();
      }
    };
    const ku = (e: KeyboardEvent) => keys.delete(e.key);
    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerdown", onDown);
    addEventListener("keydown", kd);
    addEventListener("keyup", ku);

    const pop = (x: number, y: number, text: string, good: boolean) => pops.push({ x, y, t: 0, text, good });

    let ended = false;
    const end = () => {
      if (ended) return;
      ended = true;
      let best = 0;
      try {
        best = Math.max(score, Number(localStorage.getItem("kj-patrol-best") || 0));
        localStorage.setItem("kj-patrol-best", String(best));
      } catch {}
      setResult({ score, closed, best });
      setState("over");
    };

    let last = performance.now();
    let raf = 0;
    let wasPlaying = false;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (stateRef.current === "play" && !wasPlaying) {
        reset();
        ended = false;
      }
      const playing = stateRef.current === "play" && !ended;
      wasPlaying = stateRef.current === "play";

      // --- update ---
      if (playing) {
        time -= dt;
        if (time <= 0) {
          time = 0;
          end();
        }
        // steering
        let ax = 0,
          ay = 0;
        if (usePointer) {
          const dx = target.x - player.x,
            dy = target.y - player.y;
          const d = Math.hypot(dx, dy);
          if (d > 6) {
            ax = (dx / d) * Math.min(1, d / 80);
            ay = (dy / d) * Math.min(1, d / 80);
          }
        } else {
          if (keys.has("ArrowLeft") || keys.has("a")) ax -= 1;
          if (keys.has("ArrowRight") || keys.has("d")) ax += 1;
          if (keys.has("ArrowUp") || keys.has("w")) ay -= 1;
          if (keys.has("ArrowDown") || keys.has("s")) ay += 1;
        }
        const thrust = S() * 1.5;
        player.vx += ax * thrust * dt;
        player.vy += ay * thrust * dt;
        const drag = Math.pow(0.12, dt);
        player.vx *= drag;
        player.vy *= drag;
        player.x = Math.max(10, Math.min(W - 10, player.x + player.vx * dt));
        player.y = Math.max(10, Math.min(H - 10, player.y + player.vy * dt));
        const sp = Math.hypot(player.vx, player.vy);
        if (sp > 8) player.a = Math.atan2(player.vy, player.vx);
        if (sp > 20) player.wake.push({ x: player.x, y: player.y, t: 0 });

        // a vessel goes dark
        nextDark -= dt;
        if (nextDark <= 0) {
          const candidates = ships.filter((s) => !s.dark);
          const s = candidates[Math.floor(Math.random() * candidates.length)];
          if (s) {
            // put it in a protected zone
            const z = zones()[Math.floor(Math.random() * 3)];
            const a = Math.random() * Math.PI * 2;
            const r = Math.random() * z.r * 0.7;
            s.x = z.x + Math.cos(a) * r;
            s.y = z.y + Math.sin(a) * r;
            s.trail = [];
            s.dark = true;
            const ttl = Math.max(4, 7.5 - (GAME_TIME - time) * 0.05);
            cases.push({ x: s.x, y: s.y, ttl, max: ttl, ship: s });
          }
          nextDark = Math.max(1.4, 3.6 - (GAME_TIME - time) * 0.035) + Math.random() * 1.2;
        }

        // cases
        for (const k of cases) {
          k.ttl -= dt;
          if (Math.hypot(player.x - k.x, player.y - k.y) < 26) {
            combo++;
            const pts = Math.round(100 + (k.ttl / k.max) * 100) * Math.min(combo, 5);
            score += pts;
            closed++;
            pop(k.x, k.y, combo > 1 ? `+${pts}  x${Math.min(combo, 5)}` : `+${pts}`, true);
            k.ttl = -999;
            Object.assign(k.ship, spawnShip(), { dark: false });
          } else if (k.ttl <= 0) {
            misses++;
            combo = 0;
            shake = 0.35;
            pop(k.x, k.y, "Trail went cold", false);
            Object.assign(k.ship, spawnShip(), { dark: false });
            k.ttl = -999;
            if (misses >= 3) end();
          }
        }
        cases = cases.filter((k) => k.ttl > -900);
      }

      for (const s of ships) {
        if (s.dark) continue;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.x < -20) s.x = W + 20;
        if (s.x > W + 20) s.x = -20;
        if (s.y < -20) s.y = H + 20;
        if (s.y > H + 20) s.y = -20;
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 40) s.trail.shift();
      }
      player.wake.forEach((w) => (w.t += dt));
      player.wake = player.wake.filter((w) => w.t < 1.2);
      pops.forEach((p) => (p.t += dt));
      pops = pops.filter((p) => p.t < 1.3);
      shake = Math.max(0, shake - dt);

      // --- draw ---
      ctx.save();
      if (shake > 0) ctx.translate((Math.random() - 0.5) * 12 * shake, (Math.random() - 0.5) * 12 * shake);
      ctx.fillStyle = SEA;
      ctx.fillRect(-20, -20, W + 40, H + 40);
      const isl = island();
      ctx.strokeStyle = RING;
      ctx.lineWidth = 1;
      for (let k = 1; k <= 7; k++) {
        ctx.beginPath();
        ctx.arc(isl.x, isl.y, S() * 0.09 * k, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = "#1f4a3d";
      ctx.beginPath();
      ctx.ellipse(isl.x, isl.y, S() * 0.05, S() * 0.07, -0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e6ece8";
      ctx.font = `600 12px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("Mauritius", isl.x, isl.y + S() * 0.07 + 18);

      for (const z of zones()) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(z.x, z.y, z.r, 0, Math.PI * 2);
        ctx.clip();
        ctx.strokeStyle = "rgba(79,193,198,0.18)";
        for (let d = -z.r * 2; d < z.r * 2; d += 9) {
          ctx.beginPath();
          ctx.moveTo(z.x + d - z.r, z.y - z.r);
          ctx.lineTo(z.x + d + z.r, z.y + z.r);
          ctx.stroke();
        }
        ctx.restore();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = ZONE;
        ctx.beginPath();
        ctx.arc(z.x, z.y, z.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      for (const s of ships) {
        if (s.dark) continue;
        ctx.strokeStyle = "rgba(207,227,230,0.25)";
        ctx.beginPath();
        s.trail.forEach((p, k) => {
          const prev = s.trail[k - 1];
          if (!prev || Math.abs(prev.x - p.x) > 50 || Math.abs(prev.y - p.y) > 50) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        boat(ctx, s.x, s.y, Math.atan2(s.vy, s.vx), SHIP, 5);
      }

      for (const k of cases) {
        const f = k.ttl / k.max;
        const pulse = 1 + Math.sin(now / 120) * 0.08;
        ctx.strokeStyle = FLAG;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(k.x, k.y, 22 * pulse, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * f);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(k.x, k.y, 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = FLAG;
        ctx.font = `700 11px system-ui, sans-serif`;
        ctx.fillText("Went dark", k.x, k.y - 30);
      }

      // Wake: a line that widens and fades behind the boat.
      ctx.lineCap = "round";
      for (let k = 1; k < player.wake.length; k++) {
        const a = player.wake[k - 1],
          w = player.wake[k];
        ctx.strokeStyle = `rgba(255,255,255,${0.28 * (1 - w.t / 1.2)})`;
        ctx.lineWidth = 2 + w.t * 10;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(w.x, w.y);
        ctx.stroke();
      }
      ctx.lineWidth = 1;
      boat(ctx, player.x, player.y, player.a, PLAYER, 12);

      pops.forEach((p) => {
        ctx.globalAlpha = 1 - p.t / 1.3;
        ctx.fillStyle = p.good ? OK : FLAG;
        ctx.font = `800 ${p.good ? 18 : 14}px system-ui, sans-serif`;
        ctx.fillText(p.text, p.x, p.y - 34 - p.t * 30);
        if (p.good) {
          ctx.strokeStyle = OK;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10 + p.t * 60, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      });
      ctx.restore();

      // HUD
      if (playing) {
        ctx.textAlign = "left";
        ctx.fillStyle = "#e6ece8";
        ctx.font = `800 26px system-ui, sans-serif`;
        ctx.fillText(String(score), 20, 74);
        ctx.font = `500 12px system-ui, sans-serif`;
        ctx.fillStyle = "#8da0ab";
        ctx.fillText(`Cases closed ${closed}${combo > 1 ? `   Combo x${Math.min(combo, 5)}` : ""}`, 20, 94);
        ctx.textAlign = "right";
        ctx.fillStyle = time < 10 ? FLAG : "#e6ece8";
        ctx.font = `800 26px system-ui, sans-serif`;
        ctx.fillText(`${Math.ceil(time)}s`, W - 20, 74);
        for (let k = 0; k < 3; k++) {
          ctx.fillStyle = k < 3 - misses ? PLAYER : "rgba(255,255,255,0.15)";
          boat(ctx, W - 28 - k * 22, 96, -Math.PI / 2, ctx.fillStyle as string, 6);
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("keydown", kd);
      removeEventListener("keyup", ku);
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div className="patrol" role="dialog" aria-modal="true" aria-label="Patrol, a game">
      <canvas ref={canvas} className="patrol-canvas" />
      <button type="button" className="patrol-close" onClick={onClose} ref={closeBtn}>
        Close
      </button>
      {state !== "play" && (
        <div className="patrol-card">
          {state === "ready" ? (
            <>
              <p className="patrol-title">Patrol</p>
              <p>
                Mauritius has 2.3 million square kilometres of sea and three patrol boats. You&rsquo;re one
                of them.
              </p>
              <p>
                When a fishing boat switches off its tracker inside a protected zone, a red ring appears
                where it was last seen. Get there before the ring runs out. Miss three and you&rsquo;re off
                the boat.
              </p>
              <p className="patrol-controls">Steer with your mouse or finger. Arrow keys work too.</p>
              <button type="button" className="btn" onClick={() => setState("play")} autoFocus>
                Start patrol
              </button>
            </>
          ) : (
            <>
              <p className="patrol-title">{result.score}</p>
              <p>
                {result.closed} {result.closed === 1 ? "case" : "cases"} closed.{" "}
                {result.score >= result.best && result.score > 0 ? "New best." : `Best: ${result.best}.`}
              </p>
              <p className="patrol-controls">
                BlueNet does this for real: code spots the vessels that go dark, and an AI agent ranks them
                so the real patrol boats know where to go first.
              </p>
              <div className="patrol-actions">
                <button type="button" className="btn" onClick={() => setState("play")} autoFocus>
                  Go again
                </button>
                <button type="button" className="link-btn" onClick={onClose}>
                  Back to the site
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function boat(ctx: CanvasRenderingContext2D, x: number, y: number, a: number, color: string, s: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(a);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(s * 1.7, 0);
  ctx.quadraticCurveTo(s * 0.4, s * 0.95, -s, s * 0.75);
  ctx.lineTo(-s, -s * 0.75);
  ctx.quadraticCurveTo(s * 0.4, -s * 0.95, s * 1.7, 0);
  ctx.fill();
  ctx.restore();
}
