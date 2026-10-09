"use client";

import { useState } from "react";
import WaveText from "./WaveText";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [user, domain] = email.split("@");
  return (
    <div className="contact-email">
      <a href={`mailto:${email}`} className="big-email">
        <WaveText text={user} />
        <span className="at">
          <WaveText text={`@${domain}`} />
        </span>
      </a>
      <button
        type="button"
        className="btn btn-ghost magnetic"
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
