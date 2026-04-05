document.addEventListener('DOMContentLoaded', function () {

  // ── Set data-aos attributes BEFORE AOS.init ───────────────────

  // Home: cards
  document.querySelectorAll('.notice-card, .news-card').forEach(function (el, i) {
    if (!el.hasAttribute('data-aos')) {
      el.setAttribute('data-aos', 'fade-up');
      el.setAttribute('data-aos-delay', String((i + 1) * 100));
    }
  });

  // Team: stagger member cards in groups of 3
  document.querySelectorAll('.member-card').forEach(function (card, i) {
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String((i % 3) * 100));
  });


  // News items
  document.querySelectorAll('.news-card li').forEach(function (li, i) {
    li.setAttribute('data-aos', 'fade-left');
    li.setAttribute('data-aos-delay', String(Math.min(i, 5) * 40));
  });

  // Gallery events
  document.querySelectorAll('.gallery-event').forEach(function (el, i) {
    el.setAttribute('data-aos', 'fade-up');
    el.setAttribute('data-aos-delay', String((i % 2) * 100));
  });

  // Research / Contact: animate headings, images, sections
  // Skip professor page (/team/jaeho)
  var isProfessorPage = window.location.pathname.indexOf('/team/jaeho') !== -1;

  // Target h2, h3, h4 headings inside main content
  if (!isProfessorPage) document.querySelectorAll('.main-content h2, .main-content h3, .main-content h4').forEach(function (el) {
    if (!el.closest('[data-aos]')) {
      el.setAttribute('data-aos', 'fade-up');
    }
  });

  // Animate images in main content
  if (!isProfessorPage) document.querySelectorAll('.main-content p > img, .main-content p[align="center"]').forEach(function (el) {
    if (!el.closest('[data-aos]')) {
      el.setAttribute('data-aos', 'fade-up');
      el.setAttribute('data-aos-delay', '100');
    }
  });

  // Animate blockquotes
  if (!isProfessorPage) document.querySelectorAll('.main-content blockquote').forEach(function (el) {
    if (!el.hasAttribute('data-aos')) {
      el.setAttribute('data-aos', 'fade-up');
    }
  });

  // Animate lists (ul, ol) in textlay pages (research, contact)
  if (!isProfessorPage) document.querySelectorAll('.main-content > .col-12 > ul, .main-content > .col-12 > ol').forEach(function (el) {
    if (!el.closest('[data-aos]')) {
      el.setAttribute('data-aos', 'fade-up');
      el.setAttribute('data-aos-delay', '50');
    }
  });

  // Animate hr separators
  if (!isProfessorPage) document.querySelectorAll('.main-content hr').forEach(function (el) {
    el.setAttribute('data-aos', 'fade');
  });

  // Row sections (skip professor page)
  if (!isProfessorPage) document.querySelectorAll('.main-content > .col-12 > .row').forEach(function (el) {
    if (!el.closest('[data-aos]') && !el.classList.contains('pub-entry')) {
      el.setAttribute('data-aos', 'fade-up');
    }
  });

  // Carousel (home)
  var carousel = document.getElementById('carousel');
  if (carousel && !carousel.hasAttribute('data-aos')) {
    carousel.setAttribute('data-aos', 'fade-up');
    carousel.setAttribute('data-aos-delay', '100');
  }

  // ── AOS Init (after attributes are set) ───────────────────────
  AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: true,
    offset: 50
  });

  // ── Navbar shrink on scroll ───────────────────────────────────
  var navbar = document.getElementById('main-navbar');
  if (navbar) {
    var shrinkClass = 'navbar-shrink';
    function checkScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add(shrinkClass);
      } else {
        navbar.classList.remove(shrinkClass);
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // ── Smooth scroll for anchor links ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
