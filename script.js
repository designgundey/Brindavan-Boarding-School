const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open));menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');nav.classList.toggle('open', open);menu.textContent = open ? 'Close ×' : 'Menu ☰';});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='Menu ☰';}));
document.addEventListener('keydown', e => {if(e.key==='Escape' && nav.classList.contains('open')){menu.click();menu.focus();}});
document.getElementById('year').textContent = new Date().getFullYear();

// Give the persistent navigation a clear, quiet state once the page moves.
const siteHeader = document.querySelector('header');
const updateHeaderState = () => {
  if (siteHeader) siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
};
updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

const countEls = document.querySelectorAll('.count-up');
if (countEls.length) {
  const animateCount = el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => observer.observe(el));
}

const valueCards = document.querySelectorAll('.value-card');
if (valueCards.length) {
  valueCards.forEach(card => card.addEventListener('pointermove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-reveal');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
          setTimeout(() => entry.target.style.removeProperty('--delay'), 1200);
        }
      });
    }, { threshold: 0.2 });
    valueCards.forEach((card, i) => {
      card.style.setProperty('--delay', `${i * 0.12}s`);
      revealObserver.observe(card);
    });
  }
}

document.querySelectorAll('.faq').forEach(faq => {
  const items = faq.querySelectorAll('details');
  items.forEach(item => item.addEventListener('toggle', () => {
    if (!item.open) return;
    items.forEach(other => { if (other !== item) other.open = false; });
  }));
});

const heroSlides =document.querySelectorAll('.hero-visual .slide');
const heroCaption = document.querySelector('.hero-caption');
if (heroSlides.length > 1) {
  let current = 0;
  setInterval(() => {
    heroSlides[current].classList.remove('active');
    current = (current + 1) % heroSlides.length;
    const next = heroSlides[current];
    next.classList.add('active');
    if (heroCaption && next.dataset.line1) {
      heroCaption.innerHTML = `${next.dataset.line1}<br><strong>${next.dataset.line2}</strong>`;
    }
  }, 4000);
}

const prospectusModal = document.getElementById('prospectus-modal');
if (prospectusModal) {
  const openTriggers = document.querySelectorAll('[data-open-prospectus]');
  const closeTriggers = prospectusModal.querySelectorAll('[data-close-prospectus]');
  const form = document.getElementById('prospectus-form');
  const openModal = () => {
    prospectusModal.hidden = false;
    const firstInput = form.querySelector('input');
    if (firstInput) firstInput.focus();
  };
  const closeModal = () => { prospectusModal.hidden = true; };
  openTriggers.forEach(el => el.addEventListener('click', e => { e.preventDefault(); openModal(); }));
  closeTriggers.forEach(el => el.addEventListener('click', closeModal));
  prospectusModal.addEventListener('click', e => { if (e.target === prospectusModal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !prospectusModal.hidden) closeModal(); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.elements.name.value.trim();
    const whatsapp = form.elements.whatsapp.value.trim();
    const message = `Hi, I would like to request the school prospectus.\nName: ${name}\nMy WhatsApp number: ${whatsapp}`;
    // TODO(contact): placeholder. Replace 910000000000 with the school's real WhatsApp number.
    const url = `https://wa.me/910000000000?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
    form.reset();
    closeModal();
  });
}
