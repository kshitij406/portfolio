'use client';

import { useEffect, useState } from 'react';

const DISMISSED_KEY = 'kj-mobile-notice-dismissed';

/**
 * Touch visitors never get the terminal (TerminalGate keeps it desktop-only)
 * and lose some of the scroll feel, so say so once. Cheap to mount everywhere
 * — unlike Terminal, this has no listener to gate, just a mount-time check.
 */
export default function MobileNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const dismissed = window.sessionStorage.getItem(DISMISSED_KEY) === '1';
    if (isTouch && !dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="mobile-notice" role="status">
      <p>
        This site&rsquo;s built for a desktop screen — a hidden terminal and the
        scroll feel don&rsquo;t come through here. Still fully usable on mobile.
      </p>
      <button type="button" onClick={dismiss}>
        Got it
      </button>
    </div>
  );
}
