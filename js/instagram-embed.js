/**
 * VANDANA INFRATEK — INSTAGRAM EMBED & REELS CONTROLLER
 * Loads the official Instagram embed engine only once and drives the horizontal reel carousel.
 */
(function(window) {
  'use strict';

  let isEmbedScriptLoaded = false;

  /**
   * Safely loads the official Instagram embed script only once
   */
  function loadInstagramScript() {
    if (window.instgrm) {
      try {
        window.instgrm.Widgets.load();
      } catch (err) {
        console.warn('Instagram widget reload error:', err);
      }
      return;
    }

    if (isEmbedScriptLoaded) return;

    const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://www.instagram.com/embed.js';
      script.onload = function() {
        isEmbedScriptLoaded = true;
        if (window.instgrm) {
          window.instgrm.Widgets.load();
        }
      };
      document.body.appendChild(script);
    } else {
      isEmbedScriptLoaded = true;
    }
  }

  /**
   * Initializes horizontal carousel navigation and drag interactions
   */
  function initCarousel() {
    const reelsTrack = document.getElementById('reelsTrack');
    const reelPrev = document.getElementById('reelPrev');
    const reelNext = document.getElementById('reelNext');

    if (!reelsTrack) return;

    const CARD_SCROLL_WIDTH = 302; // Card 280px + 22px gap

    if (reelNext) {
      reelNext.addEventListener('click', function() {
        reelsTrack.scrollBy({ left: CARD_SCROLL_WIDTH, behavior: 'smooth' });
      });
    }

    if (reelPrev) {
      reelPrev.addEventListener('click', function() {
        reelsTrack.scrollBy({ left: -CARD_SCROLL_WIDTH, behavior: 'smooth' });
      });
    }

    // Mouse Drag-to-Scroll for desktop
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    reelsTrack.addEventListener('mousedown', function(e) {
      isDown = true;
      reelsTrack.style.cursor = 'grabbing';
      startX = e.pageX - reelsTrack.offsetLeft;
      scrollLeft = reelsTrack.scrollLeft;
    });

    window.addEventListener('mouseup', function() {
      if (isDown) {
        isDown = false;
        reelsTrack.style.cursor = 'default';
      }
    });

    reelsTrack.addEventListener('mouseleave', function() {
      isDown = false;
      reelsTrack.style.cursor = 'default';
    });

    reelsTrack.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - reelsTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      reelsTrack.scrollLeft = scrollLeft - walk;
    });
  }

  /**
   * Fetches data/instagram-reels.json when on HTTP/HTTPS
   */
  function fetchReelsData(callback) {
    if (window.location.protocol.startsWith('http')) {
      fetch('data/instagram-reels.json')
        .then(function(res) {
          if (res.ok) return res.json();
          throw new Error('Failed to load instagram-reels.json');
        })
        .then(function(data) {
          if (typeof callback === 'function') callback(data);
        })
        .catch(function(err) {
          console.info('Using static HTML reels:', err.message);
        });
    }
  }

  let isInstaInitialized = false;

  function init() {
    if (isInstaInitialized) return;
    isInstaInitialized = true;

    loadInstagramScript();
    initCarousel();
    fetchReelsData();
  }

  window.VandanaInstagram = {
    init: init,
    loadScript: loadInstagramScript,
    fetchData: fetchReelsData
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
