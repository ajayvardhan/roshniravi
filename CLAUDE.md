# Roshni Ravi — Makeup Artist Portfolio Website

## Project Overview

Static portfolio website for Roshni Ravi, a professional bridal/event makeup artist in Chennai, India. Hosted on GitHub Pages at **roshniravi.com**.

## Tech Stack

- Pure HTML, CSS, vanilla JavaScript — no build tools or frameworks
- GitHub Pages for hosting (deploys automatically on push to `main`)
- Custom domain via GoDaddy DNS → GitHub Pages

## File Structure

```
index.html          — Home page (hero, featured work strip, testimonials, CTA)
portfolio.html      — Full portfolio grid with lightbox
services.html       — Pricing packages and service descriptions
about.html          — Bio and background
terms.html          — Terms & conditions
css/style.css       — All styles (single file, CSS custom properties)
js/main.js          — All interactions (loader, nav, scroll reveals, lightbox, testimonials, drag-scroll)
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

- **Dark luxury aesthetic**: black background (`#0a0a0a`), cream text (`#f5f0ea`), gold accents (`#c5a47e`)
- **Fonts**: Cormorant Garamond (display/headings), Inter (body) — loaded from Google Fonts
- **CSS variables** defined in `:root` in `css/style.css` — use them, don't hardcode colors
- **Responsive**: mobile-first, all pages must work on mobile
- **Animations**: scroll-reveal pattern using `.reveal` class + IntersectionObserver in `js/main.js`
- **Shared layout**: navbar and footer HTML is duplicated across all pages (no templating). When updating nav or footer, update all 5 HTML files

## Key Patterns

- **Navigation**: `.navbar` with `.nav-brand`, `.nav-links`, `.hamburger` for mobile
- **Reveal animations**: add class `reveal` to any section/element to animate on scroll
- **Portfolio images**: named `work-XX.jpg`, optimized to 1200px wide, ~80% quality JPEG
- **CTAs**: all booking links go to WhatsApp (`https://wa.me/919600210413`)
- **OG tags**: every page has Open Graph + Twitter Card meta tags
- **Lightbox**: portfolio page has a custom lightbox for image viewing

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
