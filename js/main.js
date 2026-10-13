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
  initPricing();
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
  if (!slides.length) return;

  let current = 0;
  let interval;

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
    interval = setInterval(next, 6000);
  }

  function resetAutoplay() {
    clearInterval(interval);
    startAutoplay();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

  // Touch swipe for testimonials
  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) { next(); } else { prev(); }
        resetAutoplay();
      }
    }, { passive: true });
  }

  showSlide(0);
  startAutoplay();
}

/* --- Lightbox --- */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-inner img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const counterEl = lightbox.querySelector('.lightbox-counter');

  let currentIndex = 0;
  let lastFocus = null;

  function getVisibleItems() {
    return Array.from(document.querySelectorAll('.portfolio-grid .grid-item'));
  }

  function getVisibleImages() {
    return getVisibleItems().map(item => item.querySelector('img')?.src).filter(Boolean);
  }

  function updateCounter() {
    const images = getVisibleImages();
    if (counterEl) {
      counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
    }
  }

  function openLightbox(index) {
    currentIndex = index;
    const images = getVisibleImages();
    lightboxImg.src = images[index];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateCounter();
    lastFocus = document.activeElement;
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  function prevImage() {
    const images = getVisibleImages();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
    updateCounter();
  }

  function nextImage() {
    const images = getVisibleImages();
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
    updateCounter();
  }

  // Use event delegation on the grid for click handling
  const grid = document.querySelector('.portfolio-grid');
  if (grid) {
    getVisibleItems().forEach(item => {
      item.tabIndex = 0;
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'View photo');
    });

    const openFrom = (e) => {
      const item = e.target.closest('.grid-item');
      if (!item) return;
      const index = getVisibleItems().indexOf(item);
      if (index !== -1) openLightbox(index);
    };

    grid.addEventListener('click', openFrom);
    grid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFrom(e); }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
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

/* --- Pricing Estimate --- */
function initPricing() {
  const root = document.querySelector('[data-pricing]');
  if (!root) return;

  const items = Array.from(root.querySelectorAll('.price-item[data-key]'));
  const estimate = root.querySelector('[data-estimate]');
  const dockTotal = root.querySelector('[data-dock-total]');
  const bookLinks = root.querySelectorAll('[data-dock-link]');
  const dock = root.querySelector('.price-dock');
  const summary = root.querySelector('.price-summary');
  const qty = {};
  items.forEach(item => { qty[item.dataset.key] = Number(item.dataset.start || 0); });

  const inr = n => '₹' + n.toLocaleString('en-IN');

  function render() {
    const lines = [];
    items.forEach(item => {
      const key = item.dataset.key;
      const count = qty[key];
      const max = Number(item.dataset.max || 20);
      item.querySelector('output').textContent = count;
      item.querySelector('[data-step="-1"]').disabled = count <= 0;
      item.querySelector('[data-step="1"]').disabled = count >= max;
      item.classList.toggle('selected', count > 0);
      if (count) {
        const label = item.dataset.label + (max > 1 ? ' × ' + count : '');
        lines.push([label, Number(item.dataset.price) * count]);
      }
    });

    const subtotal = lines.reduce((sum, l) => sum + l[1], 0);
    const gst = Math.round(subtotal * 0.05);
    const total = subtotal + gst;

    estimate.innerHTML = lines.length
      ? lines.map(l => `<div class="estimate-line"><span>${l[0]}</span><span class="tnum">${inr(l[1])}</span></div>`).join('') +
        `<div class="estimate-line muted"><span>GST 5%</span><span class="tnum">${inr(gst)}</span></div>` +
        `<div class="estimate-line total"><span>Total</span><span class="tnum">${inr(total)}</span></div>`
      : '<p class="estimate-empty">Add an item above to see your estimate.</p>';

    dockTotal.textContent = inr(total);
    const message = 'Hi Roshni, I would like to check availability for:\n' +
      lines.map(l => '• ' + l[0]).join('\n') +
      '\nEstimate: ' + inr(total) + ' incl. GST';
    bookLinks.forEach(link => {
      link.href = 'https://wa.me/919600210413?text=' + encodeURIComponent(message);
      link.setAttribute('aria-disabled', lines.length ? 'false' : 'true');
    });
  }

  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-step]');
    if (!btn || btn.disabled) return;
    const item = btn.closest('.price-item');
    const key = item.dataset.key;
    const max = Number(item.dataset.max || 20);
    qty[key] = Math.max(0, Math.min(max, qty[key] + Number(btn.dataset.step)));
    render();
  });

  // Hide the phone dock once the estimate is in view (or scrolled past), so the total isn't shown twice
  if (dock && summary) {
    new IntersectionObserver(([entry]) => {
      dock.classList.toggle('hidden', entry.isIntersecting || entry.boundingClientRect.top < 0);
    }, { rootMargin: '0px 0px 80px 0px' }).observe(summary);
  }

  render();
}
