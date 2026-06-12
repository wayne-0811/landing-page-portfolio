/* ===== Walles — interactions ===== */

// --- Property data: preview + galleries ---
const INTERIORS = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1400&q=80',
];

const PROPERTIES = [
  { name: 'Apartment Marais', loc: 'Paris, 3rd Arr.', price: '€2,190,000', main: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80' },
  { name: 'Casa Mikonos', loc: 'Mykonos, Greece', price: '€5,700,000', main: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80' },
  { name: 'Townhouse Chiado', loc: 'Lisbon, Portugal', price: '€1,850,000', main: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80' },
  { name: 'Quinta da Luz', loc: 'Sintra, Portugal', price: '€3,400,000', main: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80' },
  { name: 'Penthouse Stampa', loc: 'Milan, Italy', price: '€4,200,000', main: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80' },
  { name: 'Loft Trastevere', loc: 'Rome, Italy', price: '€1,380,000', main: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=80' },
  { name: 'Casa del Mar', loc: 'Costa Brava, Spain', price: '€8,400,000', main: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80' },
];

// Build a 5-image gallery for each property: its hero shot + four rotating interiors
PROPERTIES.forEach((p, i) => {
  p.gallery = [p.main, INTERIORS[i % 6], INTERIORS[(i + 1) % 6], INTERIORS[(i + 2) % 6], INTERIORS[(i + 3) % 6]];
});

// =========================================================
//  Booking preview + multi-step flow
// =========================================================
const select = document.getElementById('property-select');
const dateInput = document.getElementById('pref-date');
const timeSelect = document.getElementById('pref-time');
const pImg = document.getElementById('preview-img');
const pName = document.getElementById('preview-name');
const pLoc = document.getElementById('preview-loc');
const pPrice = document.getElementById('preview-price');
const pWhen = document.getElementById('preview-when');

function updatePreview() {
  const p = PROPERTIES[parseInt(select.value, 10)] || PROPERTIES[0];
  pImg.style.opacity = '0';
  setTimeout(() => { pImg.src = p.main; pImg.style.opacity = '1'; }, 180);
  pName.textContent = p.name;
  pLoc.textContent = p.loc;
  pPrice.textContent = p.price;
}
function updateWhen() {
  const d = dateInput.value, t = timeSelect.value;
  if (d) {
    const date = new Date(d + 'T00:00:00');
    const fmt = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    pWhen.textContent = t ? `${fmt} · ${t.split(' ')[0]}` : fmt;
  } else {
    pWhen.textContent = 'Select a date & time';
  }
}
if (select) select.addEventListener('change', updatePreview);
if (dateInput) { dateInput.addEventListener('change', updateWhen); dateInput.min = new Date().toISOString().split('T')[0]; }
if (timeSelect) timeSelect.addEventListener('change', updateWhen);

// --- Step navigation ---
const panels = document.querySelectorAll('.booking-panel');
const stepTabs = document.querySelectorAll('.bstep');
let currentStep = 1;

function showStep(n) {
  currentStep = n;
  panels.forEach((p) => p.classList.toggle('is-active', +p.dataset.panel === n));
  stepTabs.forEach((t) => {
    const s = +t.dataset.go;
    t.classList.toggle('is-active', s === n);
    t.classList.toggle('is-done', s < n);
  });
}
function validateStep(n) {
  if (n === 2) {
    const ok = dateInput.value && timeSelect.value;
    document.getElementById('error-2').classList.toggle('show', !ok);
    return ok;
  }
  if (n === 3) {
    const first = document.getElementById('f-first').value.trim();
    const last = document.getElementById('f-last').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const ok = first && last && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    document.getElementById('error-3').classList.toggle('show', !ok);
    return ok;
  }
  return true;
}

document.querySelectorAll('.step-next').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (validateStep(currentStep)) showStep(+btn.dataset.next);
  });
});
document.querySelectorAll('.step-back').forEach((btn) => {
  btn.addEventListener('click', () => showStep(+btn.dataset.back));
});
stepTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = +tab.dataset.go;
    if (target < currentStep) showStep(target);            // back is always allowed
    else if (target > currentStep && validateStep(currentStep)) showStep(target);
  });
});

