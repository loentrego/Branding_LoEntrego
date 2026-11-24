// =====================================================================
//  LoEntrego · Etiqueta de envío (10 × 15 cm)
//  Etiqueta.html(datos, 'color' | 'tinta') → HTML de una etiqueta
//  La usan la página para imprimir (etiquetas/index.html) y el manual.
// =====================================================================
window.Etiqueta = (() => {
  'use strict';
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pesos = (n) => '$' + Number(n || 0).toLocaleString('es-CO');
  const celular = (v) => { const d = String(v || '').replace(/\D/g, ''); return d.length === 10 ? `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` : d; };
  const MUNICIPIOS = { bogota: 'Bogotá', funza: 'Funza', soacha: 'Soacha' };

  // Datos de ejemplo (los mismos campos que entrega la API en PedidoDetalle)
  const EJEMPLO = {
    codigo: 'LE-1042',
    fecha: '2026-11-24',
    nombre: 'Andrea Gómez',
    telefono: '3001234567',
    direccion: 'Calle 72 #10-34, apto 501',
    municipio: 'bogota',
    localidad: 'Chapinero',
    zona: 'Chapinero',
    cobro: 45000,
    notas: 'Entregar en portería, preguntar por Sr. Gómez',
    comercio: 'Tienda Central',
    comercio_direccion: 'Calle 80 #15-20, Bogotá',
  };

  function fecha(iso) {
    try { return new Date(iso + 'T12:00:00-05:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return iso; }
  }

  function html(d = EJEMPLO, version = 'color') {
    d = { ...EJEMPLO, ...d };
    const tinta = version === 'tinta';
    const logo = tinta ? 'logo-negro.png' : 'logo-blanco.png';
    const base = (window.ETIQUETA_BASE ?? '');
    const paga = Number(d.cobro) > 0;
    const barras = window.Code128 ? Code128.svg(d.codigo, { alto: 64, modulo: 2, margen: 0 }) : '';
    return `
    <article class="etq etq-${tinta ? 'tinta' : 'color'}" aria-label="Etiqueta de envío ${esc(d.codigo)}">
      <header class="etq-top">
        <img class="etq-logo" src="${base}img/${logo}" alt="LoEntrego" width="1383" height="374">
        <div class="etq-cod"><small>Pedido</small><b>${esc(d.codigo)}</b></div>
      </header>

      <div class="etq-ruta">
        <div><small>Desde</small><b>${esc(d.comercio)}</b><span>${esc(d.comercio_direccion)}</span></div>
        <svg class="etq-flecha" viewBox="0 0 40 12" aria-hidden="true"><path d="M0 6h34M29 1l6 5-6 5"/></svg>
        <div class="etq-zona"><small>Zona</small><b>${esc(d.zona || MUNICIPIOS[d.municipio] || '')}</b><span>${esc(fecha(d.fecha))}</span></div>
      </div>

      <section class="etq-para">
        <small>Para</small>
        <p class="etq-nombre">${esc(d.nombre)}</p>
        <p class="etq-dir">${esc(d.direccion)}</p>
        <p class="etq-lugar">${esc([d.localidad, MUNICIPIOS[d.municipio] || d.municipio].filter(Boolean).join(' · '))}</p>
        <p class="etq-tel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>${esc(celular(d.telefono))}</p>
      </section>

      <div class="etq-cobro ${paga ? 'cobrar' : 'pagado'}">
        <small>${paga ? 'Cobrar al entregar' : 'Pedido pagado'}</small>
        <b>${paga ? pesos(d.cobro) : 'No cobrar'}</b>
      </div>

      ${d.notas ? `<p class="etq-notas"><small>Notas</small>${esc(d.notas)}</p>` : ''}

      <footer class="etq-pie">
        <div class="etq-barras">${barras}<span>${esc(d.codigo)}</span></div>
        <p class="etq-ayuda">¿Dónde va tu pedido? Escríbenos con este código · loentrego.com</p>
      </footer>
    </article>`;
  }

  return { html, EJEMPLO };
})();
