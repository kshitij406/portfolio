import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CopyEmail from "@/components/CopyEmail";
import { LINKS, PROFILE } from "@/data/content";

export const metadata: Metadata = { title: "Contact" };

// Big, full-width rows: every way to reach me, each one a single click.
const ROUTES = [
  { label: "Email", handle: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "CV", handle: "PDF", href: "/Kshitij_Jha_CV.pdf" },
  ...LINKS.filter((l) => l.label !== "Black Reef").map((l) => ({ label: l.label, handle: l.handle, href: l.href })),
];

export default function Contact() {
  return (
    <main className="wrap page">
      <div className="contact-top">
        <header className="page-head">
          <h1>Contact</h1>
          <p>{PROFILE.availability.replace("12-month", "12‑month")}. Email is the quickest way to reach me, and I answer.</p>
        </header>
        <CopyEmail email={PROFILE.email} />
      </div>

      <ul className="routes">
        {ROUTES.map((r, i) => (
          <li key={r.label} style={{ ["--i" as string]: i }}>
            <a href={r.href} {...(r.href.startsWith("mailto") ? {} : { target: "_blank", rel: "noreferrer" })}>
              <span className="route-label">{r.label}</span>
              <span className="route-handle">{r.handle}</span>
              <svg className="route-go" viewBox="0 0 12 12" width="14" height="14" aria-hidden>
                <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
      <Footer />
    </main>
  );
}
