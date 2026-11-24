# Branding LoEntrego

Manual de marca de **LoEntrego — Logística de última milla**.

Abre `index.html` en el navegador (o publícalo con GitHub Pages) para ver el manual completo:

1. Esencia
2. Logotipo (versiones, área de protección, tamaño mínimo y usos incorrectos)
3. Isotipo (blanco, negro y azul)
4. Color (principales, familia índigo, estados del pedido y proporción)
5. Tipografía (por producto)
6. Ecosistema (Vitrina · Día · Noche)
7. Componentes (botones, estados, mini-ruta, ticket)
8. Movimiento (la pila de cajas y sus reglas)
9. Voz y tono
10. Descargas

## Archivos

```
assets/
  logo/      loentrego-logo-blanco.png · loentrego-logo-tinta.png · loentrego-logo-fondo-azul.png
  isotipo/   isotipo-blanco.png · isotipo-negro.png · isotipo-azul.png · isotipo-mascara.png
  iconos/    icon-192.png · icon-512.png · icon-maskable-512.png · apple-touch-icon.png
```

## Colores clave

| Nombre | Código |
| --- | --- |
| Azul LoEntrego | `#3422A8` |
| Lima | `#B5DB2E` |
| Tinta | `#12092E` |
| Noche | `#0B0826` |
| Lavanda | `#ECE9F8` |

## Etiqueta de envío (para imprimir)

`etiquetas/` tiene la etiqueta que va pegada en cada paquete, de 10 cm de ancho × 5 cm de alto, en dos versiones:

- **Tinta** (`etiquetas/?version=tinta`): solo negro, para impresora térmica o láser en blanco y negro.
- **Color** (`etiquetas/?version=color`): azul de marca y lima.

Lleva un código de barras Code 128 con el código del pedido (`etiquetas/code128.js`, sin librerías), que se puede leer con pistola o con el celular.

La app abre la etiqueta con los datos del pedido de dos formas:

- `?datos=` con el JSON del pedido en base64url;
- campos sueltos, por ejemplo `?codigo=LOE-0001042&nombre=…&cobro=45000`.

Con `&imprimir` abre directo el cuadro de impresión.

Al imprimir: papel de 100 × 50 mm, márgenes "Ninguno" y escala 100 %.
