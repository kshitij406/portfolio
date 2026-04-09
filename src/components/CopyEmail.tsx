"use client";

import { useState } from "react";

const EMAIL = "kshitij.j615@gmail.com";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-3 text-left transition-all"
    >
      <span
        className="text-lg underline underline-offset-4 decoration-dotted transition-colors"
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          color: "var(--text)",
          textDecorationColor: "var(--muted)",
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLElement).style.color = "var(--accent)")
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLElement).style.color = "var(--text)")
        }
      >
        {EMAIL}
      </span>
      <span
        className="text-xs px-2 py-1 rounded border transition-all duration-300"
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          borderColor: copied ? "var(--accent)" : "var(--border)",
          color: copied ? "var(--accent)" : "var(--muted)",
          background: copied ? "var(--accent-dim)" : "transparent",
          opacity: copied ? 1 : 0.5,
        }}
      >
        {copied ? "copied." : "click to copy"}
      </span>
    </button>
  );
}
