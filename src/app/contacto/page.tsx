import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/site/ContactForm";
import { IMail, IPhone, IPin, ISpark, IWhatsApp } from "@/components/site/Icons";
import { EMAIL, TEL, TEL_HREF, wa } from "@/lib/site";

export const metadata = {
  title: "Contacto y presupuesto",
  description: "Pide tu presupuesto de mudanza en Huelva por WhatsApp, teléfono o con la calculadora con IA. Gratis y sin compromiso.",
  alternates: { canonical: "/contacto/" },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="page-hero">
          <div className="wrap">
            <h1 className="display h1">Cuéntanos <em>tu mudanza.</em></h1>
            <p className="lead">Lo más rápido: mándanos fotos por WhatsApp o usa la calculadora con IA y tendrás un precio orientativo al momento.</p>
            <div className="hero-actions" style={{ animation: "none" }}>
              <Link href="/calculadora/" className="btn btn-accent"><ISpark />Calculadora con IA</Link>
              <a href={wa()} className="btn btn-wa" target="_blank" rel="noopener noreferrer"><IWhatsApp />WhatsApp {TEL}</a>
            </div>
          </div>
        </section>
        <section className="section on-dark" style={{ paddingTop: 72 }}>
          <div className="wrap contact">
            <div>
              <h2 className="h2">Estamos <em>a un mensaje.</em></h2>
              <div className="contact-lines">
                <a className="contact-line" href={wa()} target="_blank" rel="noopener noreferrer"><span className="ico"><IWhatsApp /></span><span><small>WhatsApp</small><b>{TEL}</b></span></a>
                <a className="contact-line" href={TEL_HREF}><span className="ico"><IPhone /></span><span><small>Teléfono</small><b>{TEL}</b></span></a>
                <a className="contact-line" href={`mailto:${EMAIL}`}><span className="ico"><IMail /></span><span><small>Email</small><b>{EMAIL}</b></span></a>
                <div className="contact-line"><span className="ico"><IPin /></span><span><small>Base</small><b>Polígono Polirrosa, Huelva</b></span></div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
