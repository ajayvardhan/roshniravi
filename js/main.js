/* ============================================
   Makeup by Roshni Ravi — Premium Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initMobileMenu();
  initRevealAnimations();
  initLazyFade();
  initTestimonials();
  initLightbox();
  initDragScroll();
  initWhatsAppFloat();
  initPortfolioFilters();
  initFaqAccordion();
});

/* --- Loading Screen --- */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) {
    document.body.classList.add('loaded');
    return;
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 800);
  });

  // Fallback if load takes too long
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.add('loaded');
  }, 3000);
}

/* --- Navbar --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
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

  function getVisibleItems() {
    return Array.from(document.querySelectorAll('.portfolio-grid .grid-item'))
      .filter(item => !item.classList.contains('filter-hidden'));
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
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
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
    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.grid-item');
      if (!item || item.classList.contains('filter-hidden')) return;
      const visibleItems = getVisibleItems();
      const index = visibleItems.indexOf(item);
      if (index !== -1) openLightbox(index);
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

/* --- Portfolio Filters --- */
function initPortfolioFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const grid = document.querySelector('.portfolio-grid');
  if (!buttons.length || !grid) return;

  const items = grid.querySelectorAll('.grid-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter items
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('filter-hidden');
        } else {
          item.classList.add('filter-hidden');
        }
      });

      // Lightbox uses event delegation, so filtering works automatically
    });
  });
}

/* --- FAQ Accordion --- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --- Drag to Scroll (Portfolio Strip) --- */
function initDragScroll() {
  const tracks = document.querySelectorAll('.scroll-track');
  tracks.forEach(track => {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => { isDown = false; });
    track.addEventListener('mouseup', () => { isDown = false; });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  });
}
