"use client";

import { Fragment, createElement, useEffect, useRef, useState } from "react";

/**
 * Headings arrive as impostors. When one scrolls into view, its letters start
 * as Cyrillic and Greek lookalikes and settle, left to right, into the real
 * Latin ones. Same trick FraudLens catches, run backwards.
 */

const LOOKALIKES: Record<string, string[]> = {
  a: ["а", "ɑ", "α"],
  c: ["с", "ϲ"],
  e: ["е", "ҽ", "ε"],
  h: ["һ"],
  i: ["і", "ι"],
  j: ["ј"],
  k: ["κ"],
  n: ["η", "ո"],
  o: ["о", "ο", "σ"],
  p: ["р", "ρ"],
  r: ["г"],
  s: ["ѕ"],
  t: ["τ"],
  u: ["υ", "ս"],
  v: ["ν"],
  w: ["ш", "ω"],
  x: ["х", "χ"],
  y: ["у", "γ"],
  A: ["А", "Α"],
  B: ["В", "Β"],
  C: ["С"],
  E: ["Е", "Ε"],
  H: ["Н", "Η"],
  K: ["К", "Κ"],
  M: ["М", "Μ"],
  O: ["О", "Ο"],
  P: ["Р", "Ρ"],
  T: ["Т", "Τ"],
  X: ["Х", "Χ"],
  Y: ["Υ"],
};

type Props = { text: string; as?: "h2" | "h3" | "p"; className?: string; id?: string };

export default function Decode({ text, as = "h2", className, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [chars, setChars] = useState<{ c: string; fake: boolean }[]>(() =>
    [...text].map((c) => ({ c, fake: false })),
  );

  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;

    const scramble = () =>
      [...text].map((c) => {
        const alts = LOOKALIKES[c];
        return alts && Math.random() < 0.85
          ? { c: alts[Math.floor(Math.random() * alts.length)], fake: true }
          : { c, fake: false };
      });

    // Start disguised, so the first thing seen is the impostor version.
    setChars(scramble());

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const letters = [...text];
        const settleAt = letters.map((_, i) => 180 + i * 22 + Math.random() * 160);
        const t0 = performance.now();
        const step = () => {
          const t = performance.now() - t0;
          let done = true;
          setChars(
            letters.map((c, i) => {
              if (t >= settleAt[i]) return { c, fake: false };
              done = false;
              const alts = LOOKALIKES[c];
              return alts ? { c: alts[Math.floor(Math.random() * alts.length)], fake: true } : { c, fake: false };
            }),
          );
          if (!done) timer = window.setTimeout(step, 55);
        };
        step();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [text]);

  return createElement(
    as,
    { ref, className, id, "aria-label": text },
    // Words stay unbreakable so a swap never reflows the line.
    text.split(" ").map((word, wi, words) => {
      const start = words.slice(0, wi).join(" ").length + (wi ? 1 : 0);
      // The space sits outside the inline-block, or it gets trimmed away.
      return (
        <Fragment key={wi}>
          <span className="dc-word" aria-hidden>
            {[...word].map((_, ci) => {
              const ch = chars[start + ci];
              return (
                <span key={ci} className={ch?.fake ? "dc-fake" : undefined}>
                  {ch?.c}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      );
    }),
  );
}
