'use client';

import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: number;
  delay?: number;
  y?: number;
  id?: string;
  style?: CSSProperties;
};

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  stagger,
  delay = 0,
  y = 26,
  id,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Reduced motion: show everything, bind nothing.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { opacity: 1, y: 0 });
        gsap.set(Array.from(el.children), { opacity: 1, y: 0 });
        return;
      }

      const targets = stagger ? Array.from(el.children) : [el];
      if (!targets.length) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      // When staggering, the wrapper is just a container, so reveal it
      // immediately so only the children carry the animation.
      if (stagger) gsap.set(el, { opacity: 1 });

      gsap.set(targets, { opacity: 0, y });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [stagger, delay, y] }
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} id={id} style={style} data-reveal>
      {children}
    </Tag>
  );
}
