'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { TileEffectKind } from '@/data/content';
import { tileSound } from '@/lib/sound';

type Props = { kind: TileEffectKind; onDone: () => void };

const HOLD_MS = 2600;

const REINSTALL_LINES = [
  'Formatting /dev/sda1...',
  'Installing base system...',
  'Configuring KDE Plasma...',
  'Done.',
];

/**
 * One full-viewport, self-dismissing gimmick, parameterized by kind. Every
 * "off the clock" tile in Surface.tsx fires one of these on click; each kind
 * is a CSS animation (see the .tile-fx-* rules in globals.css) so this
 * component is just the right markup for the kind plus a timer that unmounts
 * it when the animation window is over. No click-to-close: it recedes on
 * its own, same as the tiles' subject matter fading rather than lingering.
 */
export default function TileEffect({ kind, onDone }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (kind === 'bonfire') {
      const audio = new Audio('/resources/bornfire.mp3');
      audio.volume = 0.22;
      void audio.play().catch(() => {});
      return () => audio.pause();
    }
    tileSound[kind]();
  }, [kind]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(onDone, reduced ? 900 : HOLD_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  if (!mounted) return null;

  return createPortal(
    <div className={`tile-fx tile-fx--${kind}`} aria-hidden="true">
      {kind === 'flood' && (
        <div className="fx-water">
          <div className="fx-water__bubbles">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      {kind === 'bonfire' && (
        <div className="fx-bonfire">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/resources/dark_souls_bornfire.png" alt="" className="fx-bonfire__glow" />
          <span className="fx-bonfire__text">bonfire lit.</span>
        </div>
      )}

      {kind === 'reinstall' && (
        <div className="fx-reinstall">
          {REINSTALL_LINES.map((line, i) => (
            <div key={line} className="fx-reinstall__line" style={{ animationDelay: `${i * 260}ms` }}>
              {line}
            </div>
          ))}
        </div>
      )}

      {kind === 'estop' && (
        <div className="fx-estop">
          <span className="fx-estop__text">SIMULATION: E-STOP TRIGGERED</span>
        </div>
      )}

      {kind === 'letterbox' && (
        <div className="fx-letterbox">
          <div className="fx-letterbox__bar fx-letterbox__bar--top" />
          <div className="fx-letterbox__bar fx-letterbox__bar--bottom" />
        </div>
      )}

      {kind === 'waveform' && (
        <div className="fx-waveform">
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} style={{ animationDelay: `${i * 70}ms` }} />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
