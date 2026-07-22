'use client';

import { useEffect, useRef } from 'react';

/**
 * Left-margin scroll indicator styled as a depth sounding gauge.
 * Reads out metres rather than a percentage, because it's a chart, not a progress bar.
 */
const MAX_DEPTH = 40;

export default function DepthRuler() {
  const fillRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`;
      }
      if (readoutRef.current) {
        const depth = (progress * MAX_DEPTH).toFixed(1);
        readoutRef.current.textContent = `${depth} m`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Tick marks every 5 m.
  const ticks = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="depth-ruler" aria-hidden="true">
      <div className="relative flex-1 w-px my-8" style={{ background: 'var(--rule)' }}>
        <div
          ref={fillRef}
          className="absolute inset-0 origin-top"
          style={{ background: 'var(--signal)', transform: 'scaleY(0)' }}
        />
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: `${(t / (ticks.length - 1)) * 100}%`,
              width: t % 2 === 0 ? '11px' : '6px',
              height: '1px',
              background: 'var(--rule)',
            }}
          />
        ))}
      </div>
      <span ref={readoutRef} className="depth-ruler__readout pb-6">
        0.0 m
      </span>
    </div>
  );
}
