import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import WaveDivider from '@/components/WaveDivider';
import TiltCard from '@/components/bits/TiltCard';

export type CaseStudyBg = 'paper' | 'signal' | 'deep' | 'ink';

/**
 * Block fills are fixed hex, never the live theme tokens: those flip between
 * light and dark, which would turn a black block white and swing the text
 * contrast underneath it.
 *
 * The two colour fills are deliberately darker than --signal / --deep, which
 * stay as-is everywhere else (hero, buttons, rules). At the vivid values,
 * small white text measured 3.41:1 on the vermilion and 3.03:1 on the teal,
 * so no opacity setting could reach the 4.5:1 WCAG AA needs: the fill had to
 * move. These land at 4.90:1 and 5.68:1 against white. #d43318 is the
 * existing --signal-deep value rather than a new colour.
 */
const BG_VALUE: Record<CaseStudyBg, string> = {
  paper: 'var(--paper)',
  signal: '#d43318',
  deep: '#00755c',
  ink: '#0a0a0a',
};

/**
 * Paper blocks keep the normal ink scale. Colour blocks go white.
 *
 * On the two saturated fills the dim tier used to be 60% white, which
 * measured about 2:1 and was doing real damage to the small mono eyebrows.
 * There is very little headroom even at the darker fills, so hierarchy on
 * those blocks comes from size and weight rather than from fading the text
 * out: body is full white and dim only drops to 96%, which still clears AA.
 * The near-black ink block has plenty of room, so it keeps a softer scale.
 */
const TEXT: Record<CaseStudyBg, { strong: string; body: string; dim: string }> = {
  paper: { strong: 'var(--ink)', body: 'var(--ink-2)', dim: 'var(--ink-4)' },
  signal: { strong: '#ffffff', body: '#ffffff', dim: 'rgba(255,255,255,0.96)' },
  deep: { strong: '#ffffff', body: '#ffffff', dim: 'rgba(255,255,255,0.96)' },
  ink: { strong: '#ffffff', body: 'rgba(255,255,255,0.82)', dim: 'rgba(255,255,255,0.7)' },
};

export default function CaseStudyBlock({
  index,
  bg,
  eyebrow,
  title,
  badge,
  body,
  chips,
  links,
  onDemo,
  image,
  figure,
  icon: Icon,
  topNote,
  first,
}: {
  index: number;
  bg: CaseStudyBg;
  eyebrow: string;
  title: string;
  badge?: string | null;
  body: ReactNode;
  /**
   * A diagram for projects with no interface to screenshot. Kept out of
   * `body` so it can run wider than the 52ch measure prose is held to, and
   * so an imageless block fills its width instead of leaving half the colour
   * empty beside a narrow text column.
   */
  figure?: ReactNode;
  chips?: string[];
  links?: { label: string; href: string }[];
  onDemo?: { label: string; onClick: () => void };
  image?: { src: string; alt: string } | null;
  /** Floating app-icon-style badge over the screenshot, rafa.design style. */
  icon?: LucideIcon;
  topNote?: ReactNode;
  /** First block skips the wave, since there's nothing above it to curve into. */
  first?: boolean;
}) {
  const t = TEXT[bg];

  return (
    <div className="relative" style={{ background: BG_VALUE[bg] }} data-row>
      {!first && <WaveDivider fill={BG_VALUE[bg]} />}

      <div className="shell py-12 sm:py-16 lg:py-24">
        {topNote}

        <Reveal
          className={`grid gap-8 lg:gap-16 items-center ${image ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''}`}
        >
          <div>
            <p
              className="mono text-[0.75rem] tracking-[0.14em] uppercase mb-3"
              style={{ color: bg === 'paper' ? 'var(--signal)' : t.dim }}
            >
              {String(index + 1).padStart(2, '0')} / {eyebrow}
            </p>

            <h3
              className="display display-caps leading-[0.98] mb-4"
              style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)', color: t.strong }}
            >
              {title}
            </h3>

            {badge && (
              <p
                className="mono text-[0.6875rem] tracking-[0.08em] mb-4"
                style={{ color: bg === 'paper' ? 'var(--deep)' : t.strong }}
              >
                ★ {badge}
              </p>
            )}

            <div className="max-w-[52ch] text-[1.0625rem] leading-[1.6] mb-6" style={{ color: t.body }}>
              {body}
            </div>

            {figure && (
              <div className="mb-8 max-w-[60rem]" style={{ color: t.body }}>
                {figure}
              </div>
            )}

            {chips && chips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="chip"
                    style={
                      bg === 'paper'
                        ? undefined
                        : { borderColor: 'rgba(255,255,255,0.55)', color: t.body, background: 'transparent' }
                    }
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}

            {(links?.length || onDemo) && (
              <div className="flex flex-col gap-2 items-start">
                {links?.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[1rem] font-medium no-underline"
                    style={{ color: bg === 'paper' ? 'var(--signal)' : t.strong }}
                  >
                    {l.label} →
                  </a>
                ))}
                {onDemo && (
                  <button
                    type="button"
                    onClick={onDemo.onClick}
                    className="text-[1rem] font-medium bg-transparent border-0 p-0 cursor-pointer text-left"
                    style={{ color: bg === 'paper' ? 'var(--signal)' : t.strong }}
                  >
                    {onDemo.label} →
                  </button>
                )}
              </div>
            )}
          </div>

          {image && (
            <div className="relative flex items-center justify-center py-2 sm:py-6" style={{ perspective: '1200px' }}>
              {/* Loose second card peeking out behind: a hover-parallax illusion
                  that needs a cursor, so it's dead weight (and overflow risk)
                  on touch. Desktop/tablet only. */}
              <div
                aria-hidden="true"
                className="absolute plate hidden sm:block"
                style={{
                  width: '82%',
                  aspectRatio: '16 / 10',
                  transform: 'rotate(-6deg) translate(-6%, 4%)',
                  boxShadow: 'none',
                }}
              />
              <TiltCard
                className="relative w-full sm:w-[86%]"
                onClick={onDemo?.onClick}
              >
                <div className="plate plate--ticked" style={{ transform: 'rotate(2deg)' }}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1000}
                    height={625}
                    className="block w-full h-auto"
                  />
                </div>

                {Icon && (
                  <div
                    aria-hidden="true"
                    className="absolute flex items-center justify-center"
                    style={{
                      top: '-10%',
                      left: '-8%',
                      width: 'clamp(58px, 15%, 92px)',
                      aspectRatio: '1',
                      borderRadius: '26%',
                      background: bg === 'paper' ? 'var(--ink)' : 'var(--paper)',
                      transform: 'rotate(-8deg)',
                      boxShadow: '0 14px 30px -10px rgba(0,0,0,0.45)',
                    }}
                  >
                    <Icon
                      size={32}
                      strokeWidth={1.75}
                      color={bg === 'paper' ? 'var(--paper)' : 'var(--ink)'}
                    />
                  </div>
                )}
              </TiltCard>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
}
