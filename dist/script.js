// Supplied reference imagery is only for this explicitly labelled layout preview.
// Replace reference crops with approved Kriyon project assets before public launch.
const reference = '/assets/portfolio-reference.png';
const sourceWidth = 2998;
const shots = {
  portrait: { x: 0, y: 240, width: 535, height: 952, label: 'Beauty / Portrait', alt: 'Reference beauty portrait of a model with a black bob haircut' },
  jewellery: { x: 550, y: 240, width: 900, height: 952, label: 'Jewellery / Campaign', alt: 'Reference jewellery photograph of a pendant worn down a model’s back' },
  detail: { x: 2010, y: 242, width: 965, height: 950, label: 'Jewellery / Detail', alt: 'Reference editorial close-up featuring silver jewellery and dark lipstick' },
  lifestyle: { x: 1141, y: 1230, width: 839, height: 850, label: 'Fashion / Lifestyle', alt: 'Reference fashion photograph of an adult model in blue striped shorts' },
  product: { x: 255, y: 1435, width: 880, height: 645, label: 'Product / Still life', alt: 'Reference product photograph of blue striped shorts' },
  denim: { x: 2017, y: 1230, width: 956, height: 850, label: 'Fashion / Editorial', alt: 'Reference editorial photograph of an adult model wearing denim' },
};
const sequences = [
  ['portrait', 'jewellery', 'detail', 'denim', 'jewellery'],
  ['denim', 'lifestyle', 'product', 'denim', 'lifestyle'],
  ['detail', 'portrait', 'denim', 'jewellery', 'detail'],
];
sequences.forEach((sequence, rowIndex) => {
  const track = document.querySelector(`#gallery-row-${rowIndex + 1}`);
  sequence.forEach((key, index) => {
    const shot = shots[key];
    const figure = document.createElement('figure');
    figure.className = 'shot';
    figure.style.setProperty('--ratio', shot.width / shot.height);
    const crop = document.createElement('div');
    crop.className = 'reference-crop';
    const image = document.createElement('img');
    image.src = reference;
    image.alt = shot.alt;
    image.width = 2998;
    image.height = 2100;
    image.decoding = 'async';
    image.loading = rowIndex === 0 ? 'eager' : 'lazy';
    image.draggable = false;
    image.style.width = `${sourceWidth / shot.width * 100}%`;
    image.style.left = `${-shot.x / shot.width * 100}%`;
    image.style.top = `${-shot.y / shot.height * 100}%`;
    crop.append(image);
    const caption = document.createElement('figcaption');
    const label = document.createElement('span');
    label.textContent = shot.label;
    caption.className = 'sr-only';
    caption.append(label);
    figure.append(crop, caption);
    track.append(figure);
  });
});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const rows = [...document.querySelectorAll('.gallery-viewport')].map(element => ({ element, direction: Number(element.dataset.direction), manual: false }));
let frameRequested = false;
function updateGallery() {
  frameRequested = false;
  if (reducedMotion.matches) return;
  const viewportHeight = window.innerHeight;
  const measurements = rows.map(row => ({ ...row, bounds: row.element.getBoundingClientRect(), overflow: row.element.scrollWidth - row.element.clientWidth }));
  measurements.forEach(({ element, direction, manual, bounds, overflow }) => {
    if (manual || overflow <= 0 || bounds.bottom < 0 || bounds.top > viewportHeight + 200) return;
    const progress = Math.max(0, Math.min(1, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)));
    const travel = Math.min(overflow, window.innerWidth * 0.65);
    element.scrollLeft = overflow / 2 + direction * (progress - 0.5) * travel;
  });
}
function requestUpdate() {
  if (!frameRequested) { frameRequested = true; window.requestAnimationFrame(updateGallery); }
}
rows.forEach(row => {
  // Direct interaction hands control to the visitor for the rest of this visit.
  row.element.addEventListener('pointerdown', () => { row.manual = true; }, { passive: true });
  row.element.addEventListener('wheel', event => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) row.manual = true;
  }, { passive: true });
  row.element.addEventListener('keydown', event => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      row.manual = true;
      event.preventDefault();
      const maximum = row.element.scrollWidth - row.element.clientWidth;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? maximum : row.element.scrollLeft + (event.key === 'ArrowRight' ? 1 : -1) * row.element.clientWidth * 0.7;
      row.element.scrollTo({ left: next, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  });
});
window.addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('resize', requestUpdate, { passive: true });
window.addEventListener('load', requestUpdate, { once: true });
reducedMotion.addEventListener('change', requestUpdate);
requestUpdate();