// Jump straight to booking on a chosen property (from cards / lightbox)
function bookProperty(index) {
  select.value = String(index);
  updatePreview();
  showStep(1);
  document.getElementById('booking-form').style.display = '';
  document.getElementById('booking-confirm').style.display = 'none';
  document.getElementById('booking-steps').style.display = '';
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}
document.querySelectorAll('[data-book]').forEach((el) => {
  el.addEventListener('click', (e) => { e.stopPropagation(); bookProperty(+el.dataset.book); });
});

// --- Final submit ---
const form = document.getElementById('booking-form');
const confirm = document.getElementById('booking-confirm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    const p = PROPERTIES[parseInt(select.value, 10)] || PROPERTIES[0];
    const when = pWhen.textContent !== 'Select a date & time' ? ` for ${pWhen.textContent}` : '';
    document.getElementById('confirm-text').textContent =
      `Thank you — your request to view ${p.name}${when} is in. We'll confirm within four hours. For anything urgent, call the office for your city below.`;
    form.style.display = 'none';
    document.getElementById('booking-steps').style.display = 'none';
    confirm.style.display = 'block';
    confirm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// =========================================================
//  Lightbox gallery
// =========================================================
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbName = document.getElementById('lb-name');
const lbLoc = document.getElementById('lb-loc');
const lbCounter = document.getElementById('lb-counter');
const lbThumbs = document.getElementById('lb-thumbs');
const lbBook = document.getElementById('lb-book');
let lbIndex = 0, lbProp = 0;

function openGallery(propIndex) {
  lbProp = propIndex;
  lbIndex = 0;
  const p = PROPERTIES[propIndex];
  lbName.textContent = p.name;
  lbLoc.textContent = p.loc;
  lbThumbs.innerHTML = '';
  p.gallery.forEach((src, i) => {
    const t = document.createElement('img');
    t.src = src; t.className = 'lb-thumb'; t.alt = `${p.name} photo ${i + 1}`;
    t.addEventListener('click', () => setGalleryImage(i));
    lbThumbs.appendChild(t);
  });
  setGalleryImage(0);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lb-open');
}
function setGalleryImage(i) {
  const p = PROPERTIES[lbProp];
  lbIndex = (i + p.gallery.length) % p.gallery.length;
  lbImg.classList.add('fading');
  setTimeout(() => { lbImg.src = p.gallery[lbIndex]; lbImg.classList.remove('fading'); }, 160);
  lbCounter.textContent = `${lbIndex + 1} / ${p.gallery.length}`;
  [...lbThumbs.children].forEach((t, idx) => t.classList.toggle('is-active', idx === lbIndex));
}
function closeGallery() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lb-open');
}

document.querySelectorAll('[data-gallery]').forEach((el) => {
  el.addEventListener('click', () => openGallery(+el.dataset.gallery));
});
document.getElementById('lb-close').addEventListener('click', closeGallery);
document.getElementById('lb-prev').addEventListener('click', () => setGalleryImage(lbIndex - 1));
document.getElementById('lb-next').addEventListener('click', () => setGalleryImage(lbIndex + 1));
lbBook.addEventListener('click', () => { closeGallery(); bookProperty(lbProp); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeGallery(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowLeft') setGalleryImage(lbIndex - 1);
  if (e.key === 'ArrowRight') setGalleryImage(lbIndex + 1);
});

// =========================================================
//  Listing filters
// =========================================================
const chips = document.querySelectorAll('.filter-chip');
const cards = document.querySelectorAll('.listing-card');
const emptyMsg = document.getElementById('listings-empty');
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const filter = chip.dataset.filter;
    let visible = 0;
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.type === filter;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    emptyMsg.style.display = visible === 0 ? 'block' : 'none';
  });
});

// =========================================================
//  FAQ accordion
// =========================================================
document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((o) => o.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// =========================================================
//  Animated stat counters
// =========================================================
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
  const numEl = el.querySelector('.stat-num');
  const duration = 1600, start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    numEl.textContent = prefix + Math.round(target * eased).toLocaleString('en-US') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// =========================================================
//  Reveal on scroll + counter trigger
// =========================================================
const revealTargets = document.querySelectorAll(
  '.listing-card, .process-step, .agent-card, .testimonial, .booking-left, .booking-right, .featured-media, .featured-body'
);
revealTargets.forEach((el) => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
revealTargets.forEach((el) => revealObserver.observe(el));

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { animateCount(entry.target); statObserver.unobserve(entry.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat').forEach((s) => statObserver.observe(s));

// --- Nav background on scroll ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });
