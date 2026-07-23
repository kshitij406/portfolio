'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const BIG_MS = 1400;
const WINDOW_MS = 550;
const MIN_REVERSALS = 4;
const MIN_TRAVEL = 220;

/**
 * The GNOME/macOS "shake to find the pointer" trick: rattle the mouse back
 * and forth fast enough and the cursor balloons for a second, then settles
 * back down. Desktop only (mouse-shake means nothing on touch) and skipped
 * under reduced motion, same as everything else on the page.
 *
 * mousemove can fire far faster than the screen repaints (some mice/trackpads
 * report at 100s of Hz), so the listener itself only records the latest
 * point — the actual DOM write and shake-detection math run at most once per
 * animation frame via rAF batching, not once per raw event.
 */
export default function ShakeCursor() {
  const [enabled, setEnabled] = useState(false);
  const [big, setBig] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<{ t: number; x: number }[]>([]);
  const bigTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const frameRequested = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine && !reduced);
  }, []);

  const processFrame = useCallback(() => {
    frameRequested.current = false;
    const pos = pendingRef.current;
    if (!pos) return;

    const el = dotRef.current;
    if (el) {
      el.style.setProperty('--x', `${pos.x}px`);
      el.style.setProperty('--y', `${pos.y}px`);
    }

    const now = performance.now();
    const hist = historyRef.current;
    hist.push({ t: now, x: pos.x });
    while (hist.length && now - hist[0].t > WINDOW_MS) hist.shift();

    if (hist.length > 3) {
      let reversals = 0;
      let travel = 0;
      let prevDir = 0;
      for (let i = 1; i < hist.length; i++) {
        const dx = hist[i].x - hist[i - 1].x;
        travel += Math.abs(dx);
        const dir = dx > 0 ? 1 : dx < 0 ? -1 : prevDir;
        if (prevDir !== 0 && dir !== 0 && dir !== prevDir) reversals++;
        if (dir !== 0) prevDir = dir;
      }
      if (reversals >= MIN_REVERSALS && travel >= MIN_TRAVEL) {
        setBig(true);
        if (bigTimeout.current) clearTimeout(bigTimeout.current);
        bigTimeout.current = setTimeout(() => setBig(false), BIG_MS);
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('shake-cursor-active');

    const onMove = (e: MouseEvent) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      if (!frameRequested.current) {
        frameRequested.current = true;
        requestAnimationFrame(processFrame);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      document.documentElement.classList.remove('shake-cursor-active');
      window.removeEventListener('mousemove', onMove);
      if (bigTimeout.current) clearTimeout(bigTimeout.current);
    };
  }, [enabled, processFrame]);

  if (!enabled) return null;

  return <div ref={dotRef} className={`shake-cursor${big ? ' shake-cursor--big' : ''}`} aria-hidden="true" />;
}
