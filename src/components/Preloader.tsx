"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Once per session: a scan counts up, hiccups at 98 (an anomaly before the
 * page has even loaded), then lifts away. The head script decides whether it
 * runs by setting `is-loading` on <html> before first paint.
 */

const STAGES = [
  [0, "Loading the page"],
  [34, "Reading every glyph"],
  [61, "Checking time zones"],
  [86, "Counting punches"],
  [98, "Something is off"],
  [100, "Six anomalies found. Your turn"],
] as const;

export function signalReady() {
  document.documentElement.classList.remove("is-loading");
  window.dispatchEvent(new Event("kj:ready"));
}

export default function Preloader() {
  const [active, setActive] = useState(false);
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    if (!document.documentElement.classList.contains("is-loading")) {
      window.dispatchEvent(new Event("kj:ready"));
      return;
    }
    setActive(true);
    try {
      sessionStorage.setItem("kj-seen", "1");
    } catch {}

    const t0 = performance.now();
    // Ease towards 98, sit there, step back to 97, then jump to 100.
    const tick = (t: number) => {
      const e = t - t0;
      let v: number;
      if (e < 1100) v = Math.round(98 * (1 - Math.pow(1 - e / 1100, 3)));
      else if (e < 1350) v = 98;
      else if (e < 1600) v = 97;
      else v = 100;
      setN(v);
      if (e < 1900) raf.current = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        setTimeout(signalReady, 250);
        setTimeout(() => setActive(false), 1000);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  if (!active) return null;
  const stage = [...STAGES].reverse().find(([at]) => n >= at)![1];
  const glitch = n === 97;

  return (
    <div className={`preloader${leaving ? " leaving" : ""}`} aria-hidden>
      <div className="pre-scan" style={{ transform: `scaleX(${n / 100})` }} />
      <p className="pre-stage">{glitch ? "Wait. That went backwards." : stage}</p>
      <p className={`pre-num${glitch ? " glitch" : ""}`} data-n={n}>
        {n}
      </p>
    </div>
  );
}
