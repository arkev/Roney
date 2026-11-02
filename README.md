# Torneo en Memoria de Roney Hernández

Landing informativa del torneo de Disc Golf en memoria de Roney Hernández (1998 – 2026).
Lunes 16 de noviembre de 2026 · Ojo de Agua, Montemorelos, N.L.

Lo recaudado se dona a la campaña de GoFundMe para apoyar a Paola y a la familia de Roney.

Hecha con HTML, CSS y JavaScript puro. Iconos: Material Symbols Rounded.
Publicada en https://arkev.github.io/Roney/

## Actualizar lo recaudado

Edita solo [`js/config.js`](js/config.js):

```js
const DATOS_TORNEO = {
  // Aporte de la comunidad de Disc Golf
  jugadoresInscritos: 24,
  montoRecaudado: 18500,   // en pesos (MXN), sin comas ni signo de pesos
  numeroDonantes: 40,
  ultimaActualizacion: "2026-11-02", // AAAA-MM-DD

  // Campaña de GoFundMe (cópialo de la página de la campaña)
  gofundmeRecaudado: 7267, // en dólares (USD)
  gofundmeMeta: 7500       // en dólares (USD)
};
```

Guarda, haz commit y push. GitHub Pages publica el cambio en uno o dos minutos.
Si lo recaudado en GoFundMe supera la meta, la barra se queda llena y muestra "Meta superada".

## Estructura

```
index.html
css/styles.css
js/config.js         datos de la recaudación
js/main.js           contadores, barra de GoFundMe, copiar, compartir y animaciones
assets/img/          imágenes originales
assets/img/web/      versiones optimizadas que usa la página
```

## Probar en local

```bash
python3 -m http.server 5500
```

Abre http://localhost:5500

## Imagen al compartir

`og:image` en `index.html` usa la URL absoluta de GitHub Pages
(`https://arkev.github.io/Roney/assets/img/web/og-homenaje.jpg`) para que la vista
previa aparezca al compartir en WhatsApp y Facebook. Si cambia el dominio, actualízala.
