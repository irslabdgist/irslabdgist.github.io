document.addEventListener('DOMContentLoaded', function () {

  // ── Set data-aos attributes BEFORE AOS.init ───────────────────
  //
  // Animation policy:
  //  - Home: only the News list items get a fade-left entrance. The carousel,
  //    notice card, and news card itself stay still.
  //  - Other pages (Research, Members, Publications, Contact, Gallery):
  //    body content (cards, images, blockquotes, lists, hr, rows) gets a
  //    subtle fade-up matching the publication "All" button transition.
  //    Headings (h1/h2/h3/h4) never animate so the page title stays still.
  //  - Professor page (/team/jaeho): no animations at all.
  //
  // The "All button" style (see pub-filter.js) is: translateY(15px) → 0,
  // opacity 0 → 1, 0.4s ease. AOS.init below + the [data-aos="fade-up"]
  // override in custom.css reproduce that effect.

  var isHome = !!document.getElementById('homeid');
  var isProfessorPage = window.location.pathname.indexOf('/team/jaeho') !== -1;

  if (isHome) {
    // Home: news items keep right→left fade.
    document.querySelectorAll('.news-card li').forEach(function (li, i) {
      li.setAttribute('data-aos', 'fade-left');
      li.setAttribute('data-aos-delay', String(Math.min(i, 5) * 40));
    });
  } else if (!isProfessorPage) {
    // Team: stagger member cards.
    document.querySelectorAll('.member-card').forEach(function (card, i) {
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', String(Math.min(i, 5) * 40));
    });

    // Gallery events.
    document.querySelectorAll('.gallery-event').forEach(function (el, i) {
      el.setAttribute('data-aos', 'fade-up');
      el.setAttribute('data-aos-delay', String(Math.min(i, 5) * 40));
    });

    // Images in main content.
    document.querySelectorAll('.main-content p > img, .main-content p[align="center"]').forEach(function (el) {
      if (!el.closest('[data-aos]')) {
        el.setAttribute('data-aos', 'fade-up');
      }
    });

    // Blockquotes.
    document.querySelectorAll('.main-content blockquote').forEach(function (el) {
      if (!el.hasAttribute('data-aos')) {
        el.setAttribute('data-aos', 'fade-up');
      }
    });

    // Lists (ul, ol) in textlay pages (research, contact).
    document.querySelectorAll('.main-content > .col-12 > ul, .main-content > .col-12 > ol').forEach(function (el) {
      if (!el.closest('[data-aos]')) {
        el.setAttribute('data-aos', 'fade-up');
      }
    });

    // hr separators (pure fade, no slide).
    document.querySelectorAll('.main-content hr').forEach(function (el) {
      el.setAttribute('data-aos', 'fade');
    });

    // Row sections (skip pub entries — those animate via pub-filter.js).
    document.querySelectorAll('.main-content > .col-12 > .row').forEach(function (el) {
      if (!el.closest('[data-aos]') && !el.classList.contains('pub-entry')) {
        el.setAttribute('data-aos', 'fade-up');
      }
    });
  }

  // ── AOS Init (after attributes are set) ───────────────────────
  AOS.init({
    duration: 400,
    easing: 'ease',
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
