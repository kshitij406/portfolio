'use client';

import { useEffect, useRef, useState } from 'react';

type VantaEffect = { destroy: () => void };

/**
 * Vanta TOPOLOGY, recoloured to read as a bathymetric chart rather than
 * the usual dark-mode particle field: sea-green contours on bone paper.
 * p5 and the effect are both loaded lazily. They're ~900kb combined and
 * nothing above the fold depends on them.
 */
export default function VantaTopology() {
  const hostRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // p5 draws continuously; don't burn a phone battery for a backdrop.
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let cancelled = false;

    (async () => {
      const p5mod = await import('p5');
      // vanta reaches for a global rather than taking an injected instance.
      (window as unknown as { p5: unknown }).p5 = p5mod.default;

      const TOPOLOGY = (await import('vanta/dist/vanta.topology.min')).default as (
        opts: Record<string, unknown>
      ) => VantaEffect;

      if (cancelled || !hostRef.current) return;

      effectRef.current = TOPOLOGY({
        el: hostRef.current,
        p5: p5mod.default,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        color: 0x1d5c52,
        backgroundColor: 0xefebe2,
      });

      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

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
