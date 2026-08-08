'use client';

import { useEffect, useState } from 'react';
import { PROFILE, SOCIAL_LINKS } from '@/data/site';

const MARQUEE = [
  'Go',
  'C#',
  'Python',
  'TypeScript',
  'MSSQL',
  'Docker',
  'Fedora',
  'goroutines',
  'stored procedures',
  'ATR stops',
  'Anton',
];

export default function SiteFooter() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/London',
          hour12: false,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10">
      {/* Drifting keyword band, the chart legend */}
      <div
        className="py-4 overflow-hidden"
        style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}
      >
        <div className="drift-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {MARQUEE.map((word) => (
                <span
                  key={word}
                  className="mono text-[0.6875rem] tracking-[0.16em] uppercase px-6"
                  style={{ color: 'var(--ink-4)' }}
                >
                  {word}
                  <span style={{ color: 'var(--signal)' }} className="ml-6">
                    ◦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="shell py-10 flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-end">
        <div>
          <p className="display display-caps m-0 leading-none" style={{ fontSize: '1.75rem' }}>
            {PROFILE.name}
          </p>
          <p className="mono text-[0.6875rem] tracking-[0.14em] uppercase m-0 mt-2" style={{ color: 'var(--ink-4)' }}>
            Built with Next.js, GSAP and Lenis. Typeset in Anton, Inter and Martian Mono.
          </p>
          <p className="mono text-[0.6875rem] tracking-[0.1em] m-0 mt-1 normal-case" style={{ color: 'var(--ink-4)' }}>
            Gazebo still: NASA–JSC Space Robotics Challenge, CC BY-SA 4.0.
          </p>
        </div>

        <div className="text-left sm:text-right flex flex-col sm:items-end gap-1">
          {/*
            The terminal was unfindable: nothing on the page said it existed.
            One line here keeps the surprise but gives it a door. Desktop only,
            matching TerminalGate, which never binds the key on touch.
          */}
          <p className="mono text-[0.6875rem] tracking-[0.14em] uppercase m-0 hidden md:block" style={{ color: 'var(--ink-4)' }}>
            Press <kbd style={{ color: 'var(--signal)', font: 'inherit' }}>`</kbd> for a terminal
          </p>
          <p className="mono text-[0.6875rem] tracking-[0.14em] uppercase m-0" style={{ color: 'var(--ink-4)' }}>
            Canterbury, {time ?? '--:--'} UK
          </p>
          <a
            href={SOCIAL_LINKS.buymeacoffee.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-[0.6875rem] tracking-[0.14em] uppercase no-underline"
            style={{ color: 'var(--ink-4)' }}
          >
            Buy me a coffee ↗
          </a>
          <p className="mono text-[0.6875rem] tracking-[0.14em] uppercase m-0" style={{ color: 'var(--ink-4)' }}>
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
