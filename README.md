# Madison Women in Tech — static site prototype

A working [Astro](https://astro.build) prototype of `madisonwomen.tech`, built to
help the team decide whether to move off Rails hosting onto GitHub Pages.

**This is a prototype, not a finished site.** Five representative pages, real
content, two visual directions to compare. See "What's deliberately fake" below.

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321/wit-prototype
```

Requires **Node 22.12+** (Astro 7). That's the whole setup — no Ruby, no database, no config.

`npm audit` should report **0 vulnerabilities**. If it doesn't, say so — it means
something drifted.

---

## Comparing the two designs

There's a **Preview: Classic / Fresh** toggle in the site header. It swaps the
entire palette and type treatment live, and the choice persists as you click
around.

Both directions are built from **the logo blue, `#168FBE`**, sampled straight
from the badge artwork. Since the logo is the only brand asset, the two options
differ by **typography and neutral temperature**, not by hue — so neither one
fights the mark.

| | Badge | Wordmark |
|---|---|---|
| Cue | The circular badge | The WOMEN IN TECH lettering |
| Feel | Warm, friendly, community-first | Bold, confident, editorial |
| Neutrals | Cream paper (`#fdfbf7`) | Crisp white + near-black |
| Type | Georgia serif headings | Anton condensed caps |
| Shapes | Rounded, soft shadows | Square corners, minimal |

(The toggle labels them Classic and Wordmark respectively; the underlying
`data-theme` values are still `classic` and `fresh`.)

Once the team picks: delete `src/components/ThemeToggle.astro`, remove the losing
theme block from `global.css`, and remove the toggle from `Nav.astro`.

---

## Deployment

The site auto-deploys via the [`deploy.yml`](.github/workflows/deploy.yml)
GitHub Actions workflow: every push to `main` builds the site and publishes it
to GitHub Pages. First run after a push takes ~1 minute; the live URL shows up
in the Actions log, and each run also appears under the repo's **Deployments**.

No manual Pages setup is needed — the workflow has `pages: write` permission
and creates/updates the Pages site itself the first time it runs successfully.

For production on the real domain later: set `site: 'https://madisonwomen.tech'`
and `base: '/'` in `astro.config.mjs`, and follow the DNS steps in the
migration plan.

---

## Photos

Event photos from the current site have already been captured and committed —
no fetch step needed. They live in `public/images/photos/`.

## The homepage feature block

`src/data/featured.json` drives the single promotional slot on the homepage.
It's year-round content by default, so it never goes stale on its own.

To promote something for a few weeks — a job fair, a big event — edit the
fields, then edit them back afterwards. One file, no dates, no scheduled jobs.

The dedicated `/job-fair` page stays up year-round regardless, as a reference
for next year's employers.

## Logo assets

| File | Use |
|---|---|
| `logo.png` | 512px, transparent background — nav, general use |
| `logo-reversed.png` | White knockout — dark footer |
| `favicon-32.png` / `apple-touch-icon.png` | Browser + iOS |

Derived from the JPG you supplied. If you have the original vector, drop in an
SVG instead — it'll be sharper and smaller. The Wordmark theme pulls **Anton**
from Google Fonts as a stand-in for the logo's condensed caps; self-host it for
production.

## What's here

```
src/
├── data/          sponsors.json, team.json, site.json  ← volunteers edit these
├── components/    Nav, Footer, NewsletterForm, SponsorGrid, ThemeToggle
├── layouts/       Base.astro — the one place nav/footer/meta are defined
├── pages/         index, about, join, job-fair, newsletter
└── styles/        global.css — both themes live here
```

**Pages built:** home, About (+ team), Join (merged with the old FAQ), Job Fair,
Newsletter.

**Redirects:** all 7 dropped URLs from the migration plan resolve via
meta-refresh pages Astro generates at build time. Check
`dist/sponsorship/index.html` after a build to see one.

**Content is real.** All copy, the six team bios, the 46-sponsor list, and the
Aug. 19 job fair details were pulled from the live site.

---

## What's deliberately fake

These are placeholders with visible in-page notes so nobody mistakes them for
finished work:

| Thing | Status |
|---|---|
| **Sponsor logos** | Text tiles. Real logos go in `public/images/sponsors/`. The images live in the Rails app and CloudFront and still need rescuing. |
| **Kit newsletter form** | Styled stand-in. Paste the real Kit JS embed into `src/components/NewsletterForm.astro`. |
| **Volunteer / contact forms** | Buttons that alert. Wire to Google Forms + Formspree per the plan. |
| **Job fair prospectus PDF** | Not included — still inside Rails, needs downloading. |
| **Photography** | Real photos, already committed in `public/images/photos/`. |

---

## Notable changes from the current site

- **Nav flattened.** Five dropdowns + four utility links → five top-level items,
  with Contact and Donate moved to the footer/header.
- **Join + FAQ merged.** They duplicated most of their content.
- **X/Twitter removed** from the footer, pending a decision on whether that
  account is still active.
- **Newsletter archive** points at Kit's feed instead of a hardcoded link. The
  live site has been showing a December 2021 issue for years.
- **Logo is now the brand.** Real artwork in `public/images/`, background
  flood-filled to transparency (interior white lettering and tick marks
  preserved). Includes a reversed knockout version for the dark footer, plus
  favicon and apple-touch-icon.
- **Zero JavaScript** ships from Astro. The only scripts are the small inline
  theme-toggle handlers, which get deleted when you pick a theme.
