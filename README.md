# Volt Sports Hub: website

Static, SEO-friendly marketing site for Volt Sports Hub, built with **Angular 19** (standalone components, signals,
built-in control flow, OnPush, lazy routes, SCSS) and prerendered to plain HTML at build time. No backend.

Pages: `/` Home · `/about` About Us · `/gallery` Gallery · `/team` Our Team · `/contact` Contact Us · branded 404.

> **Node version:** developed on Node **20.13.1** (works on `^18.19.1 || ^20.11.1 || >=22`). That is why the project is on
> Angular 19: Angular 20+ needs Node 20.19+, Angular 22 needs Node 22.22+.

## Run, build, test

```bash
npm install
npm start            # dev server: http://localhost:4200
npm run build        # static site -> dist/volt-website/browser  (also writes 404.html)
npm run lint
npm run test:ci      # unit tests (Karma + headless Chrome; set CHROME_BIN if Chrome is not found)
```

Always deploy with **`npm run build`** (not bare `ng build`): the extra step copies the prerendered `404/index.html` to
`404.html`, the file name every static host looks for.

`dist/volt-website/browser` contains one `index.html` per route (`/index.html`, `about/index.html`, …) plus hashed assets.

## Deploy

Upload the contents of `dist/volt-website/browser`. Every route is a real file, so no rewrite rule is needed. Only the
404 page needs configuring:

- **Netlify:** publish directory `dist/volt-website/browser`, build command `npm run build`. `404.html` is picked up automatically.
- **Vercel:** framework "Other", output directory `dist/volt-website/browser`, build command `npm run build`. `404.html` is used automatically.
- **GitHub Pages:** publish the folder (for example via `actions/upload-pages-artifact`). `404.html` is served for unknown URLs.
  For a project site (`user.github.io/repo/`) build with `ng build --base-href /repo/` (and edit `scripts/postbuild.mjs` call accordingly).
- **Nginx:**
  ```nginx
  root /var/www/volt/browser;
  index index.html;
  location / { try_files $uri $uri/ =404; }
  error_page 404 /404.html;
  gzip on; gzip_types text/css application/javascript image/svg+xml;
  location ~* \.(js|css|woff2?|png|svg)$ { add_header Cache-Control "public, max-age=31536000, immutable"; }
  ```
  (Hashed files are safe to cache forever; do not cache the `.html` files.)

## Edit content

All copy and data live in **`src/app/content/site-content.ts`** (typed `SITE` constant): brand, contact details, location
and opening hours, about text, values, milestones, stats, sports ticker, services, steps, white-label demo colors, team,
gallery, FAQ, form settings, and the per-page `<title>`/description. Page headlines that contain styled words (for
example "Power your **game**") live in the page templates under `src/app/pages/`.

- **Contact form:** set `form.action` to a Formspree/Getform endpoint to POST the form without a backend. While it is
  empty, the form opens the visitor's email app (`mailto:`) with the values filled in.
- **Map:** set `location.mapQuery` (an address or `lat,lng`). The embed and the "Get directions" button both use it.
- **Team photos:** put the file in `public/images/team/` and set `photo: "images/team/name.jpg"`.

## Add gallery photos

1. Copy the images into `public/images/gallery/` (portrait 3:4, about 1080x1440 or larger, under 400 KB each).
2. In `site-content.ts`, add an item: `{ title, subtitle, photo: "images/gallery/court-1.jpg" }`.
   An empty `photo` renders a branded placeholder tile. The gallery is a single page with no filters.

## Project structure

```
src/app/
  content/site-content.ts   typed copy + data (the only data file)
  core/                     SiteContentService, ScrollStateService, ContactService, SeoTitleStrategy
  layout/                   header (mobile menu), footer, scroll progress, skip link
  shared/directives/        appReveal, appCountUp, appTilt, appMagnetic, appHeroGlow (+ shared IntersectionObserver)
  shared/ui/                button, icon, section heading, page hero, marquee, FAQ accordion, lightbox, map embed, gallery media
  shared/logo/              BoltMark + Logo (stand-in vector, see TODO)
  pages/                    home, about, gallery, team, contact, not-found (all lazy-loaded)
```

Design tokens (`--g`, `--l`, derived tones, the bolt background) are CSS custom properties at the top of `src/styles.scss`.
Logical CSS properties are used for horizontal spacing and positions so RTL/Arabic can be added later.

## Before launch checklist

Everything marked `[PLACEHOLDER]` in `site-content.ts` is **not real information**:

- [ ] `brand.email` and `brand.phone`
- [ ] `brand.social` links (Instagram, Facebook, LinkedIn, X)
- [ ] `brand.siteUrl`: the real production domain (used for canonical and Open Graph URLs)
- [ ] The same domain in `public/sitemap.xml` and `public/robots.txt`
- [ ] `location.address`, `location.mapQuery`, `location.hours`, `location.brief`
- [ ] `stats` (sample numbers) and `about.milestones` (real dates)
- [ ] `team`: real names, roles, bios and photos
- [ ] Gallery photos in `public/images/gallery/` and their `photo` paths
- [ ] `form.action` (or confirm the `mailto:` fallback is acceptable)
- [ ] **Logo:** the V-bolt is a stand-in SVG in `src/app/shared/logo/bolt-mark.ts` (`TODO`). Export the official vector from
  `Volt.ai` as SVG and replace the two paths; also regenerate `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`
  and `og-image.png` from it.
- [ ] **Display font:** Montserrat 900 italic stands in for the guideline's "FSP DEMO". Change `--display` in `styles.scss`.
- [ ] Privacy/legal pages if required by your market (none exist yet).
