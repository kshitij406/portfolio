import Image from 'next/image';
import { FaGithub, FaLinkedin, FaInstagram, FaSpotify } from 'react-icons/fa6';
import type { IconType, IconBaseProps } from 'react-icons';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { SOCIAL_LINKS } from '@/data/site';

// The real three-dot Letterboxd mark, dropped in as public/resources/letterboxd_logo.png
// (source image is 434x175). Takes IconBaseProps, same as every react-icons
// export, so it drops into the same `l.Icon` slot as everything else below.
const LetterboxdMark: IconType = ({ size = 20, className, style, ...rest }: IconBaseProps) => {
  const px = typeof size === 'number' ? size : 20;
  return (
    <Image
      src="/resources/letterboxd_logo.png"
      alt=""
      width={Math.round((px * 434) / 175)}
      height={px}
      className={className}
      style={style}
      aria-hidden={rest['aria-hidden']}
    />
  );
};

// Each platform's own brand colour, not the site's signal/deep accents, so
// the list reads as a row of real logos rather than themed glyphs. Unused
// on Letterboxd, whose mark is already in full colour.
//
// Buy Me a Coffee deliberately isn't here: this page is asking for a role,
// and a tip jar sitting the same size as GitHub dilutes that. It lives as a
// small footer link instead.
const LINKS: {
  label: string;
  href: string;
  handle: string;
  note: string;
  Icon: IconType;
  color: string | undefined;
  size: number;
}[] = [
  { ...SOCIAL_LINKS.github, Icon: FaGithub, color: '#6e40c9', size: 32 },
  { ...SOCIAL_LINKS.linkedin, Icon: FaLinkedin, color: '#0a66c2', size: 32 },
  { ...SOCIAL_LINKS.letterboxd, Icon: LetterboxdMark, color: undefined, size: 24 },
  { ...SOCIAL_LINKS.spotify, Icon: FaSpotify, color: '#1db954', size: 32 },
  { ...SOCIAL_LINKS.instagram, Icon: FaInstagram, color: '#e4405f', size: 32 },
];

export default function Elsewhere() {
  return (
    <section id="elsewhere" className="section">
      <div className="shell">
        <SectionHead no="08" title="Where you can find me" />

        <Reveal className="prose text-[1rem] leading-[1.65] mb-10" style={{ maxWidth: '38rem' }}>
          <p>Not in a creepy way. Come say hi, or don&rsquo;t, either is fine.</p>
        </Reveal>

        <Reveal
          stagger={0.06}
          as="div"
          className="m-0 plate plate--ticked grid sm:grid-cols-2"
        >
          {LINKS.map((l, i) => {
            // An odd count leaves the last tile alone on its row, so let it
            // span both columns rather than sit next to an empty cell.
            const orphan = i === LINKS.length - 1 && LINKS.length % 2 === 1;
            return (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-start gap-4 p-6 no-underline${orphan ? ' sm:col-span-2' : ''}`}
              style={{
                borderTop: i < 2 ? 'none' : '1px solid var(--rule-soft)',
                borderLeft: !orphan && i % 2 === 1 ? '1px solid var(--rule-soft)' : 'none',
              }}
            >
              <l.Icon
                size={l.size}
                className="mt-0.5 shrink-0"
                style={{ color: l.color }}
                aria-hidden="true"
              />
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="text-[0.9375rem] font-medium transition-colors"
                    style={{ color: 'var(--ink)' }}
                  >
                    {l.label}
                  </span>
                  <span className="mono text-[0.6875rem]" style={{ color: 'var(--ink-4)' }}>
                    / {l.handle} ↗
                  </span>
                </div>
                <p className="m-0 text-[0.8125rem] leading-snug" style={{ color: 'var(--ink-3)' }}>
                  {l.note}
                </p>
              </div>
            </a>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
