# Roshni Ravi — Makeup Artist Portfolio Website

## Project Overview

Static portfolio website for Roshni Ravi, a professional bridal/event makeup artist in Chennai, India. Hosted on GitHub Pages at **roshniravi.com**.

## Tech Stack

- Pure HTML, CSS, vanilla JavaScript — no build tools or frameworks
- GitHub Pages for hosting (deploys automatically on push to `main`)
- Custom domain via GoDaddy DNS → GitHub Pages

## File Structure

```
index.html          — Home page (hero collage, recent brides, about strip, testimonials)
portfolio.html      — Full portfolio grid with lightbox (no category filters)
services.html       — Pricing: package cards, inclusions, extras menu, "Check your date" WhatsApp prompt (nav label "Pricing")
about.html          — Bio and background
terms.html          — Terms & conditions
css/style.css       — All styles (single file, CSS custom properties)
js/main.js          — All interactions (nav, mobile menu, lightbox, testimonials, WhatsApp float)
images/
  Hero/             — Hero section images
  portfolio/        — Portfolio work images (work-XX.jpg; grid order and alt text set in portfolio.html, keep the count a multiple of 5)
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

- **Light, phone-first aesthetic**: white (`#ffffff`) and greige bands (`#f3efea`) joined by SVG waves, ink text (`#26211e`), taupe accent (`#7f6453`; muted text `#6f665f`; both pass WCAG AA on white and greige). Designed phone-first (most visitors), with a wide layout from 960px: centred 1180px content column, full-bleed bands
- **Fonts**: Cormorant Garamond (uppercase display headings, with one italic taupe accent word via `<em>`), Figtree (body) — loaded via `<link>` in each page head
- **Logo**: monogram (italic "R" in a thin circle) + "MAKEUP BY / ROSHNI RAVI". The brand name is "Makeup by Roshni Ravi"
- **Copy**: plain and factual. No wordplay. Pricing page uses labels, not sentences. First person "I" (Roshni); "we" only where Roshni and Sainidhi are described together
- **Type floor**: no text below ~11px (0.68rem); tap targets 44px
- **CSS variables** defined in `:root` in `css/style.css` — use them, don't hardcode colors
- **Responsive**: phone-first base styles; a `max-width: 389px` block tightens the header for 360px/320px phones (check for horizontal scroll there after any nav change); `@media (min-width: 600px)` for tablet tweaks and `@media (min-width: 960px)` for the desktop layout (inline nav, two-column hero, 4-column portfolio, pricing packages beside extras). On desktop `--gutter` centres content. Test at 390px first, then 768px and 1280px
- **Animations**: kept minimal (lazy image fade, menu stagger). `.reveal` support remains in `js/main.js` but content sections don't use it
- **Shared layout**: navbar and footer HTML is duplicated across all pages (no templating). When updating nav or footer, update all 5 HTML files

## Key Patterns

- **Navigation**: sticky `.navbar` with `.logo`, `.nav-book`, `.hamburger`; `.nav-links` is a full-screen menu. Don't add `backdrop-filter` to `.navbar` (it traps the fixed menu)
- **Portfolio images**: named `work-XX.jpg`, optimized to 1200px wide, ~80% quality JPEG
- **CTAs**: all booking links go to WhatsApp (`https://wa.me/919600210413`)
- **OG tags**: every page has Open Graph + Twitter Card meta tags
- **Lightbox**: portfolio page has a custom lightbox for image viewing
- **Pricing**: information only, no calculator (removed so the page never shows a large running total or fixes a price before Roshni quotes). Prices are shown before GST (5%). Outstation is +₹20,000 per look, not an add-on. The closing WhatsApp link pre-fills date/events/city. When prices change, update `services.html` and `terms.html`

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
