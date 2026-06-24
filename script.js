/* =========================================================
   Mubin Al-Manaf — portfolio interactions
   Vanilla JS, no dependencies. Respects reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- nav: scrolled state ---- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- mobile menu toggle ---- */
  var toggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ---- scroll reveals ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---- ledger line-item sequence (the signature reveal) ---- */
  var ledger = document.querySelector(".ledger");
  var lines = document.querySelectorAll("[data-line]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    lines.forEach(function (el) { el.classList.add("is-visible"); });
  } else if (ledger) {
    var ledgerObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          lines.forEach(function (el, i) {
            setTimeout(function () { el.classList.add("is-visible"); }, 220 + i * 150);
          });
          ledgerObs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    ledgerObs.observe(ledger);
  }

  /* ---- active nav link ---- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav__links a");
  if ("IntersectionObserver" in window && navLinks.length) {
    var linkFor = {};
    navLinks.forEach(function (a) {
      var id = a.getAttribute("href").replace("#", "");
      linkFor[id] = a;
    });
    var activeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove("is-active"); });
          var link = linkFor[entry.target.id];
          if (link) link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { activeObs.observe(s); });
  }

  /* ---- hero scroll button ----
     Make the scroll hint interactive: smooth-scroll to the next section (#about)
     Supports click and keyboard (Enter / Space). Adds role and tabindex for accessibility.
  ---- */
  var heroScroll = document.querySelector('.hero__scroll');
  if (heroScroll) {
    var scrollTarget = document.getElementById('about') || document.querySelector('main section');
    heroScroll.style.cursor = 'pointer';
    if (!heroScroll.hasAttribute('tabindex')) heroScroll.setAttribute('tabindex', '0');
    heroScroll.setAttribute('role', 'button');
    heroScroll.addEventListener('click', function (e) {
      e.preventDefault();
      if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth' });
    });
    heroScroll.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
})();
