'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import Magnet from '@/components/bits/Magnet';
import { PROFILE, SOCIAL_LINKS } from '@/data/site';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the mailto link below still works.
    }
  };

  const links = [
    SOCIAL_LINKS.github,
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.letterboxd,
    SOCIAL_LINKS.spotify,
    SOCIAL_LINKS.instagram,
  ];

  return (
    <section
      id="contact"
      className="section lg:pl-[46px]"
      style={{ paddingBottom: 'clamp(2rem, 4vw, 3.5rem)' }}
    >
      <div className="shell">
        <SectionHead no="06" title="Get in touch" />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <p
              className="display leading-[1.08] mb-7"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              I&rsquo;m looking for a{' '}
              <span style={{ color: 'var(--signal)', fontStyle: 'italic' }}>
                12-month placement
              </span>{' '}
              starting July 2027, and I&rsquo;ll answer anything before then.
            </p>

            <p className="prose text-[1rem] leading-[1.65] mb-8">
              Student visa holder from September 2026, eligible for full-time employment
              during the assessed placement year. If you want to talk about backends, Go
              concurrency, diving, or why a boss fight feels good, that also works.
            </p>

            <div className="flex flex-wrap gap-3">
              <Magnet padding={40} magnetStrength={6}>
                <a href={`mailto:${PROFILE.email}`} className="btn btn--signal">
                  Email me
                </a>
              </Magnet>
              <Magnet padding={40} magnetStrength={6}>
                <button onClick={copy} className="btn" type="button">
                  {copied ? 'Copied ✓' : 'Copy address'}
                </button>
              </Magnet>
              <Magnet padding={40} magnetStrength={6}>
                <a
                  href="/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  Download CV ↗
                </a>
              </Magnet>
            </div>
          </Reveal>

          <Reveal className="plate plate--ticked p-7" y={20}>
            <dl className="m-0 flex flex-col gap-5">
              <div>
                <dt className="label mb-1.5">Email</dt>
                <dd className="m-0">
                  <a href={`mailto:${PROFILE.email}`} className="link mono text-[0.875rem]">
                    {PROFILE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label mb-1.5">Phone</dt>
                <dd className="m-0 mono text-[0.875rem]" style={{ color: 'var(--ink-2)' }}>
                  {PROFILE.phone}
                </dd>
              </div>
              <div>
                <dt className="label mb-1.5">Based</dt>
                <dd className="m-0 mono text-[0.875rem]" style={{ color: 'var(--ink-2)' }}>
                  {PROFILE.from}
                  <br />
                  <span style={{ color: 'var(--ink-4)' }}>
                    → {PROFILE.to}, {PROFILE.movingOn}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="label mb-2.5">Elsewhere</dt>
                <dd className="m-0 flex flex-col gap-1.5">
                  {links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link mono text-[0.8125rem]"
                    >
                      {l.label} / {l.handle} ↗
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
