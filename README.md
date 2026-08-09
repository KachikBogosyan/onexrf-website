# ONEX RF — website rebuild

A full replacement for onexrf.com, built as **two complete sites** on one
codebase so the narrative direction can be chosen by looking at it rather than
by arguing about it.

```bash
npm run dev
```

- `/` — the chooser, with a side-by-side comparison of the two directions
- `/outcome` — Site A, outcome-led
- `/capability` — Site B, capability-led

---

## Why two sites

The [ONEX RF scoping note](https://onexrf.com) (Yann Hoffbeck, Aug 2026)
diagnoses the problem as legibility, not awareness: the company is a master of
RF heating that communicates like a catheter-tipping machine vendor. It makes
five concrete findings, and this build answers each of them:

| Finding | What was built |
|---|---|
| Content leads with the machine | Site A opens on the customer's problem; machines are reached through the outcome they serve |
| CTAs are soft and land on the homepage | Every CTA carries its context (`?product=`, `?application=`, `?material=`, `?technology=`) into the enquiry form |
| Nothing captures the visitor | A gated download library — the brochure that currently sits as an open link becomes an exchange |
| Proof lives as claims, not evidence | `<ProofStat>` refuses to render a number without a `source`; an `/evidence` section with case studies, samples and attributed testimonials |
| Welding sits in tipping's shadow | Welding is a top-level family in both navs, and Forming/Welding render from one shared template so parity is structural |

The deck governs **strategy and information architecture only**. The visual
system is derived independently (see below).

The two variants share every page body, every data file and every component.
They differ only in nav, homepage narrative and CTA language. When one is
chosen, set `PROMOTED_VARIANT` in `src/lib/seo.ts`, move that tree to the root,
and delete the other.

---

## Design system

Defined in `src/app/globals.css`.

Colour is **OKLCH**, which is perceptually uniform — equal steps in lightness
look equal, unlike HSL. Tailwind v4 ships its own palette in OKLCH, so this
stays idiomatic.

The brand anchor is ONEX blue `#4885b8` = `oklch(59.8% 0.101 245.7)`, sitting at
step 9 of a 12-step Radix-style scale where each step has exactly one job.

**The rule that governs everything:** `#4885b8` measures **3.94:1 on white**.
That passes WCAG 2.2 AA for large text, borders, icons, focus rings and chart
marks. It **fails** for body text and button labels. So:

| Token | Role | Contrast |
|---|---|---|
| `brand-9` | identity only — large display type, icons, marks | 3.94:1 |
| `brand-10` | action fill, under white labels | 5.35:1 |
| `brand-11` | links and body-size text | 5.95:1 |
| `brand-12` | headings | 14.30:1 |

Neutrals are hue-matched to the brand rather than pure grey. Semantic colours
sit at matched OKLCH lightness so they read as siblings, and never carry meaning
by hue alone. Dark mode is a separate tonal ramp, not an inversion.

Type is Inter throughout, with tabular numerals on every spec table and IBM Plex
Mono reserved for model numbers (`CTF-807-LX1`), which are codes.

**APCA is deliberately not used** — it was pulled from the WCAG 3 working draft
and has not been reinstated, so WCAG 2.x ratios remain the benchmark. The target
is **WCAG 2.2 AA**, because EN 301 549 (the route to European Accessibility Act
conformance, enforceable since 28 June 2025) resolves to WCAG 2.1 AA today and
2.2 AA in v4.1.1. Given the European ambition in the scoping note, that is a
market-entry condition rather than hygiene.

---

## Checks

```bash
npm run check:contrast      # WCAG 2.2 AA on every token pair; fails the build if a pair regresses
npm run check:links         # crawls the running dev server for broken links and images
npm run audit:placeholders  # regenerates CONTENT-NEEDED.md from the site itself
npm run check:all           # contrast + types + lint + build
```

`check:contrast` parses the OKLCH values straight out of `globals.css`, converts
them to sRGB and asserts the pairs the design system actually relies on. It also
asserts that `brand-9` still renders exactly `#4885b8`.

---

## What is missing

[`CONTENT-NEEDED.md`](CONTENT-NEEDED.md) is generated from the site, not written
by hand — every entry is a visible `<Placeholder>` on a real page. Currently 52
blocking items, 39 non-blocking, and 28 records with specific data gaps.

The largest ones:

- **Photography.** 23 sample geometries reference a photograph that was never
  taken, and 16 machines have no product shot. One session against that list
  would do more for the site than any amount of copy.
- **Evidence.** The templates are built and empty. Three tipping case studies
  already exist on the live Servo Tipper page and need extracting and clearing;
  there is no welding or automation case study at all.
- **Specifications.** 16 machines were migrated from onexrf.com with only their
  identifying detail. Nothing invents a performance figure — `specs_status:
  "needs_data"` makes the template render a placeholder instead.
- **HubSpot credentials.** `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` and
  `NEXT_PUBLIC_HUBSPOT_FORM_ID`. Until they are set, every form renders a
  configuration notice.
- **Logo and brand assets.** The wordmark is text, from `COMPANY.name` in
  `src/lib/site-config.ts`.

---

## Migration

`src/lib/redirects.ts` maps the live HubSpot site onto this one. onexrf.com runs
roughly four pages per machine (overview / spec / support / RFQ) plus two
generations of blog URL; all of it collapses here, so every old URL needs
somewhere to land or its ranking is discarded at cutover.

Redirect targets are root-relative and resolve once a variant is promoted.

The old route tree and the components only it used are parked in `legacy/`,
excluded from the build. It still holds ~1,800 lines of real technical writing
on catheter tip theory, RF welding theory and the hybrid generator that is worth
porting into the new templates.

---

## Layout

```
src/
  app/
    page.tsx              chooser
    [variant]/            one route tree, both sites
    sitemap.ts robots.ts
  components/
    pages/                page bodies, shared by both variants
    site/                 header, footer, variant switcher
    ui/primitives.tsx     Section, Container, Button, Card
    Placeholder.tsx       the visible stand-in for missing content
    evidence/ProofStat.tsx
  data/                   JSON content
  lib/                    accessors, site config, redirects, SEO
scripts/                  contrast, links, placeholder audit, data migrations
legacy/                   previous route tree, excluded from the build
```

The data layer and the bidirectional relationship graph in `src/lib/reverse.ts`
were already here and are the reason this build went as fast as it did.
