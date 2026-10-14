/* ============================================
   Makeup by Roshni Ravi — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initRevealAnimations();
  initLazyFade();
  initTestimonials();
  initLightbox();
  initWhatsAppFloat();
});

/* --- Navbar --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  function setOpen(open) {
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
    navLinks.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  setOpen(false);
  hamburger.addEventListener('click', () => setOpen(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) setOpen(false);
  });
}

/* --- Reveal on Scroll --- */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-image');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* --- Lazy Image Fade-in --- */
function initLazyFade() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach(img => {
    if (img.complete) {
      img.classList.add('img-loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('img-loaded'));
    }
  });
}

/* --- Testimonials --- */
function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const counter = document.querySelector('.testimonial-counter');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const carousel = document.querySelector('.testimonial-carousel');
  if (!slides.length) return;

  let current = 0;
  let interval;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
    current = index;
    if (counter) {
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
  }

  function next() { showSlide((current + 1) % slides.length); }
  function prev() { showSlide((current - 1 + slides.length) % slides.length); }

  function startAutoplay() {
    clearInterval(interval);
    // Stay paused while the reader is on it (hover or keyboard focus)
    if (reduceMotion || (carousel && carousel.matches(':hover, :focus-within'))) return;
    interval = setInterval(next, 6000);
  }

  function stopAutoplay() { clearInterval(interval); }

  function resetAutoplay() {
    // Once someone steers the carousel, announce slide changes to screen readers
    if (carousel) carousel.setAttribute('aria-live', 'polite');
    startAutoplay();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);
    onSwipe(carousel, () => { next(); resetAutoplay(); }, () => { prev(); resetAutoplay(); });
  }

  showSlide(0);
  startAutoplay();
}

/* --- Horizontal swipe: onNext for right-to-left, onPrev for left-to-right; mostly-vertical moves are scrolls --- */
function onSwipe(el, onNext, onPrev) {
  let startX = 0;
  let startY = 0;
  el.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
  }, { passive: true });
  el.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) { onNext(); } else { onPrev(); }
    }
  }, { passive: true });
}

/* --- Lightbox --- */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const grid = document.querySelector('.portfolio-grid');
  if (!lightbox || !grid) return;

  const lightboxImg = lightbox.querySelector('.lightbox-inner img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const counterEl = lightbox.querySelector('.lightbox-counter');
  const items = Array.from(grid.querySelectorAll('.grid-item'));
  const images = items.map(item => item.querySelector('img'));

  let currentIndex = 0;
  let lastFocus = null;

  // img.src is the full image even when the grid shows a srcset thumbnail
  function show(index, direction = 1) {
    currentIndex = (index + images.length) % images.length;
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (counterEl) {
      counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
    }
    // Once this photo is in, fetch the next one in the direction of travel
    const upcoming = images[(currentIndex + direction + images.length) % images.length];
    lightboxImg.onload = () => { new Image().src = upcoming.src; };
  }

  function openLightbox(index) {
    show(index);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lastFocus = document.activeElement;
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  function prevImage() { show(currentIndex - 1, -1); }
  function nextImage() { show(currentIndex + 1, 1); }

  items.forEach((item, i) => {
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', images[i].alt ? `View photo: ${images[i].alt}` : 'View photo');
  });

  // Use event delegation on the grid for click handling
  const openFrom = (e) => {
    const index = items.indexOf(e.target.closest('.grid-item'));
    if (index !== -1) openLightbox(index);
  };

  grid.addEventListener('click', openFrom);
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFrom(e); }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  onSwipe(lightbox, nextImage, prevImage);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    // Keep Tab inside the open lightbox
    if (e.key === 'Tab') {
      const focusables = [closeBtn, prevBtn, nextBtn].filter(Boolean);
      const i = focusables.indexOf(document.activeElement);
      e.preventDefault();
      const step = e.shiftKey ? -1 : 1;
      focusables[(i + step + focusables.length) % focusables.length].focus();
    }
  });
}


/* --- Floating WhatsApp Button --- */
function initWhatsAppFloat() {
  const btn = document.querySelector('.whatsapp-float');
  if (!btn) return;

  // Show after a short delay
  setTimeout(() => btn.classList.add('visible'), 1500);

  // Hide when near the footer (avoid overlapping footer WhatsApp links)
  const footer = document.querySelector('.footer');
  if (footer) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          btn.style.opacity = '0';
          btn.style.pointerEvents = 'none';
        } else {
          btn.style.opacity = '';
          btn.style.pointerEvents = '';
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(footer);
  }
}
