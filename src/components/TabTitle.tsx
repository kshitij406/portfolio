'use client';

import { useEffect, useRef } from 'react';

// Ties back to the depth ruler that runs down the left edge of the page —
// a nod specific to this site's own instrument, not a generic "come back!".
const AWAY_TITLE = 'Kshitij Jha — still logging depth';

export default function TabTitle() {
  const original = useRef<string | null>(null);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        original.current = document.title;
        document.title = AWAY_TITLE;
      } else if (original.current) {
        document.title = original.current;
        original.current = null;
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return null;
}
