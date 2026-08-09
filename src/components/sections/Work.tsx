'use client';

import SectionHead from '@/components/SectionHead';
import CaseStudyBlock, { type CaseStudyBg } from '@/components/CaseStudyBlock';
import Fold from '@/components/Fold';
import { EXPERIENCE } from '@/data/content';

// Two entries, most-recent first: current job gets the signal (attention)
// colour, the other gets the black block for contrast.
const BG_CYCLE: CaseStudyBg[] = ['signal', 'ink'];

export default function Work() {
  return (
    <section id="work" className="relative">
      <div className="shell" style={{ paddingTop: 'clamp(4.5rem, 11vw, 9rem)' }}>
        <SectionHead no="02" title="Where I've worked" meta="2026 to now" />
      </div>

      {EXPERIENCE.map((job, i) => (
        <CaseStudyBlock
          key={job.company}
          index={i}
          first={i === 0}
          bg={BG_CYCLE[i % BG_CYCLE.length]}
          eyebrow={`${job.role}, ${job.period}`}
          title={job.company}
          body={
            <>
              <p className="m-0 mb-3" style={{ fontStyle: 'italic' }}>
                {job.lede}
              </p>
              {/* Four dense bullets per job is most of the mobile scroll, so
                  the lede carries the block and the detail folds. */}
              <Fold lines={4} color="#ffffff">
                <ul className="list-none m-0 p-0 flex flex-col gap-2">
                  {job.points.map((point) => (
                    <li key={point} className="relative pl-5 text-[0.9375rem] leading-[1.55]">
                      <span
                        className="absolute left-0 top-[0.65em] w-[9px]"
                        style={{ height: '1px', background: 'currentColor', opacity: 0.6 }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Fold>
            </>
          }
          chips={job.stack}
        />
      ))}
    </section>
  );
}
