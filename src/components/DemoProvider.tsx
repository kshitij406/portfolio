'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import RetroWindow from '@/components/RetroWindow';

type Demo = { title: string; url: string };
type DemoContextValue = { openDemo: (demo: Demo) => void };

const DemoContext = createContext<DemoContextValue | null>(null);

/**
 * Owns the single live RetroWindow instance so anything on the page (the
 * project list, the hidden terminal) can open a demo without wiring props
 * through every layer in between.
 */
export function DemoProvider({ children }: { children: ReactNode }) {
  const [demo, setDemo] = useState<Demo | null>(null);

  const openDemo = useCallback((d: Demo) => setDemo(d), []);
  const closeDemo = useCallback(() => setDemo(null), []);

  return (
    <DemoContext.Provider value={{ openDemo }}>
      {children}
      {demo && <RetroWindow title={demo.title} url={demo.url} onClose={closeDemo} />}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within DemoProvider');
  return ctx;
}
