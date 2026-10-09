"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["Work", "#work"],
  ["Projects", "#projects"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export default function Nav() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const set = document.documentElement.dataset.theme;
    setDark(set ? set === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const html = document.documentElement;
    html.classList.add("theme-anim");
    html.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("kj-theme", html.dataset.theme);
    } catch {}
    setTimeout(() => html.classList.remove("theme-anim"), 500);
  };

  return (
    <header className="nav">
      <a href="#top" className="mark" aria-label="Kshitij Jha, back to top">
        <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden>
          <circle cx="20" cy="20" r="18.5" className="mark-ring" />
          <path d="M13 11v18M13 21l9-10M16.5 18l6.5 11M27 11v13.5c0 3-1.6 4.5-4.4 4.5" className="mark-path" />
        </svg>
      </a>
      <nav aria-label="Sections">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="theme"
        onClick={toggle}
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      >
        <span className="theme-orb" aria-hidden />
        <span className="theme-label">{dark === null ? "" : dark ? "Night dive" : "Day"}</span>
      </button>
    </header>
  );
}
