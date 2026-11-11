"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PROJECTS } from "@/data/projects";

// Varied heights, the way prints of different sizes sit on a wall.
const HEIGHTS = [420, 320, 470, 370, 260, 440, 350, 400, 300];

/** Every project in a row. The wheel scrolls it sideways; a mouse can drag it. */
export default function WorkStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      // Let the page scroll on once the strip has reached either end.
      if ((e.deltaY > 0 && el.scrollLeft >= max - 1) || (e.deltaY < 0 && el.scrollLeft <= 0)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    let down = false,
      x0 = 0,
      s0 = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      x0 = e.clientX;
      s0 = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 5) el.classList.add("dragging");
      el.scrollLeft = s0 - dx;
    };
    const onUp = () => {
      down = false;
      // Keep links dead until the click that ends the drag has passed.
      requestAnimationFrame(() => el.classList.remove("dragging"));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    addEventListener("pointermove", onMove);
    addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div className="strip" ref={ref} data-lenis-prevent>
      {PROJECTS.map((p, i) => (
        <article key={p.slug} className="strip-item" style={{ ["--i" as string]: i, ["--h" as string]: `${HEIGHTS[i % HEIGHTS.length]}px` }}>
          <Link href={`/work/${p.slug}`} draggable={false}>
            <p>{p.name}</p>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" loading="lazy" draggable={false} />
            </figure>
          </Link>
        </article>
      ))}
    </div>
  );
}
