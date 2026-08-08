# kshitijj.me

My personal site. One scrolling page.

Plain backgrounds, vibrant accents, light and dark. `Nav.tsx` carries a
light/dark toggle (`ThemeToggle.tsx`); the site defaults to the OS preference
via `prefers-color-scheme` the first time a visitor shows up, then remembers
whatever they pick in `localStorage`. An inline script in `layout.tsx` sets
`data-theme` on `<html>` before first paint so there's no flash.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14, App Router, fully static |
| Scroll | Lenis, driven off the GSAP ticker so both share one clock |
| Page animation | GSAP with ScrollTrigger |
| Overlay animation | anime.js v4, for its `steps()` easing |
| Icons | lucide-react |
| Components | A few from [React Bits](https://reactbits.dev) in `src/components/bits/` |
| Type | Anton (display), Inter (body), Martian Mono (labels/nav), Press Start 2P (retro chrome) |

Three modes: light (plain white), dark (plain black), and desktop, a KDE
Plasma/Fedora emulation (`Desktop.tsx`) that replaces the scrolling page
outright. `ThemeToggle.tsx` cycles all three; desktop mode is its own
component tree, not the section components reskinned. See "Desktop mode"
below.

The site had a second, older identity layered on top of this one: a
bathymetric-chart conceit (SHEET 01, a depth ruler reading in metres, lat/long
station fixes, "scroll to sound the depth"). It was retired wholesale, because
half a metaphor reads as an unfinished rebrand rather than a choice. The poster
blocks are the only visual language now.

### Why two animation libraries

They own different surfaces and the split is deliberate. GSAP drives the
editorial page, where everything wants smooth interpolation. anime.js drives the
retro demo overlay, where `steps()` easing produces discrete frames so the
window boots and collapses like a CRT switching on. GSAP cannot produce that
look, and mixing the two on one surface would be duplication.

## Layout

```
src/
  app/
    layout.tsx        fonts, metadata, global chrome
    page.tsx          composes the sections in order
    globals.css       design tokens and the whole design system
    icon.svg          favicon, static SVG (see note below)
  components/
    Hero.tsx          hero and its GSAP intro timeline
    Nav.tsx           scroll spy nav, six items + a mobile shortcut pair
    ThemeToggle.tsx   light/dark/desktop cycle, writes data-theme + localStorage
    Desktop.tsx       desktop mode: window manager, taskbar, start menu
    SmoothScroll.tsx  Lenis and GSAP wiring, also keeps location.hash in sync
    CaseStudyBlock.tsx  full-bleed colour block used by Work and Built
    ConcurrencyDiagram.tsx  TCP server's concurrency model (paper blocks only)
    ProjectDiagrams.tsx     diagrams for the projects with no UI to screenshot
    RetroWindow.tsx   8-bit demo overlay, anime.js
    Reveal.tsx        ScrollTrigger reveal wrapper
    SectionHead.tsx   numbered heading with a self drawing rule
    sections/         Log, Work, Education, Built, Stack, Surface, Status, Elsewhere
    bits/             React Bits: CountUp, DecryptedText, Magnet
  data/
    site.ts           profile and links
    content.ts        experience, education, projects, stack, awards
  lib/utils.ts        shadcn class merger
```

All copy lives in `src/data/`. No component hardcodes content.

## Editing content

`src/data/content.ts` is the file to edit. Four conventions matter:

**Projects are ordered by depth of ownership, not by how impressive the README
sounds.** Whatever sits at the top is what gets asked about in an interview, so
the top of the list is code I can defend line by line. Weekend, hackathon and
team builds carry `tier: "sprint"` and render below a divider that says so.

**No invented metrics.** Every number in `METRICS` traces back to the CV.

**No em dashes**, anywhere, including code comments.

**A project with a `live` URL gets a RUN DEMO button** that opens the real
deployment inside the retro window. Check the target's headers before adding
one. If it sends `X-Frame-Options` or a `frame-ancestors` policy it will not
embed, and the overlay falls back to an "open in new tab" panel after 12
seconds.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Note that `next dev` and `next build` share `.next`, so running a build while
the dev server is up will break the running server. Restart it afterwards.

## Desktop mode

A third mode alongside light/dark, toggled from the same `ThemeToggle`
button: `data-theme="desktop"` on `<html>`, and `page.tsx` swaps its whole
tree for `<Desktop />` instead of rendering the sections. Nav hides itself
the same way (`useTheme()` from `src/lib/theme.ts`, a small custom-event
hook, no context provider).

It's a KDE Plasma / Fedora emulation, not a reskin of the section
components: desktop icons, a Kickoff-style start menu grouped by category,
draggable windows with their own z-order, and a taskbar with a running-app
list, a clock, and a way back out (the tray's log-out icon or the start
menu's "Log out to light mode"). Every app's content is pulled from the
existing `src/data/site.ts` and `src/data/content.ts`, nothing is
duplicated. The desktop's Terminal icon dispatches the same backtick
keydown the hidden console already listens for, rather than building a
second terminal. Project demos reuse `DemoProvider`/`RetroWindow`.

Deliberately out of scope: window resizing, a real maximize (the button is
present but disabled), multiple virtual desktops, and a right-click context
menu. The colour palette is hardcoded Breeze Dark rather than the site's
`--paper`/`--ink` tokens, the same reasoning `RetroWindow` and the terminal
use their own palettes instead of the editorial theme.

`ConcurrencyDiagram.tsx` is still drawn in ink/paper tones, so it only reads
correctly on a `paper` block. It lands on one because its project is index 0
and `BG_CYCLE[0]` is `paper`. Reorder `PROJECTS` and it needs revisiting.
`ProjectDiagrams.tsx` does not have this problem: those inherit `currentColor`.

## Accessibility

`prefers-reduced-motion: reduce` disables Lenis and forces every reveal target
visible. That last part is load
bearing rather than decorative, because the reveal system starts elements at
`opacity: 0`. Verify it in a browser after touching `Reveal.tsx`.

The retro overlay traps focus, closes on Escape, and locks body scroll. It
portals to `document.body`, because section elements set `position: relative;
z-index: 1` and that stacking context would otherwise trap it beneath the nav.

## Two Windows notes

`next/og`'s `ImageResponse` cannot run on Windows with this Next version: at
import time it does `path.join(import.meta.url, ...)` and feeds the result to
`fileURLToPath`, which on Windows produces `file:\C:\...` and throws
`Invalid URL`. That is why the favicon is a static `icon.svg` and the social
card is a static image rather than either being generated. Nothing to fix in
this repo, and no `ImageResponse` route will build here.

The old `next dev` / `next build` warning above still applies: they share
`.next`, so never run both at once.
