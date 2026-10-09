"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [user, domain] = email.split("@");
  return (
    <div className="contact-email">
      <a href={`mailto:${email}`} className="big-email">
        <span>{user}</span>
        <span className="at">@{domain}</span>
      </a>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {}
        }}
      >
        {copied ? "Copied" : "Copy address"}
      </button>
    </div>
  );
}
