"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAnomalies } from "@/lib/anomalies";
import { PROFILE } from "@/data/content";
import Clock from "./Clock";
import Stickers from "./Stickers";

// "Kshіtij": the fourth letter is U+0456, CYRILLIC SMALL LETTER
// BYELORUSSIAN-UKRAINIAN I. It renders identically to a Latin i.
const IMPOSTOR = "і";
const LINES = [["K", "s", "h", IMPOSTOR, "t", "i", "j"], ["J", "h", "a"]];

const cp = (c: string) => "U+" + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0");

export default function Hero() {
  const { found, flag } = useAnomalies();
  const fixed = found.has("glyph");
  const wrap = useRef<HTMLDivElement>(null);
  const impostorRef = useRef<HTMLSpanElement>(null);
  const [lensOn, setLensOn] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: -200, y: 0 };
    const target = { x: -200, y: 0 };
    const apply = () => {
      el.style.setProperty("--lx", `${pos.x}px`);
      el.style.setProperty("--ly", `${pos.y}px`);
    };

    let following = false;
    let sweep: gsap.core.Timeline | null = null;

    const impostorCentre = () => {
      const r = impostorRef.current!.getBoundingClientRect();
      const w = el.getBoundingClientRect();
      return { x: r.left - w.left + r.width / 2, y: r.top - w.top + r.height * 0.55 };
    };

    // The one choreographed moment on the page: the lens crosses the name,
    // stops on the impostor long enough to show its code point, and moves on.
    const startSweep = (delay: number) => {
      if (reduce) return;
      const w = el.getBoundingClientRect();
      const c = impostorCentre();
      const line2 = w.height * 0.78;
      setLensOn(true);
      sweep = gsap
        .timeline({ delay, onUpdate: apply, repeat: -1, repeatDelay: 2.5 })
        .set(pos, { x: -160, y: c.y })
        .to(pos, { x: c.x, duration: 1.4, ease: "power3.out" })
        .to(pos, { x: c.x + 4, duration: 1.5, ease: "none" })
        .to(pos, { x: w.width * 0.95, y: c.y + 20, duration: 1.8, ease: "power2.inOut" })
        .to(pos, { x: w.width * 0.25, y: line2, duration: 1.6, ease: "power2.inOut" })
        .to(pos, { x: -200, duration: 1.2, ease: "power2.in" });
    };

    let raf = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      apply();
      if (following) raf = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch" && e.buttons === 0) return;
      const r = el.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (!following) {
        sweep?.kill();
        sweep = null;
        following = true;
        setLensOn(true);
        pos.x = target.x;
        pos.y = target.y;
        raf = requestAnimationFrame(tick);
      }
    };
    const leave = () => {
      following = false;
      cancelAnimationFrame(raf);
      setLensOn(false);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", move);
    el.addEventListener("pointerleave", leave);
    startSweep(1.1);

    return () => {
      sweep?.kill();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const render = (xray: boolean) =>
    LINES.map((line, li) => (
      <span className="name-line" key={li}>
        {line.map((ch, ci) => {
          const bad = ch === IMPOSTOR;
          const shown = bad && fixed ? "i" : ch;
          return (
            <span
              key={ci}
              ref={bad && !xray ? impostorRef : undefined}
              className={`g${bad ? " g-bad" : ""}${bad && fixed ? " g-fixed" : ""}`}
              onClick={bad && !xray ? () => flag("glyph") : undefined}
            >
              {shown}
              {xray && <i className="cp">{bad && !fixed ? "U+0456 Cyrillic" : cp(shown)}</i>}
            </span>
          );
        })}
      </span>
    ));

  return (
    <section className="hero" id="top">
      <Stickers />
      <div className={`name-wrap${lensOn ? " lens-on" : ""}`} ref={wrap}>
        <h1 className="name" aria-label="Kshitij Jha">
          {render(false)}
        </h1>
        <div className="name xray" aria-hidden>
          {render(true)}
        </div>
        <div className="lens-ring" aria-hidden />
      </div>

      <div className="hero-body">
        <p className="hero-lede">
          I build backends and the screens that sit on top of them. The work I&rsquo;m proudest of
          started with noticing something small that was wrong.
        </p>
        <div className="hero-meta">
          <Clock />
          <p>{PROFILE.availability}.</p>
          <p className="hero-links">
            <a href="/Kshitij_Jha_CV.pdf" target="_blank" rel="noreferrer">Read the CV</a>
            <a href={`mailto:${PROFILE.email}`}>Email me</a>
          </p>
        </div>
      </div>

      <p className="hero-hunt">
        Six things on this page are broken on purpose, each one a small version of a real bug from
        the work below. Find them if you like. The counter is in the corner.
      </p>
    </section>
  );
}
