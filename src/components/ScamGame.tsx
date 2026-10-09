"use client";

import { useEffect, useRef, useState } from "react";
import { analyse } from "./ScamCheck";

/**
 * Scam or legit: eight messages of the kind people in Mauritius actually get.
 * Swipe left for scam, right for legit (or use the buttons, or the arrow
 * keys). Each answer shows the tell. At the end, FraudLens's rules take the
 * same test, so you can see whether you beat them.
 */

type Msg = { from: string; text: string; scam: boolean; tell: string };

const MESSAGES: Msg[] = [
  {
    from: "MCB",
    text: "Ou kont inn bloke. Pou debloke li imedyatman, klik lor https://mcb-secure.top/verify ek rant ou kod OTP.",
    scam: true,
    tell: "Banks never ask for your OTP, and mcb-secure.top is not mcb.mu.",
  },
  {
    from: "Mum (new number)",
    text: "Hi beta, I dropped my phone, this is my new number. I just sent you a code by mistake, can you send it back to me?",
    scam: true,
    tell: "The 'new number' story plus a request for a code is how accounts get taken over.",
  },
  {
    from: "Rose Hill Post Office",
    text: "Your parcel is ready for collection at the Rose Hill counter. Please bring your ID. Open until 4pm.",
    scam: false,
    tell: "No link, no payment, no rush. It just tells you where to go.",
  },
  {
    from: "MyT",
    text: "Congratulations! You won an iPhone in our anniversary draw. Pay Rs 500 delivery fee today only at https://myt-prize.xyz",
    scam: true,
    tell: "You never pay to receive a prize, and that .xyz address is not myt.mu.",
  },
  {
    from: "MRA",
    text: "Your income tax refund has been processed and will be credited to your registered bank account within 5 working days.",
    scam: false,
    tell: "Nothing to click and nothing to send. Real notices usually look this boring.",
  },
  {
    from: "MauPost",
    text: "Your parcel is held at customs. Pay the Rs 75 release fee here: https://mаupost.mu/pay",
    scam: true,
    tell: "Look closely: the 'а' in that address is Cyrillic. It only looks like maupost.mu.",
  },
  {
    from: "Emtel",
    text: "Your September bill of Rs 1,240 is ready. You can view and pay it in the my.emtel app.",
    scam: false,
    tell: "It points you to the app you already have, not to a link.",
  },
  {
    from: "SBM Bank",
    text: "Cher client, votre compte sera suspendu dans 24h. Confirmez votre code PIN immédiatement pour éviter le blocage.",
    scam: true,
    tell: "Threat, deadline, and a request for your PIN. All three at once is never real.",
  },
];

type Answer = { said: boolean; right: boolean };

