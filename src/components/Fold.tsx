'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';

/**
 * Long prose reads as a wall on a phone: one column, no figure beside it,
 * paragraph after paragraph. Below the md breakpoint this clamps the body and
 * puts the rest behind a tap. At md+ the CSS drops the clamp and hides the
 * button, so the desktop page is unchanged, and the full text stays in the DOM
 * either way for search and for assistive tech.
 *
 * The clamp is a height, not -webkit-line-clamp: line-clamp counts line boxes
 * and does nothing to a flex list, and Work.tsx folds a <ul>. A height plus a
 * fade mask cuts anything, and the fade reads as deliberate where a hard edge
 * mid-letter would not.
 */
export default function Fold({
  children,
  lines = 3,
  color,
}: {
  children: ReactNode;
  /** Roughly how many lines stay visible while folded. */
  lines?: number;
  /** Case-study blocks set their own text colour per background fill. */
  color?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* The class stays on when open so sibling spacing rules (.prose p +
          .fold) keep matching; fold--open just undoes the clamp. The count
          goes through a custom property so plain CSS can override the height
          at md+ without fighting an inline style. */}
      <div
        className={`fold${open ? ' fold--open' : ''}`}
        style={{ '--fold-lines': lines } as CSSProperties}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fold-btn mono"
        style={color ? { color } : undefined}
        aria-expanded={open}
      >
        {open ? 'Less ↑' : 'Read more ↓'}
      </button>
    </>
  );
}
