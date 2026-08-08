'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLenis } from '@/lib/lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis drives the scroll position; GSAP's ticker drives Lenis.
 * Sharing one clock stops ScrollTrigger from reading a stale scroll value
 * and jittering pinned sections.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);
    setLenis(lenis);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links need to go through Lenis or they snap. Because we
    // preventDefault, the browser never updates location.hash itself, so do
    // it here: without this every section is unlinkable and the URL keeps
    // whatever hash it loaded with. replaceState rather than pushState, so a
    // reader does not have to walk back through every section they clicked
    // in order to leave the site.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: -24,
        onComplete: () => history.replaceState(null, '', id),
      });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
