import Link from "next/link";
import Landscape from "@/components/Landscape";
import Sticker from "@/components/Sticker";
import Eyes from "@/components/Eyes";
import { ELSEWHERE, ICONS } from "@/components/social";
import { PROFILE } from "@/data/content";

const NAV = [
  ["Work", "/work"],
  ["Experience", "/experience"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

/**
 * The closing card on every page: one more invitation to email, over the
 * same hills the home page opens on.
 */
export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-card" data-sticker-bounds>
        <Landscape />
        <div className="foot-top">
          <nav className="foot-social" aria-label="Elsewhere">
            {ELSEWHERE.map(([icon, name, href]) => (
              <a key={icon} href={href} target="_blank" rel="noreferrer" aria-label={name} title={name}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                  {ICONS[icon]}
                </svg>
              </a>
            ))}
          </nav>
          <p className="foot-note">
            Got a placement or a project?
            <br />
            I answer every email.
          </p>
        </div>
        <Eyes className="foot-eyes" />
        <div className="foot-bottom">
          <h2 className="display foot-h">
            <span className="line">
              Let&rsquo;s build
              <Sticker tone="lilac" tilt={-8} className="st-a">
                Backend
              </Sticker>
            </span>
            <span className="line">
              something
              <Sticker tone="lime" tilt={7} className="st-b">
                Frontend
              </Sticker>
            </span>
            <span className="line">
              <Sticker tone="blue" tilt={-4} className="st-c">
                Database
              </Sticker>
              that holds up
            </span>
          </h2>
          <a href={`mailto:${PROFILE.email}`} className="btn btn-light">
            Email me
          </a>
        </div>
      </div>

      <div className="foot-bar">
        <Link href="/" className="wordmark">
          Kshitij Jha
        </Link>
        <nav aria-label="Footer">
          {NAV.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <a href="/Kshitij_Jha_CV.pdf" target="_blank" rel="noreferrer">
            CV
          </a>
        </nav>
        <p>© 2026 Kshitij Jha</p>
      </div>
    </footer>
  );
}
