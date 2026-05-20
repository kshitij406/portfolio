"use client";

import { useEffect, useMemo, useState } from "react";

const TYPING_SPEED = 55;
const PAUSE_AFTER = 2000;
const DELETE_SPEED = 30;

interface TerminalProps {
  watchingLine?: string;
}

export default function Terminal({ watchingLine }: TerminalProps) {
  const LINES = useMemo(() => [
    "location: Mauritius",
    "status: building useful things",
    "editor: vscode + ai pair",
    watchingLine ? `watching: ${watchingLine}` : "watching: always logged on letterboxd",
    "year: 2 of 3",
    "last build: successful",
  ], [watchingLine]);
  const [displayText, setDisplayText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = LINES[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, TYPING_SPEED);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        setIsDeleting(false);
        setLineIndex((i) => (i + 1) % LINES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, lineIndex, LINES]);

  return (
    <div
      className="inline-flex items-center gap-0 text-sm md:text-base leading-none"
      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
    >
      <span style={{ color: "var(--accent)" }}>kshitij@portfolio</span>
      <span style={{ color: "var(--muted)" }}>:</span>
      <span style={{ color: "#6b9adf" }}>~$</span>
      <span className="ml-2" style={{ color: "var(--text)" }}>
        {displayText}
      </span>
      <span
        className="blink ml-px inline-block w-[2px] h-[1em] align-middle"
        style={{ background: "var(--accent)" }}
      />
    </div>
  );
}
