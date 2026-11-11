import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CopyEmail from "@/components/CopyEmail";
import { LINKS, PROFILE } from "@/data/content";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="page">
      <main className="contact">
        <h1>Write to me</h1>
        <CopyEmail email={PROFILE.email} />
        <div className="record">
          <div>
            <h2>Available</h2>
            <ul>
              <li>{PROFILE.availability.replace("12-month", "12‑month")}</li>
              <li className="muted">{PROFILE.based}</li>
            </ul>
          </div>
          <div>
            <h2>Elsewhere</h2>
            <ul>
              <li>
                <a href="/Kshitij_Jha_CV.pdf" target="_blank" rel="noreferrer">
                  CV (PDF)
                </a>
              </li>
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                  <span className="muted">{l.handle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
