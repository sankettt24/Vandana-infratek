/**
 * VANDANA INFRATEK — NAVIGATION & HEADER CONTROLLER
 * Manages sticky frosted glass header elevation, active state spy,
 * responsive mobile navigation drawer, and three-dots menu interaction.
 */
(function(window) {
  'use strict';

  let isNavInitialized = false;

  function initNavigation() {
    if (isNavInitialized) return;
    isNavInitialized = true;

    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

    // Mobile menu drawer toggle function
    function toggleMobileMenu(forceState) {
      if (!mobileNavDrawer || !mobileMenuBtn) return;

      const isCurrentlyOpen = mobileNavDrawer.classList.contains('open');
      const willOpen = forceState !== undefined ? Boolean(forceState) : !isCurrentlyOpen;

      mobileMenuBtn.classList.toggle('active', willOpen);
      mobileMenuBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');

      mobileNavDrawer.classList.toggle('open', willOpen);
      mobileNavDrawer.setAttribute('aria-hidden', willOpen ? 'false' : 'true');

      if (mobileNavBackdrop) {
        mobileNavBackdrop.classList.toggle('open', willOpen);
      }

      if (willOpen) {
        document.body.classList.add('mobile-nav-open');
      } else {
        document.body.classList.remove('mobile-nav-open');
      }
    }

    if (mobileMenuBtn && mobileNavDrawer) {
      let lastToggleTimestamp = 0;

      function onMenuTrigger(e) {
        const now = Date.now();
        if (now - lastToggleTimestamp < 280) {
          if (e.cancelable) e.preventDefault();
          return;
        }
        lastToggleTimestamp = now;

        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
      }

      // Support both click and touchend for instantaneous mobile responsiveness
      mobileMenuBtn.addEventListener('click', onMenuTrigger);
      mobileMenuBtn.addEventListener('touchend', onMenuTrigger, { passive: false });

      // Backdrop tap closes the drawer
      if (mobileNavBackdrop) {
        function onBackdropTap(e) {
          if (e.cancelable) e.preventDefault();
          e.stopPropagation();
          toggleMobileMenu(false);
        }
        mobileNavBackdrop.addEventListener('click', onBackdropTap);
        mobileNavBackdrop.addEventListener('touchend', onBackdropTap, { passive: false });
      }

      // Close drawer on mobile nav link click and navigate smoothly
      mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          toggleMobileMenu(false);

          if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              setTimeout(function() {
                target.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }
        });
      });

      // Close drawer when clicking outside the drawer and button
      document.addEventListener('click', function(e) {
        if (
          mobileNavDrawer.classList.contains('open') &&
          !mobileNavDrawer.contains(e.target) &&
          !mobileMenuBtn.contains(e.target)
        ) {
          toggleMobileMenu(false);
        }
      });

      // Escape key to close mobile menu
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
          toggleMobileMenu(false);
        }
      });
    }

    function handleScroll() {
      const scrollY = window.scrollY;

      // Header frosted glass elevation
      if (header) {
        if (scrollY > 25) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Scroll Spy for active navigation links
      let currentSectionId = '';
      sections.forEach(function(section) {
        const top = section.offsetTop - 220;
        if (scrollY >= top) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          if (href === `#${currentSectionId}` || href === `index.html#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    }

    // Smooth anchor click handling for desktop nav links
    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  window.VandanaNavigation = {
    init: initNavigation
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})(window);
