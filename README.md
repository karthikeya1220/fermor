# Fermor — homepage assignment

A complete, original homepage for [Fermor](https://fermor.in) (Indian personal-finance
platform), built as a frontend-developer hiring assignment. Research → design
hypothesis → implementation → visual QA, with every design decision made and
documented below.

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (static)
npm run lint
```

Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4**.
Runtime dependencies are only `next`, `react`, `react-dom` — every chart,
slider, accordion and animation is hand-written.

---

## 1. Research

Studied fermor.in (home + /about) in a real browser and extracted the honest
brand constraints:

- **Brand assets kept**: the double-arrow mark and the electric green `#75FB90`,
  black-on-light wordmark, "Understand. Act. Grow.", the no-login / runs-in-your-
  browser / educational-not-advice promises, the SEBI disclaimer, real slugs for
  calculators, blogs and analysis articles.
- **Current site's design language deliberately dropped**: centred generic hero,
  blue/purple gradient cards, italic serif accents — templated fintech look that
  undersells a product whose actual differentiator is showing its working.

## 2. Design hypothesis — *"The instrument"*

Fermor's claim is *"show the full math"*, so the page should behave like a
well-made instrument, not a brochure:

1. **The hero is a live, operable calculator**, not a stock illustration. The
   first thing a visitor can do is drag a slider and watch real arithmetic move.
2. **The working is visible everywhere** — formula strip under the hero chart,
   break-even in the comparison panel, "Show the working" in the Q&A.
3. **Density reads as credibility** — calculator index, analysis rows and cashflow
   table are document-tight lists, not an identical grid of rounded cards.

## 3. Decisions

### Typography
- **Archivo variable** (wdth 62–125, self-hosted `font-stretch` on display
  sizes) for headlines — wide, engineered, editorial; avoids Inter's default
  look and any serif/finance cliché.
- **IBM Plex Mono** for numerals, formulas and axis ticks only: ₹ figures need
  tabular alignment, and monospace signals "computed".
- Scale is `clamp()`-driven (`.t-display` → `.t-label` in `globals.css`); no
  all-caps eyebrows, no 01/02/03 numbering, no single-accent-word headlines.

### Colour
Porcelain `#f2f3f0` page, paper `#fff` panels, ink `#0f1211` type, fog/line
greys for hairlines; **fermor `#75FB90`** used as full-bleed bands and markers,
with `forest #076b39` for green *text* (AA on light) and `signal #c22d1d` reserved
for goal/target lines. Graphite `#101413` bands (Q&A, footer, formula strip)
punctuate the light page. Every pairing checked for contrast.

### Layout, section by section
| Section | Decision |
|---|---|
| Hero | Asymmetric 7/5 grid: headline + copy left, **live SIP instrument** right, so the tool is above the fold; assurances strip underneath |
| Statement | Full-bleed brand-green band: "Banks show you products. Ads show you offers. Fermor shows you the arithmetic." |
| Chapters | Sticky Understand / Act / Grow word-rail (IntersectionObserver) with three *live* panels: cashflow allocation, prepay-vs-invest with break-even, goal tracker |
| Ask | Graphite band — three common questions answered in plain language from the page's own numbers, each expandable to the arithmetic |
| Calculators | Filterable dense index (All / Investing / Loans / Tax & salary) linking to the 23 real verified fermor.in tools |
| Analysis | Document-style rows with category, date, read time |
| Trust | Five principles + FAQ accordion (single-open, animated grid-rows) |
| CTA + footer | Green close, graphite footer with real links, live disclaimers |

### Motion
CSS keyframes only (`.seq-item` stagger on mount, `draw-line` on charts), 150–400 ms,
intent-revealing. Everything collapses under `prefers-reduced-motion` (verified:
animations resolve instantly, no elements stuck hidden); count-ups and crosshair
follow the same flag via `src/lib/hooks.ts`.

### Interaction
Hand-built accessible range inputs (label + `output` + min/max), `aria-pressed`
chips, `aria-expanded` accordion/FAQ, keyboard-operable chart crosshair with
tooltip, mobile sheet menu with Escape-to-close and body scroll lock.

## 4. Content honesty (assignment-specific)

- **All financial figures are computed**, never typed: `src/lib/finance.ts`
  (SIP corpus, EMI/amortisation, prepay interest saved, lumpsum gain,
  break-even) with `src/lib/format.ts` for Indian grouping (`₹68,82,863`).
  The panels stay internally consistent — e.g. the ₹3 L prepay comparison
  derives its own 8.2% break-even from the same loan terms it displays.
- Mock/illustrative content is labelled *"Illustrative"* or *"indicative"*;
  disclaimers state tools are educational, run in the browser, and that Fermor
  is not a SEBI-registered adviser.
- Every external URL (calculators, blogs, analysis, about/privacy/terms/contact,
  signup/sign-in) was HTTP-checked against fermor.in before use. Internal CTAs
  anchor to real sections.

## 5. QA performed

- **Build**: `npm run build` and `npm run lint` clean; zero console errors.
- **Viewports** 320 / 390 / 768 / 1024 / 1280 / 1440 — no horizontal overflow
  (measured `scrollWidth ≤ innerWidth` at each), hero reflows to a single
  column below 1024, nav collapses to a full-screen sheet below 768.
- **Interactions verified in-browser**: sliders (keyboard + pointer),
  return-assumption chips, calculator filters ("5 of 23 shown"), Q&A chips,
  show-the-working toggle, FAQ single-open accordion, chart hover crosshair
  (`10y · ₹35,15,237`), sticky rail active states, reduced-motion emulation.

## 6. Structure

```
src/app/          layout (fonts, metadata, IN locale), page, globals.css (tokens)
src/lib/          finance.ts · format.ts · data.ts · hooks.ts   ← all math & content
src/components/   header, hero + instrument, statement, chapters (+ panels/),
                  ask, calculators, analysis, trust, final-cta, footer
public/fonts/     Archivo + IBM Plex Mono woff2 (latin + latin-ext for ₹)
```

**Known trade-offs**: charts are bespoke SVG (no charting library) — chosen for
visual character and bundle size, with a documented hover/keyboard path; the
Q&A answers mirror site copy rather than linking out, so the section works
standalone as an artifact.
