# Bluelines launch site: design plan

## Brief
- Subject: Bluelines, a Chrome (MV3) extension that pins Figma-style notes to elements on any live webpage. Local-first, no account. v1.0.0.
- Audience: freelance web designers and front-end developers who review live sites and hand findings to a developer, a team or an AI coding agent.
- Job: launch. Get the visitor to add it to Chrome, and trust it (privacy is a feature).
- Assets: brand system (`../archive/DESIGN.md`), Burst logo, Space Mono + Space Grotesk, real feature list (README), real agent icons (Simple Icons CC0), real screenshots of the extension captured from the running build.
- Constraints: one page (plus a designed 404). Brand rules hold: ink ground, one signal accent, opaque surfaces, hairlines, mono readouts versus grotesk prose.
- Assumptions (placeholder): Chrome Web Store URL, production domain `bluelines.app`, GitHub/source link. No testimonials, users or metrics exist, so none are shown.

## Concepts
| | Idea | Anchor | Signature | O/F/Fe/P |
|---|---|---|---|---|
| A. Material (the product's own gesture) | The launch page is the first page Bluelines reviews: its bracket frame locks onto each section as you read, pins a note to it, and the visitor can take over Inspect and mark the page up themselves | the bracket frame with selector + size chips is the product's core gesture; the tagline is literally four steps | a live bracket travels the page reading real selectors and real sizes; Alt+Shift+M hands it to the visitor | 4 / 5 / 4 / 1 |
| B. Name | A blueline is a correction drawn on a proof: the page set as a print proof with hand-drawn bluelines | the word "bluelines" | correction marks draw themselves over the copy | 3 / 3 / 4 / 3 |
| C. Formal | The whole site is one terminal log; every section is a line of output | the mono readout voice | lines stream in like a build log | 2 / 3 / 5 / 4 |

Pick A: it can only belong to this product, the demo is the product itself, and it is honest (every number on screen is measured live). Steal from C for the 404: the product's own "Element not found" state.

## Concept card
```
Idea:        The launch page is under review by Bluelines itself, and you can take over the pen.
Metaphor:    A design review on a live page: inspect, mark, explain, ship.
Signature:   One bracket frame (four cyan corners, selector chip above, W × H chip below) that
             locks onto each section as it is read, drops a numbered pin with a review note,
             and follows the pointer when the visitor turns on Inspect (Alt+Shift+M) and pins
             their own notes. Driver: src/motion/inspector.ts.
Emotion:     Precise, calm, a little playful: "this tool is already working on this page".
Motion verb: snap and lock. Things travel on expo.out and land hard; corners close in.
Screenshot:  The hero headline locked in the bracket, `h1.hero__title` chip above,
             `1184 × 292 px` below, pin 1 attached with its note.
```

## System
- Palette (brand): ground `#0b0b0b` ink, text `#eaeaea`, muted `#a6a6a6`, faint `#8a8a8a`, line `#262626` / strong `#3a3a3a`, accent `#00e5ff` (Signal Cyan, visitor can change it, like the product), accent ink `#031417`. Categories as marks only: bug `#ff6b6b`, suggestion `#5aa9ff`, text `#ffc53d`, note `#a6a6a6`. Paper chapter (privacy): `#fafafa` ground, `#0b0b0b` text, accent text `#007585`.
- Type: Space Mono 400/700 for display, UI, labels, numbers (readout); Space Grotesk for prose (voice). Display Mono 700 at up to 9.5rem, tracking -0.055em at the top size, -0.03em at headings. Body Grotesk 17 to 18 px / 1.55. Labels Mono 12 px uppercase 0.12em.
- Grid: 12 columns, fluid gutter, 1px hairline rules between bands (rows, not cards). Content aligns to column lines; mono labels hang in column 1.
- Shape: radii 3 / 6 / 8 / 12 (chips / pressables / buttons / panels). No glass, no gradient surfaces, no blur.
- Motion: one ease family (expo.out for entrances and the bracket's travel, power3.out for small UI). Bracket travel 0.55 s, pointer glide 0.13 s (the product's own value), corners breathe 1.5 px at rest. Primary hover treatment everywhere: the corner lock (four corners close in around the target). Inline links: underline at rest that rises.
- Idle: the bracket's corners breathe and the record readout's timestamp ticks; the page is never frozen. Off under reduced motion.

## Composition
```
HEADER  [burst] Bluelines_            How it works  Agents  Privacy  Install   [Add to Chrome]

HERO    MARK UP ANY                                   (bracket + chips around h1, pin 1)
        LIVE WEBSITE_
        lede (grotesk, 6 cols)              meta: v1.0.0 · Chrome MV3 · Alt+Shift+M
        [Add to Chrome] [Try Inspect on this page]
        01 See  02 Mark  03 Explain  04 Ship   (chapter index = tagline)

01 SEE  split: sticky heading left | live annotation record (mono readout) + real screenshot right
02 MARK full-width hairline rows: number chip · CATEGORY · what it is for · example note; dashed "+ New"
03 EXPLAIN  diff: raw note | enhanced prompt; then agents: logos in a ruled strip + 3 facts
04 SHIP index table: big extension (.xlsx) | what you get; copy formats as a chip line
ACCENT  narrow band: "The accent is yours" + 6 swatches + colour input (whole page follows, logo too)
PRIVACY paper ground: "Local by default." ledger, two columns: stays here | leaves only when you click
INSTALL giant "See. Mark. Explain. Ship." stack, CTA, shortcuts as kbd rows
FOOTER  burst, colophon, links
DOCK    fixed bottom centre: [burst] | Inspect | Notes N
```

## Genericness test
- Generic answer: dark SaaS hero with a browser mockup, three feature cards, gradient glow. Changed: no mockup built from divs (real screenshots only), features are the product's four steps laid out as different families, the "demo" is the bracket working on the real page.
- Generic hover: color swaps and magnetic buttons. Changed: one treatment, the corner lock, taken from the product's bracket.
- Generic privacy block: shield icon + three bullets. Changed: a paper ledger of exactly what leaves the browser and when, from the README.

## Changes from the owner (2026-10-21)
- **Loader, every page load.** The Burst builds from its own five parts: petals spin in, the star, the eye opens, the spark pops, then the cursor arrow lands and clicks (a ring goes out from its tip). The counter follows real work (fonts). Then the logo flies into the navbar's centre slot while the curtain lifts (src/motion/loader.ts). Budget: 2.6 s; if the script arrives late on a slow network the build is skipped and the curtain lifts at once; a CSS fallback releases the page after 4 s without script. Internal page links drop the same curtain before navigating.
- **Header.** Name far left, Burst centred (always), nav and the GitHub button right. Phone: Burst only in header and footer, no wordmark.
- **CTA.** "Get it on GitHub" with the GitHub mark replaces "Add to Chrome" everywhere; the Install section lists the four Load unpacked steps. Repo URL is a placeholder in `src/data/site.ts` (`site.github`).
- **Note card** sits above the frame's top right (beside its pin) so it never covers the content below; hidden on phones, where pins and chips carry the review.
- **Idle:** the bracket's corners breathe and the record's timestamp runs (4 updates a second); both stop under reduced motion.
- **White mode (2026-10-22).** `html[data-theme='light']` swaps ground and paper tokens (base.css); the privacy chapter becomes the ink counterpart. Header toggle (sun/moon) saves to `rl-theme`; first visit follows the OS setting. Accent picker now writes `--accent-text-ink` / `--accent-text-paper` (storage key `rl-accent-v2`) so the accent reads in both themes.
- **Browsers, install line, links (2026-10-22).** Copy says "browser extension". New `.browsers` band after the hero: an endless CSS marquee of mini browser windows (Simple Icons logos in `src/assets/browsers/`), each logo locked in the Bluelines frame with a pin, status from docs/browser-support (Tested / Chromium / Experimental; Safari is left out because it isn't supported). Hero gets Install + GitHub buttons and a copyable `git clone` line (`cloneCmd` in site.ts), repeated in Install. New `.links` section before the footer lists every repo/docs/help link (`resources` in site.ts).
- **Page navigation (2026-10-22).** Header nav links to pages only: Docs, Install, AI agents, Changelog (+ GitHub). Footer is the full sitemap (`resources` in site.ts: Product, Learn, AI agents, Help); the home-page Links section moved into it. Hero "Install Bluelines" goes to /docs/install/.
