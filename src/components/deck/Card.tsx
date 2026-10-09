"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { CARDS } from "@/data/content";
import CardArt from "./CardArt";

export type CardData = (typeof CARDS)[number];

const RARITY_LABEL = { legendary: "Legendary", epic: "Epic", rare: "Rare", common: "Common" };

/**
 * One collectible. Tilt and foil are driven by four CSS variables written
 * straight to the element (no re-render per frame):
 *   --rx, --ry  rotation in degrees
 *   --px, --py  pointer position across the card, 0 to 100
 * `interactive` lets the parent decide whether pointer tilt is on (the fan
 * and the inspector use it; the mobile carousel drives tilt from scroll).
 */
type Props = {
  card: CardData;
  flipped?: boolean;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  tabIndex?: number;
};

export type CardHandle = { el: HTMLDivElement | null; setTilt: (px: number, py: number) => void };

const Card = forwardRef<CardHandle, Props>(function Card(
  { card, flipped = false, interactive = true, className = "", style, onClick, tabIndex },
  ref,
) {
  const el = useRef<HTMLDivElement>(null);
  const target = useRef({ px: 50, py: 50, on: 0 });
  const cur = useRef({ px: 50, py: 50, on: 0 });
  const raf = useRef(0);

  const tick = () => {
    const t = target.current;
    const c = cur.current;
    c.px += (t.px - c.px) * 0.14;
    c.py += (t.py - c.py) * 0.14;
    c.on += (t.on - c.on) * 0.12;
    const s = el.current?.style;
    if (s) {
      s.setProperty("--px", c.px.toFixed(2));
      s.setProperty("--py", c.py.toFixed(2));
      s.setProperty("--ry", (((c.px - 50) / 50) * 16 * c.on).toFixed(2) + "deg");
      s.setProperty("--rx", (((50 - c.py) / 50) * 14 * c.on).toFixed(2) + "deg");
      s.setProperty("--on", c.on.toFixed(3));
    }
    const settled =
      Math.abs(t.px - c.px) < 0.05 && Math.abs(t.py - c.py) < 0.05 && Math.abs(t.on - c.on) < 0.002;
    raf.current = settled ? 0 : requestAnimationFrame(tick);
  };
  const kick = () => {
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };

  const setTilt = (px: number, py: number, on = 1) => {
    target.current = { px, py, on };
    kick();
  };

  useImperativeHandle(ref, () => ({ el: el.current, setTilt: (px, py) => setTilt(px, py) }));
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onMove = (e: React.PointerEvent) => {
    if (!interactive) return;
    const r = el.current!.getBoundingClientRect();
    setTilt(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
  };
  const onLeave = () => interactive && setTilt(50, 50, 0);

  return (
    <div
      ref={el}
      className={`card r-${card.rarity}${flipped ? " flipped" : ""} ${className}`}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      tabIndex={tabIndex}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? `${card.name}, ${RARITY_LABEL[card.rarity]}. Open card.` : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="card-inner">
        <div className="card-face card-front">
          <div className="card-top">
            <span className="card-name">{card.name}</span>
            <span className={`gem gem-${card.rarity}`} aria-label={RARITY_LABEL[card.rarity]} />
          </div>
          <div className="card-window">
            <CardArt art={card.art} />
          </div>
          <div className="card-kind">
            <span>{card.kind}</span>
            <span>{card.year}</span>
          </div>
          <p className="card-line">{card.line}</p>
          <dl className="card-stats">
            {card.stats.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="card-foot">
            <span>{card.badge}</span>
            <span>{RARITY_LABEL[card.rarity]}</span>
          </div>
          <div className="foil" aria-hidden />
          <div className="glare" aria-hidden />
        </div>
        <div className="card-face card-back">
          <div className="back-pattern" aria-hidden />
          <div className="back-body">
            <p className="back-name">{card.name}</p>
            <p className="back-text">{card.back}</p>
            {card.links && (
              <p className="back-links">
                {card.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    {l.label}
                  </a>
                ))}
              </p>
            )}
          </div>
          <div className="glare" aria-hidden />
        </div>
      </div>
    </div>
  );
});

export default Card;
