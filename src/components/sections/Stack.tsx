'use client';

import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import DecryptedText from '@/components/bits/DecryptedText';
import { STACK, AWARDS } from '@/data/content';

export default function Stack() {
  return (
    <section id="stack" className="section">
      <div className="shell">
        <SectionHead no="05" title="Tools" meta="What I actually reach for" />

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-20 items-start">
          <Reveal stagger={0.08} className="flex flex-col">
            {STACK.map((group) => (
              <div
                key={group.group}
                className="grid sm:grid-cols-[130px_1fr] gap-3 sm:gap-8 py-5"
                style={{ borderBottom: '1px solid var(--rule)' }}
              >
                <span className="label pt-1">{group.group}</span>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="mono text-[0.9375rem] cursor-default"
                      style={{ color: 'var(--ink)' }}
                    >
                      <DecryptedText
                        text={item}
                        animateOn="hover"
                        speed={26}
                        maxIterations={8}
                        sequential
                        revealDirection="start"
                        characters="01<>/{}#$&*"
                        parentClassName="mono"
                        encryptedClassName="opacity-50"
                      />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="plate plate--ticked p-7" y={20}>
            <p className="label mb-5">Recognition</p>
            <ul className="list-none m-0 p-0 flex flex-col gap-5">
              {AWARDS.map((a) => (
                <li key={a.title}>
                  <p className="mono text-[0.875rem] m-0" style={{ color: 'var(--ink)' }}>
                    {a.title}
                  </p>
                  <p
                    className="mono text-[0.75rem] m-0 mb-1"
                    style={{ color: 'var(--signal)' }}
                  >
                    {a.place}
                  </p>
                  <p className="text-[0.8125rem] m-0 leading-snug" style={{ color: 'var(--ink-3)' }}>
                    {a.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
