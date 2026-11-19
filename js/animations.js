/**
 * VANDANA INFRATEK — GENERAL WEBSITE ANIMATIONS
 * Subtle entrance reveals, interactive hover polish, and scroll hints.
 */
(function(window) {
  'use strict';

  let isAnimInitialized = false;

  function initAnimations() {
    if (isAnimInitialized) return;
    isAnimInitialized = true;
    // Scroll hint click smooth scroll
    const scrollHint = document.getElementById('scroll-hint');
    if (scrollHint) {
      scrollHint.addEventListener('click', function() {
        const nextSection = document.getElementById('trust') || document.getElementById('work');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
      });
      scrollHint.style.cursor = 'pointer';
    }

    // Intersection observer for section headings and cards
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.project-card, .service-card, .stat-card, .trust-stat-card, .trust-img-card, .hero-feature-box').forEach(function(el) {
        observer.observe(el);
      });
    }
  }

  window.VandanaAnimations = {
    init: initAnimations
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})(window);
