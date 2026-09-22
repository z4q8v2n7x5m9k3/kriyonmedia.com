(() => {
  const protectedMedia = 'img, video';
  const isProtected = (target) => target instanceof Element && target.closest(protectedMedia);

  document.addEventListener('contextmenu', (event) => {
    if (isProtected(event.target)) event.preventDefault();
  }, { capture: true });
  document.addEventListener('dragstart', (event) => {
    if (isProtected(event.target)) event.preventDefault();
  }, { capture: true });
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && ['s', 'u'].includes(event.key.toLowerCase())) event.preventDefault();
  });

  const prepare = (node) => {
    if (!(node instanceof Element)) return;
    if (node.matches(protectedMedia)) node.setAttribute('draggable', 'false');
    node.querySelectorAll(protectedMedia).forEach((media) => media.setAttribute('draggable', 'false'));
  };
  prepare(document.documentElement);
  new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach(prepare)))
    .observe(document.documentElement, { childList: true, subtree: true });

  // Clear blocking overlays and ensure pointer interactions are never trapped
  const releaseLoaders = () => {
    document.querySelectorAll('#ki-loader, #ep-loader, .ki-loader, .ep-loader').forEach((el) => {
      el.style.pointerEvents = 'none';
      el.style.visibility = 'hidden';
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    document.body.classList.remove('is-page-exiting', 'is-page-navigating');
    document.body.classList.add('is-entered');
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.pointerEvents = '';
  };

  // Ensure body and document are immediately interactive and free of blocking overlays on pageshow / bfcache restore
  window.addEventListener('pageshow', releaseLoaders);
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(releaseLoaders, 1000);
  });
  window.addEventListener('load', () => {
    setTimeout(releaseLoaders, 800);
  });

  // Global safety watchdog: guarantee that under no circumstance can a loader permanently block interaction
  setTimeout(releaseLoaders, 1400);

  // Smart Video Autoplay & Offscreen Decoder Release
  // Prevents multiple 4K/heavy videos from saturating network connection pools and GPU decoders
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        // Do not touch videos inside dialog/modals
        if (video.closest('dialog') || video.closest('.video-modal') || video.closest('.jewellery-modal')) return;

        if (entry.isIntersecting) {
          if (!video.dataset.userPaused) {
            const p = video.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      });
    }, { threshold: 0.12 });

    const setupVideos = () => {
      document.querySelectorAll('video').forEach((vid) => {
        if (vid.closest('dialog') || vid.closest('.video-modal') || vid.closest('.jewellery-modal')) return;
        if (!vid.dataset.smartObserved) {
          vid.dataset.smartObserved = 'true';
          vid.muted = true;
          vid.defaultMuted = true;
          vid.playsInline = true;
          if (!vid.getAttribute('preload')) vid.setAttribute('preload', 'metadata');
          videoObserver.observe(vid);
        }
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupVideos);
    } else {
      setupVideos();
    }
    window.addEventListener('load', setupVideos);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        document.querySelectorAll('video').forEach((v) => {
          if (!v.paused && !v.closest('dialog')) v.pause();
        });
      } else {
        setupVideos();
      }
    });
  }
})();
