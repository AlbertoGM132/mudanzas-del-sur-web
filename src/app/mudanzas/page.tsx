import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IArrow, ISpark } from "@/components/site/Icons";
import { ZONAS } from "@/lib/zonas";

export const metadata = {
  title: "Zonas donde hacemos mudanzas: Huelva, la costa y Sevilla",
  description: "Hacemos mudanzas y portes en Huelva capital, Aljaraque, Punta Umbría, Cartaya, Lepe, Isla Cristina, Ayamonte, Moguer, Palos, Mazagón, Gibraleón y Sevilla.",
  alternates: { canonical: "/mudanzas/" },
};

export default function ZonasPage() {
  const huelva = ZONAS.filter((z) => z.provincia === "Huelva");
  const fuera = ZONAS.filter((z) => z.provincia !== "Huelva");
  return (
    <>
      <Header />
      <main id="main">
        <section className="page-hero zona-hero on-dark">
          <div className="wrap">
            <h1 className="display h1">Dónde hacemos <em>mudanzas.</em></h1>
            <p className="lead">Salimos cada día desde nuestra base en Huelva (Polígono Polirrosa). Trabajamos en toda la provincia, en Sevilla y en el resto de Andalucía, y hacemos mudanzas a cualquier punto de la península.</p>
            <div className="hero-actions" style={{ animation: "none" }}>
              <Link href="/calculadora/" className="btn btn-lime"><ISpark />Calcula tu mudanza<IArrow className="arrow" /></Link>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="wrap">
            <div className="section-head"><span className="kicker">Provincia de Huelva</span><h2 className="h2">Huelva y <em>la costa.</em></h2></div>
            <ul className="zonas-lista">
              {huelva.map((z) => (
                <li key={z.slug}><Link href={`/mudanzas/${z.slug}/`}><b>Mudanzas en {z.nombre}</b><span>{z.km ? `unos ${z.km} km · ${z.min} min` : "nuestra base"}</span><IArrow /></Link></li>
              ))}
            </ul>
            <div className="section-head" style={{ marginTop: 56 }}><span className="kicker">Más lejos</span><h2 className="h2">Sevilla y <em>el resto de Andalucía.</em></h2></div>
            <ul className="zonas-lista">
              {fuera.map((z) => (
                <li key={z.slug}><Link href={`/mudanzas/${z.slug}/`}><b>{z.titulo.replace(/ y en Sevilla$/, "")}</b><span>unos {z.km} km · {z.min} min</span><IArrow /></Link></li>
              ))}
            </ul>
            <p className="lead" style={{ marginTop: 28 }}>¿Tu pueblo no está en la lista? Seguramente también vamos: pregúntanos por WhatsApp o usa la calculadora, que calcula los kilómetros reales.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
