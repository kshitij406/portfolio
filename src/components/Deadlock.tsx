"use client";

import { useEffect, useRef, useState } from "react";
import { useAnomalies } from "@/lib/anomalies";

/**
 * Two goroutines, two mutexes. The second takes them in the opposite order,
 * so each ends up holding what the other is waiting for. Clicking the second
 * goroutine's first Lock() swaps its order and the program runs.
 *
 * Lines: 0 first Lock, 1 second Lock, 2 work, 3 unlock both, 4 done.
 */

type G = { line: number; waitedMs: number };

export default function Deadlock() {
  const { found, flag } = useAnomalies();
  const fixed = found.has("deadlock");
  const [g1, setG1] = useState<G>({ line: 0, waitedMs: 0 });
  const [g2, setG2] = useState<G>({ line: 0, waitedMs: 0 });
  const [runs, setRuns] = useState(0);
  const state = useRef({ g1: { line: 0, waitedMs: 0 }, g2: { line: 0, waitedMs: 0 }, holder: { a: 0, b: 0 } });

  useEffect(() => {
    const s = state.current;
    s.g1 = { line: 0, waitedMs: 0 };
    s.g2 = { line: 0, waitedMs: 0 };
    s.holder = { a: 0, b: 0 };
    const order: Record<1 | 2, ("a" | "b")[]> = { 1: ["a", "b"], 2: fixed ? ["a", "b"] : ["b", "a"] };
    const TICK = 650;

    const step = (id: 1 | 2) => {
      const g = id === 1 ? s.g1 : s.g2;
      if (g.line <= 1) {
        const lock = order[id][g.line];
        if (s.holder[lock] === 0 || s.holder[lock] === id) {
          s.holder[lock] = id;
          g.line++;
          g.waitedMs = 0;
        } else {
          g.waitedMs += TICK;
        }
      } else if (g.line === 2) {
        g.line = 3;
      } else if (g.line === 3) {
        s.holder.a = s.holder.a === id ? 0 : s.holder.a;
        s.holder.b = s.holder.b === id ? 0 : s.holder.b;
        g.line = 4;
        if (fixed) setRuns((r) => r + 1);
      } else {
        g.line = 0;
      }
    };

    // Stagger the two so the deadlock happens the same way every time.
    let tick = 0;
    const id = setInterval(() => {
      if (tick % 2 === 0) step(1);
      else step(2);
      tick++;
      setG1({ ...s.g1 });
      setG2({ ...s.g2 });
    }, TICK / 2);
    return () => clearInterval(id);
  }, [fixed]);

  const stuck = !fixed && g1.waitedMs > 1300 && g2.waitedMs > 1300;
  const status = (g: G, other: string) =>
    g.line <= 1 && g.waitedMs > 0
      ? `waiting ${(g.waitedMs / 1000).toFixed(1)}s for ${other}`
      : g.line === 2 || g.line === 3
        ? "holding both, working"
        : g.line === 4
          ? "done"
          : "running";

  const order2 = fixed ? ["a", "b"] : ["b", "a"];

  return (
    <figure className={`demo deadlock${stuck ? " is-stuck" : ""}${fixed ? " is-fixed" : ""}`}>
      <div className="go-cols">
        <Routine name="transferA" order={["a", "b"]} g={g1} status={status(g1, "b")} />
        <Routine
          name="transferB"
          order={order2}
          g={g2}
          status={status(g2, g2.line === 0 ? order2[0] : order2[1])}
          onSwap={fixed ? undefined : () => flag("deadlock")}
        />
      </div>
      <figcaption aria-live="polite">
        {fixed
          ? `Both goroutines take a before b now. ${runs} ${runs === 1 ? "transfer" : "transfers"} completed, no waiting.`
          : stuck
            ? "Deadlocked. Each goroutine holds the lock the other needs, and neither will let go. Click the line that's in the wrong order."
            : "Two goroutines, two locks. Watch what happens."}
      </figcaption>
    </figure>
  );
}

function Routine({
  name,
  order,
  g,
  status,
  onSwap,
}: {
  name: string;
  order: readonly string[];
  g: G;
  status: string;
  onSwap?: () => void;
}) {
  const waiting = g.waitedMs > 0;
  const lines = [
    <>
      {order[0]}.<span className="fn">Lock</span>()
    </>,
    <>
      {order[1]}.<span className="fn">Lock</span>()
    </>,
    <>
      <span className="cm">{"// move money"}</span>
    </>,
    <>
      {order[1]}.<span className="fn">Unlock</span>(); {order[0]}.<span className="fn">Unlock</span>()
    </>,
  ];
  return (
    <div className="go">
      <pre className="code">
        <code>
          <span className="k">go func</span> {name}() {"{"}
          {"\n"}
          {lines.map((l, i) => {
            const cls = `ln${g.line === i ? (waiting ? " ln-wait" : " ln-run") : ""}`;
            return i === 0 && onSwap ? (
              <button type="button" key={i} className={`${cls} ln-swap`} onClick={onSwap} aria-label={`Swap lock order in ${name}`}>
                {"  "}
                {l}
                {"\n"}
              </button>
            ) : (
              <span key={i} className={cls}>
                {"  "}
                {l}
                {"\n"}
              </span>
            );
          })}
          {"}"}
        </code>
      </pre>
      <p className={`go-status${waiting ? " waiting" : ""}`}>{status}</p>
    </div>
  );
}
