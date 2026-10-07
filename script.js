document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // Hero-indgang: starter når fonte er klar, så linjerne ikke hopper
  const ready = () => requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(ready);
  setTimeout(ready, 1200);

  // Størrelsesvælger: viser anbefalet niveau, fylder måleren og fremhæver det matchende kort
  const buttons = document.querySelectorAll('.size-buttons button');
  const recs = document.querySelectorAll('.rec');
  const tiers = document.querySelectorAll('.tier');
  const meter = document.querySelector('.meter-fill');
  const meterWidth = { a: '9%', b: '50%', c: '100%' };

  function select(size) {
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === size)));
    recs.forEach(r => { r.hidden = r.dataset.rec !== size; });
    tiers.forEach(t => {
      const on = t.dataset.tier === size;
      t.classList.toggle('is-active', on);
      t.querySelector('.badge').hidden = !on;
    });
    meter.style.setProperty('--meter', meterWidth[size]);
    meter.classList.toggle('is-flex', size === 'c');
  }

  buttons.forEach(b => b.addEventListener('click', () => select(b.dataset.size)));

  // Hjertelinjen i kontaktsektionen tegnes én gang, når den kommer i syne
  const heart = document.querySelector('.cta-heart');
  if (!heart) {
    // ingen hjertelinje på siden
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { heart.classList.add('is-drawn'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(heart);
  } else {
    heart.classList.add('is-drawn');
  }

  // Sprogvælger: husker valget i en cookie, som omdirigeringen på Vercel respekterer
  const langToggle = document.querySelector('.lang-toggle');
  const langMenu = document.querySelector('.lang-menu');
  const setLang = open => {
    langMenu.hidden = !open;
    langToggle.setAttribute('aria-expanded', String(open));
  };
  langToggle.addEventListener('click', () => setLang(langMenu.hidden));
  document.addEventListener('click', e => { if (!e.target.closest('.lang')) setLang(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !langMenu.hidden) { setLang(false); langToggle.focus(); }
  });
  langMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    document.cookie = `lang=${a.dataset.lang}; path=/; max-age=31536000; samesite=lax`;
  }));

  // Mobilmenu
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
