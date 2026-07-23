'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createTimeline, utils } from 'animejs';
import { useDemo } from '@/components/DemoProvider';
import { PROJECTS } from '@/data/content';
import { PROFILE, SOCIAL_LINKS } from '@/data/site';
import { isSoundOn, setSoundOn, sound } from '@/lib/sound';
import { getLenis } from '@/lib/lenis';

type Line = { text: string; tone?: 'error' | 'signal' | 'dim' };

const SECTIONS = ['log', 'work', 'built', 'stack', 'surface', 'contact'];
const DEMO_SLUGS = PROJECTS.filter((p) => p.slug).map((p) => p.slug);

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const BOOT_LINES: Line[] = [
  { text: `${PROFILE.name.toUpperCase()} // DEV CONSOLE`, tone: 'signal' },
  { text: "type 'help' if you're lost." },
];

/**
 * A hidden dev console, summoned with backtick (the Quake/Source convention).
 * Reuses RetroWindow's CRT visual language so it reads as the same system
 * rather than a second unrelated widget.
 */
export default function Terminal() {
  const { openDemo } = useDemo();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BOOT_LINES);
  const [input, setInput] = useState('');
  const [mgsUnlocked, setMgsUnlocked] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closingRef = useRef(false);
  const konamiProgress = useRef(0);

  useEffect(() => setMounted(true), []);

  const print = useCallback((next: Line | Line[]) => {
    setLines((prev) => [...prev, ...(Array.isArray(next) ? next : [next])]);
  }, []);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    sound.close();

    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finish = () => {
      setOpen(false);
      closingRef.current = false;
    };

    if (reduced || !panel || !backdrop) {
      finish();
      return;
    }

    createTimeline({ defaults: { ease: 'steps(4)' } })
      .add(panel, { scaleY: [1, 0.004], duration: 180 })
      .add(backdrop, { opacity: [1, 0], duration: 120, ease: 'linear' }, '-=60')
      .then(finish);
  }, []);

  // Boot animation on open, mirroring RetroWindow's CRT-bloom timeline.
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => inputRef.current?.focus());
    sound.open();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    utils.set(panel, { transformOrigin: 'center center' });

    createTimeline({ defaults: { ease: 'steps(5)' } })
      .add(backdrop, { opacity: [0, 1], duration: 100, ease: 'linear' })
      .add(panel, { scaleX: [0, 1], scaleY: [0.004, 0.004], duration: 150 })
      .add(panel, { scaleY: [0.004, 1], duration: 220 });
  }, [open]);

  // Autoscroll to the newest line.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      print({ text: `> ${trimmed}`, tone: 'dim' });
      if (!trimmed) return;

      const [cmd, ...rest] = trimmed.toLowerCase().split(/\s+/);
      const arg = rest.join(' ');

      const unknown = (token: string) => {
        sound.error();
        print({ text: 'YOU DIED', tone: 'error' });
        print({ text: `'${token}' is not recognized. try 'help'.` });
      };

      switch (cmd) {
        case 'help':
          print([
            { text: 'help, clear, exit, whoami, ls' },
            { text: 'cat resume.txt / download cv' },
            { text: 'open <github|linkedin|letterboxd|spotify>' },
            { text: `play <project-slug>  (try: ${DEMO_SLUGS.join(', ')})` },
            { text: `goto <section>  (${SECTIONS.join(', ')})` },
            { text: `mute / unmute  (sound is ${isSoundOn() ? 'on' : 'off'})` },
            ...(mgsUnlocked
              ? [{ text: 'codec traffic detected — try snake, box, !', tone: 'signal' as const }]
              : []),
          ]);
          return;
        case 'clear':
          setLines([]);
          return;
        case 'exit':
          close();
          return;
        case 'mute':
          setSoundOn(false);
          print({ text: 'sound off.' });
          return;
        case 'unmute':
          setSoundOn(true);
          print({ text: 'sound on.', tone: 'signal' });
          sound.open();
          return;
        case 'whoami':
          print({ text: "guest — same as everyone who hasn't emailed me yet" });
          return;
        case 'ls':
          print({ text: SECTIONS.map((s) => `${s}/`).join('  ') });
          return;
        case 'cat':
          if (arg === 'resume.txt' || arg === 'cv' || arg === 'resume') {
            print({ text: `${PROFILE.name} — ${PROFILE.role}. Full CV incoming.` });
            window.open('/resume', '_blank', 'noopener,noreferrer');
          } else {
            print({ text: `cat: ${arg || '(missing operand)'}: No such file` });
          }
          return;
        case 'download':
          if (arg === 'cv' || arg === 'resume') {
            window.open('/resume', '_blank', 'noopener,noreferrer');
            print({ text: 'opening /resume ...' });
          } else {
            print({ text: `download: ${arg || '(missing operand)'}: No such file` });
          }
          return;
        case 'sudo':
          print({ text: "permission denied: you're not root here either.", tone: 'error' });
          return;
        case 'ssh':
          print({ text: 'connection refused (all ports closed — try email instead).', tone: 'error' });
          return;
        case 'rest':
        case 'light':
          print([
            { text: '     )  (' },
            { text: '    (    )' },
            { text: 'bonfire lit. no enemies respawn from typing here.' },
          ]);
          return;
        case 'git':
          if (arg === 'gud') {
            print({ text: 'acknowledged. still working on it myself.', tone: 'signal' });
          } else {
            print({ text: `git: '${arg}' is not a git command` });
          }
          return;
        case 'open': {
          const target = (SOCIAL_LINKS as Record<string, { href: string; label: string }>)[arg];
          if (target) {
            window.open(target.href, '_blank', 'noopener,noreferrer');
            print({ text: `opening ${target.label} ...` });
          } else {
            print({ text: `open: ${arg || '(missing operand)'}: unknown target` });
          }
          return;
        }
        case 'play':
        case 'demo': {
          const project = PROJECTS.find((p) => p.slug === arg);
          if (project?.live) {
            openDemo({ title: project.name, url: project.live });
            print({ text: `booting ${project.name} ...` });
            close();
          } else {
            print({ text: `no live deployment for '${arg || '(missing operand)'}'` });
          }
          return;
        }
        case 'goto': {
          if (SECTIONS.includes(arg)) {
            close();
            requestAnimationFrame(() => {
              const target = document.getElementById(arg);
              if (!target) return;
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(target, { offset: -24 });
              else target.scrollIntoView({ behavior: 'smooth' });
            });
          } else {
            print({ text: `goto: '${arg || '(missing operand)'}': unknown section` });
          }
          return;
        }
        case 'snake':
          if (mgsUnlocked) {
            print({ text: 'this is snake. infiltration successful.', tone: 'signal' });
          } else {
            unknown(cmd);
          }
          return;
        case 'box':
          if (mgsUnlocked) {
            print({ text: 'you climb into the cardboard box. nothing happens. surprisingly comfortable.' });
          } else {
            unknown(cmd);
          }
          return;
        case '!':
          if (mgsUnlocked) {
            print({ text: '! CAUTION', tone: 'error' });
          } else {
            unknown(cmd);
          }
          return;
        default:
          unknown(cmd);
      }
    },
    [close, openDemo, print, mgsUnlocked]
  );

  // Backtick toggles the console open and closed. The Konami code, tracked
  // only while the console is closed, force-opens it with codec traffic
  // unlocked — a real thing to find, not a second way to do what backtick
  // already does.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isOwnInput = target === inputRef.current;
      const typingElsewhere =
        !isOwnInput &&
        !!target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if (!open && !typingElsewhere) {
        const expected = KONAMI[konamiProgress.current];
        if (e.key === expected) {
          konamiProgress.current += 1;
          if (konamiProgress.current === KONAMI.length) {
            konamiProgress.current = 0;
            setMgsUnlocked(true);
            closingRef.current = false;
            setOpen(true);
            print({ text: 'codec frequency 140.85 acquired.', tone: 'signal' });
          }
        } else {
          konamiProgress.current = e.key === KONAMI[0] ? 1 : 0;
        }
      }

      if (e.key === '`' && !typingElsewhere) {
        e.preventDefault();
        if (open) close();
        else {
          closingRef.current = false;
          setOpen(true);
        }
      } else if (e.key === 'Escape' && open) {
        close();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, print]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className="term-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div ref={panelRef} className="term-panel" role="dialog" aria-modal="true" aria-label="Dev console">
        <div className="term-titlebar">
          <span>guest@kshitijj:~$</span>
          <button type="button" className="term-close" onClick={close} aria-label="Close console">
            ×
          </button>
        </div>

        <div ref={scrollRef} className="term-output">
          {lines.map((l, i) => (
            <div key={i} className={`term-line${l.tone ? ` term-line--${l.tone}` : ''}`}>
              {l.text}
            </div>
          ))}
        </div>

        <form
          className="term-inputrow"
          onSubmit={(e) => {
            e.preventDefault();
            sound.tick();
            runCommand(input);
            setInput('');
          }}
        >
          <span className="term-prompt">&gt;</span>
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Console input"
          />
        </form>
        <div className="term-scanlines" aria-hidden="true" />
      </div>
    </div>,
    document.body
  );
}
