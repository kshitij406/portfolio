"use client";

import { useEffect, useRef, useState } from "react";
import { DEMOS, GAME } from "@/data/content";

/**
 * Things you can try without leaving the page. A live site opens in a big
 * frame; sites that refuse to be framed open a full-page capture instead,
 * with a link out. The game sits in a handheld drawn for this page.
 */

type Open = { kind: "site"; index: number } | { kind: "game" } | null;

export function LiveSite({ id }: { id: string }) {
  const [open, setOpen] = useState<Open>(null);
  const index = DEMOS.findIndex((d) => d.id === id);
  const d = DEMOS[index];
  return (
    <>
      <button type="button" className="btn" onClick={() => setOpen({ kind: "site", index })}>
        {d.embed ? "Try the live site here" : "Look around the site"}
      </button>
      {open && <Viewer open={open} onClose={() => setOpen(null)} />}
    </>
  );
}

export function PlayGame() {
  const [open, setOpen] = useState<Open>(null);
  const [touch, setTouch] = useState(false);
  useEffect(() => setTouch(!matchMedia("(hover: hover)").matches), []);
  const play = () => setOpen({ kind: "game" });
  return (
    <div className="game-row">
      <button type="button" className="handheld" onClick={play} aria-label="Play Platformer">
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
        <p className="muted">
          {touch
            ? "It needs arrow keys, so it's best on a computer. On a phone it'll load, but you can't move."
            : "Arrow keys to move. Click the game once it loads so it hears your keyboard."}
        </p>
        <button type="button" className="btn" onClick={play}>
          Play it here
        </button>
      </div>
      {open && <Viewer open={open} onClose={() => setOpen(null)} />}
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
