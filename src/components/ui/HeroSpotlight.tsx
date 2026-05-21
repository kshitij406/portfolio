"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function HeroSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);

  const x = useSpring(rawX, { stiffness: 90, damping: 18 });
  const y = useSpring(rawY, { stiffness: 90, damping: 18 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,194,111,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,111,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 80%)",
        }}
      />
      {/* Cursor spotlight — now actually tracks the mouse */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 640,
          height: 640,
          background: "radial-gradient(circle, rgba(0,194,111,0.09) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
