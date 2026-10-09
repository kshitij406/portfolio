"use client";

import { useMemo, useState } from "react";

/**
 * A toy of the FraudLens idea, small enough to run in the page: a handful of
 * deterministic rules own the score, every point is shown with the words that
 * earned it, and phrase-only evidence is capped so wording alone cannot make
 * a message high risk. The real engine has about 70 signal codes and a model
 * that interprets language; this has eight rules and no model.
 */

type Hit = { code: string; label: string; points: number; quote: string; kind: "phrase" | "link" };

const OFFICIAL: Record<string, string> = {
  mcb: "mcb.mu",
  sbm: "sbmgroup.mu",
  mra: "mra.mu",
  emtel: "emtel.com",
  myt: "myt.mu",
};

const PHRASES: { code: string; label: string; points: number; re: RegExp }[] = [
  { code: "OTP_REQUEST", label: "Asks for a one-time code", points: 25, re: /\b(otp|one[- ]time (?:code|password)|kod|code de v[ée]rification)\b/i },
  { code: "URGENCY", label: "Pushes you to act now", points: 12, re: /\b(urgent|immediately|within 24 ?h(?:ours)?|today only|imedyatman|tou de suite|aster mem)\b/i },
  { code: "ACCOUNT_THREAT", label: "Threatens your account", points: 15, re: /\b(blocked|suspended|bloke|bloqu[ée]e?|suspendu|desactiv[ée])\b/i },
  { code: "PAYMENT_ASK", label: "Asks for a payment or fee", points: 10, re: /\b(pay|payment|fee|frais|peye|transfer)\b/i },
  { code: "PRIZE_BAIT", label: "Promises a prize", points: 12, re: /\b(won|winner|gagn[ée]|ganie|prize|lot)\b/i },
];

const PHRASE_CAP = 45;

const SAMPLES = [
  {
    label: "Bank OTP, in Kreol",
    text: "MCB: ou kont inn bloke. Pou debloke li imedyatman, avoy nou kod OTP ki ou finn resevwar lor https://mcb-secure.top/verify",
  },
  {
    label: "Lookalike link",
    text: "Your MRA refund of Rs 4,250 is ready. Confirm your details today only at https://mrа.mu/refund",
  },
  {
    label: "An ordinary message",
    text: "Hi, the parcel is at the post office in Rose Hill. They close at 4, bring your ID.",
  },
];

function analyse(text: string): { hits: Hit[]; score: number } {
  const hits: Hit[] = [];
  for (const p of PHRASES) {
    const m = text.match(p.re);
    if (m) hits.push({ code: p.code, label: p.label, points: p.points, quote: m[0], kind: "phrase" });
  }

  for (const m of text.matchAll(/https?:\/\/([^\s/]+)\S*/gi)) {
    const host = m[1].toLowerCase();
    if (/[^\x00-\x7f]/.test(host)) {
      const odd = [...host].filter((c) => c.charCodeAt(0) > 127);
      const codes = odd.map((c) => "U+" + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")).join(", ");
      hits.push({ code: "HOMOGLYPH_HOST", label: `Non-Latin letter in the address (${codes})`, points: 35, quote: host, kind: "link" });
    }
    const skeleton = host.normalize("NFKD").replace(/[а]/g, "a").replace(/[с]/g, "c").replace(/[еe]/g, "e").replace(/[о]/g, "o");
    for (const [brand, real] of Object.entries(OFFICIAL)) {
      if (skeleton.includes(brand) && host !== real && !host.endsWith("." + real)) {
        hits.push({ code: "LOOKALIKE_DOMAIN", label: `Looks like ${brand.toUpperCase()}, but the real site is ${real}`, points: 30, quote: host, kind: "link" });
        break;
      }
    }
    if (/\.(top|xyz|click|zip|icu|buzz)$/.test(host)) {
      hits.push({ code: "RISKY_TLD", label: "Domain ending often used for throwaway sites", points: 10, quote: host, kind: "link" });
    }
  }

  const phrase = Math.min(PHRASE_CAP, hits.filter((h) => h.kind === "phrase").reduce((a, h) => a + h.points, 0));
  const link = hits.filter((h) => h.kind === "link").reduce((a, h) => a + h.points, 0);
  return { hits, score: Math.min(100, phrase + link) };
}

function highlight(text: string, hits: Hit[]) {
  const quotes = [...new Set(hits.map((h) => h.quote))].filter(Boolean);
  if (!quotes.length) return text;
  // Longest first, and whole words only, so "bloke" doesn't light up inside "debloke".
  const esc = quotes
    .sort((a, b) => b.length - a.length)
    .map((q) => q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(?<![\\p{L}\\p{N}])(${esc.join("|")})(?![\\p{L}\\p{N}])`, "giu"));
  return parts.map((p, i) =>
    quotes.some((q) => q.toLowerCase() === p.toLowerCase()) ? <mark key={i}>{p}</mark> : p,
  );
}

export default function ScamCheck() {
  const [text, setText] = useState(SAMPLES[0].text);
  const { hits, score } = useMemo(() => analyse(text), [text]);
  const phraseRaw = hits.filter((h) => h.kind === "phrase").reduce((a, h) => a + h.points, 0);
  const verdict = score >= 60 ? "High risk" : score >= 25 ? "Suspicious" : "Nothing found";
  const tone = score >= 60 ? "high" : score >= 25 ? "mid" : "low";

  return (
    <div className="demo scam">
      <div className="scam-input">
        <div className="chips" role="group" aria-label="Example messages">
          {SAMPLES.map((s) => (
            <button
              type="button"
              key={s.label}
              className={`chip${text === s.text ? " on" : ""}`}
              onClick={() => setText(s.text)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="scam-text">
          Message to check
        </label>
        <div className="scam-field">
          <div className="scam-mirror" aria-hidden>
            {highlight(text, hits)}
            {"\n"}
          </div>
          <textarea
            id="scam-text"
            value={text}
            spellCheck={false}
            onChange={(e) => setText(e.target.value)}
            rows={5}
          />
        </div>
        <p className="demo-note">
          Paste anything. It runs in your browser and nothing is sent anywhere.
        </p>
      </div>

      <div className={`scam-out tone-${tone}`} aria-live="polite">
        <div className="scam-score">
          <span className="scam-num">{score}</span>
          <span className="scam-verdict">{verdict}</span>
        </div>
        <div className="meter" aria-hidden>
          <span style={{ transform: `scaleX(${score / 100})` }} />
        </div>
        <ul className="scam-hits">
          {hits.length === 0 && <li className="scam-empty">No rule fired. That isn&rsquo;t proof it&rsquo;s safe.</li>}
          {hits.map((h, i) => (
            <li key={h.code + i}>
              <span className="pts">+{h.points}</span>
              <span>
                {h.label}
                <q>{h.quote}</q>
              </span>
            </li>
          ))}
        </ul>
        {phraseRaw > PHRASE_CAP && (
          <p className="scam-cap">
            Wording alone earned {phraseRaw} points, capped at {PHRASE_CAP}. Scary words are not
            enough for a high-risk verdict on their own.
          </p>
        )}
      </div>
    </div>
  );
}
