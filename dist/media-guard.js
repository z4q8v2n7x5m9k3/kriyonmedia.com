(() => {
  // 1. Right-click and drag protection
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

  // 2. Clear blocking overlays and ensure pointer interactions are never trapped
  const releaseLoaders = () => {
    const homeLoader = document.getElementById('ki-loader');
    if (homeLoader && !homeLoader.classList.contains('is-exiting') && performance.now() < 3800) return;
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

  window.addEventListener('pageshow', releaseLoaders);
  window.addEventListener('DOMContentLoaded', () => { setTimeout(releaseLoaders, 1000); });
  window.addEventListener('load', () => { setTimeout(releaseLoaders, 800); });
  setTimeout(releaseLoaders, 4200);

  // 3. High-End Editorial Image Loading & Resolution System
  const initImageLoading = () => {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (img.dataset.kmLoadingSetup) return;
      img.dataset.kmLoadingSetup = 'true';

      const container = img.closest('.ki-work-thumb, .kp-card-media, .ep-frame, .ki-inquiry-visual, .studio-wall figure') || img.parentElement;
      if (!container) return;

      container.classList.add('ki-media-box');

      // Create wait notice ("GOOD THINGS TAKE TIME.") if not already present
      let waitNotice = container.querySelector('.ki-media-wait-notice, .kp-loading-badge');
      if (!waitNotice) {
        waitNotice = document.createElement('div');
        waitNotice.className = 'ki-media-wait-notice';
        waitNotice.setAttribute('aria-hidden', 'true');
        waitNotice.innerHTML = `
          <span class="ki-media-wait-text">GOOD THINGS TAKE TIME.</span>
          <div class="ki-media-wait-line"></div>
        `;
        container.appendChild(waitNotice);
      } else {
        if (!waitNotice.querySelector('.ki-media-wait-line')) {
          waitNotice.className = 'ki-media-wait-notice';
          waitNotice.innerHTML = `
            <span class="ki-media-wait-text">GOOD THINGS TAKE TIME.</span>
            <div class="ki-media-wait-line"></div>
          `;
        }
      }

      // Create error notice for retry
      let errorNotice = container.querySelector('.ki-media-error-notice');
      if (!errorNotice) {
        errorNotice = document.createElement('div');
        errorNotice.className = 'ki-media-error-notice';
        errorNotice.setAttribute('aria-hidden', 'true');
        errorNotice.innerHTML = `
          <span class="ki-media-error-text">COULD NOT LOAD</span>
          <button class="ki-media-retry-btn" type="button">RETRY ↺</button>
        `;
        container.appendChild(errorNotice);

        const retryBtn = errorNotice.querySelector('.ki-media-retry-btn');
        if (retryBtn) {
          retryBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            errorNotice.classList.remove('is-visible');
            waitTimer = setTimeout(() => {
              if (!img.complete || img.naturalWidth === 0) waitNotice.classList.add('is-visible');
            }, 1000);
            const src = img.dataset.origSrc || img.src;
            img.src = src.split('?')[0] + '?retry=' + Date.now();
          });
        }
      }

      let waitTimer = null;

      const revealImage = () => {
        if (waitTimer) clearTimeout(waitTimer);
        waitNotice.classList.remove('is-visible');
        errorNotice.classList.remove('is-visible');

        const completeReveal = () => {
          container.classList.add('is-loaded');
          img.classList.add('is-revealed');
          img.classList.remove('is-media-loading');
        };

        if (typeof img.decode === 'function') {
          img.decode().then(completeReveal).catch(completeReveal);
        } else {
          completeReveal();
        }
      };

      const handleFail = () => {
        if (waitTimer) clearTimeout(waitTimer);
        waitNotice.classList.remove('is-visible');
        errorNotice.classList.add('is-visible');

        // Automatic 1-time background retry
        if (!img.dataset.hasRetried) {
          img.dataset.hasRetried = 'true';
          setTimeout(() => {
            if (!img.complete || img.naturalWidth === 0) {
              const src = img.dataset.origSrc || img.src;
              img.dataset.origSrc = src;
              img.src = src.split('?')[0] + '?retry=' + Date.now();
            }
          }, 1500);
        }
      };

      if (img.complete && img.naturalWidth > 0) {
        revealImage();
      } else {
        img.classList.add('is-media-loading');
        // Only softly reveal "GOOD THINGS TAKE TIME." if loading takes > 1000ms
        waitTimer = setTimeout(() => {
          if (!img.complete || img.naturalWidth === 0) {
            waitNotice.classList.add('is-visible');
          }
        }, 1000);

        img.addEventListener('load', revealImage, { once: true });
        img.addEventListener('error', handleFail, { once: true });
      }
    });
  };

  // 4. Bespoke Center Circular Video Controls & Motion Identification
  const initVideoControls = () => {
    const videos = document.querySelectorAll('video');
    videos.forEach((vid) => {
      // Exclude dialog / modal popups
      if (vid.closest('dialog') || vid.closest('.video-modal') || vid.closest('.jewellery-modal') || vid.closest('.ki-service-image-stack')) return;
      if (vid.dataset.kmVideoSetup) return;
      vid.dataset.kmVideoSetup = 'true';

      const container = vid.closest('.ep-frame-video, .jewellery-film-card, .boutique-film') || vid.parentElement;
      if (!container) return;

      container.classList.add('ki-video-box');
      vid.removeAttribute('controls');

      // Create center control
      let centerCtrl = container.querySelector('.ki-video-center-ctrl');
      if (!centerCtrl) {
        centerCtrl = document.createElement('button');
        centerCtrl.type = 'button';
        centerCtrl.className = 'ki-video-center-ctrl';
        centerCtrl.setAttribute('aria-label', 'Toggle video playback');
        centerCtrl.innerHTML = `
          <div class="ki-video-icon ki-icon-play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"></polygon></svg>
          </div>
          <div class="ki-video-icon ki-icon-pause" aria-hidden="true">
            <svg viewBox="0 0 24 24"><rect x="6" y="5" width="3.8" height="14" rx="1"></rect><rect x="14.2" y="5" width="3.8" height="14" rx="1"></rect></svg>
          </div>
          <div class="ki-video-spinner" aria-hidden="true"></div>
        `;
        container.appendChild(centerCtrl);
      }

      let fadeTimeout = null;
      const setPlayingUI = () => {
        container.classList.remove('is-paused', 'is-buffering');
        container.classList.add('is-playing', 'is-loaded');
        vid.classList.add('is-revealed');

        if (fadeTimeout) clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(() => {
          if (!vid.paused) {
            centerCtrl.classList.add('is-hidden');
          }
        }, 1300);
      };

      const setPausedUI = () => {
        container.classList.remove('is-playing', 'is-buffering');
        container.classList.add('is-paused', 'is-loaded');
        vid.classList.add('is-revealed');
        centerCtrl.classList.remove('is-hidden');
        if (fadeTimeout) clearTimeout(fadeTimeout);
      };

      const setBufferingUI = () => {
        container.classList.add('is-buffering');
        centerCtrl.classList.remove('is-hidden');
      };

      const clearBufferingUI = () => {
        container.classList.remove('is-buffering');
      };

      vid.addEventListener('play', setPlayingUI);
      vid.addEventListener('playing', () => {
        clearBufferingUI();
        setPlayingUI();
      });
      vid.addEventListener('pause', setPausedUI);
      vid.addEventListener('waiting', setBufferingUI);
      vid.addEventListener('stalled', setBufferingUI);
      vid.addEventListener('canplay', () => {
        clearBufferingUI();
        container.classList.add('is-loaded');
        vid.classList.add('is-revealed');
      });

      if (vid.paused) setPausedUI();
      else setPlayingUI();

      // Click / touch toggle on center control
      centerCtrl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isKhet = vid.closest('.khet-combo-left') || window.location.pathname.includes('/khet') || document.body.classList.contains('khet-page');
        if (isKhet && vid.muted) {
          vid.muted = false;
          vid.volume = 1.0;
          vid.dispatchEvent(new Event('volumechange'));
          vid.dataset.userPaused = '';
          const p = vid.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
          return;
        }

        if (vid.paused) {
          vid.dataset.userPaused = '';
          const p = vid.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          vid.pause();
          vid.dataset.userPaused = 'true';
        }
      });

      // Show control on hover/touch
      container.addEventListener('mouseenter', () => {
        centerCtrl.classList.remove('is-hidden');
      });
      container.addEventListener('mouseleave', () => {
        if (!vid.paused) centerCtrl.classList.add('is-hidden');
      });
      container.addEventListener('touchstart', () => {
        centerCtrl.classList.remove('is-hidden');
        if (fadeTimeout) clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(() => {
          if (!vid.paused) centerCtrl.classList.add('is-hidden');
        }, 2500);
      }, { passive: true });
    });
  };

  // 5. Smart In-View Video Autoplay (Pause offscreen)
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
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

    const observeVideos = () => {
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

    const runAll = () => {
      initImageLoading();
      initVideoControls();
      observeVideos();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runAll);
    } else {
      runAll();
    }
    window.addEventListener('load', runAll);

    // Observer for dynamically injected media
    new MutationObserver(() => {
      runAll();
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
