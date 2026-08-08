'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { type Theme, getTheme, setTheme as applyTheme } from '@/lib/theme';

/**
 * Light/dark only. Desktop mode isn't part of this cycle: it has its own
 * explicit trigger next to this button (DesktopModeButton in Nav.tsx), so
 * a visitor clicking this repeatedly to flip light/dark never lands on it
 * by accident.
 */
export default function ThemeToggle() {
  // Starts null so the button renders nothing until it can read the real
  // value the inline script in layout.tsx already set on <html>, avoiding
  // a mismatch between server and client markup.
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => setThemeState(getTheme()), []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setThemeState(next);
  };

  if (!theme) return null;

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      type="button"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
    </button>
  );
}
