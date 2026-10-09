"use client";

import { useAnomalies } from "@/lib/anomalies";

const COUNT = 631;
const BROKEN = 417; // test 418, zero-indexed

export default function TestGrid() {
  const { found, flag } = useAnomalies();
  const fixed = found.has("test");

  return (
    <figure className={`tests${fixed ? " is-fixed" : ""}`}>
      <div className="test-grid">
        {Array.from({ length: COUNT }, (_, i) =>
          i === BROKEN && !fixed ? (
            <button
              key={i}
              type="button"
              className="t t-fail"
              aria-label="Test 418, failing. Fix it."
              onClick={() => flag("test")}
            />
          ) : (
            <span key={i} className={`t${i === BROKEN ? " t-healed" : ""}`} />
          ),
        )}
      </div>
      <figcaption>
        {fixed ? "631 of 631 backend tests passing." : "630 of 631 backend tests passing."}
      </figcaption>
    </figure>
  );
}
