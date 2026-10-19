# Mudanzas del Sur — Web Corporativa

Sitio web de presentación para **Mudanzas del Sur**, empresa de mudanzas con sede en Huelva. Desarrollado con Next.js y desplegado como sitio estático en Firebase Hosting.

**URL en producción:** [mudanzas-del-sur.web.app](https://mudanzasdelsur.es/home-page/)

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 15.1 | Framework principal (modo `output: export`) |
| [React](https://react.dev/) | 19 | Librería de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Estilos y diseño |
| [@heroicons/react](https://heroicons.com/) | 2.2 | Iconografía |
| [Formspree](https://formspree.io/) | — | Gestión del formulario de contacto |
| [Firebase Hosting](https://firebase.google.com/products/hosting) | — | Despliegue y CDN |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── home-page/          # Página principal (landing)
│   │   └── components/     # HeroSection, ServicesSection, TestimonialsSection...
│   ├── servicios/          # Página de servicios
│   ├── contacto/           # Página de contacto con formulario
│   ├── blog/               # Listado del blog
│   │   └── [slug]/         # Posts individuales con contenido estático en data.ts
│   ├── layout.tsx          # Layout raíz con metadata SEO
│   └── not-found.tsx       # Página 404
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   └── ui/                 # AppIcon, AppImage, AppLogo
└── styles/
    └── tailwind.css
```

---

## Páginas

| Ruta | Descripción |
|---|---|
| `/home-page` | Landing con hero, estadísticas, servicios, testimonios y CTA |
| `/servicios` | Detalle de los 4 servicios: local, nacional, particulares y empresas |
| `/contacto` | Formulario de solicitud de presupuesto integrado con Formspree |
| `/blog` | Listado de artículos de consejos para mudanzas |
| `/blog/[slug]` | Post individual (contenido estático en `data.ts`) |

---

## Desarrollo local

### Requisitos previos

- Node.js 18+
- npm

### Instalación

```bash
git clone https://github.com/AlbertoGM132/mudanzas-del-sur-web.git
cd mudanzas-del-sur-web
npm install
```

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

### Otros comandos

```bash
npm run build   # Genera el export estático en /out
npm run lint    # Ejecuta ESLint
```

---

## Despliegue en Firebase Hosting

El sitio exporta HTML/CSS/JS estático mediante `output: 'export'` en `next.config.mjs`. Firebase Hosting sirve el contenido desde la carpeta `out/`.

### Requisitos

- [Firebase CLI](https://firebase.google.com/docs/cli) instalada y autenticada:

```bash
npm install -g firebase-tools
firebase login
```

### Pasos para desplegar

```bash
# 1. Generar el build estático
npm run build

# 2. Desplegar en Firebase Hosting
firebase deploy
```

El comando `firebase deploy` sube el contenido de `out/` al proyecto `mudanzas-del-sur` definido en `.firebaserc`.

---

## Funciones de IA (asistente, calculadora, contacto)

La web llama a la función `web_api` del proyecto de Firebase de MudanzaPro
(`smartsonubalogictis`, repo `gestor-mudanzas-pwa`): asistente de chat «Sur», lectura de fotos con
IA (Gemini), calculadora de mudanza y formulario de contacto. Todo lo que envía el cliente entra
en MudanzaPro como **solicitud**. La clave de la IA vive solo en el servidor (secreto `GEMINI_KEY`).

- `/calculadora` — fotos → inventario con IA → direcciones y ruta (OpenStreetMap/OSRM) → dónde
  para el camión → precio orientativo con las tarifas reales de la app.
- La dirección de la función se puede cambiar con `NEXT_PUBLIC_WEB_API`.

### Versión de prueba con dominio temporal

```bash
npm run build
firebase hosting:channel:deploy prueba --expires 14d
```

## Variables de entorno

Este proyecto no requiere variables de entorno para funcionar. El endpoint de Formspree está referenciado directamente en `src/app/contacto/page.tsx`.

Si en el futuro se añaden claves de API, créalas en un archivo `.env.local` (ignorado por git):

```
NEXT_PUBLIC_EJEMPLO=valor
```

---

## Autor

**Alberto Gómez** — [@AlbertoGM132](https://github.com/AlbertoGM132)
