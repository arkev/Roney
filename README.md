# Torneo en Beneficio de Roney Hernández

Landing informativa del torneo de Disc Golf en beneficio de Roney Hernández.
Lunes 16 de noviembre de 2026 · Ojo de Agua, Montemorelos, N.L.

Hecha con HTML, CSS y JavaScript puro. Iconos: Material Symbols Rounded.

## Actualizar lo recaudado

Edita solo [`js/config.js`](js/config.js):

```js
const DATOS_TORNEO = {
  jugadoresInscritos: 24,
  montoRecaudado: 18500, // en pesos (MXN), sin comas ni signo de pesos
  numeroDonantes: 40,
  ultimaActualizacion: "2026-11-02" // AAAA-MM-DD
};
```

Guarda, haz commit y push. GitHub Pages publica el cambio en uno o dos minutos.

## Estructura

```
index.html
css/styles.css
js/config.js         datos de la recaudación
js/main.js           contadores, copiar, compartir y animaciones
assets/img/          imágenes originales
assets/img/web/      versiones optimizadas que usa la página
```

## Probar en local

```bash
python3 -m http.server 5500
```

Abre http://localhost:5500

## Publicar en GitHub Pages

1. Sube el repo a GitHub.
2. En **Settings > Pages**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
3. La página quedará en `https://<usuario>.github.io/<repo>/`.

Cuando tengas la URL final, cambia `og:image` en `index.html` por la URL absoluta
(`https://<usuario>.github.io/<repo>/assets/img/web/og-portada.jpg`) para que la
vista previa con imagen aparezca al compartir en WhatsApp y Facebook.
