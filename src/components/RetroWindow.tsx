'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createTimeline, animate, stagger, utils } from 'animejs';
import { X, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { sound } from '@/lib/sound';

type RetroWindowProps = {
  title: string;
  url: string;
  onClose: () => void;
};

const LOADING_STRINGS = ['LOADING', 'BOOTING', 'INITIALIZING', 'BUFFERING'];

/**
 * An 8-bit desktop window that frames the real deployment in an iframe.
 * The site actually loads inside it, so this is a demo and not a mockup.
 *
 * Motion here is anime.js rather than GSAP, deliberately. Everything on the
 * editorial page uses GSAP's smooth interpolation; this overlay wants the
 * opposite, so it runs on anime's steps() easing to get discrete frames that
 * read like a CRT switching on.
 *
 * Both current targets are Vercel deployments that send no X-Frame-Options
 * and no frame-ancestors, so they embed. If a future project refuses to be
 * framed, the load timeout below falls back to an "open in a new tab" panel.
 */
export default function RetroWindow({ title, url, onClose }: RetroWindowProps) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [maximised, setMaximised] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loadingText] = useState(
    () => LOADING_STRINGS[Math.floor(Math.random() * LOADING_STRINGS.length)]
  );

  const backdropRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);

  /** Play the shutdown sequence, then unmount. */
  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    sound.close();

    const win = windowRef.current;
    const backdrop = backdropRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !win || !backdrop) {
      onClose();
      return;
    }

    createTimeline({ defaults: { ease: 'steps(4)' } })
      .add(win, { scaleY: [1, 0.004], duration: 200 })
      .add(win, { scaleX: [1, 0], duration: 150 })
      .add(backdrop, { opacity: [1, 0], duration: 120, ease: 'linear' }, '-=80')
      .then(onClose);
  }, [onClose]);

  // The overlay portals to body. Section elements set `position: relative;
  // z-index: 1`, which creates a stacking context that would trap this
  // underneath the nav and the depth ruler no matter how high its z-index.
  useEffect(() => setMounted(true), []);

  // Boot sequence: a horizontal line snaps open, then the tube blooms.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const win = windowRef.current;
    const backdrop = backdropRef.current;
    if (!win || !backdrop) return;

    utils.set(win, { transformOrigin: 'center center' });

    const tl = createTimeline({ defaults: { ease: 'steps(5)' } });
    tl.add(backdrop, { opacity: [0, 1], duration: 110, ease: 'linear' })
      .add(win, { scaleX: [0, 1], scaleY: [0.004, 0.004], duration: 170 })
      .add(win, { scaleY: [0.004, 1], duration: 260 })
      .add(
        win.querySelectorAll('.retro-btn'),
        { opacity: [0, 1], translateY: [-5, 0], duration: 180, delay: stagger(60) },
        '-=60'
      );

    return () => {
      tl.pause();
    };
  }, []);

  // Escape to close, and keep focus trapped inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !windowRef.current) return;

      const focusables = windowRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], iframe, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [close]);

  // If nothing loads, assume the target refused to be framed.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!loaded) setBlocked(true);
    }, 12000);
    return () => clearTimeout(t);
  }, [loaded]);

  // Flash the screen once the deployment finishes loading.
  useEffect(() => {
    if (!loaded) return;
    sound.open();
    const el = windowRef.current?.querySelector('.retro-frame');
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animate(el, { opacity: [0, 1], duration: 240, ease: 'steps(4)' });
  }, [loaded]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className="retro-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={windowRef}
        className={`retro-window${maximised ? ' retro-window--max' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} live demo`}
      >
        <div className="retro-titlebar">
          <span className="retro-title">{title}</span>
          <div className="retro-buttons">
            <button
              type="button"
              className="retro-btn"
              onClick={() => setMaximised((m) => !m)}
              aria-label={maximised ? 'Restore window' : 'Maximise window'}
            >
              {maximised ? (
                <Minimize2 size={12} strokeWidth={3} absoluteStrokeWidth />
              ) : (
                <Maximize2 size={12} strokeWidth={3} absoluteStrokeWidth />
              )}
            </button>
            <button
              ref={closeRef}
              type="button"
              className="retro-btn retro-btn--close"
              onClick={close}
              aria-label="Close demo"
            >
              <X size={12} strokeWidth={3} absoluteStrokeWidth />
            </button>
          </div>
        </div>

        <div className="retro-screen">
          {!loaded && !blocked && (
            <div className="retro-loading">
              <span className="retro-loading__text">
                {loadingText}<span className="caret">_</span>
              </span>
              <div className="retro-progress">
                <div className="retro-progress__bar" />
              </div>
              <span className="retro-loading__hint">live deployment, not a screenshot</span>
            </div>
          )}

          {blocked ? (
            <div className="retro-loading">
              <span className="retro-loading__text">CANNOT EMBED</span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-openlink"
              >
                OPEN IN NEW TAB
              </a>
            </div>
          ) : (
            <iframe
              src={url}
              title={`${title} live site`}
              className="retro-frame"
              onLoad={() => setLoaded(true)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="retro-scanlines" aria-hidden="true" />
        </div>

        <div className="retro-statusbar">
          <span className="retro-status-url">{url.replace('https://', '')}</span>
          <a href={url} target="_blank" rel="noopener noreferrer" className="retro-status-link">
            OPEN <ExternalLink size={11} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
