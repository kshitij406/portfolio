'use client';

import { useEffect, useState } from 'react';
import { Unlink2, Link2 } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { PROFILE } from '@/data/site';

// Off the clock's cards listen for this on window: a plain DOM event
// instead of context/state, since Nav and Surface never otherwise share
// state and this is a one-off gimmick toggle, not app state.
export const UNLINK_EVENT = 'off-clock:unlink';

/**
 * Six, not the previous eight. "Off the clock" and "Find me" wrapped onto a
 * second line well above 1240px, so the first element a visitor parsed looked
 * broken. Education is 30 seconds of content and does not need its own entry,
 * and "Log" / "Find me" were opaque from outside, so they read as About and
 * Contact now. The section ids are unchanged.
 */
const SECTIONS = [
  { id: 'log', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'built', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'surface', label: 'Off the clock' },
  { id: 'status', label: 'Contact' },
];

// Scroll-spy still watches the sections that lost their nav entry, otherwise
// the highlight sticks on the previous item while you scroll past them.
const SPY_IDS = [...SECTIONS.map((s) => s.id), 'education', 'elsewhere'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [unlinked, setUnlinked] = useState(false);

  const toggleUnlink = () => {
    const next = !unlinked;
    setUnlinked(next);
    window.dispatchEvent(new CustomEvent(UNLINK_EVENT, { detail: next }));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'color-mix(in srgb, var(--paper) 86%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
      }}
    >
      <nav className="shell flex items-center justify-between h-16">
        <a href="#top" className="mono flex items-baseline gap-2 no-underline group">
          <span
            className="text-[0.8125rem] tracking-[0.06em]"
            style={{ color: 'var(--ink)' }}
          >
            {PROFILE.name}
          </span>
          <span
            className="text-[0.625rem] tracking-[0.16em] uppercase hidden sm:inline transition-colors"
            style={{ color: 'var(--ink-4)' }}
          >
            / {PROFILE.role}
          </span>
        </a>

        {/*
          Bracketed labels. The brackets sit a shade back from the word so they
          read as annotation marks rather than punctuation you have to parse.
        */}
        <ul className="hidden md:flex items-center gap-5 list-none m-0 p-0">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="mono text-[0.6875rem] tracking-[0.14em] uppercase no-underline transition-colors duration-300"
                style={{ color: active === s.id ? 'var(--signal)' : 'var(--ink-3)' }}
              >
                <span style={{ color: 'var(--ink-4)' }}>[</span>
                {s.label}
                <span style={{ color: 'var(--ink-4)' }}>]</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          {/*
            Below md the section list is hidden and there was no way at all to
            navigate: a phone visitor who wanted to get in touch had to swipe
            through the whole page. These are the two destinations worth a
            shortcut, in the same bracketed style as the full nav.
          */}
          <div className="flex items-center gap-3 md:hidden">
            {[
              { id: 'built', label: 'Projects' },
              { id: 'status', label: 'Contact' },
            ].map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="mono text-[0.6875rem] tracking-[0.14em] uppercase no-underline"
                style={{ color: active === s.id ? 'var(--signal)' : 'var(--ink-3)' }}
              >
                <span style={{ color: 'var(--ink-4)' }}>[</span>
                {s.label}
                <span style={{ color: 'var(--ink-4)' }}>]</span>
              </a>
            ))}
          </div>

          {/*
            Desktop only: dragging cards competes with scrolling on touch, and
            the mobile bar has no room for a gimmick toggle. Needs the `!`
            override because .theme-toggle sets display:inline-flex and is
            declared after Tailwind's utilities, so plain `hidden` loses.
          */}
          <button
            onClick={toggleUnlink}
            className="theme-toggle max-md:!hidden"
            type="button"
            aria-pressed={unlinked}
            aria-label={
              unlinked ? 'Lock the off the clock cards back in place' : 'Unlink the off the clock cards to drag them'
            }
            title="Off the clock cards: unlink to drag"
            style={unlinked ? { color: 'var(--signal)', borderColor: 'var(--signal)' } : undefined}
          >
            {unlinked ? <Link2 size={15} strokeWidth={2} /> : <Unlink2 size={15} strokeWidth={2} />}
          </button>
          <ThemeToggle />
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-[0.6875rem] tracking-[0.14em] uppercase no-underline md:hidden"
            style={{ color: 'var(--signal)' }}
          >
            <span style={{ color: 'var(--ink-4)' }}>[</span>
            CV
            <span style={{ color: 'var(--ink-4)' }}>]</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
