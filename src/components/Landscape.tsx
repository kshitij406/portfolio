/**
 * The hills behind the hero, the projects band and the footer card: one
 * pre-rendered image (drawn in LandscapeSvg.tsx), so scrolling only moves
 * pixels instead of re-running SVG filters.
 */
export default function Landscape({ priority = false }: { priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="land"
      src="/land-1280.jpg"
      srcSet="/land-1280.jpg 1280w, /land-2560.jpg 2560w"
      sizes="100vw"
      alt=""
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
