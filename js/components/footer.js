/**
 * VANDANA INFRATEK — FOOTER COMPONENT
 * Renders or enhances the luxury architectural footer.
 */
(function(window) {
  'use strict';

  function initFooter() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  window.VandanaFooterComponent = {
    init: initFooter
  };
})(window);
