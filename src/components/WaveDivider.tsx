/**
 * A wavy top edge for a full-bleed colour block, rafa.design style. Sits
 * just above the block it belongs to (translateY pulls it up to overlap
 * the block above), filled the same colour as its own block, so the seam
 * between two stacked blocks reads as an organic curve instead of a
 * straight line.
 */
export default function WaveDivider({ fill }: { fill: string }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="absolute left-0 w-full pointer-events-none h-9 sm:h-16"
      style={{ top: 0, transform: 'translateY(-99%)' }}
      aria-hidden="true"
    >
      <path
        d="M0,40 C 240,90 480,0 720,32 C 960,64 1200,8 1440,40 L1440,80 L0,80 Z"
        fill={fill}
      />
    </svg>
  );
}
