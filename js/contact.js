/**
 * VANDANA INFRATEK — INQUIRY & CONTACT FORM CONTROLLER
 * Form validation, dynamic status notifications, and submission simulation.
 */
(function(window) {
  'use strict';

  function initContactForm() {
    const form = document.getElementById('inquiryForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const emailInput = document.getElementById('clientEmail');
      const scopeSelect = document.getElementById('projectType');
      const detailsInput = document.getElementById('projectDetails');
      const submitBtn = form.querySelector('.form-submit-btn');

      if (!nameInput.value.trim() || !emailInput.value.trim()) {
        alert('Please provide your name and a valid email address.');
        return;
      }

      const originalBtnText = submitBtn ? submitBtn.innerText : 'Transmit Inquiry';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Transmitting...';
      }

      setTimeout(function() {
        alert(`Thank you, ${nameInput.value.trim()}. Your inquiry regarding ${scopeSelect.value} has been received. Our architectural principal will contact you within 24 hours.`);
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
        }
      }, 700);
    });
  }

  window.VandanaContact = {
    init: initContactForm
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})(window);
