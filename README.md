# kshitijj.me

My personal site. One page, two themes (Day and Night dive), fully static.

## The idea

Most of the work I'm proudest of started with noticing something small that
was wrong: 2,478 punches silently dropped by a unique index, a Cyrillic letter
in a bank's domain, a vessel that stops transmitting, two goroutines waiting
on each other forever.

So the page has six of those planted in it. Each one is a small, working
version of a real fault from the work it sits next to. Finding them is
optional. A counter in the corner keeps score, gives hints, and once all six
are found it returns a verdict in the same shape FraudLens uses: a
deterministic score, every point listed next to its evidence.

| Anomaly | Where | Based on |
| --- | --- | --- |
| Impostor letter | The name in the hero (U+0456) | FraudLens homoglyph detection |
| Wrong time zone | Hero clock, labelled Canterbury, running on EAT | Leaving Dar es Salaam |
| Vanishing punches | ITL, the unique index demo | The SmartERP punch import |
| One red test | FraudLens, 631 test dots | The backend test suite |
| Vessel goes dark | BlueNet, the vessel map | AIS anomaly flagging |
| Deadlock | TCP server, two goroutines | The Go chat server |

Progress lives in `localStorage` under `kj-anomalies`.

## For everyone else

The anomalies are for technical visitors. The rest is for anyone:

| Piece | Component | What it does |
| --- | --- | --- |
| Stickers | `Stickers` | Six hand-drawn stickers on the hero. Peel, drag, tap for a caption |
| The deck | `deck/Deck`, `deck/Card` | Nine collectible cards with holographic foil by rarity. Fanned hand, shuffle, pick one up, flip it. Swipeable on phones |
| Scam or legit | `ScamGame` | Swipe eight Mauritian messages. FraudLens's rules take the same test at the end |
| Patrol | `Patrol` | Full-screen arcade game. Drive the coast guard boat to vessels that go dark |
| Journey | `Journey` | Scroll-driven route from Dar es Salaam to Mauritius to Canterbury |

## Stack

Next.js 16 (App Router, static export of a single route), React 19, plain CSS
in `src/app/globals.css`, GSAP for the hero lens sweep, Lenis for scrolling.
Two canvases (punch grid, vessel map) share `src/lib/useCanvas.ts`, which only
animates while they are on screen and re-reads the palette when the theme
changes.

Type is Funnel Display and Funnel Sans. Geist Mono is used only for real code
and code points. Funnel has no Cyrillic, so the impostor letter falls back to
another face and looks very slightly off. That is deliberate.

## Layout

```
src/
  app/          layout, page, globals.css, icon
  components/   Hero, Clock, PunchDemo, ScamCheck, TestGrid, VesselMap,
                Deadlock, CaseFile, Nav, CopyEmail, SmoothScroll
  data/         content.ts, all copy
  lib/          anomalies.tsx (state), useCanvas.ts
public/
  Kshitij_Jha_CV.pdf   served at /resume too
  games/platformer/    Godot web export
```

## Editing

All copy is in `src/data/content.ts`. House rules: no em dashes, no invented
numbers, every metric traceable to the CV. To replace the CV, overwrite
`public/Kshitij_Jha_CV.pdf`.

## Development

```bash
npm install
npm run dev
npm run build
```

`next dev` and `next build` share `.next`. Don't build while a server is running.

`prefers-reduced-motion` turns off the lens sweep, Lenis and CSS animation.
