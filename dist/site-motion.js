/* Quiet, one-time rise-on-scroll for editorial content across the site. */
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;

  const reveal = (element, observer) => {
    element.classList.add('site-motion-in');
    observer?.unobserve(element);
    window.setTimeout(() => {
      element.classList.remove('site-motion-pending', 'site-motion-in');
      element.style.removeProperty('--site-motion-delay');
    }, 850);
  };

  const start = () => {
    const body = document.body;
    let selector;
    if (body.classList.contains('kriyon-index')) {
      selector = '.ki-work-card, .ki-service-row, .ki-frames-head';
    } else if (body.classList.contains('kriyon-project-index')) {
      selector = '.kp-intro, .kp-card';
    } else if (body.classList.contains('ep-page')) {
      selector = '.ep-container > section:not(.ep-gallery), .ep-gallery > *';
    } else {
      selector = 'main > section, .pricing-main section';
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target, observer);
      }
    }, { threshold: 0.02, rootMargin: '0px 0px -5% 0px' });

    const elements = [...new Set(document.querySelectorAll(selector))];
    elements.forEach((element, index) => {
      if (element.closest('[hidden]') || getComputedStyle(element).display === 'none') return;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top < window.innerHeight * 0.95) {
        // The first viewport is handled by each page's existing entrance.
        return;
      }
      element.classList.add('site-motion-pending');
      element.style.setProperty('--site-motion-delay', `${Math.min(index % 3, 2) * 55}ms`);
      observer.observe(element);
    });

    preference.addEventListener('change', () => {
      if (!preference.matches) return;
      observer.disconnect();
      document.querySelectorAll('.site-motion-pending').forEach((element) => reveal(element));
    }, { once: true });

    // Restore content immediately when returning from the browser's page cache.
    window.addEventListener('pageshow', (event) => {
      if (!event.persisted) return;
      observer.disconnect();
      document.querySelectorAll('.site-motion-pending').forEach((element) => reveal(element));
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
