import type Lenis from 'lenis';

// A place to reach the one Lenis instance SmoothScroll creates, so anything
// that needs to scroll the page programmatically (the terminal's `goto`) goes
// through the same smoothing clock instead of fighting it with native scroll.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}
