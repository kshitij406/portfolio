@AGENTS.md

# Design rules

These 40 rules apply to every UI change on this site. Check new work against both lists before calling it done, and don't break a rule to fix something else without saying so.

## Visual

1. Delete filler badges
2. Drop redundant labels
3. Unitalicize random words
4. Mono only where needed (real code and code points, never decorative labels)
5. Use a design system (tokens in `globals.css`: colours, `--r-sm/md/lg`, easings)
6. Show the actual product
7. Enlarge the main feature
8. Group with spacing
9. Make headlines specific
10. Emphasize the CTA
11. Add an accent colour (one: sodium yellow; `--sodium` as a fill, `--accent` as text. Magenta and green are status only: wrong and fixed)
12. Keep icons consistent
13. Remove embellishments
14. Inner radius = outer - padding
15. Improve text contrast
16. Wrap headlines properly (`text-wrap: balance`, non-breaking hyphens in compounds)
17. Align by eye, not pixels
18. Use tabular nums
19. Add loading states
20. Animate useful feedback

## Motion

1. Ease-out for entrances (`--ease`)
2. Dropdowns at 150–250ms
3. Stagger list rows by 30ms
4. Scale to 0.97 on press
5. Stretch moving knobs 12%
6. Stagger as details settle
7. Arcs for object movement
8. Pulse to confirm success
9. Ease-in-out for moves (`--ease-in-out`)
10. Start popovers at 0.95
11. Enter from the trigger
12. Exit to the trigger
13. No bounce on everyday UI (playful toys like stickers and cards may keep it)
14. Don't tween while held
15. Make exits 20% shorter (and ease them in with `--ease-in`)
16. Overlap old & new states
17. Masks for reveals & colour
18. Crossfade icons + blur
19. Rubber band past bounds
20. Reuse the same layoutId (no Framer Motion here: morph shared elements from the source rect instead)

Respect `prefers-reduced-motion` for anything new.
