document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // Størrelsesvælger: viser anbefalet niveau og fremhæver det matchende kort
  const buttons = document.querySelectorAll('.size-buttons button');
  const recs = document.querySelectorAll('.rec');
  const tiers = document.querySelectorAll('.tier');

  function select(size) {
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === size)));
    recs.forEach(r => { r.hidden = r.dataset.rec !== size; });
    tiers.forEach(t => {
      const on = t.dataset.tier === size;
      t.classList.toggle('is-active', on);
      t.querySelector('.badge').hidden = !on;
    });
  }

  buttons.forEach(b => b.addEventListener('click', () => select(b.dataset.size)));

  // Mobilmenu
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('hovedmenu');
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
