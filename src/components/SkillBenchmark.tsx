"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SKILLS: Record<string, string> = {
  C: "Pointers respected. Crashes reduced.",
  "C#": "Production-ready and calm under pressure.",
  Python: "Fast to build, easy to iterate.",
  React: "UI patterns that stay maintainable.",
  "React Native": "Mobile features shipped without drama.",
  "Next.js": "Strong defaults, fast delivery.",
  TypeScript: "Helpful guardrails, fewer surprises.",
  "REST APIs": "Contract-first, then implementation.",
  "SAP HANA": "Learned through real-world constraints.",
  Git: "Clean branches, recoverable mistakes.",
  Linux: "Comfortable in shell and server workflows.",
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
                background: active === skill ? "var(--accent-dim)" : "var(--surface)",
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
