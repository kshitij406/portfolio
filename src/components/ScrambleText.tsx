"use client";

import { useRef, useCallback, CSSProperties } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export default function ScrambleText({
  text,
  className = "",
  style,
  as: Tag = "span",
}: ScrambleTextProps) {
  const elRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    if (!elRef.current) return;
    const totalFrames = text.length * 3;

    const animate = () => {
      if (!elRef.current) return;
      iterRef.current += 0.5;
      const resolved = Math.floor(iterRef.current);

      elRef.current.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolved) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (iterRef.current < totalFrames) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        if (elRef.current) elRef.current.textContent = text;
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    iterRef.current = 0;
    frameRef.current = requestAnimationFrame(animate);
  }, [text]);

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (elRef.current) elRef.current.textContent = text;
  }, [text]);

  // Build combined style with font family for headings
  const combinedStyle: CSSProperties = {
    fontFamily: "var(--font-syne), sans-serif",
    cursor: "default",
    color: "var(--text)",
    ...style,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyTag = Tag as any;
  return (
    <AnyTag
      ref={elRef}
      className={className}
      style={combinedStyle}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {text}
    </AnyTag>
  );
}
