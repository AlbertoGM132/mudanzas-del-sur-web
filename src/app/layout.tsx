import React from "react";
import type { Metadata, Viewport } from "next";
import "../styles/tailwind.css";
import "../styles/site.css";
import ChatWidget from "@/components/site/ChatWidget";
import Effects from "@/components/site/Effects";
import { EMAIL, INSTAGRAM, SITE_URL } from "@/lib/site";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f6efe3" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Mudanzas del Sur · Mudanzas en Huelva con presupuesto al momento", template: "%s · Mudanzas del Sur" },
  description:
    "Mudanzas y portes en Huelva, Sevilla y toda Andalucía. Sube fotos de tus muebles y nuestra calculadora con IA te da un precio orientativo en 2 minutos. Presupuesto gratis.",
  icons: { icon: [{ url: "/favicon.ico", type: "image/x-icon" }] },
  openGraph: {
    type: "website", locale: "es_ES", siteName: "Mudanzas del Sur", url: SITE_URL,
    title: "Mudanzas del Sur · Cambia de casa, no de humor",
    description: "Mudanzas y portes en Huelva y Andalucía. Calcula tu mudanza con IA en 2 minutos.",
    images: [{ url: "/assets/img/hero-1200.webp", width: 1200, height: 678 }],
  },
};

const negocio = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "Mudanzas del Sur",
  url: SITE_URL,
  image: `${SITE_URL}/assets/img/hero-1200.webp`,
  logo: `${SITE_URL}/assets/img/logo.webp`,
  telephone: "+34659715271",
  email: EMAIL,
  address: { "@type": "PostalAddress", streetAddress: "Polígono Polirrosa", addressLocality: "Huelva", addressRegion: "Andalucía", addressCountry: "ES" },
  areaServed: ["Huelva", "Provincia de Huelva", "Sevilla", "Andalucía", "España"],
  sameAs: [INSTAGRAM],
};

// Antes de pintar: activa las animaciones y, pase lo que pase, enseña todo a los 5 s
const ARRANQUE = `document.documentElement.classList.add('js');setTimeout(function(){document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in')})},5000);`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,0..100;1,9..144,300..700,0..100&family=Inter:wght@400;500;600;700;800&display=swap"
        />
        <link rel="preconnect" href="https://europe-west1-smartsonubalogictis.cloudfunctions.net" crossOrigin="" />
        <script dangerouslySetInnerHTML={{ __html: ARRANQUE }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(negocio) }} />
      </head>
      <body>
        {children}
        <ChatWidget />
        <Effects />
      </body>
    </html>
  );
}
