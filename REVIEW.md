# Outside Review — kshitijj.me (localhost:3000, 2026-08-08)

Reviewed as a first-time visitor: browsed the running site in Chrome (desktop viewport ~1240px CSS,
light and dark), exercised the nav, theme toggle, terminal, and `/resume`, and read the full source
for copy and metadata. Existing conventions were deliberately ignored.

**Assumptions:** dev server (`npm run dev`), Windows Chrome. I could not resize the browser window
(OS-level snap blocked it), so mobile findings come from the code's breakpoints, not a rendered
phone viewport. Where a finding might be dev-mode-only, I say so.

---

## Summary verdict

The writing is the strongest thing here and the rendering is the weakest: this site has a genuine,
defensible point of view expressed in unusually good copy, wrapped in a presentation layer that
literally stops painting. In my testing, clicking a nav link or scrolling to the lower half of the
page reliably froze the renderer into a permanent white screen, hash deep-links load blank, and
three of seven project blocks are half empty because their screenshots sit unwired in
`public/resources`. Fix the machinery and finish the layout; the voice needs almost nothing.

---

## 1. First impression (5 seconds)

What registers: huge Anton "KSHITIJ / JHA" in black + teal, a vermilion accent, a mono
chart-annotation strip ("SHEET 01 · CANTERBURY, UK · 51°17′N"), three clear CTAs. It reads
"design-literate developer, deliberate, slightly editorial" — that's the right assumption to
trigger, and it does not read as a template. Good.

What also registers, immediately:

- **The nav is broken-looking.** At ~1240px, "[OFF THE CLOCK]" and "[FIND ME]" wrap onto two lines
  while everything else is one line. Eleven items + two icon buttons is too many for the width, and
  the very first UI element a visitor parses looks misaligned. This was visible in every single
  desktop screenshot I took.
- The hero's right column ("NOW / NEXT / buttons") is fine, but the most important recruiting fact
  on the whole site — *available for a 12-month placement from July 2027* — is not here. "NEXT:
  Kent, September 2026" tells a recruiter when you start university, not when they can hire you.
  A placement recruiter's question is answered 12,000px later, in section 07.

## 2. Positioning and voice

