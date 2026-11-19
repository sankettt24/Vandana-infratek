/**
 * VANDANA INFRATEK — APPLICATION INITIALIZATION (MAIN)
 * Orchestrates modules, performance checks, and lifecycle events.
 */
(function(window) {
  'use strict';

  function initApp() {
    console.log('VANDANA INFRATEK Architecture & Interiors website initialized.');

    // Initialize all components if present
    if (window.VandanaScrollAnimation && typeof window.VandanaScrollAnimation.init === 'function') {
      window.VandanaScrollAnimation.init();
    }

    if (window.VandanaNavigation && typeof window.VandanaNavigation.init === 'function') {
      window.VandanaNavigation.init();
    }

    if (window.VandanaAnimations && typeof window.VandanaAnimations.init === 'function') {
      window.VandanaAnimations.init();
    }

    if (window.VandanaInstagram && typeof window.VandanaInstagram.init === 'function') {
      window.VandanaInstagram.init();
    }

    if (window.VandanaContact && typeof window.VandanaContact.init === 'function') {
      window.VandanaContact.init();
    }

    if (window.VandanaFooterComponent && typeof window.VandanaFooterComponent.init === 'function') {
      window.VandanaFooterComponent.init();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})(window);
