'use client';

import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import Fold from '@/components/Fold';
import { FACTS } from '@/data/content';

export default function Log() {
  return (
    <section id="log" className="section">
      <div className="shell">
        <SectionHead no="01" title="The short version" meta="Who / where / why" />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
          <Reveal className="prose text-[1.0625rem] leading-[1.65]">
            <p>
              I&rsquo;m twenty. I studied in Mauritius and I&rsquo;m based in Canterbury, starting
              stage 2 of a Computer Science degree at Kent this September: the certificate I
              finished in Mauritius took me straight into the second year. Two internships came
              before the degree rather than after it, which was not the plan but turned out to be
              the useful order.
            </p>
            {/* The opening paragraph always shows. The two that follow are the
                detail, and on a phone they are what turns this into a wall. */}
            <Fold lines={4}>
              <p>
                The work I like is the kind where the answer isn&rsquo;t in the documentation. At my
                current job, an internship with a software house in Dar es Salaam, I was
                handed a reporting stack nobody had written down, and the only way through was to
                read the network traffic and work backwards. That investigation is now informing a
                decision about 300+ reports. That&rsquo;s the pattern I keep coming back to: go one
                level lower than you have to, and the problem usually stops being mysterious.
              </p>
              <p>
                I write backends in C#, Go, Python and a lot of SQL, then build the interfaces on
                top of them in Next.js because I don&rsquo;t enjoy handing off an API and never
                seeing it used. Outside of that I dive, I lose to FromSoftware bosses, and I
                reinstall Fedora more often than I need to.
              </p>
            </Fold>
          </Reveal>

          {/* Facts strip: ruled rows, label left, value set plainly. No counted numbers. */}
          <Reveal stagger={0.08} className="plate plate--ticked" y={20}>
            <dl className="p-5 sm:p-6">
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className="py-3.5 first:pt-0 last:pb-0"
                  style={{
                    borderTop: i === 0 ? 'none' : '1px solid var(--rule-soft)',
                  }}
                >
                  <dt className="label mb-1.5">{f.label}</dt>
                  <dd className="text-[0.9375rem] leading-snug" style={{ color: 'var(--ink)' }}>
                    {f.value}
                  </dd>
                  {f.sub && (
                    <dd
                      className="mono text-[0.6875rem] leading-snug mt-1"
                      style={{ color: 'var(--ink-4)' }}
                    >
                      {f.sub}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
