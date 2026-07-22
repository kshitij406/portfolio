# kshitijj.me

My personal site. One scrolling page.

The design is a bathymetric chart crossed with engineering paper: bone stock,
ink linework, one vermilion signal colour, and a graph paper substrate. The hero
runs Vanta `TOPOLOGY` recoloured to sea green contours over paper, so it reads
as a depth chart rather than the usual dark particle background.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14, App Router, fully static |
| Scroll | Lenis, driven off the GSAP ticker so both share one clock |
| Page animation | GSAP with ScrollTrigger |
| Overlay animation | anime.js v4, for its `steps()` easing |
| Hero background | Vanta `TOPOLOGY` on p5, lazy loaded |
| Icons | lucide-react |
| Components | A few from [React Bits](https://reactbits.dev) in `src/components/bits/` |
| Type | Instrument Serif, IBM Plex Sans, IBM Plex Mono, Press Start 2P |

Single committed theme. There is no light and dark toggle.

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
    icon.tsx          generated favicon, contour motif
  components/
    Hero.tsx          hero and its GSAP intro timeline
    Nav.tsx           scroll spy nav
    DepthRuler.tsx    left margin scroll indicator, reads in metres
    SmoothScroll.tsx  Lenis and GSAP wiring
    VantaTopology.tsx lazy p5 and Vanta host
    RetroWindow.tsx   8-bit demo overlay, anime.js
    Reveal.tsx        ScrollTrigger reveal wrapper
    SectionHead.tsx   numbered heading with a self drawing rule
    sections/         Log, Work, Built, Stack, Surface, Contact
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

## Accessibility

`prefers-reduced-motion: reduce` disables Lenis, skips the Vanta field
entirely, and forces every reveal target visible. That last part is load
bearing rather than decorative, because the reveal system starts elements at
`opacity: 0`. Verify it in a browser after touching `Reveal.tsx`.

The retro overlay traps focus, closes on Escape, and locks body scroll. It
portals to `document.body`, because section elements set `position: relative;
z-index: 1` and that stacking context would otherwise trap it beneath the nav.
