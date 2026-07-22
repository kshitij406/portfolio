'use client';

import { useEffect, useState } from 'react';
import { PROFILE } from '@/data/site';

const SECTIONS = [
  { id: 'log', label: 'Log' },
  { id: 'work', label: 'Work' },
  { id: 'built', label: 'Built' },
  { id: 'stack', label: 'Stack' },
  { id: 'surface', label: 'Off the clock' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

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

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(239, 235, 226, 0.86)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
      }}
    >
      <nav className="shell flex items-center justify-between h-16 lg:pl-[46px]">
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
      </nav>
    </header>
  );
}
