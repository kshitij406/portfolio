"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  ["Work", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

// One solid 24px glyph per site, so the set reads as a family.
const ICONS = {
  github: (
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  ),
  linkedin: (
    <path d="M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1Zm1.8 13.1H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
  ),
  instagram: (
    <path
      fillRule="evenodd"
      d="M7 0h10a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7Zm0 2.2A4.8 4.8 0 0 0 2.2 7v10A4.8 4.8 0 0 0 7 21.8h10a4.8 4.8 0 0 0 4.8-4.8V7A4.8 4.8 0 0 0 17 2.2H7Zm5 4a5.8 5.8 0 1 1 0 11.6 5.8 5.8 0 0 1 0-11.6Zm0 2.2a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2ZM18.2 4.3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
    />
  ),
  // Letterboxd's three dots, in one colour.
  letterboxd: (
    <>
      <circle cx="5" cy="12" r="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="19" cy="12" r="5" />
    </>
  ),
};

const ELSEWHERE = [
  ["github", "GitHub", "https://github.com/kshitij406"],
  ["linkedin", "LinkedIn", "https://www.linkedin.com/in/kshitij-jha2006/"],
  ["instagram", "Instagram", "https://www.instagram.com/kxitiz_"],
  ["letterboxd", "Letterboxd", "https://boxd.it/4m4al"],
] as const;

// Canterbury time. Empty on the server so the first render can't mismatch.
function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "numeric", minute: "2-digit", hour12: true });
    const tick = () => setNow(fmt.format(new Date()).toUpperCase());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span className="time">{now ?? "--:--"}</span>;
}

export default function Header() {
  const path = usePathname();
  return (
    <header className="head">
      <Link href="/" className="head-who" aria-label="Kshitij Jha, home">
        Kshitij Jha
        <span>Software developer</span>
      </Link>
      <p className="head-where">
        Canterbury, UK
        <span>
          Local time
          <LocalTime />
        </span>
      </p>
      <nav className="head-nav" aria-label="Main">
        {NAV.map(([label, href]) => (
          <Link key={href} href={href} aria-current={path.startsWith(href) ? "page" : undefined}>
            {label}
          </Link>
        ))}
        <a href="/Kshitij_Jha_CV.pdf" target="_blank" rel="noreferrer">
          CV
        </a>
      </nav>
      <nav className="head-elsewhere" aria-label="Elsewhere">
        {ELSEWHERE.map(([icon, name, href]) => (
          <a key={icon} href={href} target="_blank" rel="noreferrer" aria-label={name} title={name}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
              {ICONS[icon]}
            </svg>
          </a>
        ))}
      </nav>
    </header>
  );
}
