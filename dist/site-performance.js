(() => {
  const prefetched = new Set();
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const constrained = Boolean(connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || '')));

  function prefetch(url) {
    if (constrained) return;
    let target;
    try { target = new URL(url, location.href); } catch (_) { return; }
    if (target.origin !== location.origin || target.pathname === location.pathname || prefetched.has(target.href)) return;
    prefetched.add(target.href);
    const hint = document.createElement('link');
    hint.rel = 'prefetch';
    hint.as = 'document';
    hint.href = target.href;
    document.head.appendChild(hint);
  }

  function intent(event) {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    prefetch(link.href);
  }

  document.addEventListener('pointerover', intent, { passive: true, capture: true });
  document.addEventListener('touchstart', intent, { passive: true, capture: true });
  document.addEventListener('focusin', intent, { passive: true, capture: true });

  const warmPrimaryRoutes = () => {
    ['/work/', '/ai-content-model-licensing/', '/pricing/', '/contact/'].forEach(prefetch);
  };
  if ('requestIdleCallback' in window) requestIdleCallback(warmPrimaryRoutes, { timeout: 2500 });
  else window.addEventListener('load', () => setTimeout(warmPrimaryRoutes, 900), { once: true });
})();
