/**
 * One shared read of scroll speed, written by SmoothScroll and read by
 * anything that wants to react to it (the ticker, the cursor). Falls back to
 * native scroll deltas when Lenis is off for reduced motion.
 */
export const scroll = { velocity: 0, progress: 0 };
