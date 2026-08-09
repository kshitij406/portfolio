'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Network, TrendingUp, ShoppingCart, Disc3, ScanSearch, CloudSun, Car, type LucideIcon } from 'lucide-react';
import SectionHead from '@/components/SectionHead';
import Fold from '@/components/Fold';
import CaseStudyBlock, { type CaseStudyBg } from '@/components/CaseStudyBlock';
import ConcurrencyDiagram from '@/components/ConcurrencyDiagram';
import { AtrDiagram, EnsembleDiagram, TwoProcessDiagram } from '@/components/ProjectDiagrams';
import { useDemo } from '@/components/DemoProvider';
import { PROJECTS } from '@/data/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Cycles through all four block colours, so no two blocks in a row match.
const BG_CYCLE: CaseStudyBg[] = ['paper', 'signal', 'ink', 'deep'];

/**
 * Projects with no interface to screenshot get a drawing of the one idea
 * worth seeing instead. These used to be captures of the GitHub repo page,
 * which showed a file listing and told a visitor nothing.
 *
 * ConcurrencyDiagram is the exception: it is drawn in ink/paper tones, so it
 * only reads correctly on a 'paper' block. TCP is index 0 and BG_CYCLE[0] is
 * 'paper', which is what keeps it legible. Re-check if PROJECTS reorders.
 * The three below inherit currentColor and work on any block colour.
 */
const PROJECT_DIAGRAM: Record<string, (p: { accent?: string }) => React.ReactElement> = {
  'Concurrent TCP Chat Server': () => <ConcurrencyDiagram />,
  'Metals CFD Trading Bot': AtrDiagram,
  VendingMachine: TwoProcessDiagram,
  'Polymarket Weather Bot': EnsembleDiagram,
};

// No real app icons exist for these (backend tools, CLIs, bots), so each
// gets a single themed glyph instead, the same floating-badge treatment as a
// real app icon would get, honest about not having one.
const PROJECT_ICON: Record<string, LucideIcon> = {
  'Concurrent TCP Chat Server': Network,
  'Metals CFD Trading Bot': TrendingUp,
  VendingMachine: ShoppingCart,
  'Seraphim Records': Disc3,
  NitiLens: ScanSearch,
  'Polymarket Weather Bot': CloudSun,
  'Halo Student Drives': Car,
};

export default function Built() {
  const root = useRef<HTMLElement>(null);
  const { openDemo } = useDemo();

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-row]', { opacity: 1, y: 0 });
        return;
      }

      gsap.utils.toArray<HTMLElement>('[data-row]').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 92%', once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="built" className="relative">
      <div className="shell" style={{ paddingTop: 'clamp(4.5rem, 11vw, 9rem)' }}>
        <SectionHead no="04" title="Things I've built" meta={`${PROJECTS.length} selected`} />
      </div>

      {PROJECTS.map((p, i) => {
        const prev = PROJECTS[i - 1];
        const startsSprints = p.tier === 'sprint' && prev?.tier !== 'sprint';
        const bg = BG_CYCLE[i % BG_CYCLE.length];
        const Diagram = PROJECT_DIAGRAM[p.name];
        // var(--paper) would flip to black on a saturated block in dark mode,
        // so colour blocks get a literal white, matching CaseStudyBlock's TEXT.
        const diagramAccent = bg === 'paper' ? 'var(--signal)' : '#ffffff';

        return (
          <CaseStudyBlock
            key={p.name}
            index={i}
            first={i === 0}
            bg={bg}
            eyebrow={`${p.lang}, ${p.year}`}
            title={p.name}
            badge={p.badge}
            body={
              <>
                <p className="m-0 mb-3" style={{ fontStyle: 'italic' }}>
                  {p.why}
                </p>
                {/* The 'why' line is the hook and always shows. The build
                    detail folds away on phones, so a block reads as a title, a
                    sentence and a picture rather than an essay. */}
                <Fold lines={3} color={diagramAccent}>
                  <p className="m-0">{p.what}</p>
                </Fold>
              </>
            }
            figure={Diagram ? <Diagram accent={diagramAccent} /> : undefined}
            chips={p.stack}
            links={p.href ? [{ label: 'Source', href: p.href }] : undefined}
            onDemo={p.live ? { label: 'Run demo', onClick: () => openDemo({ title: p.name, url: p.live as string }) } : undefined}
            image={p.shot ? { src: p.shot, alt: `${p.name}, screenshot of the running interface` } : null}
            icon={PROJECT_ICON[p.name]}
            topNote={
              startsSprints ? (
                <p
                  className="mono uppercase m-0 mb-6"
                  style={{
                    fontSize: '0.8125rem',
                    letterSpacing: '0.13em',
                    color: bg === 'paper' ? 'var(--signal)' : '#ffffff',
                    fontWeight: 600,
                  }}
                >
                  Weekends, hackathons, team builds: shipped fast and with help
                </p>
              ) : undefined
            }
          />
        );
      })}
    </section>
  );
}
