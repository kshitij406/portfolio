"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { project } from "@/data/projects";

// Award winners first, then the two biggest builds.
const ITEMS = ["travelio", "fraudlens", "bluenet", "blackreef", "smarterp"].map((s) => project(s)!);
const N = ITEMS.length;
const AUTO_MS = 4500;
const SWIPE_PX = 70;

/**
 * The hero's featured projects as an iPhone-style notification stack,
 * pinned bottom right. Collapsed, the front card sits on top with the next
 * two peeking out underneath; every few seconds a new one drops in from
 * above. Swipe the front card sideways to fling it away. Tap the stack to
 * fan it out into a list, then tap a card to open its case study.
 */
export default function FeatureStack() {
  const [front, setFront] = useState(0);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [fling, setFling] = useState<{ i: number; dir: 1 | -1 } | null>(null);
  const [arriving, setArriving] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; dx: number; id: number } | null>(null);
  const dragged = useRef(false);

  const advance = useCallback(
    (flingDir?: 1 | -1) => {
      if (flingDir) setFling({ i: front, dir: flingDir });
      const nxt = (front + 1) % N;
      setArriving(nxt);
      setFront(nxt);
    },
    [front],
  );

  useEffect(() => {
    if (fling === null && arriving === null) return;
    const t = setTimeout(() => {
      setFling(null);
      setArriving(null);
    }, 500);
    return () => clearTimeout(t);
  }, [fling, arriving]);

  // A new notification every few seconds, unless you're looking at them.
  useEffect(() => {
    if (open || paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => advance(), AUTO_MS);
    return () => clearInterval(t);
  }, [open, paused, advance]);

  // An open stack closes on Escape or a tap anywhere else.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onDown);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const onDown = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (open || e.button !== 0) return;
    drag.current = { x: e.clientX, dx: 0, id: e.pointerId };
    dragged.current = false;
  };
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    d.dx = e.clientX - d.x;
    if (!dragged.current && Math.abs(d.dx) > 6) {
      dragged.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.classList.add("held");
    }
    // 1:1 while held, like a notification under your thumb.
    if (dragged.current) e.currentTarget.style.translate = `${d.dx}px 0`;
  };
  const onUp = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const d = drag.current;
    drag.current = null;
    const el = e.currentTarget;
    el.classList.remove("held");
    el.style.translate = "";
    if (d && dragged.current && Math.abs(d.dx) > SWIPE_PX) advance(d.dx > 0 ? 1 : -1);
  };

  return (
    <div
      ref={root}
      className="fstack"
      data-open={open || undefined}
      style={{ ["--n" as string]: N }}
      role="group"
      aria-label="Featured projects"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (!open && e.key === "ArrowRight") advance();
      }}
    >
      <button type="button" className="fstack-less" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} aria-hidden={!open}>
        Show less
      </button>
      {ITEMS.map((p, i) => {
        const depth = (i - front + N) % N;
        const shown = open || depth === 0;
        const cls = [
          "notif",
          fling?.i === i ? (fling.dir > 0 ? "fling-r" : "fling-l") : "",
          arriving === i && !open ? "arrive" : "",
        ].join(" ");
        return (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className={cls}
            data-depth={open ? depth : Math.min(depth, 3)}
            style={{ ["--d" as string]: depth }}
            aria-hidden={!shown}
            tabIndex={shown ? 0 : -1}
            aria-label={open ? `${p.name}, open the case study` : `${p.name}. Show all ${N} featured projects`}
            draggable={false}
            onPointerDown={depth === 0 ? onDown : undefined}
            onPointerMove={depth === 0 ? onMove : undefined}
            onPointerUp={depth === 0 ? onUp : undefined}
            onPointerCancel={depth === 0 ? onUp : undefined}
            onClick={(e) => {
              if (open) return; // fanned out: a tap opens the case study
              e.preventDefault();
              if (dragged.current) {
                dragged.current = false;
                return;
              }
              setOpen(true);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.icon ?? p.image} alt="" className="notif-icon" draggable={false} />
            <span className="notif-text">
              <span className="notif-top">
                <span className="notif-title">{p.name}</span>
                <span className="notif-when">{p.year}</span>
              </span>
              <span className="notif-body">{p.award ?? p.kind}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
