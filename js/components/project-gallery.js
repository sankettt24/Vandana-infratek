/**
 * VANDANA INFRATEK — PROJECT GALLERY COMPONENT
 * Interactive project card hover and modal preview capabilities.
 */
(function(window) {
  'use strict';

  function initProjectGallery() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card) {
      card.addEventListener('mouseenter', function() {
        // Subtle haptic or visual accent
      });
    });
  }

  window.VandanaProjectGallery = {
    init: initProjectGallery
  };
})(window);
