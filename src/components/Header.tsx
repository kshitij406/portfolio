"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ELSEWHERE, ICONS } from "@/components/social";

// Canterbury time, 24-hour like a departures board. Empty on the server so
// the first render can't mismatch.
function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span className="time">{now ?? "--:--"}</span>;
}

export default function Header() {
  const path = usePathname();
  return (
    <header className={`head${path === "/" ? " head-over" : ""}`}>
      <Link href="/contact" className="glass status">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/portrait.jpg" alt="" width="36" height="36" className="glass-thumb" />
        <span className="glass-text">
          <span className="glass-meta status-live">Open to a placement, July 2027</span>
          <span className="glass-title">Kshitij Jha</span>
          <span className="glass-sub">Software developer</span>
        </span>
      </Link>
      <Link href="/" className="wordmark" aria-label="Kshitij Jha, home">
        Kshitij Jha
      </Link>
      <div className="head-right">
        <p className="head-where">
          <LocalTime /> Canterbury
        </p>
        <nav className="head-elsewhere" aria-label="Elsewhere">
          {ELSEWHERE.map(([icon, name, href]) => (
            <a key={icon} href={href} target="_blank" rel="noreferrer" aria-label={name} title={name}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                {ICONS[icon]}
              </svg>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
