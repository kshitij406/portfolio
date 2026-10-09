"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * Six things on the page are quietly wrong. Each one is a small version of a
 * real fault from the work below it. Finding them is optional, and remembered
 * per browser.
 */
export const ANOMALIES = [
  {
    id: "glyph",
    name: "The impostor letter",
    hint: "Not every letter in my name is the letter it looks like.",
    found: "A Cyrillic і (U+0456) hiding in a Latin name. FraudLens catches mсb.mu the same way.",
    points: 20,
  },
  {
    id: "clock",
    name: "Wrong time zone",
    hint: "Somebody's clock never left Dar es Salaam.",
    found: "The clock said Canterbury but ran on East Africa Time. Time zones are always the bug.",
    points: 10,
  },
  {
    id: "punches",
    name: "The vanishing punches",
    hint: "Two doors, same minute. One of them goes missing.",
    found: "2,478 punches restored by putting the checkpoint in the unique index.",
    points: 25,
  },
  {
    id: "test",
    name: "One red test",
    hint: "631 tests. Count the green ones.",
    found: "Test 418 fixed. The suite is green again.",
    points: 15,
  },
  {
    id: "vessel",
    name: "A vessel goes dark",
    hint: "Something stopped transmitting where it shouldn't have.",
    found: "Flagged the vessel that switched off AIS inside a protected zone.",
    points: 20,
  },
  {
    id: "deadlock",
    name: "Two goroutines, waiting forever",
    hint: "Two workers each hold what the other one needs.",
    found: "Deadlock broken by taking the locks in a fixed order.",
    points: 10,
  },
] as const;

export type AnomalyId = (typeof ANOMALIES)[number]["id"];

type Ctx = {
  found: Set<AnomalyId>;
  flag: (id: AnomalyId) => void;
  reset: () => void;
  lastFound: AnomalyId | null;
};

const AnomalyContext = createContext<Ctx | null>(null);
const KEY = "kj-anomalies";

export function AnomalyProvider({ children }: { children: React.ReactNode }) {
  const [found, setFound] = useState<Set<AnomalyId>>(new Set());
  const [lastFound, setLastFound] = useState<AnomalyId | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setFound(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  const flag = useCallback((id: AnomalyId) => {
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem(KEY, JSON.stringify([...next]));
      } catch {}
      setLastFound(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setFound(new Set());
    setLastFound(null);
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }, []);

  return (
    <AnomalyContext.Provider value={{ found, flag, reset, lastFound }}>
      {children}
    </AnomalyContext.Provider>
  );
}

export function useAnomalies() {
  const ctx = useContext(AnomalyContext);
  if (!ctx) throw new Error("useAnomalies needs AnomalyProvider");
  return ctx;
}
