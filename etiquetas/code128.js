// =====================================================================
//  Code 128 (juego B) en SVG — sin librerías
//  Lo leen las pistolas y las cámaras de celular. Se usa para el código
//  del pedido (LOE-0001042) en las etiquetas de envío.
//  Uso: Code128.svg('LOE-0001042', { alto: 60, modulo: 2 })
// =====================================================================
window.Code128 = (() => {
  'use strict';
  // Anchos barra/espacio de cada símbolo (0..105) y el de parada
  const P = ('212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 221312 231212 112232 122132 122231 113222 123122 123221 223211 221132 221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 231113 231311 112133 112331 132131 113123 113321 133121 313121 211331 231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 314111 221411 431111 111224 111422 121124 121421 141122 141221 112214 112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 111242 121142 121241 114212 124112 124211 411212 421112 421211 212141 214121 412121 111143 111341 131141 114113 114311 411113 411311 113141 114131 311141 411131 211412 211214 211232').split(' ');
  const PARADA = '2331112';
  const INICIO_B = 104;

  // Devuelve la secuencia de anchos (barra, espacio, barra…) para el texto
  function anchos(texto) {
    const valores = [...String(texto)].map((c) => {
      const v = c.charCodeAt(0) - 32;
      if (v < 0 || v > 94) throw new Error('Carácter no admitido en Code 128 B: ' + c);
      return v;
    });
    const suma = valores.reduce((s, v, i) => s + v * (i + 1), INICIO_B);
    const simbolos = [INICIO_B, ...valores, suma % 103];
    return simbolos.map((s) => P[s]).join('') + PARADA;
  }

  function svg(texto, { alto = 60, modulo = 2, margen = 10, color = '#000' } = {}) {
    const a = anchos(texto);
    let x = margen, barras = '';
    for (let i = 0; i < a.length; i++) {
      const w = Number(a[i]) * modulo;
      if (i % 2 === 0) barras += `M${x} 0h${w}v${alto}h-${w}Z`;
      x += w;
    }
    const ancho = x + margen;
    return `<svg class="code128" viewBox="0 0 ${ancho} ${alto}" preserveAspectRatio="none" role="img" aria-label="Código de barras ${texto}" xmlns="http://www.w3.org/2000/svg"><rect width="${ancho}" height="${alto}" fill="#fff"/><path d="${barras}" fill="${color}"/></svg>`;
  }

  return { anchos, svg };
})();
