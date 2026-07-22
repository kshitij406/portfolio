'use client';

import CountUp from '@/components/bits/CountUp';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { METRICS } from '@/data/content';

export default function Log() {
  return (
    <section id="log" className="section lg:pl-[46px]">
      <div className="shell">
        <SectionHead no="01" title="The short version" meta="Who / where / why" />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
          <Reveal className="prose text-[1.0625rem] leading-[1.65]">
            <p>
              I&rsquo;m nineteen, I grew up in Dar es Salaam, I studied in Mauritius, and in
              September I move to Canterbury to start stage 2 of a Computer Science degree at Kent.
              Two internships came before the degree rather than after it, which was not the plan
              but turned out to be the useful order.
            </p>
            <p>
              The work I like is the kind where the answer isn&rsquo;t in the documentation. At my
              current job I was handed a reporting stack nobody had written down, and the only way
              through was to read the network traffic and work backwards. That investigation is now
              informing a decision about 300+ reports. That&rsquo;s the pattern I keep coming back
              to: go one level lower than you strictly have to, and the problem usually stops being
              mysterious.
            </p>
            <p>
              I write backends in C#, Go, Python and a lot of SQL, then build the interfaces on top
              of them in Next.js because I don&rsquo;t enjoy handing off an API and never seeing it
              used. Outside of that I dive, I lose to FromSoftware bosses, and I reinstall Fedora
              more often than I need to.
            </p>
          </Reveal>

          <Reveal stagger={0.09} className="grid grid-cols-2 gap-px" y={20}>
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="plate plate--ticked p-5 sm:p-6"
                style={{ boxShadow: 'none' }}
              >
                <div
                  className="display leading-none mb-2 flex items-baseline"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', color: 'var(--signal)' }}
                >
                  <CountUp to={m.value} duration={1.8} />
                  <span>{m.suffix}</span>
                </div>
                <div
                  className="mono text-[0.75rem] mb-1"
                  style={{ color: 'var(--ink)' }}
                >
                  {m.label}
                </div>
                <div className="mono text-[0.6875rem] leading-snug" style={{ color: 'var(--ink-4)' }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
