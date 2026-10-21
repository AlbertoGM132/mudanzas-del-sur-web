import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IArrow, ISpark, IWhatsApp } from "@/components/site/Icons";
import { SITE_URL, TEL, wa } from "@/lib/site";
import { ZONAS, zona } from "@/lib/zonas";

export const dynamicParams = false;
export function generateStaticParams() {
  return ZONAS.map((z) => ({ zona: z.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ zona: string }> }): Promise<Metadata> {
  const z = zona((await params).zona);
  if (!z) return {};
  return {
    title: z.titulo,
    description: z.descripcion,
    alternates: { canonical: `/mudanzas/${z.slug}/` },
    openGraph: { title: `${z.titulo} · Mudanzas del Sur`, description: z.descripcion, url: `${SITE_URL}/mudanzas/${z.slug}/` },
  };
}

const SERVICIOS = [
  { t: "Mudanzas completas", p: "Pisos, casas y chalets, con camión de 20 m³ y, si hace falta, furgoneta de apoyo." },
  { t: "Portes", p: "Unas pocas cosas, un mueble, un electrodoméstico o recoger una compra." },
  { t: "Desmontaje y montaje", p: "Armarios, canapés, camas y mesas: te los dejamos montados." },
  { t: "Embalaje", p: "Todo, solo lo frágil o nada: tú eliges. Llevamos cajas, film y mantas." },
];

export default async function ZonaPage({ params }: { params: Promise<{ zona: string }> }) {
  const z = zona((await params).zona);
  if (!z) notFound();
  const cerca = z.cerca.map(zona).filter(Boolean) as NonNullable<ReturnType<typeof zona>>[];
  const url = `${SITE_URL}/mudanzas/${z.slug}/`;
  const ld = [
    {
      "@context": "https://schema.org", "@type": "Service", serviceType: "Mudanzas y portes",
      name: `Mudanzas ${z.donde}`, url, description: z.descripcion,
      areaServed: [{ "@type": "City", name: z.nombre }, ...(z.nucleos || []).filter((n) => n !== z.nombre).map((n) => ({ "@type": "Place", name: n }))],
      provider: { "@type": "MovingCompany", name: "Mudanzas del Sur", url: SITE_URL, telephone: "+34659715271",
        address: { "@type": "PostalAddress", streetAddress: "Polígono Polirrosa", addressLocality: "Huelva", addressCountry: "ES" } },
    },
    { "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: z.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Zonas", item: `${SITE_URL}/mudanzas/` },
      { "@type": "ListItem", position: 3, name: z.nombre, item: url },
    ] },
  ];

  return (
    <>
      <Header />
      <main id="main">
        <section className="page-hero zona-hero on-dark">
          <div className="wrap">
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> <span aria-hidden="true">/</span> <Link href="/mudanzas/">Zonas</Link> <span aria-hidden="true">/</span> <span>{z.nombre}</span>
            </nav>
            <h1 className="display h1">Mudanzas <em>{z.donde}.</em></h1>
            <p className="lead">{z.intro}</p>
            <div className="hero-actions" style={{ animation: "none" }}>
              <Link href="/calculadora/" className="btn btn-lime" data-zona={`zona-${z.slug}`}><ISpark />Calcula tu mudanza<IArrow className="arrow" /></Link>
              <a href={wa(`Hola, necesito presupuesto para una mudanza ${z.donde}.`)} className="btn btn-ghost" target="_blank" rel="noopener noreferrer" data-zona={`zona-${z.slug}`}><IWhatsApp />{TEL}</a>
            </div>
            <dl className="zona-datos">
              {z.km > 0 && <div><dt>Desde nuestra base</dt><dd>unos {z.km} km · {z.min} min</dd></div>}
              {z.km === 0 && <div><dt>Nuestra base</dt><dd>Polígono Polirrosa, Huelva</dd></div>}
              <div><dt>Presupuesto</dt><dd>gratis y sin compromiso</dd></div>
              {z.nucleos?.length ? <div><dt>Cubrimos</dt><dd>{z.nucleos.join(", ")}</dd></div> : null}
            </dl>
          </div>
        </section>

        <section className="section" id="como-trabajamos">
          <div className="wrap">
            <div className="section-head">
              <span className="kicker">{z.nombre}</span>
              <h2 className="h2">Cómo lo hacemos <em>{z.donde}.</em></h2>
            </div>
            <div className="pillars zona-notas">
              {z.notas.map((n, i) => (
                <article className="pillar" key={n.t}>
                  <span className="num">0{i + 1}</span>
                  <h3 className="h3">{n.t}</h3>
                  <p>{n.p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section paper" id="servicios">
          <div className="wrap">
            <div className="section-head">
              <span className="kicker">Servicios</span>
              <h2 className="h2">Lo que necesites mover {z.donde.replace(/ y de .*$/, "")}, <em>lo movemos.</em></h2>
              <p className="lead">Vamos con nuestro propio equipo, protegemos cada mueble con mantas y film, y el precio que aceptas es el que pagas.</p>
            </div>
            <div className="zona-servicios">
              {SERVICIOS.map((s) => (
                <div className="card zona-servicio" key={s.t}><h3 className="h3">{s.t}</h3><p className="muted">{s.p}</p></div>
              ))}
            </div>
            <div className="zona-cta">
              <p><b>¿Cuánto cuesta tu mudanza?</b> Haz unas fotos de tus muebles y la calculadora con IA te da un precio orientativo en dos minutos.</p>
              <Link href="/calculadora/" className="btn btn-accent" data-zona={`zona-${z.slug}`}><ISpark />Calcular mi mudanza<IArrow className="arrow" /></Link>
            </div>
          </div>
        </section>

        <section className="section" id="preguntas">
          <div className="wrap faq">
            <div>
              <span className="kicker">Preguntas frecuentes</span>
              <h2 className="h2" style={{ margin: "18px 0 20px" }}>Mudanzas {z.donde}: <em>lo que nos preguntáis.</em></h2>
              <p className="lead">¿Otra duda? Pregúntale a <b>Sur</b>, nuestro asistente, o escríbenos por WhatsApp.</p>
            </div>
            <div className="faq-list">
              {z.faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}<span className="pm" aria-hidden="true" /></summary>
                  <div className="ans">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {cerca.length > 0 && (
          <section className="section paper" id="cerca">
            <div className="wrap">
              <div className="section-head">
                <span className="kicker">Cerca de {z.nombre}</span>
                <h2 className="h2">También trabajamos <em>muy cerca.</em></h2>
              </div>
              <ul className="zonas-lista">
                {cerca.map((c) => (
                  <li key={c.slug}><Link href={`/mudanzas/${c.slug}/`}><b>Mudanzas en {c.nombre}</b><span>{c.km ? `unos ${c.km} km de Huelva` : "nuestra base"}</span><IArrow /></Link></li>
                ))}
                <li><Link href="/mudanzas/"><b>Todas las zonas</b><span>Huelva, Sevilla y Andalucía</span><IArrow /></Link></li>
              </ul>
            </div>
          </section>
        )}
        {ld.map((x, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />)}
      </main>
      <Footer />
    </>
  );
}
