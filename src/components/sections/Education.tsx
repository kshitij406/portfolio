'use client';

import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { EDUCATION } from '@/data/content';

// Deliberately plain and quiet against the loud colour blocks either side of
// it: this hasn't happened yet, so it doesn't get to shout.
export default function Education() {
  return (
    <section id="education" className="section">
      <div className="shell">
        <SectionHead no="03" title="Education" meta="Where the degree is coming from" />

        <Reveal stagger={0.1} style={{ borderTop: '1px solid var(--ink)' }}>
          {EDUCATION.map((ed) => (
            <div
              key={ed.school}
              className="grid lg:grid-cols-[220px_1fr] gap-4 lg:gap-12 py-5"
              style={{ borderBottom: '1px solid var(--rule)' }}
            >
              <span className="label">{ed.period}</span>
              <div>
                <p className="mono text-[0.9375rem] m-0 mb-1" style={{ color: 'var(--ink)' }}>
                  {ed.school}
                </p>
                <p className="text-[0.9375rem] m-0" style={{ color: 'var(--ink-2)' }}>
                  {ed.qualification}
                </p>
                {ed.note && (
                  <p className="mono text-[0.75rem] mt-2 m-0" style={{ color: 'var(--ink-4)' }}>
                    {ed.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
