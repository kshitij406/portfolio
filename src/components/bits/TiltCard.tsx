'use client';

import { useRef, type ReactNode } from 'react';

/**
 * Mouse-driven 3D tilt, the "reacts to hover" trick behind rafa.design's
 * screenshot clusters. Plain mousemove math, no new dependency, since a
 * hover-only transform doesn't need a library.
 */
export default function TiltCard({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${y * -10}deg) rotateY(${x * 14}deg) scale(1.04)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
      style={{
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      {children}
    </div>
  );
}
