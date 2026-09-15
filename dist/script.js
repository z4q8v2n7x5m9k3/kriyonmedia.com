const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('.service-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.service-item');
    const willOpen = !item.classList.contains('is-open');
    document.querySelectorAll('.service-item').forEach((other) => {
      other.classList.remove('is-open');
      const button = other.querySelector('.service-trigger');
      button.setAttribute('aria-expanded', 'false');
      button.querySelector('i').textContent = '+';
    });
    if (willOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.querySelector('i').textContent = '−';
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelectorAll('.project, .service-rows article, .film-card, .social-grid > *, .about-photo, .about-copy').forEach((element, index) => {
  element.classList.add('will-reveal');
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
  revealObserver.observe(element);
});

const rows = [...document.querySelectorAll('.gallery-viewport')].map((element, index) => {
  const track = element.querySelector('.gallery-track');
  const group = element.querySelector('.gallery-group');
  const clones = [];
  for (let count = 0; count < 2; count += 1) {
    const clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a').forEach((link) => { link.tabIndex = -1; });
    clone.querySelectorAll('img').forEach((image) => { image.loading = 'lazy'; image.alt = ''; });
    track.append(clone);
    clones.push(clone);
  }
  return { element, track, group, clones, index, direction: Number(element.dataset.direction), cycle: 0, offset: 0, target: 0, pointer: null, dragging: false, suppressClickUntil: 0 };
});

let frame = 0;
let lastTime = 0;
let previousY = window.scrollY;
const wrap = (value, length) => ((value % length) + length) % length;
function draw(row) { if (row.cycle) row.track.style.transform = `translate3d(${-wrap(row.offset, row.cycle)}px,0,0)`; }
function tick(time) {
  const dt = Math.min(time - (lastTime || time - 16), 40);
  lastTime = time;
  let moving = false;
  rows.forEach((row) => {
    const distance = row.target - row.offset;
    if (Math.abs(distance) > 0.1 && !reducedMotion.matches) {
      row.offset += distance * (1 - Math.exp(-dt / 145));
      moving = true;
    } else row.offset = row.target;
    draw(row);
  });
  if (moving) frame = requestAnimationFrame(tick);
  else { frame = 0; lastTime = 0; }
}
function requestFrame() { if (!frame) frame = requestAnimationFrame(tick); }
function measure() {
  rows.forEach((row) => {
    const progress = row.cycle ? wrap(row.offset, row.cycle) / row.cycle : [0.06, 0.18, 0.11][row.index];
    row.cycle = row.group.getBoundingClientRect().width;
    row.offset = reducedMotion.matches ? 0 : progress * row.cycle;
    row.target = row.offset;
    draw(row);
  });
}
function applyMotionPreference() {
  rows.forEach((row) => row.clones.forEach((clone) => { clone.hidden = reducedMotion.matches; }));
  previousY = window.scrollY;
  measure();
}
window.addEventListener('scroll', () => {
  const nextY = window.scrollY;
  const delta = nextY - previousY;
  previousY = nextY;
  if (reducedMotion.matches) return;
  rows.forEach((row) => { if (!row.dragging) row.target += delta * row.direction * 0.26; });
  requestFrame();
}, { passive: true });
window.addEventListener('resize', measure, { passive: true });
reducedMotion.addEventListener('change', applyMotionPreference);
rows.forEach((row) => {
  row.element.addEventListener('pointerdown', (event) => {
    if (reducedMotion.matches || event.button !== 0) return;
    row.pointer = { id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX };
  });
  row.element.addEventListener('pointermove', (event) => {
    const pointer = row.pointer;
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    if (!row.dragging) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { row.pointer = null; return; }
      if (Math.abs(dx) < 7 || Math.abs(dx) < Math.abs(dy)) return;
      row.dragging = true;
      row.target = row.offset;
      row.element.setPointerCapture(event.pointerId);
      row.element.classList.add('is-dragging');
    }
    row.target -= event.clientX - pointer.lastX;
    row.offset = row.target;
    pointer.lastX = event.clientX;
    draw(row);
  });
  const stopDrag = () => {
    if (row.dragging) row.suppressClickUntil = performance.now() + 180;
    row.pointer = null;
    row.dragging = false;
    row.element.classList.remove('is-dragging');
  };
  row.element.addEventListener('pointerup', stopDrag);
  row.element.addEventListener('pointercancel', stopDrag);
  row.element.addEventListener('lostpointercapture', stopDrag);
  row.element.addEventListener('click', (event) => {
    if (performance.now() < row.suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
  }, true);
  row.element.addEventListener('dragstart', (event) => event.preventDefault());
  row.element.addEventListener('keydown', (event) => {
    if (reducedMotion.matches || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    row.target += (event.key === 'ArrowRight' ? 1 : -1) * row.element.clientWidth * 0.42;
    requestFrame();
  });
});
document.querySelectorAll('video').forEach((video) => video.addEventListener('play', () => {
  document.querySelectorAll('video').forEach((other) => { if (other !== video) other.pause(); });
}));
applyMotionPreference();
