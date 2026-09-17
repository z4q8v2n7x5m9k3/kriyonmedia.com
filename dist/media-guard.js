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
})();
