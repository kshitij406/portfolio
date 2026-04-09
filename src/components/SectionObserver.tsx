"use client";

import { useEffect, useRef, ReactNode } from "react";

interface SectionObserverProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionObserver({
  children,
  className = "",
  delay = 0,
}: SectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`section-fade ${className}`}>
      {children}
    </div>
  );
}