export default function ScamGame() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [reveal, setReveal] = useState<Answer | null>(null);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [fly, setFly] = useState<0 | -1 | 1>(0);
  const start = useRef({ x: 0, y: 0 });
  const box = useRef<HTMLDivElement>(null);
  const done = i >= MESSAGES.length;

  const answer = (saidScam: boolean) => {
    if (done || reveal || fly) return;
    const m = MESSAGES[i];
    const a = { said: saidScam, right: saidScam === m.scam };
    setFly(saidScam ? -1 : 1);
    setTimeout(() => {
      setAnswers((p) => [...p, a]);
      setReveal(a);
      setFly(0);
      setDrag({ x: 0, y: 0, active: false });
    }, 280);
  };

  const next = () => {
    setReveal(null);
    setI((n) => n + 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!box.current) return;
      const r = box.current.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      if (reveal && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        next();
      } else if (!reveal && e.key === "ArrowLeft") answer(true);
      else if (!reveal && e.key === "ArrowRight") answer(false);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  });

  const down = (e: React.PointerEvent) => {
    if (reveal || done) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
  };
  const move = (e: React.PointerEvent) => {
    if (!drag.active) return;
    setDrag({ x: e.clientX - start.current.x, y: (e.clientY - start.current.y) * 0.3, active: true });
  };
  const up = () => {
    if (!drag.active) return;
    if (Math.abs(drag.x) > 110) answer(drag.x < 0);
    else setDrag({ x: 0, y: 0, active: false });
  };

  const restart = () => {
    setI(0);
    setAnswers([]);
    setReveal(null);
  };

  if (done) {
    const you = answers.filter((a) => a.right).length;
    const rules = MESSAGES.filter((m) => (analyse(m.text).score >= 25) === m.scam).length;
    return (
      <div className="sg sg-done" ref={box}>
        <p className="sg-big">
          {you}
          <span>/8</span>
        </p>
        <p className="sg-verdict">
          {you === 8
            ? "Perfect. Nobody is getting your OTP."
            : you >= 6
              ? "Sharp. You'd catch most of them."
              : "They got you a few times. That's exactly why FraudLens exists."}
        </p>
        <p className="sg-rules">
          FraudLens&rsquo;s rules, with the AI switched off, got <strong>{rules}/8</strong> on the same
          messages. {rules > you ? "The rules win this round." : rules === you ? "A draw." : "You beat the rules."}
        </p>
        <ol className="sg-recap">
          {MESSAGES.map((m, k) => (
            <li key={k} className={answers[k]?.right ? "ok" : "miss"}>
              <span>{m.from}</span>
              <span>{m.scam ? "Scam" : "Legit"}</span>
            </li>
          ))}
        </ol>
        <button type="button" className="btn" onClick={restart}>
          Play again
        </button>
      </div>
    );
  }

  const m = MESSAGES[i];
  const lean = Math.max(-1, Math.min(1, drag.x / 110));
  const cardStyle: React.CSSProperties = fly
    ? { transform: `translate(${fly * 140}%, -30px) rotate(${fly * 24}deg)`, opacity: 0, transition: "transform .3s ease-in, opacity .3s" }
    : { transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x / 14}deg)`, transition: drag.active ? "none" : "transform .45s cubic-bezier(.22,1,.36,1)" };

  return (
    <div className="sg" ref={box}>
      <div className="sg-head">
        <p className="sg-count">
          Message {i + 1} of {MESSAGES.length}
        </p>
        <div className="sg-dots" aria-hidden>
          {MESSAGES.map((_, k) => (
            <i key={k} className={k < answers.length ? (answers[k].right ? "ok" : "miss") : k === i ? "now" : ""} />
          ))}
        </div>
      </div>

      <div className="sg-table">
        {MESSAGES.slice(i + 1, i + 3).map((n, k) => (
          <div key={n.from + k} className="sg-card sg-under" style={{ transform: `translateY(${(k + 1) * 10}px) scale(${1 - (k + 1) * 0.04})`, zIndex: 2 - k }} aria-hidden />
        ))}
        {!reveal && (
          <div
            className="sg-card"
            style={{ ...cardStyle, zIndex: 5 }}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
          >
            <span className="stamp stamp-scam" style={{ opacity: Math.max(0, -lean) }}>
              Scam
            </span>
            <span className="stamp stamp-legit" style={{ opacity: Math.max(0, lean) }}>
              Legit
            </span>
            <p className="sms-from">
              <span className="sms-avatar" aria-hidden>
                {m.from[0]}
              </span>
              {m.from}
            </p>
            <p className="sms-bubble">{m.text}</p>
            <p className="sms-time">now</p>
          </div>
        )}
        {reveal && (
          <div className={`sg-card sg-reveal ${reveal.right ? "right" : "wrong"}`} style={{ zIndex: 5 }}>
            <p className="sg-result">{reveal.right ? "Got it." : "Not quite."}</p>
            <p className="sg-answer">
              That was {m.scam ? "a scam" : "legit"}.
            </p>
            <p className="sg-tell">{m.tell}</p>
            <button type="button" className="btn" onClick={next} autoFocus>
              {i === MESSAGES.length - 1 ? "See your score" : "Next message"}
            </button>
          </div>
        )}
      </div>

      {!reveal && (
        <div className="sg-buttons">
          <button type="button" className="sg-btn sg-btn-scam" onClick={() => answer(true)}>
            Scam
          </button>
          <p className="sg-hint">Swipe, tap, or use the arrow keys</p>
          <button type="button" className="sg-btn sg-btn-legit" onClick={() => answer(false)}>
            Legit
          </button>
        </div>
      )}
    </div>
  );
}
