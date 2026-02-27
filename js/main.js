/* ============================================================
   ASTRID ROLANDO — Wedding Planner Website
   JavaScript
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────
   1. Utilities
───────────────────────────────────────── */
function $(sel, ctx = document) {
  return ctx.querySelector(sel);
}

function $$(sel, ctx = document) {
  return Array.from(ctx.querySelectorAll(sel));
}

/* ─────────────────────────────────────────
   2. Sticky Header
───────────────────────────────────────── */
(function initStickyHeader() {
  const header = $('#site-header');
  if (!header) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 60) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ─────────────────────────────────────────
   3. Mobile Navigation Toggle
───────────────────────────────────────── */
(function initMobileNav() {
  const toggle = $('.nav-toggle');
  const links  = $('.nav-links');
  if (!toggle || !links) return;

  function closeNav() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  $$('.nav-links a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      closeNav();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
})();

/* ─────────────────────────────────────────
   4. Smooth Scroll for Anchor Links
───────────────────────────────────────── */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = $('#site-header')?.offsetHeight ?? 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();

/* ─────────────────────────────────────────
   5. Scroll Reveal Animations
───────────────────────────────────────── */
(function initScrollReveal() {
  // Add reveal class to key elements automatically
  const selectors = [
    '.about-image-wrap',
    '.about-text',
    '.service-card',
    '.portfolio-item',
    '.testimonial-card',
    '.process-step',
    '.intro-stat',
    '.contact-text',
    '.contact-form-wrap',
  ];

  selectors.forEach(sel => {
    $$(sel).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger siblings within the same grid
      const delayClass = `reveal-delay-${(i % 4) + 1}`;
      el.classList.add(delayClass);
    });
  });

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  $$('.reveal').forEach(el => observer.observe(el));
})();

/* ─────────────────────────────────────────
   6. Contact Form
───────────────────────────────────────── */
(function initContactForm() {
  const form    = $('#contact-form');
  const success = $('#form-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    // Simulate async submission (replace with real endpoint / EmailJS / Formspree etc.)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      form.reset();

      if (success) {
        success.textContent = 'Thank you! Your message has been sent. Astrid will be in touch soon.';
        success.classList.add('show');

        setTimeout(() => {
          success.classList.remove('show');
          success.textContent = '';
        }, 6000);
      }
    }, 1200);
  });
})();

/* ─────────────────────────────────────────
   7. Dynamic Year in Footer
───────────────────────────────────────── */
(function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

/* ─────────────────────────────────────────
   8. Active Nav Link Highlighting
───────────────────────────────────────── */
(function initActiveNav() {
  const sections = $$('section[id], main section[id]');
  const navLinks = $$('.nav-links a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const headerHeight = () => $('#site-header')?.offsetHeight ?? 80;

  let ticking = false;

  function updateActive() {
    const scrollY = window.scrollY + headerHeight() + 40;

    let current = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateActive();
})();
