# Roshni Ravi — Makeup Artist Portfolio Website

## Project Overview

Static portfolio website for Roshni Ravi, a professional bridal/event makeup artist in Chennai, India. Hosted on GitHub Pages at **roshniravi.com**.

## Tech Stack

- Pure HTML, CSS, vanilla JavaScript — no build tools or frameworks
- GitHub Pages for hosting (deploys automatically on push to `main`)
- Custom domain via GoDaddy DNS → GitHub Pages

## File Structure

```
index.html          — Home page (hero collage, approach, recent brides, about strip, testimonials)
portfolio.html      — Full portfolio grid with lightbox (no category filters)
services.html       — Pricing: itemised price list with quantity steppers + live estimate (nav label "Pricing")
about.html          — Bio and background
terms.html          — Terms & conditions
css/style.css       — All styles (single file, CSS custom properties)
js/main.js          — All interactions (nav, mobile menu, lightbox, testimonials, WhatsApp float, pricing estimate)
images/
  Hero/             — Hero section images
  portfolio/        — Portfolio work images (work-01.jpg through work-31.jpg)
  about/            — About page images
  og-image.jpg      — Open Graph preview image
CNAME               — Custom domain config (roshniravi.com)
.github/workflows/deploy.yml — GitHub Pages deployment
```

## Development

No build step. Open any `.html` file in a browser or use a local server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Design Conventions

- **Light, phone-first aesthetic**: white (`#ffffff`) and greige bands (`#f3efea`) joined by SVG waves, ink text (`#26211e`), taupe accent (`#8f725f`). Designed phone-first (most visitors), with a wide layout from 960px: centred 1180px content column, full-bleed bands
- **Fonts**: Cormorant Garamond (uppercase display headings, with one italic taupe accent word via `<em>`), Figtree (body) — loaded via `<link>` in each page head
- **Logo**: monogram (italic "R" in a thin circle) + "MAKEUP BY / ROSHNI RAVI". The brand name is "Makeup by Roshni Ravi"
- **Copy**: plain and factual. No wordplay. Pricing page uses labels, not sentences
- **CSS variables** defined in `:root` in `css/style.css` — use them, don't hardcode colors
- **Responsive**: phone-first base styles; `@media (min-width: 600px)` for tablet tweaks and `@media (min-width: 960px)` for the desktop layout (inline nav, two-column hero/approach, 4-column portfolio, pricing list + sticky estimate). On desktop `--gutter` centres content. Test at 390px first, then 768px and 1280px
- **Animations**: kept minimal (lazy image fade, menu stagger). `.reveal` support remains in `js/main.js` but content sections don't use it
- **Shared layout**: navbar and footer HTML is duplicated across all pages (no templating). When updating nav or footer, update all 5 HTML files

## Key Patterns

- **Navigation**: sticky `.navbar` with `.logo`, `.nav-book`, `.hamburger`; `.nav-links` is a full-screen menu. Don't add `backdrop-filter` to `.navbar` (it traps the fixed menu)
- **Portfolio images**: named `work-XX.jpg`, optimized to 1200px wide, ~80% quality JPEG
- **CTAs**: all booking links go to WhatsApp (`https://wa.me/919600210413`)
- **OG tags**: every page has Open Graph + Twitter Card meta tags
- **Lightbox**: portfolio page has a custom lightbox for image viewing
- **Pricing**: each `.price-item[data-key]` carries `data-price`, `data-label`, optional `data-max`/`data-start`; `initPricing()` builds the estimate, GST (5%) and the WhatsApp message. Prices are shown before GST. Outstation is a package variant (+₹20,000 per event), not an add-on. When prices change, also update `terms.html`

## Git & Deployment

- **Branch**: `main` only — pushes to `main` auto-deploy via GitHub Actions
- **Remote**: uses SSH alias `github-personal` (not `github.com`)
- **Git identity**: `Ajay Vardhan <ajyvardan@gmail.com>` (local config)
- **Do NOT use `gh` CLI** for this repo — it's authenticated to a different GitHub account
- **Deployment**: push to `main` triggers `.github/workflows/deploy.yml` → GitHub Pages

## Image Guidelines

- Portfolio images: JPEG, 1200px wide max, ~80% quality
- Use `loading="lazy"` on all images except hero
- OG image: 1200x630px
- Use `sips` (macOS) for image resizing when needed

## When Making Changes

1. Keep the shared nav/footer consistent across all 5 HTML files
2. Test on mobile viewport — most visitors are mobile
3. Preserve the existing animation and interaction patterns
4. All external links should have `target="_blank" rel="noopener"`
5. Don't introduce build tools, bundlers, or frameworks — keep it simple static files
