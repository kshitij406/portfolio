"use client";

import { useState } from "react";
import { PROFILE } from "@/data/site";

const EMAIL = PROFILE.email;

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
      className="group flex flex-wrap items-center gap-3 text-left"
    >
      <span
        className="text-lg md:text-xl transition-colors"
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          color: "var(--text)",
          textDecoration: "underline",
          textDecorationStyle: "dotted",
          textDecorationColor: "var(--muted-dim)",
          textUnderlineOffset: "5px",
        }}
      >
        {EMAIL}
      </span>
      <span
        className="btn btn-secondary"
        style={{
          borderColor: copied ? "var(--accent)" : "var(--border)",
          color: copied ? "#0f151c" : "var(--muted)",
          background: copied ? "var(--accent-dim)" : "transparent",
          opacity: 1,
          minHeight: "32px",
          padding: "0 10px",
          fontSize: "11px",
        }}
      >
        {copied ? "Copied" : "Copy email"}
      </span>
    </button>
  );
}
