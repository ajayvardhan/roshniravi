/* ============================================
   Makeup by Roshni Ravi — Premium Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initMobileMenu();
  initRevealAnimations();
  initTestimonials();
  initLightbox();
  initDragScroll();
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
  const items = document.querySelectorAll('.portfolio-grid .grid-item');

  let currentIndex = 0;
  const images = [];

  items.forEach((item, i) => {
    const img = item.querySelector('img');
    if (img) {
      images.push(img.src);
      item.addEventListener('click', () => openLightbox(i));
    }
  });

  function updateCounter() {
    if (counterEl) {
      counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
    }
  }

  function openLightbox(index) {
    currentIndex = index;
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
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
    updateCounter();
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
    updateCounter();
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
