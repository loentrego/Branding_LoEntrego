// Manual de marca LoEntrego: copiar colores e índice activo
(() => {
  'use strict';
  const toast = document.getElementById('copied');
  let t;
  document.addEventListener('click', async (e) => {
    const sw = e.target.closest('.sw');
    if (!sw) return;
    const hex = sw.dataset.hex;
    try { await navigator.clipboard.writeText(hex); toast.textContent = `${hex} copiado`; }
    catch { toast.textContent = hex; }
    toast.dataset.show = '';
    clearTimeout(t);
    t = setTimeout(() => delete toast.dataset.show, 1600);
  });

  // Resalta en el índice la sección que se está leyendo
  const links = [...document.querySelectorAll('.toc a')];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('.sec').forEach((s) => io.observe(s));
})();
