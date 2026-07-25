'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import ConcurrencyDiagram from '@/components/ConcurrencyDiagram';
import { useDemo } from '@/components/DemoProvider';
import { PROJECTS } from '@/data/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Built() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>(PROJECTS[0].name);
  const { openDemo } = useDemo();

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-row]', { opacity: 1, y: 0 });
        return;
      }

      gsap.from('[data-row]', {
        opacity: 0,
        y: 30,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-rows]', start: 'top 82%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="built" className="section lg:pl-[46px]">
      <div className="shell">
        <SectionHead no="03" title="Things I've built" meta={`${PROJECTS.length} selected`} />

        <div data-rows style={{ borderTop: '1px solid var(--ink)' }}>
          {PROJECTS.map((p, i) => {
            const isOpen = open === p.name;
            const prev = PROJECTS[i - 1];
            const startsSprints = p.tier === 'sprint' && prev?.tier !== 'sprint';

            return (
              <article
                key={p.name}
                data-row
                style={{ borderBottom: '1px solid var(--rule)' }}
              >
                {startsSprints && (
                  <div
                    className="pt-10 pb-5 pl-5 mb-2"
                    style={{ borderLeft: '3px solid var(--signal)' }}
                  >
                    <p
                      className="mono uppercase m-0 mb-2"
                      style={{
                        fontSize: '0.8125rem',
                        letterSpacing: '0.13em',
                        color: 'var(--signal)',
                        fontWeight: 600,
                      }}
                    >
                      Weekends, hackathons, team builds
                    </p>
                    <p
                      className="text-[1.0625rem] leading-[1.6] m-0 max-w-[58ch]"
                      style={{ color: 'var(--ink-2)' }}
                    >
                      Shipped fast and with help. Some of it mine, some of it a
                      teammate&rsquo;s, some of it a model&rsquo;s. Worth showing, worth
                      being straight about.
                    </p>
                  </div>
                )}
                <button
                  onClick={() => setOpen(isOpen ? null : p.name)}
                  aria-expanded={isOpen}
                  className="w-full text-left bg-transparent border-0 cursor-pointer py-6 px-0 flex items-baseline gap-4 sm:gap-8 group"
                >
                  <span
                    className="mono text-[0.6875rem] shrink-0 tabular-nums pt-2"
                    style={{ color: 'var(--ink-4)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="flex-1 min-w-0">
                    <span
                      className="display block leading-[1.05] transition-colors duration-300"
                      style={{
                        fontSize: 'clamp(1.5rem, 3.6vw, 2.6rem)',
                        color: isOpen ? 'var(--signal)' : 'var(--ink)',
                      }}
                    >
                      {p.name}
                    </span>
                    {p.badge && (
                      <span
                        className="mono text-[0.6875rem] tracking-[0.08em] mt-1 inline-block"
                        style={{ color: 'var(--deep)' }}
                      >
                        ★ {p.badge}
                      </span>
                    )}
                  </span>

                  <span
                    className="mono text-[0.6875rem] tracking-[0.12em] uppercase shrink-0 hidden sm:block pt-2"
                    style={{ color: 'var(--ink-3)' }}
                  >
                    {p.lang}
                  </span>
                  <span
                    className="mono text-[0.6875rem] shrink-0 tabular-nums pt-2 hidden sm:block"
                    style={{ color: 'var(--ink-4)' }}
                  >
                    {p.year}
                  </span>

                  <span
                    className="mono text-[1.1rem] shrink-0 pt-1 transition-transform duration-300"
                    style={{
                      color: isOpen ? 'var(--signal)' : 'var(--ink-4)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {/* Grid-rows trick: animates to auto height without JS measurement */}
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-500"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="overflow-hidden">
                    {p.shot && (
                      <div className="sm:pl-[3.25rem] pb-8">
                        <div className="plate plate--ticked" style={{ boxShadow: 'none' }}>
                          <Image
                            src={p.shot}
                            alt={`${p.name} — live interface`}
                            width={1000}
                            height={499}
                            className="block w-full h-auto"
                          />
                        </div>
                        <p className="label mt-2 mb-0">Fig. {String(i + 1).padStart(2, '0')} — live capture</p>
                      </div>
                    )}
                    <div className="pb-9 sm:pl-[3.25rem] grid lg:grid-cols-2 gap-8 lg:gap-14">
                      <div>
                        <p className="label mb-2">Why</p>
                        <p
                          className="m-0 text-[1rem] leading-[1.55]"
                          style={{ color: 'var(--ink)', fontStyle: 'italic' }}
                        >
                          {p.why}
                        </p>
                      </div>
                      <div>
                        <p className="label mb-2">What it is</p>
                        <p
                          className="m-0 text-[0.9375rem] leading-[1.65] mb-5"
                          style={{ color: 'var(--ink-2)' }}
                        >
                          {p.what}
                        </p>
                        <div className="flex flex-wrap gap-2 items-center">
                          {p.stack.map((s) => (
                            <span key={s} className="chip">
                              {s}
                            </span>
                          ))}
                          {p.href && (
                            <a
                              href={p.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mono text-[0.6875rem] tracking-[0.12em] uppercase no-underline ml-1"
                              style={{ color: 'var(--signal)' }}
                            >
                              Source ↗
                            </a>
                          )}
                          {p.live && (
                            <button
                              type="button"
                              className="retro-trigger"
                              onClick={() => openDemo({ title: p.name, url: p.live as string })}
                            >
                              <Play size={9} strokeWidth={3} fill="currentColor" />
                              RUN DEMO
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {p.name === 'Concurrent TCP Chat Server' && (
                      <Reveal className="sm:pl-[3.25rem] pb-9">
                        <ConcurrencyDiagram />
                      </Reveal>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
