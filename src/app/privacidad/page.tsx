import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAIL, TEL } from "@/lib/site";

export const metadata = { title: "Privacidad y aviso legal", alternates: { canonical: "/privacidad/" }, robots: { index: true } };

// ⚠️ Revisar este texto y completar el NIF antes de publicar la web definitiva.
// El nombre del titular y el NIF son obligatorios por ley en el aviso legal (LSSI, art. 10).
export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="page-hero">
          <div className="wrap">
            <span className="kicker">Legal</span>
            <h1 className="display h1">Privacidad <em>y aviso legal.</em></h1>
          </div>
        </section>
        <section style={{ paddingBottom: 96 }}>
          <div className="wrap prose-legal">
            <h2>Quién trata tus datos</h2>
            <p>Alberto Gómez Mora, que trabaja con el nombre comercial Mudanzas del Sur (Polígono Polirrosa, Huelva). NIF: pendiente de completar. Contacto: {EMAIL} · {TEL}.</p>

            <h2>Qué datos recogemos y para qué</h2>
            <ul>
              <li><b>Formulario de contacto y calculadora:</b> nombre, teléfono, email, direcciones de recogida y entrega, pisos y accesos, lista de muebles, fotos que subas y la fecha que te interesa. Los usamos solo para preparar tu presupuesto, contactarte por WhatsApp, teléfono o email y, si nos contratas, organizar la mudanza.</li>
              <li><b>Asistente de chat:</b> las preguntas que escribas, para poder contestarte y saber qué dudas son las más habituales (si escribes un teléfono o un email, se borra antes de guardarlo). No escribas datos personales en el chat.</li>
              <li><b>Estadísticas de uso de la web (sin cookies):</b> de qué web o red social llegas, qué páginas y secciones ves, qué botones pulsas, en qué paso de la calculadora te quedas, el tipo de dispositivo y el tiempo en cada página. Cada visita lleva un número aleatorio que solo existe mientras tienes la pestaña abierta: no guardamos tu IP ni nada en tu navegador, y con estos datos no podemos saber quién eres. Si envías la calculadora o el formulario, lo que hiciste en esa visita queda unido a tu solicitud para saber qué canal funciona mejor (si llegaste desde un anuncio de Google, también el código del clic del anuncio, para medir qué anuncios acaban en mudanzas). Si tu navegador tiene activado «No rastrear» o el control global de privacidad, no medimos nada. Lo usamos para mejorar la web; la base legal es nuestro interés legítimo en entender cómo se usa.</li>
            </ul>
            <p>La base legal es tu consentimiento (la casilla que marcas) y las gestiones previas a un posible contrato que tú nos pides. No vendemos ni cedemos tus datos a nadie para publicidad.</p>

            <h2>Servicios que usamos</h2>
            <ul>
              <li><b>Google (Firebase):</b> alojamiento de la web y de la base de datos donde guardamos tu solicitud y tus fotos.</li>
              <li><b>IA de Google (Gemini):</b> analiza las fotos que subes para hacer la lista de muebles y responde en el asistente de chat. Mientras usemos el plan gratuito de este servicio, Google puede usar el contenido enviado para mejorar sus productos; por eso te pedimos que no subas fotos con personas, documentos ni datos personales.</li>
              <li><b>OpenStreetMap, Photon y OSRM:</b> el mapa, la búsqueda de direcciones y el cálculo de la ruta. Reciben las direcciones que escribes o marcas en el mapa.</li>
              <li><b>WhatsApp:</b> si decides escribirnos por ahí.</li>
            </ul>

            <h2>Cuánto tiempo los guardamos</h2>
            <p>Las estadísticas de uso, un máximo de 13 meses. Tu solicitud, mientras preparamos tu presupuesto y, si no llegamos a hacer la mudanza, como máximo un año. Si nos contratas, el tiempo que obliguen las normas fiscales y contables.</p>

            <h2>Tus derechos</h2>
            <p>Puedes pedirnos ver, corregir o borrar tus datos, o retirar tu consentimiento, escribiendo a {EMAIL}. Si crees que no los tratamos bien, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>

            <h2 id="aviso-legal">Aviso legal</h2>
            <p>Esta web es del titular indicado arriba. Los precios que muestra la calculadora son estimaciones orientativas calculadas automáticamente y no constituyen una oferta vinculante: el precio final es el del presupuesto que te confirmamos. Las opiniones marcadas como «Ejemplo» son textos ilustrativos.</p>
            <p>Esta web no usa cookies: ni de publicidad ni de analítica (las estadísticas de uso se miden sin cookies, como se explica arriba). El mapa y las fuentes tipográficas se cargan desde servicios externos.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
