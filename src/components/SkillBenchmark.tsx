"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SKILLS: Record<string, string> = {
  C: "Segfault avoided. Barely.",
  "C#": "Enterprise-grade. Ship it.",
  Python: "It works. No idea why.",
  React: "useState used irresponsibly.",
  "React Native": "Compiled on the first try. Suspicious.",
  "Next.js": "Hydration error: ignored.",
  TypeScript: "Tried to escape JavaScript. This is still JavaScript.",
  "REST APIs": "200 OK. Probably fine.",
  "SAP HANA": "Enterprise-grade. You wouldn't get it.",
  Git: "Pushed to main. Prayed.",
  Linux: "sudo worked. Moving on.",
};

export default function SkillBenchmark() {
  const [result, setResult] = useState<{ skill: string; line: string } | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (skill: string) => {
    setActive(skill);
    setResult({ skill, line: SKILLS[skill] });
    setTimeout(() => setActive(null), 400);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {Object.keys(SKILLS).map((skill) => (
          <button
            key={skill}
            onClick={() => handleClick(skill)}
            className="px-3 py-1.5 rounded text-sm border transition-all duration-150 cursor-pointer"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              borderColor: active === skill ? "var(--accent)" : "var(--border)",
              color: active === skill ? "var(--accent)" : "var(--text)",
              background: active === skill ? "rgba(232,255,71,0.08)" : "var(--surface)",
            }}
          >
            {skill}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.skill}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-4 rounded border"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
              fontFamily: "var(--font-dm-mono), monospace",
            }}
          >
            <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>
              BENCHMARK &gt; {result.skill}
            </div>
            <div style={{ color: "var(--accent)" }}>
              &gt; {result.line}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && (
        <p className="mt-3 text-xs" style={{ color: "var(--muted)", fontFamily: "var(--font-dm-mono), monospace" }}>
          {/* click a skill to run the benchmark */}
          &gt; click a skill to run the benchmark
        </p>
      )}
    </div>
  );
}
