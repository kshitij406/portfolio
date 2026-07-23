'use client';

import { useEffect, useRef, useState } from 'react';

type P5Instance = { frameRate: (fps: number) => void; pixelDensity: (d: number) => void };
type VantaEffect = { destroy: () => void; p5?: P5Instance };
type P5Ctor = unknown;
type TopologyFactory = (opts: Record<string, unknown>) => VantaEffect;

// The topology sketch draws 4,500 particles on a 2D canvas every single
// frame — real, uncapped work regardless of screen size or GPU, and it's
// the reason Hero itself stays heavy even with the rest of the page fixed.
// Capping framerate and pixel density are the only levers available without
// forking the vendored sketch (particle count is hardcoded upstream). Pushed
// fairly hard here since it's a barely-visible, faded background, not the
// subject of the page.
const TARGET_FPS = 15;
const PIXEL_DENSITY = 0.75;

function tamePerformance(effect: VantaEffect, tries = 0) {
  const p5 = effect.p5;
  if (p5) {
    p5.frameRate(TARGET_FPS);
    p5.pixelDensity(PIXEL_DENSITY);
    return;
  }
  // p5's own setup() runs a tick or two after the effect constructor
  // returns, so the instance isn't always attached yet.
  if (tries < 10) setTimeout(() => tamePerformance(effect, tries + 1), 50);
}

/**
 * Vanta TOPOLOGY, recoloured to read as a bathymetric chart rather than
 * the usual dark-mode particle field: sea-green contours on bone paper.
 * p5 and the effect are both loaded lazily. They're ~900kb combined and
 * nothing above the fold depends on them.
 *
 * p5 draws continuously at 60fps once started, which is real, ongoing CPU
 * cost — not just a one-time load cost. Since this only sits behind the
 * Hero, an IntersectionObserver tears the effect down the moment it scrolls
 * out of view and only rebuilds it if the user scrolls back up, so the draw
 * loop isn't burning cycles for the rest of a long scroll session.
 */
export default function VantaTopology() {
  const hostRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const modulesRef = useRef<{ p5: P5Ctor; TOPOLOGY: TopologyFactory } | null>(null);
  const startingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // p5 draws continuously; don't burn a phone battery for a backdrop.
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let cancelled = false;

    // Vanta's topology mesh occasionally throws mid-frame if the container
    // resizes while p5's draw loop is running (a known upstream issue with
    // vanta+p5). It's a decorative backdrop, so on that failure we tear it
    // down once and fall back to the plain paper background rather than
    // spamming a crash every frame.
    const onError = (e: ErrorEvent) => {
      const stack = e.error?.stack ?? '';
      if (!stack.includes('vanta')) return;
      e.preventDefault();
      effectRef.current?.destroy();
      effectRef.current = null;
      setReady(false);
      setFailed(true);
    };
    window.addEventListener('error', onError);

    const teardown = () => {
      effectRef.current?.destroy();
      effectRef.current = null;
      setReady(false);
    };

    const start = async () => {
      if (startingRef.current || effectRef.current || cancelled) return;
      startingRef.current = true;

      if (!modulesRef.current) {
        // Guard against initializing against a zero-size container (the
        // trigger condition for the resize-mesh bug above).
        let tries = 0;
        while (hostRef.current && hostRef.current.clientWidth === 0 && tries < 10) {
          await new Promise((r) => requestAnimationFrame(r));
          tries += 1;
        }

        const p5mod = await import('p5');
        // vanta reaches for a global rather than taking an injected instance.
        (window as unknown as { p5: unknown }).p5 = p5mod.default;
        const TOPOLOGY = (await import('vanta/dist/vanta.topology.min')).default as TopologyFactory;
        modulesRef.current = { p5: p5mod.default, TOPOLOGY };
      }

      if (cancelled || !hostRef.current) {
        startingRef.current = false;
        return;
      }

      try {
        effectRef.current = modulesRef.current.TOPOLOGY({
          el: hostRef.current,
          p5: modulesRef.current.p5,
          // The topology sketch never reads mouse position (verified in its
          // source), so this option was doing nothing but adding a listener.
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          color: 0x1d5c52,
          backgroundColor: 0xefebe2,
        });
      } catch {
        setFailed(true);
        startingRef.current = false;
        return;
      }

      tamePerformance(effectRef.current);

      if (!cancelled) setReady(true);
      startingRef.current = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void start();
        else teardown();
      },
      { threshold: 0 }
    );
    if (hostRef.current) observer.observe(hostRef.current);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener('error', onError);
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  if (failed) return null;

  return (
    <div
      ref={hostRef}
      className="vanta-host"
      aria-hidden="true"
      style={{
        opacity: ready ? undefined : 0,
        transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  );
}
