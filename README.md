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

## Deploy it to your personal account

1. Create a new **public** repo (e.g. `wit-prototype`).
2. In `astro.config.mjs`, set `site` to `https://<your-username>.github.io`.
   Leave `base` as `/wit-prototype` (or match your repo name).
3. Push:

   ```bash
   git init && git add -A && git commit -m "WiT static site prototype"
   git branch -M main
   git remote add origin git@github.com:<your-username>/wit-prototype.git
   git push -u origin main
   ```

4. Repo **Settings → Pages → Source: GitHub Actions**.
5. The included workflow builds and deploys on every push to `main`. First run
   takes ~1 minute; the URL appears in the Actions log.

For production on the real domain later: set `site: 'https://madisonwomen.tech'`,
`base: '/'`, and follow the DNS steps in the migration plan.

---

## Photos — run this first

Seven event photos from the current site are wired into the pages, but the image
files aren't in the repo yet. Fetch them:

```bash
bash scripts/fetch-site-images.sh
```

**Do this soon.** The job fair photos come from Active Storage URLs that stop
working the moment the Rails app is switched off. Commit the files once you have
them.

Until you run it, those slots render as labelled dashed placeholders rather than
broken-image icons, so the site still looks intentional.

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
| **Photography** | Wired up, files not committed. Run `scripts/fetch-site-images.sh`. |

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
