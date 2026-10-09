"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CARDS } from "@/data/content";
import Card, { type CardHandle } from "./Card";

/**
 * Desktop: a hand of cards fanned in an arc. Hover lifts one, click pulls it
 * out to inspect, Shuffle gathers them into a pile and deals them back out.
 * Phones: a swipeable row; the foil shifts as each card slides past centre.
 * Inspecting: the card flies from where it was to the middle of the screen,
 * tilts under a finger or the pointer, and flips on tap.
 */

type Phase = "fan" | "gather" | "deal";

export default function Deck() {
  const [order, setOrder] = useState(() => CARDS.map((_, i) => i));
  const [phase, setPhase] = useState<Phase>("deal");
  const [open, setOpen] = useState<number | null>(null);
  const [fromRect, setFromRect] = useState<DOMRect | null>(null);
  const [mobile, setMobile] = useState(false);
  const [dealt, setDealt] = useState(false);
  const [width, setWidth] = useState(1200);
  const wrap = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const refs = useRef<(CardHandle | null)[]>([]);

  useEffect(() => {
    const mq = matchMedia("(max-width: 760px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(wrap.current!);
    return () => ro.disconnect();
  }, []);

  // Deal the hand the first time it scrolls into view.
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setDealt(true);
        setTimeout(() => setPhase("fan"), 60);
      },
      { threshold: 0.3 },
    );
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);

  // Phones: foil follows each card's position in the scrolling row.
  useEffect(() => {
    if (!mobile) return;
    const r = row.current!;
    const update = () => {
      const mid = r.getBoundingClientRect().left + r.clientWidth / 2;
      refs.current.forEach((h) => {
        if (!h?.el) return;
        const b = h.el.getBoundingClientRect();
        const off = (b.left + b.width / 2 - mid) / r.clientWidth;
        h.setTilt(50 + off * 120, 40);
      });
    };
    update();
    r.addEventListener("scroll", update, { passive: true });
    return () => r.removeEventListener("scroll", update);
  }, [mobile]);

  const shuffle = () => {
    setPhase("gather");
    setTimeout(() => {
      setOrder((o) => {
        const n = [...o];
        for (let i = n.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [n[i], n[j]] = [n[j], n[i]];
        }
        return n;
      });
      setPhase("deal");
      setTimeout(() => setPhase("fan"), 40);
    }, 650);
  };

  const inspect = (cardIndex: number, slot: number) => {
    setFromRect(refs.current[slot]?.el?.getBoundingClientRect() ?? null);
    setOpen(cardIndex);
  };

  const n = order.length;
  const fanStyle = (slot: number): React.CSSProperties => {
    if (mobile) return {};
    const mid = (n - 1) / 2;
    const d = slot - mid;
    if (phase !== "fan" || !dealt)
      return {
        transform: `translate(-50%, ${phase === "gather" ? 0 : 60}px) rotate(${(slot % 3) - 1}deg)`,
        transitionDelay: phase === "gather" ? `${slot * 25}ms` : "0ms",
        zIndex: slot,
      };
    // Fit the outermost cards inside the container, rotation included.
    const spread = Math.min(118, (width - 300) / (n - 1));
    return {
      transform: `translate(calc(-50% + ${d * spread}px), ${Math.abs(d) ** 1.8 * 6}px) rotate(${d * 5}deg)`,
      transitionDelay: `${slot * 55}ms`,
      zIndex: slot,
    };
  };

  return (
    <div className="deck-wrap" ref={wrap}>
      <div className={`deck${mobile ? " deck-row" : " deck-fan"} phase-${phase}`} ref={row}>
        {order.map((ci, slot) => (
          <div className="deck-slot" key={CARDS[ci].id} style={fanStyle(slot)}>
            <Card
              ref={(h) => {
                refs.current[slot] = h;
              }}
              card={CARDS[ci]}
              interactive={!mobile}
              tabIndex={0}
              onClick={() => inspect(ci, slot)}
            />
          </div>
        ))}
      </div>
      <div className="deck-actions">
        <button type="button" className="btn" onClick={shuffle} disabled={phase !== "fan"}>
          Shuffle the deck
        </button>
        <p className="deck-hint">
          {mobile ? "Swipe through, tap one to pick it up." : "Hover to lift a card. Click to pick it up."}
        </p>
      </div>
      {open !== null && (
        <Inspector index={open} from={fromRect} onClose={() => setOpen(null)} onStep={(d) => setOpen((o) => ((o ?? 0) + d + n) % n)} />
      )}
    </div>
  );
}

function Inspector({
  index,
  from,
  onClose,
  onStep,
}: {
  index: number;
  from: DOMRect | null;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const handle = useRef<CardHandle>(null);
  const stage = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setLeaving(true);
    setTimeout(onClose, 260);
  }, [onClose]);

  // Fly in from the card's place in the hand (first open only).
  useEffect(() => {
    const el = stage.current!;
    if (first.current && from && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const to = el.getBoundingClientRect();
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      const s = from.width / to.width;
      el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotate(-6deg)` },
          { transform: "translate(0,0) scale(1.04) rotate(1deg)", offset: 0.75 },
          { transform: "none" },
        ],
        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    } else {
      el.animate([{ transform: "translateX(40px) rotate(4deg)", opacity: 0 }, { transform: "none", opacity: 1 }], {
        duration: 380,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      });
    }
    first.current = false;
    setFlipped(false);
  }, [index, from]);

  useEffect(() => {
    closeBtn.current?.focus();
    document.documentElement.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "f") setFlipped((f) => !f);
    };
    addEventListener("keydown", onKey);

    // Tilt with the phone where the browser allows it without asking.
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      handle.current?.setTilt(50 + Math.max(-30, Math.min(30, e.gamma)) * 1.6, 50 + Math.max(-30, Math.min(30, e.beta - 45)) * 1.6);
    };
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (DOE && !DOE.requestPermission) addEventListener("deviceorientation", onTilt);

    return () => {
      document.documentElement.classList.remove("no-scroll");
      removeEventListener("keydown", onKey);
      removeEventListener("deviceorientation", onTilt);
    };
  }, [close, onStep]);

  // Touch: drag a finger across the card to tilt it.
  const onTouchMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    const r = handle.current!.el!.getBoundingClientRect();
    handle.current!.setTilt(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
  };

  const card = CARDS[index];

  return (
    <div className={`inspect${leaving ? " leaving" : ""}`} onClick={close} role="dialog" aria-modal="true" aria-label={card.name}>
      <div className="inspect-stage" ref={stage} onClick={(e) => e.stopPropagation()} onPointerMove={onTouchMove}>
        <Card ref={handle} card={card} flipped={flipped} className="card-big" onClick={() => setFlipped((f) => !f)} />
      </div>
      <div className="inspect-bar" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="ib" onClick={() => onStep(-1)} aria-label="Previous card">
          Prev
        </button>
        <button type="button" className="ib ib-main" onClick={() => setFlipped((f) => !f)}>
          {flipped ? "Show the front" : "Flip it over"}
        </button>
        <button type="button" className="ib" onClick={() => onStep(1)} aria-label="Next card">
          Next
        </button>
        <button type="button" className="ib" onClick={close} ref={closeBtn}>
          Put it back
        </button>
      </div>
    </div>
  );
}
