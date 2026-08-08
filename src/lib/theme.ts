'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'desktop';

const EVENT = 'kj-theme';

function normalize(v: string | undefined): Theme {
  return v === 'dark' || v === 'desktop' ? v : 'light';
}

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return normalize(document.documentElement.dataset.theme);
}

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  window.dispatchEvent(new CustomEvent<Theme>(EVENT, { detail: next }));
}

// Same signal TerminalGate/ShakeCursor already gate on: a phone has no fine
// pointer. Desktop mode assumes a mouse (dragging windows, a taskbar sized
// for a cursor), so it isn't offered there.
export function hasFinePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
}

function forDevice(t: Theme): Theme {
  return t === 'desktop' && !hasFinePointer() ? 'light' : t;
}

/**
 * Starts 'light' so the first client render matches whatever the server
 * sent (it has no way to know the visitor's stored theme), then syncs to
 * the real value on mount. The custom event is how Nav and page.tsx hear
 * about a change without a context provider. Falls back to 'light' for
 * 'desktop' on a phone even if that's what's stored, e.g. localStorage
 * synced from a desktop browser.
 */
export function useTheme(): Theme {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    setThemeState(forDevice(getTheme()));
    const onChange = (e: Event) => setThemeState(forDevice((e as CustomEvent<Theme>).detail));
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  return theme;
}
