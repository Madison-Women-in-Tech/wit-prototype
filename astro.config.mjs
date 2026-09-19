import { defineConfig } from 'astro/config';

// ---------------------------------------------------------------
// PROTOTYPE CONFIG
//
// Deploying as an org project page
// (https://madison-women-in-tech.github.io/wit-prototype):
//     site = 'https://madison-women-in-tech.github.io'   base = '/wit-prototype'
//
// Production on the real domain:
//     site = 'https://madisonwomen.tech'  base = '/'
// ---------------------------------------------------------------
const site = 'https://madison-women-in-tech.github.io';
const base = '/wit-prototype';

// Astro does NOT prepend `base` to redirect targets, so internal
// destinations have to include it explicitly.
const internal = (p) => `${base.replace(/\/$/, '')}${p}`;

export default defineConfig({
  site,
  base,

  // The 7 pages we're dropping. GitHub Pages can't do server-side 301s,
  // so Astro emits meta-refresh + canonical pages instead.
  redirects: {
    '/about/events':             'https://www.meetup.com/madison-women-in-tech/events/',
    '/about/FAQ':                internal('/join'),
    '/join/testimonials':        internal('/#reviews'),
    '/members/job-openings':     internal('/join'),
    '/members/looking-for-work': internal('/join'),
    '/sponsor/hire-members':     internal('/join'),
    '/sponsorship':              internal('/join'),
  },
});
