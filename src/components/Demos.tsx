"use client";

import { useEffect, useRef, useState } from "react";
import { DEMOS, GAME } from "@/data/content";

/**
 * Things you can try without leaving the page.
 *
 * Sites sit as loose browser windows. Hovering (or, on touch, just having one
 * on screen) scrolls a full-page capture through the window. Opening one
 * loads the real site in a big frame; sites that refuse to be framed open
 * the capture instead, with a link out.
 *
 * The game sits in a handheld drawn for this page. Press start and the real
 * Godot build runs full-screen.
 */

type Open = { kind: "site"; index: number } | { kind: "game" } | null;

export default function Demos() {
  const [open, setOpen] = useState<Open>(null);

  return (
    <div className="demos">
      <div className="demo-desk">
        {DEMOS.map((d, i) => (
          <SiteWindow key={d.id} index={i} onOpen={() => setOpen({ kind: "site", index: i })} />
        ))}
      </div>
      <Handheld onPlay={() => setOpen({ kind: "game" })} />
      {open && <Viewer open={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function SiteWindow({ index, onOpen }: { index: number; onOpen: () => void }) {
  const d = DEMOS[index];
  const ref = useRef<HTMLElement>(null);

  // On touch screens there's no hover, so the capture drifts on its own while
  // the window is on screen.
  useEffect(() => {
    if (matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(([e]) => ref.current?.classList.toggle("drift", e.isIntersecting), {
      threshold: 0.5,
    });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <article className={`site-win sw-${index}`} ref={ref}>
      <div className="sw-bar" aria-hidden>
        <i />
        <i />
        <i />
        <span className="sw-url">{d.url.replace("https://", "")}</span>
      </div>
      <button type="button" className="sw-view" onClick={onOpen} aria-label={`Open ${d.name}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d.shot} alt="" loading="lazy" />
        <span className="sw-cta">{d.embed ? "Try it live" : "Look around"}</span>
      </button>
      <div className="sw-meta">
        <p className="sw-tag">{d.tag}</p>
        <h3>{d.name}</h3>
        <p>{d.what}</p>
      </div>
    </article>
  );
}

function Handheld({ onPlay }: { onPlay: () => void }) {
  const [touch, setTouch] = useState(false);
  useEffect(() => setTouch(!matchMedia("(hover: hover)").matches), []);
  return (
    <div className="game-row">
      <button type="button" className="handheld" onClick={onPlay} aria-label="Play Platformer">
        <span className="hh-grip hh-left" aria-hidden>
          <span className="hh-dpad">
            <i />
            <i />
          </span>
        </span>
        <span className="hh-screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GAME.shot} alt="" loading="lazy" />
          <span className="hh-start">Press start</span>
        </span>
        <span className="hh-grip hh-right" aria-hidden>
          <span className="hh-btns">
            <i />
            <i />
          </span>
        </span>
      </button>
      <div className="game-copy">
        <p className="sw-tag">Playable, made in Godot</p>
        <h3>{GAME.name}</h3>
        <p>{GAME.what}</p>
        <p className="muted">
          {touch
            ? "It needs arrow keys, so it's best on a computer. On a phone it'll load, but you can't move."
            : "Arrow keys to move. Click the game once it loads so it hears your keyboard."}
        </p>
        <button type="button" className="btn" onClick={onPlay}>
          Play it here
        </button>
      </div>
    </div>
  );
}

function Viewer({ open, onClose }: { open: NonNullable<Open>; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const close = useRef<HTMLButtonElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const site = open.kind === "site" ? DEMOS[open.index] : null;

  useEffect(() => {
    close.current?.focus();
    document.documentElement.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("no-scroll");
      removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const url = site ? site.url : GAME.src;
  const live = site ? site.embed : true;

  return (
    <div className={`viewer${open.kind === "game" ? " viewer-game" : ""}`} role="dialog" aria-modal="true" aria-label={site ? site.name : GAME.name}>
      <div className="vw-window">
        <div className="vw-bar">
          <span className="vw-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="vw-url">{site ? url.replace("https://", "") : "kshitijj.me/games/platformer"}</span>
          <a className="vw-btn" href={url} target="_blank" rel="noreferrer">
            New tab
          </a>
          <button type="button" className="vw-btn vw-close" onClick={onClose} ref={close}>
            Close
          </button>
        </div>
        <div className="vw-body">
          {live ? (
            <>
              {!loaded && (
                <div className="vw-loading" aria-live="polite">
                  <span className="vw-spinner" aria-hidden />
                  {open.kind === "game" ? "Loading the game, about 40 MB the first time." : `Loading ${site!.name}...`}
                </div>
              )}
              <iframe
                ref={frame}
                src={url}
                title={site ? site.name : GAME.name}
                onLoad={() => {
                  setLoaded(true);
                  if (open.kind === "game") frame.current?.focus();
                }}
                allow="autoplay; fullscreen; gamepad"
                className={loaded ? "on" : ""}
              />
            </>
          ) : (
            <div className="vw-shot">
              <p className="vw-note">
                This site doesn&rsquo;t allow itself to be embedded, which is the right call for a shop. Here&rsquo;s the
                whole page instead.{" "}
                <a href={url} target="_blank" rel="noreferrer">
                  Visit the real one
                </a>
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site!.shot} alt={`Full page of ${site!.name}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
