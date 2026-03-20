# Helados del barrio – Landing Page

Landing page informativa para negocio de helados artesanales tipo bolsita.
Stack: **HTML5 · CSS3 · JavaScript Vanilla**. Sin frameworks, sin backend.

---

## Estructura de archivos

```
landingpage-helados-artesanales/
├── index.html          ← Estructura semántica (único punto de entrada)
├── css/
│   └── style.css       ← Todos los estilos (variables, layout, componentes)
├── js/
│   └── main.js         ← Lógica del cliente (nav, animaciones, formulario)
├── assets/
│   └── img/            ← Carpeta para tus fotos reales
└── README.md
```

---

## Inicio rápido

1. Descarga o clona la carpeta `landingpage-helados-artesanales/`.
2. Abre `index.html` en cualquier navegador moderno.
3. No se requiere servidor local ni dependencias npm.

---

## Configuración esencial (antes de publicar)

### 1. Número de WhatsApp
Edita `js/main.js`, línea 14:
```js
const WA_NUMBER = 'TUNUMERODETELEFONO';
// Ejemplo Colombia: '573001234567'  (código de país sin el +)
```
Este valor se usa automáticamente en el formulario de contacto y el botón flotante.
El enlace de distribuidores en `index.html` también tiene su propia URL — cámbiala en el `href` del botón de esa sección.

### 2. Imágenes reales
En `index.html`, reemplaza cada `<div class="img-placeholder ...">` por:
```html
<img src="assets/img/nombre-archivo.jpg"
     alt="Descripción de la imagen"
     width="800" height="600" />
```
Las imágenes heredan `object-fit: cover` desde el CSS de su contenedor, por lo que no se deformarán.

### 3. Colores y tipografía
Todos los valores están en las **Custom Properties** de `css/style.css` (líneas 10–55).
Modifica las variables en `:root {}` y el cambio se propaga a toda la página.

```css
/* Ejemplo: cambiar el color primario */
--clr-primary: #D4832A;   /* ← nuevo valor aquí */
```

### 4. Redes sociales
Busca la sección `footer__social` en `index.html` y reemplaza los `href="#"` con tus URLs reales.

---

## Módulos de JavaScript (`main.js`)

| Módulo | Qué hace |
|---|---|
| `Icons` | Inicializa Lucide Icons al cargar el DOM |
| `Navigation` | Toggle del menú móvil + marcado del enlace activo según sección visible |
| `Header Scroll` | Añade sombra al header después de 60 px de scroll |
| `ScrollReveal` | `IntersectionObserver` que añade `.is-visible` a los elementos `.reveal` al entrar al viewport |
| `ContactForm` | Valida campos requeridos y redirige a WhatsApp con el mensaje formateado |
| `Footer Year` | Inserta el año actual en el copyright |

---

## Dependencias externas (CDN)

| Recurso | Propósito | Peso aprox. |
|---|---|---|
| Google Fonts – Cormorant Garamond + Jost | Tipografía | ~40 KB |
| Lucide Icons `lucide.min.js` | Iconografía SVG | ~25 KB gzip |

Ambas se cargan desde CDN; si el usuario no tiene conexión usará fuentes del sistema y los íconos no aparecerán (degradación aceptable).

---

## Responsividad (Mobile-First)

| Breakpoint | Comportamiento |
|---|---|
| `< 640px` (base) | Layout en una sola columna, menú hamburguesa |
| `≥ 640px` | Catálogo en 2 columnas, footer en 2 columnas |
| `≥ 1024px` | Nav visible, hero y secciones en 2 columnas, catálogo en 4 columnas |

---

## Extensiones futuras sugeridas

| Función | Tecnología |
|---|---|
| Envío de formulario por email | [Formspree](https://formspree.io) (gratis, solo cambia el `action` del form) |
| Carrito de compras | JavaScript + `localStorage` |
| Gestión de contenido | Netlify CMS o Decap CMS (headless, sin backend propio) |
| Pagos en línea | Stripe o MercadoPago (requiere backend) |

---

*Proyecto personal – v2.0 · HTML5 + CSS3 + JS Vanilla · Sin backend*
