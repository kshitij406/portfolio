'use client';

import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { EXPERIENCE, EDUCATION } from '@/data/content';

export default function Work() {
  return (
    <section id="work" className="section lg:pl-[46px]">
      <div className="shell">
        <SectionHead no="02" title="Where I've worked" meta="2026 to now" />

        <div className="flex flex-col">
          {EXPERIENCE.map((job, i) => (
            <Reveal
              key={job.company}
              className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-12 py-10 lg:py-14"
              style={{ borderTop: i === 0 ? 'none' : '1px solid var(--rule)' }}
            >
              {/* Left rail: the metadata */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {job.current && (
                    <span
                      className="inline-block w-[6px] h-[6px] rounded-full shrink-0"
                      style={{ background: 'var(--signal)' }}
                    />
                  )}
                  <span className="label" style={{ color: job.current ? 'var(--signal)' : undefined }}>
                    {job.period}
                  </span>
                </div>
                <span className="mono text-[0.75rem]" style={{ color: 'var(--ink-4)' }}>
                  {job.location}
                </span>
              </div>

              {/* Right: the substance */}
              <div>
                <h3
                  className="display leading-[1.05] mb-1"
                  style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)' }}
                >
                  {job.company}
                </h3>
                <p className="mono text-[0.8125rem] mb-5" style={{ color: 'var(--deep)' }}>
                  {job.role}
                </p>

                <p
                  className="mb-6 max-w-[52ch] text-[1.0625rem] leading-[1.55]"
                  style={{ color: 'var(--ink)', fontStyle: 'italic' }}
                >
                  {job.lede}
                </p>

                <ul className="list-none m-0 p-0 flex flex-col gap-3 mb-6 max-w-[62ch]">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-5 text-[0.9375rem] leading-[1.6]"
                      style={{ color: 'var(--ink-2)' }}
                    >
                      <span
                        className="absolute left-0 top-[0.7em] w-[9px]"
                        style={{ height: '1px', background: 'var(--signal)' }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Education, deliberately smaller, since it hasn't happened yet */}
        <Reveal
          className="mt-8 pt-10"
          stagger={0.1}
          style={{ borderTop: '1px solid var(--ink)' }}
        >
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
