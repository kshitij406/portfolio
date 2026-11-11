"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const [user, domain] = email.split("@");
  return (
    <div className="contact-email">
      <a href={`mailto:${email}`} className="big-email">
        <span>{user}</span>
        <span className="at">@{domain}</span>
      </a>
      <button
        type="button"
        className={`btn btn-ghost copy-btn ${state}`}
        aria-live="polite"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setState("copied");
          } catch {
            setState("failed");
          }
          setTimeout(() => setState("idle"), 2000);
        }}
      >
        <span className="swap" key={state}>
          {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Couldn't copy, select it above" : "Copy address"}
        </span>
      </button>
    </div>
  );
}
