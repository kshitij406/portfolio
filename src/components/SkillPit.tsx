"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { scroll } from "@/lib/scroll";
import { SKILLS } from "@/data/content";

/**
 * The stack as a pile of things you can throw around. Chips are real DOM
 * elements (so the text stays sharp and selectable by screen readers via the
 * list below), positioned every frame from matter-js bodies. They drop in the
 * first time the pit is seen. Scrolling hard bumps them.
 *
 * Mouse: drag and throw. Touch: tap a chip to kick it, so the page still
 * scrolls normally over the pit.
 */

const TONES = ["tone-ink", "tone-line", "tone-sea", "tone-sodium"];

export default function SkillPit() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current!;
    const chips = [...el.querySelectorAll<HTMLElement>(".chip-body")];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    if (reduce) {
      el.classList.add("static");
      return;
    }

    const { Engine, Bodies, Composite, Body, Mouse, MouseConstraint, Events, Query } = Matter;
    let engine: Matter.Engine | null = null;
    let raf = 0;
    let started = false;
    let visible = false;
    let bodies: Matter.Body[] = [];
    let cleanupInput = () => {};

    const build = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      engine = Engine.create({ gravity: { x: 0, y: 1.1 } });
      const t = 60;
      Composite.add(engine.world, [
        Bodies.rectangle(W / 2, H + t / 2, W * 2, t, { isStatic: true }),
        Bodies.rectangle(-t / 2, H / 2, t, H * 4, { isStatic: true }),
        Bodies.rectangle(W + t / 2, H / 2, t, H * 4, { isStatic: true }),
      ]);
      bodies = chips.map((c, i) => {
        const w = c.offsetWidth;
        const h = c.offsetHeight;
        const b = Bodies.rectangle(
          w / 2 + Math.random() * Math.max(1, W - w),
          -h - i * 28 - Math.random() * 60,
          w,
          h,
          { chamfer: { radius: h / 2 }, restitution: 0.35, friction: 0.25, frictionAir: 0.012, angle: (Math.random() - 0.5) * 0.8 },
        );
        return b;
      });
      Composite.add(engine.world, bodies);

      if (fine) {
        const mouse = Mouse.create(el);
        // Let the wheel scroll the page instead of being swallowed.
        const m = mouse as unknown as { mousewheel: EventListener };
        el.removeEventListener("wheel", m.mousewheel);
        el.removeEventListener("mousewheel", m.mousewheel);
        el.removeEventListener("DOMMouseScroll", m.mousewheel);
        const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
        Composite.add(engine.world, mc);
        Events.on(mc, "startdrag", () => el.classList.add("dragging"));
        Events.on(mc, "enddrag", () => el.classList.remove("dragging"));
        cleanupInput = () => Mouse.clearSourceEvents(mouse);
      } else {
        const tap = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const hit = Query.point(bodies, { x: e.clientX - r.left, y: e.clientY - r.top })[0];
          if (hit) Body.setVelocity(hit, { x: (Math.random() - 0.5) * 14, y: -16 });
        };
        el.addEventListener("pointerdown", tap);
        cleanupInput = () => el.removeEventListener("pointerdown", tap);
      }
    };

    let lastV = 0;
    const loop = () => {
      if (!engine) return;
      // A hard flick of the scroll wheel shakes the pit.
      const v = scroll.velocity;
      if (Math.abs(v) > 35 && Math.abs(lastV) <= 35) {
        for (const b of bodies) Body.setVelocity(b, { x: (Math.random() - 0.5) * 6, y: -Math.min(14, Math.abs(v) * 0.25) });
      }
      lastV = v;
      Engine.update(engine, 1000 / 60);
      bodies.forEach((b, i) => {
        const c = chips[i];
        c.style.transform = `translate(${b.position.x - c.offsetWidth / 2}px, ${b.position.y - c.offsetHeight / 2}px) rotate(${b.angle}rad)`;
      });
      if (visible) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible && !started) {
          started = true;
          build();
          el.classList.add("live");
        }
        if (visible) raf = requestAnimationFrame(loop);
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    let lastW = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (!started || Math.abs(el.clientWidth - lastW) < 40) return;
      lastW = el.clientWidth;
      cleanupInput();
      if (engine) Engine.clear(engine);
      build();
    });
    ro.observe(el);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      cleanupInput();
      if (engine) Engine.clear(engine);
    };
  }, []);

  return (
    <div className="pit-wrap">
      <div className="pit" ref={box} aria-hidden>
        {SKILLS.flatMap((g, gi) =>
          g.items.map((s) => (
            <span key={s} className={`chip-body ${TONES[gi % TONES.length]}`}>
              {s}
            </span>
          )),
        )}
        <p className="pit-hint">
          <span className="hint-fine">Drag them about. Throw one.</span>
          <span className="hint-touch">Tap one to kick it.</span>
        </p>
      </div>
      <dl className="skills">
        {SKILLS.map((s, gi) => (
          <div key={s.group}>
            <dt>
              <i className={`swatch ${TONES[gi % TONES.length]}`} aria-hidden />
              {s.group}
            </dt>
            <dd>{s.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
