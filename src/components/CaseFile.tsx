"use client";

import { useEffect, useRef, useState } from "react";
import { ANOMALIES, useAnomalies } from "@/lib/anomalies";

export default function CaseFile() {
  const { found, lastFound, reset } = useAnomalies();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [verdict, setVerdict] = useState(false);
  const prev = useRef(found.size);
  const n = found.size;
  const all = n === ANOMALIES.length;

  useEffect(() => {
    if (!lastFound || n <= prev.current) {
      prev.current = n;
      return;
    }
    prev.current = n;
    const a = ANOMALIES.find((x) => x.id === lastFound)!;
    setToast(a.id);
    const id = setTimeout(() => setToast(null), 5200);
    if (n === ANOMALIES.length) {
      const v = setTimeout(() => setVerdict(true), 1400);
      return () => {
        clearTimeout(id);
        clearTimeout(v);
      };
    }
    return () => clearTimeout(id);
  }, [lastFound, n]);

  useEffect(() => {
    if (!verdict && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVerdict(false);
        setOpen(false);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [verdict, open]);

  // Keep the last message rendered while the toast slides out.
  const lastToast = useRef<string | null>(null);
  if (toast) lastToast.current = toast;
  const t = lastToast.current ? ANOMALIES.find((a) => a.id === lastToast.current) : null;

  return (
    <>
      <div className={`casefile${open ? " open" : ""}`}>
        {open && (
          <div className="cf-panel" role="dialog" aria-label="Anomalies">
            <p className="cf-title">
              {all ? "All six found." : `${n} of 6 found. Hints for the rest:`}
            </p>
            <ol className="cf-list">
              {ANOMALIES.map((a) => {
                const got = found.has(a.id);
                return (
                  <li key={a.id} className={got ? "got" : ""}>
                    <strong>{got ? a.name : "Unsolved"}</strong>
                    <span>{got ? a.found : a.hint}</span>
                  </li>
                );
              })}
            </ol>
            <div className="cf-actions">
              {all && (
                <button type="button" className="btn" onClick={() => setVerdict(true)}>
                  See the verdict
                </button>
              )}
              {n > 0 && (
                <button type="button" className="link-btn" onClick={reset}>
                  Break everything again
                </button>
              )}
            </div>
          </div>
        )}
        <button
          type="button"
          className="cf-pill magnetic"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Ring n={n} />
          <span>
            {n} of 6 <span className="cf-pill-long">anomalies found</span>
          </span>
        </button>
      </div>

      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        {t && (
          <>
            <span className="toast-n">{n}/6</span>
            <span>
              <strong>{t.name}.</strong> {t.found}
            </span>
          </>
        )}
      </div>

      {verdict && <Verdict onClose={() => setVerdict(false)} />}
    </>
  );
}

function Ring({ n }: { n: number }) {
  const c = 2 * Math.PI * 9;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="cf-ring">
      <circle cx="11" cy="11" r="9" className="cf-ring-bg" />
      <circle
        cx="11"
        cy="11"
        r="9"
        className="cf-ring-fg"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - n / 6)}
      />
    </svg>
  );
}

/**
 * The payoff, written the way FraudLens explains itself: a deterministic
 * score, every point listed next to the evidence for it.
 */
function Verdict({ onClose }: { onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    close.current?.focus();
    document.documentElement.classList.add("no-scroll");
    return () => document.documentElement.classList.remove("no-scroll");
  }, []);

  return (
    <div className="verdict-scrim" onClick={onClose}>
      <div
        className="verdict"
        role="dialog"
        aria-modal="true"
        aria-labelledby="verdict-h"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="verdict-kicker">Case closed. Report on the candidate.</p>
        <h2 id="verdict-h" className="verdict-h">
          Verdict: worth an interview
        </h2>
        <div className="verdict-score">
          <span>100</span>
          <span className="verdict-of">out of 100, rules only, no model consulted</span>
        </div>
        <ul className="verdict-lines">
          {ANOMALIES.map((a) => (
            <li key={a.id}>
              <span className="pts">+{a.points}</span>
              <span>
                <strong>{a.name}</strong>
                <q>{a.found}</q>
              </span>
            </li>
          ))}
        </ul>
        <p className="verdict-note">
          You found everything I hid. I&rsquo;d like to hear what you&rsquo;re working on.
        </p>
        <div className="verdict-actions">
          <a className="btn" href="mailto:kshitij.j615@gmail.com?subject=Found%20all%20six">
            Email Kshitij
          </a>
          <button type="button" className="link-btn" onClick={onClose} ref={close}>
            Back to the page
          </button>
        </div>
      </div>
    </div>
  );
}
