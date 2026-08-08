'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import Magnet from '@/components/bits/Magnet';
import { PROFILE } from '@/data/site';

export default function Status() {
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

  return (
    <section
      id="status"
      className="section"
      style={{ paddingBottom: 'clamp(2rem, 4vw, 3.5rem)' }}
    >
      <div className="shell">
        <SectionHead no="07" title="Status" />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            {/* Availability, then the invitation, then the visa detail. The
                visa paragraph is the least interesting of the three and used
                to sit between the other two. */}
            <p
              className="display leading-[1.08] mb-7"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              I&rsquo;m looking for a{' '}
              <span style={{ color: 'var(--signal)', fontStyle: 'italic' }}>
                12-month placement
              </span>{' '}
              starting July 2027.
            </p>

            <p className="prose text-[1rem] leading-[1.65] mb-5">
              Questions are welcome long before then. If you want to talk about backends, Go
              concurrency, diving, or why a boss fight feels good, that also works.
            </p>

            <p className="prose text-[1rem] leading-[1.65] mb-8" style={{ color: 'var(--ink-3)' }}>
              Student visa holder from September 2026, eligible for full-time employment
              during the assessed placement year.
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
                  View CV ↗
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
                <dt className="label mb-1.5">Based</dt>
                <dd className="m-0 mono text-[0.875rem]" style={{ color: 'var(--ink-2)' }}>
                  {PROFILE.from}
                  <br />
                  <span style={{ color: 'var(--ink-4)' }}>University of Kent, stage 2</span>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
