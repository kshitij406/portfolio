"use client";

import { useEffect, useState } from "react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/**
 * Things for the curious.
 *  The Konami code turns on debug mode: every box outlined, a blueprint grid,
 *  and the layout laid bare. Same code turns it off.
 *  Opening devtools gets a note in the console.
 *  Leaving the tab changes its title.
 */
export default function Extras() {
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === KONAMI[i] ? i + 1 : k === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) {
        i = 0;
        setDebug((d) => !d);
      }
    };
    addEventListener("keydown", onKey);

    console.log(
      "%cHello, person who opens devtools.",
      "font: 600 16px system-ui; color: #d01f6b",
    );
    console.log(
      "This site is Next.js, two canvases, matter-js and a lot of plain CSS. No templates.\nThere are six anomalies on the page. The Konami code does something too.\nIf you're hiring: kshitij.j615@gmail.com",
    );

    const title = document.title;
    const onVis = () => {
      document.title = document.hidden ? "Come back, the deadlock misses you" : title;
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("debug", debug);
  }, [debug]);

  return debug ? (
    <div className="debug-badge" role="status">
      Debug mode. Every box, outlined. Enter the code again to leave.
    </div>
  ) : null;
}
