const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open));menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');nav.classList.toggle('open', open);menu.textContent = open ? 'Close ×' : 'Menu ☰';});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='Menu ☰';}));
document.addEventListener('keydown', e => {if(e.key==='Escape' && nav.classList.contains('open')){menu.click();menu.focus();}});
document.getElementById('year').textContent = new Date().getFullYear();

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

const heroSlides = document.querySelectorAll('.hero-visual .slide');
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
