"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/projects";

const N = PROJECTS.length;
const STEP = 360 / N;
const TICKS = 13;

/**
 * The projects on a vertical cylinder. Wheel, drag or arrow keys turn it;
 * it always settles with one project square to the viewer. Transforms are
 * written straight to the DOM each frame; React only hears which card is
 * in front.
 */
export default function Ring() {
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const turn = useRef<(to: number) => void>(() => {});
  const rotRef = useRef(0);
  const dragged = useRef(false);
  const [current, setCurrent] = useState(0);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const el = stage.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTouch(!matchMedia("(hover: hover)").matches);

    let rot = 0,
      target = 0,
      raf = 0,
      idle = 0,
      shown = -1,
      held = false,
      r = 0,
      pitch = 1;

    const measure = () => {
      const mobile = innerWidth < 860;
      const w = mobile ? Math.min(innerWidth * 0.72, 460) : Math.min(innerWidth * 0.36, 720);
      const h = w / 1.4;
      pitch = h * 1.08;
      // Chord between neighbours = card height plus a gap.
      r = pitch / (2 * Math.sin(Math.PI / N));
      el.style.setProperty("--w", `${w}px`);
      el.style.setProperty("--h", `${h}px`);
    };

    const render = () => {
      rotRef.current = rot;
      cards.current.forEach((c, i) => {
        if (!c) return;
        let d = (((i - rot) % N) + N) % N;
        if (d > N / 2) d -= N;
        c.style.transform = `translateZ(${-r}px) rotateX(${-d * STEP}deg) translateZ(${r}px)`;
        c.style.visibility = Math.abs(d) < 2.6 ? "visible" : "hidden";
        c.tabIndex = Math.round(d) === 0 ? 0 : -1;
      });
      const idx = ((Math.round(rot) % N) + N) % N;
      if (idx !== shown) {
        shown = idx;
        setCurrent(idx);
      }
    };

    const tick = () => {
      // Held: follow the finger exactly. Released: ease in-out towards rest.
      rot += (target - rot) * (held || reduce ? 1 : 0.09);
      if (Math.abs(target - rot) < 0.0005) rot = target;
      render();
      raf = rot === target && !held ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const settleSoon = () => {
      clearTimeout(idle);
      idle = window.setTimeout(() => {
        target = Math.round(target);
        kick();
      }, 140);
    };
    turn.current = (to: number) => {
      target = to;
      kick();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      target += Math.max(-1, Math.min(1, dy / 320));
      kick();
      settleSoon();
    };

    let y0 = 0,
      t0 = 0,
      start = 0,
      lastY = 0,
      lastT = 0,
      vel = 0;
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      held = true;
      dragged.current = false;
      y0 = lastY = e.clientY;
      t0 = lastT = e.timeStamp;
      start = target = rot;
      vel = 0;
      clearTimeout(idle);
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (!held) return;
      if (Math.abs(e.clientY - y0) > 5) dragged.current = true;
      target = start - (e.clientY - y0) / pitch;
      const dt = e.timeStamp - lastT;
      if (dt > 0) vel = (e.clientY - lastY) / dt;
      lastY = e.clientY;
      lastT = e.timeStamp;
    };
    const onUp = (e: PointerEvent) => {
      if (!held) return;
      held = false;
      // A flick carries on a little, then lands on a card.
      const flick = e.timeStamp - lastT < 80 && e.timeStamp - t0 > 0 ? (-vel * 180) / pitch : 0;
      target = Math.round(target + Math.max(-3, Math.min(3, flick)));
      kick();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") turn.current(Math.round(target) + 1);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") turn.current(Math.round(target) - 1);
      else return;
      e.preventDefault();
      requestAnimationFrame(() => cards.current.find((c) => c?.tabIndex === 0)?.focus({ preventScroll: true }));
    };

    measure();
    render();
    const onResize = () => {
      measure();
      render();
    };
    addEventListener("resize", onResize);
    addEventListener("wheel", onWheel, { passive: false });
    addEventListener("keydown", onKey);
    el.addEventListener("pointerdown", onDown);
    addEventListener("pointermove", onMove);
    addEventListener("pointerup", onUp);
    addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle);
      removeEventListener("resize", onResize);
      removeEventListener("wheel", onWheel);
      removeEventListener("keydown", onKey);
      el.removeEventListener("pointerdown", onDown);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
      removeEventListener("pointercancel", onUp);
    };
  }, []);

  const p = PROJECTS[current];

  return (
    <>
      <div className="ring-stage" ref={stage}>
        <div className="ring">
          {PROJECTS.map((proj, i) => (
            <Link
              key={proj.slug}
              href={`/work/${proj.slug}`}
              className="ring-card"
              aria-label={`${proj.name}, ${proj.kind}`}
              ref={(a) => {
                cards.current[i] = a;
              }}
              draggable={false}
              onClick={(e) => {
                // A drag that ends on a card isn't a click.
                if (dragged.current) {
                  e.preventDefault();
                  return;
                }
                // Clicking a card that isn't in front turns the ring to it.
                let d = (((i - rotRef.current) % N) + N) % N;
                if (d > N / 2) d -= N;
                if (Math.round(d) !== 0) {
                  e.preventDefault();
                  turn.current(Math.round(rotRef.current + d));
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={proj.image} alt="" draggable={false} decoding="async" />
            </Link>
          ))}
        </div>
      </div>

      <div className="scrub" aria-live="polite">
        <span className="scrub-ticks" aria-hidden>
          {Array.from({ length: TICKS }, (_, k) => {
            const off = Math.abs(k - (TICKS - 1) / 2) / ((TICKS - 1) / 2);
            return <i key={k} style={{ ["--len" as string]: `${64 - off * 46}px`, ["--o" as string]: 1 - off * 0.75 }} />;
          })}
        </span>
        <span className="scrub-name">
          <span className="swap" key={p.slug}>
            {p.name}
          </span>
        </span>
      </div>

      <div className="home-bar">
        <span>[{touch ? "Drag" : "Scroll"}]</span>
        <span className="kind">
          <span className="swap" key={p.slug}>
            {p.award ?? p.kind}
          </span>
        </span>
        <Link href={`/work/${p.slug}`} className="open ul">
          Open project
        </Link>
      </div>
    </>
  );
}
