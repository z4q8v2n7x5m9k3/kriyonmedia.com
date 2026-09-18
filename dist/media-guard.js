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

  // Subtle, sharp, fast smooth page navigation transition
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('is-page-exiting');
  });

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a');
    if (!anchor) return;
    if (event.defaultPrevented) return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (anchor.target && anchor.target !== '_self') return;
    if (anchor.hasAttribute('download')) return;

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || href.startsWith('https://wa.me')) return;

    try {
      const targetUrl = new URL(anchor.href, window.location.href);
      if (targetUrl.origin !== window.location.origin) return;
      if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search && targetUrl.hash) return;

      event.preventDefault();
      document.body.classList.add('is-page-exiting');
      setTimeout(() => {
        window.location.href = targetUrl.href;
      }, 130);
    } catch (e) {
      // Fallback to standard navigation
    }
  });
})();
