"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CONFESSIONS = [
  "I have Googled how to exit Vim more than once.",
  "My first React component was 400 lines long.",
  "I wrote a shell script to avoid writing a shell script.",
  "I have read the Dune appendices.",
  "I once spent three hours debugging a missing semicolon.",
  "I have copy-pasted from Stack Overflow without fully reading the answer.",
  "My commit messages are not always informative.",
  "I have blamed the framework before blaming my own code.",
];

export default function ConfessionsDrawer() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % CONFESSIONS.length);

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm transition-colors group"
        style={{
          color: "var(--muted)",
          fontFamily: "var(--font-dm-mono), monospace",
        }}
      >
        <span
          className="inline-block transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▶
        </span>
        <span className="group-hover:underline" style={{ color: open ? "var(--accent)" : "var(--muted)" }}>
          the part I&apos;d normally leave out
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="mt-3 p-4 rounded border"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className="text-sm mb-3"
                  style={{ color: "var(--text)" }}
                >
                  &ldquo;{CONFESSIONS[index]}&rdquo;
                </motion.p>
              </AnimatePresence>
              <button
                onClick={next}
                className="text-xs transition-colors"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--muted)")
                }
              >
                another one →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
