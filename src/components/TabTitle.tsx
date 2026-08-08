'use client';

import { useEffect, useRef } from 'react';

// A quiet nod in this site's own voice, not a generic "come back!".
const AWAY_TITLE = 'Kshitij Jha, still building';

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