This is the site's real asset, and it's worth saying plainly: **the site does argue a specific
point of view.** It's not "I know 6 languages," it's "go one level lower than you have to, and the
problem usually stops being mysterious" — and then every project description actually demonstrates
that thesis (reading network traffic to reverse-engineer Stimulsoft, reasoning through a Go
synchronization model instead of adding sleeps, fixing trading stop-criteria in advance so they
can't be moved). The honesty devices are distinctive and credible: projects ordered by "depth of
ownership," a labelled divider demoting hackathon work ("shipped fast and with help"), "the sample
is nowhere near big enough to claim an edge," "Nothing shipped." No invented metrics. For a
2nd-year student this reads senior.

Where positioning wobbles:

- **Two identities are running at once.** The bathymetric-chart conceit (SHEET 01, "SCROLL TO SOUND
  THE DEPTH", the left-edge depth ruler in metres, lat/long "stations", the marquee's "18 M
  VISIBILITY") belongs to the old chart-paper design. The current design — plain white/black with
  vermilion/teal poster blocks and wave dividers — is a different, louder identity. The chart
  fragments now float without their substrate; a visitor who never saw the old design meets "sound
  the depth" on a plain white page and has no idea why. Either re-commit (bring back a chart
  texture cue somewhere) or finish the migration and let the depth ruler go. Right now it reads as
  a half-completed rebrand, which is the one thing this site's voice can't afford — its whole
  argument is deliberateness.
- **"I'll answer anything before then"** (Status headline) is trying to say "questions welcome
  before July 2027" but parses as a riddle on first read. Weakest sentence on the page, in the
  highest-stakes section.
- The geography story is confusing (see §6): based in Canterbury, current employer in Dar es
  Salaam, degree that starts next month described in the present tense ("I'm now in Canterbury for
  stage 2"). Each fact is presumably true; together, unexplained, they cost credibility with
  exactly the reader who checks details.

## 3. Visual design

- **Typography is the strongest visual decision.** Anton for display with opt-in caps, Inter body,
  Martian Mono labels — distinctive, coherent, and it avoids the JetBrains-Mono-portfolio cliché.
  The hero and section heads land. No complaint.
- **The colour-block case-study system is half-furnished.** `CaseStudyBlock` only goes two-column
  when there's an image, but four of nine blocks (both Work entries, Metals Bot, VendingMachine,
  Polymarket) have none — so you get 600–1000px-tall slabs of flat vermilion/black with a 52ch text
  column on the left and a completely empty right half. At 1240px that's ~50% dead colour for
  screens at a time. It reads as "the image didn't load," not as a layout choice — especially since
  the blocks that *do* have images establish the two-column expectation.
- **The one bespoke visual — `ConcurrencyDiagram` with its struck-through "WAITGROUP MISUSE →
  FIXED / DEADLOCK → FIXED / RACE → FIXED" — is the best thing in the Built section.** It shows the
  thesis instead of asserting it. That's the template for what the empty halves should hold.
- The TCP block's TiltCard contains a screenshot of a **GitHub repo page** shrunk onto a big pale
  plate. A repo listing is not a project visual; it looks like filler, and the tilt gimmick draws
  attention to it.
- **Reveal animation is too slow and triggers too late.** `start: 'top 88%'`, 0.9s fade+26px rise
  means a normal-speed scroller repeatedly catches paragraphs at ~20% opacity (I screenshotted
  Polymarket in exactly that state). The content is the product; don't make it chase the viewport.
- **Contrast**: on vermilion blocks the dim text (`rgba(255,255,255,0.6)`) is used for the mono
  eyebrows ("01 / SOFTWARE DEVELOPER INTERN, JUN 2026 TO NOW") at ~12px equivalent. White at 60%
  on that orange-red will not clear WCAG AA for small text. Same for `dim` on teal. The 0.86 body
  tone is acceptable; the 0.6 tier needs a bump or a size increase.
- Dead space: the Log section's right column is one small facts card floating beside three
  paragraphs; Education is a ~630px section holding two short rows. Generous whitespace is part of
  the style, but these read as unbalanced rather than airy.
- Light theme, dark theme both hold together; dark hero is genuinely handsome.

## 4. Content and copy

Mostly excellent — specific, decision-oriented, tradeoff-aware. Project bodies explain *why* and
*what was hard*, not feature lists: "It was the first time I had two processes that needed to agree
with each other, which is a specific and annoying kind of problem" is better project copy than most
professionals write. Experience ledes ("I was hired to build one API. I ended up building it
twice…") are doing real positioning work.

Specific weaknesses:

- "Wrote MSSQL stored procedures handling **multi mode read and write paths** against a 7 table
  schema" — jargon fog in an otherwise concrete bullet. Say what "multi mode" means or cut it.
- Status: "I'll answer anything before then" (see §2); "If you want to talk about backends, Go
  concurrency, diving, or why a boss fight feels good, that also works" is charming but is carrying
  the section's entire warmth right after a visa paragraph — order the section: availability →
  invitation → visa detail.
- The **alt text lies**: every project image gets `alt="{name} — live interface"`, but the TCP shot
  is a GitHub repo page. Small thing; it's the kind of small thing this site's ethos claims not to do.
- The README's own rule is "**No em dashes, anywhere**" — the Built divider ("TEAM BUILDS — SHIPPED
  FAST") and the alt-text template violate it. Either the rule or the copy should give.
- Elsewhere notes are good ("It's insta, what do you want me to say?") — keep.
- "Buy Me a Coffee" on a student placement-seeking portfolio is a tonal wobble: the page's job is
  to ask for a role, not tips. Harmless, but it dilutes the ask. Consider dropping it from the main
  page.

## 5. Information architecture

- Single long page is the right call for this content volume. Section order (bio → work → education
  → projects → stack → personal → status → links) is sane, though **Status should not be last-but-one
  on a 12,600px page** given it holds the hiring-critical facts. The hero must carry the headline
  version.
- **Eight nav items is too many** and two of the labels are opaque from outside: "Log" (means
  About) and the Off-the-clock/Find-me pair that wraps. Six items would fit and cover it: About,
  Work, Projects, Stack, Off the clock, Contact. "Education" doesn't need nav presence; it's
  30 seconds of content.
- **You cannot link to a section.** Nav clicks are intercepted by Lenis (`preventDefault` +
  `scrollTo`) and never update the URL hash — so a recruiter can't send a colleague
  "kshitijj.me/#built". Worse, hash URLs are broken outright (§8).
- The hidden terminal is a genuine delight (live `help`, content commands reading off the real data,
  history) — but it's invisible: no hint anywhere on the page that backtick opens it. An easter egg
  nobody finds is dead code. One mono hint in the footer ("press ` ") would preserve the surprise
  while making it findable.
- `/resume` generating the PDF from `resume.ts` is a good trick; but the buttons say "**Download**
  CV ↗" and serve it **inline** (`Content-Disposition: inline`). Either point the button at
  `?download=1` or relabel to "View CV". Also note the CV still lists Dar es Salaam job locations
  while the site says Canterbury — consistent as *history*, but make sure the CV's header/location
  matches the site's story.

## 6. UX flow (recruiter walk-through)

1. Lands on hero. Gets name, role, "backends + interfaces", GitHub, CV. Good. Does **not** get
   "placement, July 2027" — the single fact that decides whether the next 30 seconds happen.
2. Clicks "SEE THE WORK" or a nav item → **in my testing this is where the site died.** Clicking
   "[STATUS]" froze the compositor for 30+ seconds and left a permanently white viewport (JS still
   running, DOM intact, nothing painted; only a reload recovers, and reloading at the hash also
   renders white). Sustained scrolling through the Built section produced the same white-out on a
   second, fresh tab. Dev mode and this machine may exaggerate it, but I reproduced it three
   independent times with normal user actions. Until this is fixed and verified in a production
   build on modest hardware, nothing else on this list matters.
3. Assuming scroll works: the reader must traverse ~5,300px of Built to reach Stack/Status. There is
   no skimmable project index — each project costs a full screen of scroll before revealing whether
   it's interesting. A compact list (name + one-liner + jump link) at the top of Built would let the
   30-second visitor route themselves.
4. Timeline/geography friction, all on one screen for a careful reader: today is Aug 2026; hero says
   "NOW: Dev intern, Imatic" (a Dar es Salaam company) and "NEXT: Kent, September 2026"; Log says
   "I'm **now in Canterbury** for stage 2"; Education says the degree runs "Sept 2026 to 2029" but
   the note says "Stage 2" already. The explanations exist (CertHE → direct stage-2 entry; remote
   internship, presumably) but are never stated. Add three words in each place ("remote", "direct
   second-year entry") and the story closes.
5. Contact: Email / Copy / CV buttons all work; email is plainly visible. Good ending, if reached.

## 7. Mobile responsiveness

(From code; window resize was blocked in my session — verify on a real device.)

- **Below `md` there is no navigation at all** — the section list is `hidden md:flex` and no
  hamburger exists; only a "[CV]" link remains. On a one-page site scroll can substitute, but a
  phone visitor who wants Contact must swipe through 12,000px+ with no shortcut.
- **`MobileNotice` opens the phone experience with an apology** ("This site's built for a desktop
  screen…"). Many recruiters open portfolio links on a phone first; greeting them with "the good
  version is elsewhere" is a self-inflicted first impression. If the mobile experience is "fully
  usable," don't caveat it; if it isn't, fix the experience rather than disclaiming it.
- The heavy interactive layer (TiltCard hover tilt, Magnet buttons, ShakeCursor, terminal) is
  correctly gated to fine pointers / desktop, and reduced-motion is respected everywhere I looked —
  genuinely well done.
- Layout itself collapses to single column sensibly (`lg:` grids, `hidden sm:block` on decorative
  plates). The colour blocks should look *better* on mobile than desktop since the empty halves
  disappear.

## 8. Technical tells

Ranked by how much they'd undercut credibility with a technical reader:

1. **Renderer freeze / permanent white page** on nav-click and long scrolls (see §6.2). Reproduced
   on two fresh tabs. Suspects worth profiling: Lenis driven off `gsap.ticker` with
   `lagSmoothing(0)` (a long `scrollTo` tween that must process every frame with lag-compensation
   disabled), ScrollTrigger update per Lenis tick across ~20 Reveal instances, and the fixed
   backdrop-blur nav over full-viewport colour layers. Test a production build; if it reproduces
   even occasionally, drop smooth-scroll before dropping anything else.
2. **Hash deep-links render a blank page.** Fresh tab → `localhost:3000/#status` → pure white,
   stays white after scrolling. Anyone sharing or bookmarking a section link gets a broken site.
3. **Three project screenshots exist but are not wired**: `proj-metals-bot.jpg`,
   `proj-vendingmachine.jpg`, `proj-polymarket.jpg` sit in `public/resources` while `content.ts`
   has `shot: null` for those projects — the direct cause of the empty half-blocks.
4. **`twitter.card: "summary_large_image"` with no image anywhere in metadata.** No
   `openGraph.images`, no `opengraph-image` file. Every share of this site renders a text-only
   card while explicitly requesting the large-image format. For a site whose hero is a poster,
   this is the cheapest possible win.
5. **React hydration warning on every load** (dev console): "Extra attributes from the server:
   data-theme" — the pre-paint theme script needs `suppressHydrationWarning` on `<html>`.
6. **`body` background stays white in dark mode** (dark paint lives on a wrapper); overscroll
   rubber-banding will flash white around a black page on macOS/iOS.
7. Dead weight shipping in the repo: `VantaTopology.tsx` + local p5 fork (README still lists Vanta
   as the hero background — the README is out of date), `chart-dar-es-salaam-1876.jpg` (unused),
   the favicon `icon.tsx` that can't build on Windows.
8. Terminal `help` reports "**sound is on**" by default, while `lib/sound.ts`'s own comment says
   sound is "off by default, opt in only." One of them is wrong; default-on UI sound is the wrong
   default for a portfolio either way.
9. Alt-text template mislabels repo screenshots as "live interface" (also §4).

---

## Prioritized fixes

### Must fix (blocks the site doing its job)

1. **The freeze.** Profile and fix the white-screen renderer stall on nav clicks / long scrolls;
   verify in a production build on a mid-range machine, not just dev on this one. If Lenis smooth
   scroll is implicated, a portfolio survives native scrolling; it does not survive a white page.
2. **Hash deep-links** (`/#built` etc.) must load scrolled and painted, and nav clicks should
   update the hash so sections are linkable at all.
3. **Wire the three existing screenshots** in `content.ts` — five minutes of work that fills three
   half-empty blocks. Replace the TCP GitHub-page shot with a terminal capture of the chat server
   actually running (three ssh panes would be more honest and more impressive).
4. **Put the availability line in the hero** — e.g. swap the "NEXT" fact for
   "Placement: available July 2027". It's the one fact a placement recruiter came for.
5. **Add an OG image** (or stop claiming `summary_large_image`). The hero typography *is* the image.
6. **Fix the nav wrap** — cut to ~6 items; nothing may wrap at 1280px.

### Should fix (costs credibility or polish)

7. Give imageless case-study blocks a real layout: full-width text, or better, small bespoke
   diagrams in the ConcurrencyDiagram spirit (the Metals bot's ATR stop/target logic and the
   Polymarket ensemble-blend are both one-evening diagrams that would outclass any screenshot).
8. Close the timeline/geography gaps: "remote" on Imatic, "direct second-year entry" in Education,
   one consistent tense about Canterbury.
9. Rewrite "I'll answer anything before then."
10. Speed up reveals (≤0.5s, earlier trigger) so text never lags the viewport.
11. Contrast pass on the 60%-white dim text over vermilion/teal.
12. `suppressHydrationWarning` on `<html>`; dark-mode `body` background; alt-text honesty;
    em-dash rule compliance (pick a side).
13. Mobile: add a minimal menu (even just "Contact" + "Projects"), and delete or soften
    `MobileNotice`.
14. "Download CV" → `?download=1`, or relabel "View CV". Align CV location story with the site.
15. Terminal: default sound off (match the code's own stated intent), and drop one discoverability
    hint in the footer.

### Nice to have

16. Resolve the chart-metaphor question deliberately — keep depth ruler + "sound the depth" only if
    something visual re-earns them; otherwise retire them with the watermark.
17. Skimmable project index at the top of Built.
18. Delete dead code/assets (Vanta + p5 fork, unused chart scan) and update the README's stack
    table — it still documents the removed Vanta hero.
19. Reconsider Buy Me a Coffee placement.
20. Fix the Windows `icon.tsx` build so the favicon actually ships.

---

## What's working — do not change

- **The voice.** Specific, honest, decision-centric copy with real tradeoffs; the tier divider and
  the "smallest project taught me the most" framing. This is the site's moat.
- **Typography** — Anton/Inter/Martian Mono is distinctive and disciplined; the hero composition.
- **ConcurrencyDiagram** — annotated failure modes struck through with FIXED is exactly the right
  kind of flex; make more of these, not fewer.
- **The terminal** — full-bleed, reads live from the same data files as the page, has history and
  a sense of humour. Just make it discoverable.
- **Content-as-data** (`content.ts` / `site.ts`) and the PDF-from-data `/resume` route.
- **Accessibility instincts**: reduced-motion honoured in every animation path I read, sane
  semantics (`dl` for facts, real buttons, aria labels on toggles).
- The Elsewhere link notes and Off-the-clock section — personality with specificity, no generic
  "I love coffee and travel."
- Light/dark implementation (pre-paint script, no flash, OS default first visit).
