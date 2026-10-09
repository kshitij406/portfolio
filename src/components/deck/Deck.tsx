"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CARDS } from "@/data/content";
import Card, { type CardHandle } from "./Card";

/**
 * The deck sits on a wheel. Its section is tall and the stage inside it is
 * sticky, so scrolling turns the wheel: each card in turn swings up to the
 * top, stands upright and lifts, and its foil catches the light as it
 * passes. On phones the page scrolls normally and the wheel is turned by
 * swiping instead: drag sideways, let go, and it snaps to the nearest card
 * (a quick flick carries further). Vertical swipes still scroll the page.
 *
 * Transforms are written straight to the slots on scroll (no re-render per
 * frame). Dealing and shuffling switch on CSS transitions for a moment so
 * the cards glide instead of jumping.
 *
 * Click or tap any card to pick it up: it flies to the middle of the screen,
 * tilts under a finger or the pointer, and flips.
 */

const STEP_DESKTOP = 10.5;
const STEP_MOBILE = 13;

export default function Deck() {
  const [order, setOrder] = useState(() => CARDS.map((_, i) => i));
  const [open, setOpen] = useState<number | null>(null);
  const [fromRect, setFromRect] = useState<DOMRect | null>(null);
  const [focus, setFocus] = useState(0);
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  const refs = useRef<(CardHandle | null)[]>([]);
  const pile = useRef(true);
  const layout = useRef<() => void>(() => {});
  const wheel = useRef<HTMLDivElement>(null);
  // Phone swipe state: the wheel's position as a float card index.
  const swipe = useRef({ f: 0, target: 0, raf: 0 });
  const moved = useRef(false);
  const [mobile, setMobile] = useState(false);
  const n = order.length;

  useEffect(() => {
    const mq = matchMedia("(max-width: 760px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const el = scroller.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let lastFocus = -1;

    const apply = () => {
      raf = 0;
      // Same test as the CSS. innerWidth can report the layout viewport on
      // phones, which disagrees with the media query and breaks the swipe.
      const step = mobile ? STEP_MOBILE : STEP_DESKTOP;
      const r = el.getBoundingClientRect();
      const span = r.height - innerHeight;
      const p = reduce || span <= 0 ? 0.5 : Math.max(0, Math.min(1, -r.top / span));
      const f = mobile ? swipe.current.f : p * (n - 1);
      slots.current.forEach((slot, i) => {
        if (!slot) return;
        const d = pile.current ? 0 : i - f;
        const ad = Math.abs(d);
        const lift = Math.max(0, 1 - ad);
        const jitter = pile.current ? ((i * 7) % 5) - 2 : 0;
        slot.style.transform = `translate(-50%, ${-lift * (mobile ? 22 : 34)}px) rotate(${d * step + jitter}deg) scale(${1 + lift * 0.1})`;
        slot.style.zIndex = String(100 - Math.round(ad * 10));
        slot.style.opacity = String(ad > 5 ? Math.max(0, 1 - (ad - 5)) : 1);
        const h = refs.current[i];
        if (h) {
          if (ad < 1.6 && !pile.current) h.setTilt(Math.max(15, Math.min(85, 50 - d * 45)), 42, Math.max(0.35, lift));
          else h.setTilt(50, 50, 0);
        }
      });
      const fi = Math.round(f);
      if (fi !== lastFocus) {
        lastFocus = fi;
        setFocus(fi);
      }
    };
    layout.current = apply;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);

    // Deal out of the pile the first time the deck is on screen.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        glide(() => {
          pile.current = false;
          apply();
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    // Phones: swipe sideways to turn the wheel.
    const w = wheel.current!;
    const PX = Math.min(innerWidth * 0.55, 240); // finger travel for one card
    let drag: { x: number; y: number; f0: number; t: number; lastX: number; lastT: number; on: boolean } | null = null;
    const settle = () => {
      const sw = swipe.current;
      sw.f += (sw.target - sw.f) * 0.16;
      if (Math.abs(sw.target - sw.f) < 0.002) sw.f = sw.target;
      apply();
      sw.raf = sw.f === sw.target ? 0 : requestAnimationFrame(settle);
    };
    const onDown = (e: PointerEvent) => {
      if (!mobile || pile.current) return;
      cancelAnimationFrame(swipe.current.raf);
      swipe.current.raf = 0;
      moved.current = false;
      drag = { x: e.clientX, y: e.clientY, f0: swipe.current.f, t: e.timeStamp, lastX: e.clientX, lastT: e.timeStamp, on: false };
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (!drag.on) {
        if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
        drag.on = true;
        moved.current = true;
      }
      drag.lastX = e.clientX;
      drag.lastT = e.timeStamp;
      // A little resistance past either end.
      let f = drag.f0 - dx / PX;
      if (f < 0) f *= 0.35;
      if (f > n - 1) f = n - 1 + (f - (n - 1)) * 0.35;
      swipe.current.f = f;
      apply();
    };
    const onUp = (e: PointerEvent) => {
      if (!drag) return;
      if (drag.on) {
        const dt = Math.max(16, e.timeStamp - drag.t);
        const v = (e.clientX - drag.x) / dt; // px per ms
        const fling = Math.abs(v) > 0.5 ? -v * 1.6 : 0;
        swipe.current.target = Math.max(0, Math.min(n - 1, Math.round(swipe.current.f + fling)));
        if (!swipe.current.raf) swipe.current.raf = requestAnimationFrame(settle);
      }
      drag = null;
    };
    w.addEventListener("pointerdown", onDown);
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerup", onUp);
    addEventListener("pointercancel", onUp);

    return () => {
      w.removeEventListener("pointerdown", onDown);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
      removeEventListener("pointercancel", onUp);
      cancelAnimationFrame(swipe.current.raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [n, order, mobile]);

  // Turn transitions on briefly so a layout change animates.
  const glide = (fn: () => void, ms = 900) => {
    scroller.current?.classList.add("gliding");
    fn();
    setTimeout(() => scroller.current?.classList.remove("gliding"), ms);
  };

  const shuffle = () => {
    setBusy(true);
    glide(() => {
      pile.current = true;
      layout.current();
    }, 700);
    setTimeout(() => {
      setOrder((o) => {
        const next = [...o];
        for (let i = next.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [next[i], next[j]] = [next[j], next[i]];
        }
        return next;
      });
      setTimeout(() => {
        glide(() => {
          pile.current = false;
          layout.current();
        });
        setBusy(false);
      }, 60);
    }, 650);
  };

  const inspect = (cardIndex: number, slot: number) => {
    // A swipe ends with a click on whatever card was under the finger.
    if (moved.current) {
      moved.current = false;
      return;
    }
    setFromRect(refs.current[slot]?.el?.getBoundingClientRect() ?? null);
    setOpen(cardIndex);
  };

  const current = CARDS[order[Math.max(0, Math.min(n - 1, focus))]];

  return (
    <div className="deck-scroll" ref={scroller} style={{ ["--cards" as string]: n }}>
      <div className="deck-stage">
        <div className="deck-wheel" ref={wheel}>
          {order.map((ci, slot) => (
            <div
              className="deck-slot"
              key={CARDS[ci].id}
              ref={(el) => {
                slots.current[slot] = el;
              }}
            >
              <Card
                ref={(h) => {
                  refs.current[slot] = h;
                }}
                card={CARDS[ci]}
                interactive={false}
                tabIndex={0}
                onClick={() => inspect(ci, slot)}
              />
            </div>
          ))}
        </div>
        <div className="deck-caption" aria-live="polite">
          <p className="deck-count">
            {String(focus + 1).padStart(2, "0")} <span>of {String(n).padStart(2, "0")}</span>
          </p>
          <p className="deck-now">
            <strong>{current.name}</strong>
            <span>{current.badge}</span>
          </p>
          <div className="deck-actions">
            <button type="button" className="btn" onClick={shuffle} disabled={busy}>
              Shuffle
            </button>
            <p className="deck-hint">
              {mobile ? "Swipe to turn the deck. Tap a card to pick it up." : "Scroll to turn the deck. Click a card to pick it up."}
            </p>
          </div>
        </div>
      </div>
      {open !== null && (
        <Inspector
          index={open}
          from={fromRect}
          onClose={() => setOpen(null)}
          onStep={(d) => setOpen((o) => ((o ?? 0) + d + n) % n)}
        />
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
