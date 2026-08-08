'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  // Starts null so the button renders nothing until it can read the real
  // value the inline script in layout.tsx already set on <html>, avoiding
  // a mismatch between server and client markup.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    if (!theme) return;
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  if (!theme) return null;
  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      type="button"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Icon size={17} strokeWidth={2} />
    </button>
  );
}
