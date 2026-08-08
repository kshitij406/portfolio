'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaGithub } from 'react-icons/fa6';
import Magnet from './bits/Magnet';
import { PROFILE, SOCIAL_LINKS } from '@/data/site';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-hero]', { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('[data-hero-line] span', {
        yPercent: 115,
        duration: 1.15,
        stagger: 0.09,
      })
        .from('[data-hero-rule]', { scaleX: 0, duration: 1, ease: 'power3.inOut' }, '-=0.7')
        .from('[data-hero-meta]', { opacity: 0, y: 14, duration: 0.8, stagger: 0.08 }, '-=0.65')
        .from('[data-hero-body]', { opacity: 0, y: 18, duration: 0.9 }, '-=0.6')
        .from('[data-hero-cta]', { opacity: 0, y: 14, duration: 0.7, stagger: 0.08 }, '-=0.55')
        .from('[data-hero-scroll]', { opacity: 0, duration: 0.8 }, '-=0.3');
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      {/* Vanta topology mesh removed: background is now plain white, no
          animated backdrop. VantaTopology.tsx is kept for later re-use. */}

      <div className="shell relative z-10 pt-28 pb-20">
        {/*
          The one line a placement recruiter is scanning for, before the name.
          It used to live only in Status, roughly 11,000px down the page.
        */}
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-8">
          <span data-hero-meta className="label label-signal">
            Available July 2027
          </span>
          <span data-hero-meta className="label">
            12-month placement
          </span>
          <span data-hero-meta className="label">
            {PROFILE.from}
          </span>
        </div>

        {/*
          Each line is masked so the glyphs can slide up from nothing. The
          inner span is padded and the wrapper pulls the same amount back,
          so the mask has slack for any descender a future name might have.
        */}
        <h1 className="display display-caps text-[clamp(3.2rem,13vw,10.5rem)] mb-0">
          <span
            data-hero-line
            className="block overflow-hidden"
            style={{ marginBottom: '-0.18em' }}
          >
            <span className="block" style={{ paddingBottom: '0.18em' }}>
              Kshitij
            </span>
          </span>
          <span
            data-hero-line
            className="block overflow-hidden"
            style={{ marginBottom: '-0.18em' }}
          >
            <span
              className="block"
              style={{ paddingBottom: '0.18em', fontStyle: 'italic', color: 'var(--deep)' }}
            >
              Jha
            </span>
          </span>
        </h1>

        <div
          data-hero-rule
          className="origin-left my-8"
          style={{ height: '1px', background: 'var(--ink)' }}
        />

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-start">
          <p
            data-hero-body
            className="text-[clamp(1.05rem,2vw,1.375rem)] leading-[1.5] max-w-[46ch]"
            style={{ color: 'var(--ink-2)' }}
          >
            {PROFILE.blurb}
          </p>

          <div className="flex flex-col gap-5">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 m-0">
              <div data-hero-meta>
                <dt className="label mb-1">Now</dt>
                <dd className="mono text-[0.8125rem] m-0" style={{ color: 'var(--ink)' }}>
                  Dev intern, Imatic
                </dd>
              </div>
              <div data-hero-meta>
                <dt className="label mb-1">Next</dt>
                <dd className="mono text-[0.8125rem] m-0" style={{ color: 'var(--ink)' }}>
                  Placement, July 2027
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3 pt-1">
              <span data-hero-cta>
                <Magnet padding={40} magnetStrength={6}>
                  <a href="#work" className="btn btn--signal">
                    See the work
                  </a>
                </Magnet>
              </span>
              <span data-hero-cta>
                <Magnet padding={40} magnetStrength={6}>
                  <a
                    href="/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    CV ↗
                  </a>
                </Magnet>
              </span>
              <span data-hero-cta>
                <Magnet padding={40} magnetStrength={6}>
                  <a
                    href={SOCIAL_LINKS.github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    <FaGithub size={13} aria-hidden="true" />
                    GitHub ↗
                  </a>
                </Magnet>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        data-hero-scroll
        className="absolute bottom-6 left-0 right-0 z-10 pointer-events-none"
      >
        <div className="shell flex items-center justify-between gap-6">
          <span className="label">Scroll</span>
          <span className="label hidden sm:inline">
            {PROFILE.from}
          </span>
        </div>
      </div>
    </section>
  );
}
