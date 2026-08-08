'use client';

import { useEffect, useState } from 'react';
import { Monitor } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme, setTheme, hasFinePointer } from '@/lib/theme';
import { PROFILE } from '@/data/site';

/**
 * Its own button, deliberately not folded into ThemeToggle's cycle: entering
 * desktop mode should be a click a visitor meant to make, not a third stop
 * they land on while flipping light/dark. Hidden entirely without a fine
 * pointer, same reasoning as theme.ts's forDevice() fallback: desktop mode
 * assumes a mouse.
 */
function DesktopModeButton() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(hasFinePointer()), []);
  if (!show) return null;

  return (
    <button
      onClick={() => setTheme('desktop')}
      className="theme-toggle"
      type="button"
      aria-label="Enter desktop mode"
      title="Desktop mode"
    >
      <Monitor size={17} strokeWidth={2} />
    </button>
  );
}

/**
 * A static strip, not a fixed header. It scrolls away with the page like
 * any other section instead of pinning on top of Hero: just the name and
 * the theme controls, nothing that needs scroll-spy or a scroll listener
 * to back it. The section quick-links this used to carry are gone; the
 * site is a scroll, not an app with a nav bar.
 */
export default function Nav() {
  const theme = useTheme();

  // Desktop mode is its own full-screen component tree with its own
  // taskbar; this strip has nothing to do there.
  if (theme === 'desktop') return null;

  return (
    <header className="relative z-10" style={{ borderBottom: '1px solid var(--rule)' }}>
      <nav className="shell flex items-center justify-between py-5">
        <a href="#top" className="mono no-underline" style={{ color: 'var(--ink)' }}>
          <span className="text-[0.8125rem] tracking-[0.06em]">{PROFILE.name}</span>
        </a>
        <div className="flex items-center gap-3">
          <DesktopModeButton />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
