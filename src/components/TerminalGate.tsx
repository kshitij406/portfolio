'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('@/components/Terminal'), { ssr: false });

/**
 * The console is a keyboard instrument: backtick is unreachable on a phone
 * keyboard and there's no visible trigger, so it's dead weight on touch.
 * Gating the mount here (rather than inside Terminal) means touch devices
 * never attach its keydown listener and never even fetch its JS chunk, since
 * the dynamic import above is only requested once `enabled` flips true.
 */
export default function TerminalGate() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  if (!enabled) return null;
  return <Terminal />;
}
