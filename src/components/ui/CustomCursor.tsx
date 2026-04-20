"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const isTouchRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      isTouchRef.current = true;
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onHoverStart = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button']")) {
        setHovered(true);
      }
    };

    const onHoverEnd = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button']")) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover", onHoverStart);
    window.addEventListener("mouseout", onHoverEnd);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover", onHoverStart);
      window.removeEventListener("mouseout", onHoverEnd);
    };
  }, [rawX, rawY, dotX, dotY]);

  if (isTouchRef.current) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
        animate={{
          width: hovered ? 44 : 28,
          height: hovered ? 44 : 28,
          background: hovered ? "rgba(0,194,111,0.18)" : "transparent",
          borderColor: hovered ? "rgba(0,220,125,0.8)" : "rgba(0,194,111,0.5)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] w-1.5 h-1.5 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: "var(--accent-strong)",
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
