'use client';

import { useEffect, useRef, useState } from 'react';

type P5Instance = { frameRate: (fps: number) => void; pixelDensity: (d: number) => void };
type VantaEffect = { destroy: () => void; p5?: P5Instance };
type P5Ctor = unknown;
type TopologyFactory = (opts: Record<string, unknown>) => VantaEffect;

// The upstream sketch drew 4,500 particles on a 2D canvas every frame,
// uncapped — confirmed as the actual cause of lag on Hero. src/lib/vanta-topology
// is a local fork (see its topology.js) that cuts that to 450. With the root
// cost fixed, this cap is just a sensible ceiling, not the primary lever.
const TARGET_FPS = 30;
const PIXEL_DENSITY = 1;

function tamePerformance(effect: VantaEffect, tries = 0) {
  const p5 = effect.p5;
  // Effect.prototype.p5 is a boolean flag the library sets ("this effect
  // renders via p5"), which is truthy from the start and shadows the real
  // instance until p.setup() actually runs — checking truthiness alone grabs
  // that flag instead and crashes calling .frameRate() on `true`.
  if (p5 && typeof p5.frameRate === 'function') {
    p5.frameRate(TARGET_FPS);
    p5.pixelDensity(PIXEL_DENSITY);
    return;
  }
  if (tries < 10) setTimeout(() => tamePerformance(effect, tries + 1), 50);
}

/**
 * Vanta TOPOLOGY, recoloured to read as a bathymetric chart rather than
 * the usual dark-mode particle field: sea-green contours on bone paper.
 * p5 and the effect are both loaded lazily. They're ~900kb combined and
 * nothing above the fold depends on them.
 *
 * Runs on a local fork (src/lib/vanta-topology) rather than the npm
 * package — see that folder's topology.js for why. p5 still draws
 * continuously once started, which is real, ongoing CPU cost, so an
 * IntersectionObserver tears the effect down the moment Hero scrolls out
 * of view and only rebuilds it if the user scrolls back up.
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
        const TOPOLOGY = (await import('@/lib/vanta-topology/topology')).default as TopologyFactory;
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
