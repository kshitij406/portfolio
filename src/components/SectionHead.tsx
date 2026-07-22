'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SectionHead({
  no,
  title,
  meta,
}: {
  no: string;
  title: string;
  meta?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // The underline draws itself in, like a rule being ruled.
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div className="section-head" style={{ borderBottom: 'none' }}>
      <div className="flex items-baseline gap-4 w-full">
        <span className="section-head__no">{no}</span>
        <h2 className="section-head__title display">{title}</h2>
        {meta && <span className="section-head__meta">{meta}</span>}
      </div>
      <div
        ref={ref}
        className="absolute left-0 right-0 bottom-0 origin-left"
        style={{ height: '1px', background: 'var(--ink)' }}
      />
    </div>
  );
}
