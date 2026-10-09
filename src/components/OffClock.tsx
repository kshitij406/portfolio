"use client";

import { useEffect, useRef, useState } from "react";
import { OFF_CLOCK } from "@/data/content";

/**
 * Each hobby does a small thing of its own on hover or focus.
 *   bubbles: air rising off the card
 *   stamina: a stamina bar that drains while you hold it, refills when you let go
 *   dnf: a package upgrade that runs and finishes
 *   letterbox: cinema bars close in
 */
export default function OffClock() {
  return (
    <ul className="offclock">
      {OFF_CLOCK.map((o) => (
        <Item key={o.title} title={o.title} body={o.body} effect={o.effect} />
      ))}
    </ul>
  );
}

function Item({ title, body, effect }: { title: string; body: string; effect: string }) {
  const [on, setOn] = useState(false);
  return (
    <li
      className={`oc oc-${effect}${on ? " on" : ""}`}
      tabIndex={0}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOn(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOn(false)}
      onPointerUp={(e) => e.pointerType !== "mouse" && setOn((o) => !o)}
      // Keyboard focus only; a tap also focuses, and the tap handler owns that.
      onFocus={(e) => e.currentTarget.matches(":focus-visible") && setOn(true)}
      onBlur={() => setOn(false)}
    >
      <h3>{title}</h3>
      <p>{body}</p>
      {effect === "bubbles" && <Bubbles on={on} />}
      {effect === "stamina" && <span className="stamina" aria-hidden><i /></span>}
      {effect === "dnf" && <Dnf on={on} />}
      {effect === "letterbox" && (
        <>
          <span className="lb lb-top" aria-hidden />
          <span className="lb lb-bottom" aria-hidden />
        </>
      )}
    </li>
  );
}

function Bubbles({ on }: { on: boolean }) {
  const [list, setList] = useState<{ id: number; x: number; s: number; d: number }[]>([]);
  const id = useRef(0);
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => {
      const b = { id: id.current++, x: Math.random() * 100, s: 4 + Math.random() * 9, d: 1.6 + Math.random() * 1.4 };
      setList((l) => [...l.slice(-14), b]);
    }, 140);
    return () => clearInterval(t);
  }, [on]);
  return (
    <span className="bubbles" aria-hidden>
      {list.map((b) => (
        <i
          key={b.id}
          style={{ left: `${b.x}%`, width: b.s, height: b.s, animationDuration: `${b.d}s` }}
        />
      ))}
    </span>
  );
}

const DNF = [
  "$ sudo dnf upgrade --refresh",
  "Downloading packages... 41%",
  "Downloading packages... 87%",
  "Running transaction (1/312)",
  "Running transaction (312/312)",
  "Complete! Time to reinstall anyway.",
];

function Dnf({ on }: { on: boolean }) {
  const [i, setI] = useState(-1);
  useEffect(() => {
    if (!on) {
      setI(-1);
      return;
    }
    setI(0);
    const t = setInterval(() => setI((n) => (n < DNF.length - 1 ? n + 1 : n)), 520);
    return () => clearInterval(t);
  }, [on]);
  return (
    <code className="dnf" aria-hidden>
      {i >= 0 ? DNF[i] : " "}
    </code>
  );
}
