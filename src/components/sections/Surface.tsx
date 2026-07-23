'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import TileEffect from '@/components/TileEffect';
import { OFF_CLOCK, type TileEffectKind } from '@/data/content';

export default function Surface() {
  const [firing, setFiring] = useState<TileEffectKind | null>(null);

  return (
    <section id="surface" className="section lg:pl-[46px]">
      <div className="shell">
        <SectionHead no="05" title="Off the clock" meta="The non-CV half" />

        <Reveal className="grid md:grid-cols-2 xl:grid-cols-3 gap-3" stagger={0.07} y={22}>
          {OFF_CLOCK.map((item) => (
            <button
              key={item.heading}
              type="button"
              onClick={() => setFiring(item.effect as TileEffectKind)}
              className="plate off-clock-tile p-7 flex flex-col text-left w-full cursor-pointer"
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
                  onClick={(e) => e.stopPropagation()}
                  className="mono text-[0.6875rem] tracking-[0.12em] uppercase no-underline mt-4 self-start"
                  style={{ color: 'var(--signal)' }}
                >
                  {item.link.label} ↗
                </a>
              )}
            </button>
          ))}
        </Reveal>
      </div>

      {firing && <TileEffect kind={firing} onDone={() => setFiring(null)} />}
    </section>
  );
}
