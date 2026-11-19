/**
 * VANDANA INFRATEK — ADAPTIVE SCROLL ANIMATION ENGINE
 * Seamlessly delivers responsive, hardware-accelerated canvas sequences:
 * - Desktop: 238-frame panoramic sequence (16:9)
 * - Mobile: 300-frame vertical sequence (9:16 portrait)
 */
(function(window) {
  'use strict';

  // Desktop Sequence Configuration (16:9 Landscape)
  const DESKTOP_CONFIG = {
    totalFrames: 238,
    path: './assets/images/scroll-frames',
    prefix: 'ezgif-frame-',
    ext: '.jpg'
  };

  // Mobile Sequence Configuration (9:16 Portrait)
  const MOBILE_CONFIG = {
    totalFrames: 300,
    path: './Make_video_mobile_friendly_de64ee2b_1080p-ezgif-split',
    prefix: 'ezgif-frame-',
    ext: '.jpg'
  };

  let canvas = null;
  let ctx = null;
  let currentConfig = DESKTOP_CONFIG;
  let isMobile = false;

  let images = [];
  let isLoaded = [];
  let currentProgress = 0;
  let targetProgress = 0;
  let lastRenderedFrame = -1;
  let isInitialDrawn = false;
  let animationFrameId = null;
  let loadSessionId = 0;

  function detectIsMobile() {
    return window.innerWidth <= 768;
  }

  function getFramePath(index, config) {
    const padded = String(index).padStart(3, '0');
    return `${config.path}/${config.prefix}${padded}${config.ext}`;
  }

  function setupSequence(force) {
    const mobileDetected = detectIsMobile();
    if (!force && mobileDetected === isMobile && images.length > 0) {
      return; // No mode change needed
    }

    isMobile = mobileDetected;
    currentConfig = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;
    loadSessionId++;

    const total = currentConfig.totalFrames;
    images = new Array(total + 1);
    isLoaded = new Array(total + 1).fill(false);
    lastRenderedFrame = -1;
    isInitialDrawn = false;

    // 1. Immediately load Frame 1 for zero-latency paint
    const currentSession = loadSessionId;
    const firstImg = new Image();
    firstImg.src = getFramePath(1, currentConfig);
    firstImg.onload = function() {
      if (currentSession !== loadSessionId) return;
      images[1] = firstImg;
      isLoaded[1] = true;
      if (!isInitialDrawn) {
        drawFrame(firstImg);
        lastRenderedFrame = 1;
        isInitialDrawn = true;
      }
    };

    // 2. Preload high-priority initial burst (first 25 frames)
    const initialBurst = Math.min(25, total);
    for (let i = 2; i <= initialBurst; i++) {
      (function(idx) {
        const img = new Image();
        img.src = getFramePath(idx, currentConfig);
        img.onload = function() {
          if (currentSession !== loadSessionId) return;
          images[idx] = img;
          isLoaded[idx] = true;
          if (idx === 1 && !isInitialDrawn) {
            drawFrame(img);
            lastRenderedFrame = 1;
            isInitialDrawn = true;
          }
        };
      })(i);
    }

    // 3. Preload remaining frames in progressive background batches
    let currentBatchStart = initialBurst + 1;
    const batchSize = isMobile ? 12 : 20;

    function loadNextBatch() {
      if (currentSession !== loadSessionId || currentBatchStart > total) return;
      const batchEnd = Math.min(currentBatchStart + batchSize - 1, total);

      for (let i = currentBatchStart; i <= batchEnd; i++) {
        (function(idx) {
          const img = new Image();
          img.src = getFramePath(idx, currentConfig);
          img.onload = function() {
            if (currentSession !== loadSessionId) return;
            images[idx] = img;
            isLoaded[idx] = true;
          };
        })(i);
      }

      currentBatchStart = batchEnd + 1;
      if (currentBatchStart <= total) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadNextBatch, { timeout: 800 });
        } else {
          setTimeout(loadNextBatch, 60);
        }
      }
    }

    setTimeout(loadNextBatch, 80);
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for mobile battery efficiency
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Check if device orientation or viewport switch requires sequence swap
    setupSequence(false);

    if (lastRenderedFrame > 0 && isLoaded[lastRenderedFrame]) {
      drawFrame(images[lastRenderedFrame]);
    }
  }

  function drawFrame(img) {
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover scaling: fills entire screen edge-to-edge seamlessly
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const nx = (cw - nw) * 0.5;
    const ny = (ch - nh) * 0.5;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, nx, ny, nw, nh);
  }

  function renderFrameAtProgress(progress) {
    const total = currentConfig.totalFrames;
    const clamped = Math.max(0, Math.min(1, progress));
    const frameIndex = Math.min(
      total,
      Math.max(1, Math.round(clamped * (total - 1)) + 1)
    );

    if (frameIndex === lastRenderedFrame) return;

    if (isLoaded[frameIndex]) {
      drawFrame(images[frameIndex]);
      lastRenderedFrame = frameIndex;
      return;
    }

    // Nearest loaded frame fallback eliminates any flicker or blank flashes
    let closestIndex = -1;
    let minDiff = Infinity;

    for (let i = 1; i <= total; i++) {
      if (isLoaded[i]) {
        const diff = Math.abs(i - frameIndex);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      }
    }

    if (closestIndex !== -1 && closestIndex !== lastRenderedFrame) {
      drawFrame(images[closestIndex]);
      lastRenderedFrame = closestIndex;
    }
  }

  function updateScrollTarget() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    targetProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
  }

  function animationLoop() {
    const delta = targetProgress - currentProgress;
    const lerpFactor = isMobile ? 0.11 : 0.085;

    if (Math.abs(delta) > 0.00005) {
      currentProgress += delta * lerpFactor;
    } else {
      currentProgress = targetProgress;
    }

    renderFrameAtProgress(currentProgress);
    animationFrameId = requestAnimationFrame(animationLoop);
  }

  let isInitialized = false;

  function init() {
    if (isInitialized) return;
    isInitialized = true;

    canvas = document.getElementById('canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    setupSequence(true);
    resizeCanvas();
    updateScrollTarget();

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('orientationchange', function() {
      setTimeout(resizeCanvas, 150);
    }, { passive: true });

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(animationLoop);
  }

  window.VandanaScrollAnimation = {
    init: init,
    resize: resizeCanvas,
    updateScroll: updateScrollTarget,
    isMobileMode: function() { return isMobile; },
    getCurrentFrame: function() { return lastRenderedFrame; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
