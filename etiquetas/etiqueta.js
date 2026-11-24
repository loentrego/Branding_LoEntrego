// =====================================================================
//  LoEntrego · Etiqueta de envío (10 × 5 cm: ancho × alto)
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
    codigo: 'LOE-0001042',
    fecha: '2026-11-24',
    nombre: 'Andrea Gómez',
    telefono: '3001234567',
    direccion: 'Calle 72 #10-34, apto 501',
    municipio: 'bogota',
    localidad: 'Chapinero',
    zona: 'Chapinero',
    cobro: 45000,
    notas: 'Portería, preguntar por Sr. Gómez',
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
    const base = (window.ETIQUETA_BASE ?? '');
    const paga = Number(d.cobro) > 0;
    const lugar = [d.localidad, MUNICIPIOS[d.municipio] || d.municipio].filter(Boolean).join(' · ');
    // margen 20 = 10 módulos en blanco a cada lado (lo exige Code 128)
    const barras = window.Code128 ? Code128.svg(d.codigo, { alto: 40, modulo: 2, margen: 20 }) : '';
    return `
    <article class="etq etq-${tinta ? 'tinta' : 'color'}" aria-label="Etiqueta de envío ${esc(d.codigo)}">
      <header class="etq-top">
        <img class="etq-logo" src="${base}img/${tinta ? 'logo-negro.png' : 'logo-blanco.png'}" alt="LoEntrego" width="1383" height="374">
        <b class="etq-cod">${esc(d.codigo)}</b>
      </header>
      <div class="etq-cuerpo">
        <section class="etq-para">
          <small>Para</small>
          <p class="etq-nombre">${esc(d.nombre)}</p>
          <p class="etq-dir">${esc(d.direccion)}</p>
          <p class="etq-lugar">${esc(lugar)} · <b>${esc(celular(d.telefono))}</b></p>
          ${d.notas ? `<p class="etq-notas">${esc(d.notas)}</p>` : ''}
        </section>
        <aside class="etq-lado">
          <div class="etq-cobro ${paga ? 'cobrar' : 'pagado'}"><small>${paga ? 'Cobrar' : 'Pagado'}</small><b>${paga ? pesos(d.cobro) : 'No cobrar'}</b></div>
        </aside>
      </div>
      <footer class="etq-pie">
        <span class="perfora" aria-hidden="true"></span>
        <div class="etq-barras">${barras}</div>
      </footer>
    </article>`;
  }

  return { html, EJEMPLO };
})();
