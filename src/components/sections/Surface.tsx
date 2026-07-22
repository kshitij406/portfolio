'use client';

import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { OFF_CLOCK } from '@/data/content';

export default function Surface() {
  return (
    <section id="surface" className="section lg:pl-[46px]">
      <div className="shell">
        <SectionHead no="05" title="Off the clock" meta="The non-CV half" />

        <Reveal className="grid md:grid-cols-2 xl:grid-cols-3 gap-px" stagger={0.07} y={22}>
          {OFF_CLOCK.map((item) => (
            <div
              key={item.heading}
              className="plate p-7 flex flex-col"
              style={{ boxShadow: 'none' }}
            >
              <h3
                className="display leading-none mb-3"
                style={{ fontSize: '1.5rem' }}
              >
                {item.heading}
              </h3>
              <p
                className="text-[0.9375rem] leading-[1.65] m-0 flex-1"
                style={{ color: 'var(--ink-2)' }}
              >
                {item.body}
              </p>
              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono text-[0.6875rem] tracking-[0.12em] uppercase no-underline mt-4 self-start"
                  style={{ color: 'var(--signal)' }}
                >
                  {item.link.label} ↗
                </a>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
