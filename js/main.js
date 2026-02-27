// ============================================
// Astrid Rolando — Wedding Planner
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initContactForm();
  initSmoothScroll();
});

// --- Navbar scroll behavior ---
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function onScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// --- Mobile menu toggle ---
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// --- Scroll-triggered fade-in animations ---
function initScrollAnimations() {
  // Add fade-in class to elements
  const selectors = [
    '.about-content',
    '.about-image',
    '.service-card',
    '.portfolio-item',
    '.testimonial-card',
    '.contact-info',
    '.contact-form-wrapper'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('fade-in');
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// --- Contact form handling ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // In production, this would send data to a backend or service like Formspree.
    // For now, show the success message.
    form.style.display = 'none';
    success.classList.add('visible');
  });
}

// --- Smooth scrolling for anchor links ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}
