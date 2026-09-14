const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open));menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');nav.classList.toggle('open', open);menu.textContent = open ? 'Close ×' : 'Menu ☰';});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='Menu ☰';}));
document.addEventListener('keydown', e => {if(e.key==='Escape' && nav.classList.contains('open')){menu.click();menu.focus();}});
document.getElementById('year').textContent = new Date().getFullYear();
